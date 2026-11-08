import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Lazy initialize Gemini client
let genAIClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!genAIClient && process.env.GEMINI_API_KEY) {
    genAIClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return genAIClient;
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', hasGeminiKey: Boolean(process.env.GEMINI_API_KEY) });
});

// Parse CV text endpoint
app.post('/api/parse-cv', async (req, res) => {
  try {
    const { cvText, language = 'es' } = req.body;

    if (!cvText || typeof cvText !== 'string' || cvText.trim().length === 0) {
      return res.status(400).json({ error: 'El texto del CV es requerido.' });
    }

    const ai = getGenAI();

    if (!ai) {
      // Fallback heuristic parsing if no API key is set yet
      return res.json({
        success: true,
        data: heuristicCvParse(cvText),
        notice: 'Parsed using local heuristics (API key not configured)',
      });
    }

    const prompt = `Analiza el siguiente texto de currículum vitae (CV) o perfil profesional y extrae la información en un formato JSON estructurado y profesional en idioma ${language === 'es' ? 'español' : 'inglés'}.

Si faltan datos específicos (como métricas numéricas o avatar), genera valores coherentes y profesionales acordes a la experiencia descrita.

Texto del CV:
"""
${cvText.slice(0, 15000)}
"""

El JSON devuelto DEBE tener exactamente esta estructura:
{
  "personal": {
    "fullName": "Nombre completo",
    "title": "Título profesional conciso y moderno",
    "tagline": "Frase de impacto profesional de 1 línea",
    "bio": "Párrafo profesional descriptivo que resalte fortalezas y propuesta de valor",
    "location": "Ciudad, País (o modalidad de trabajo)",
    "email": "correo@ejemplo.com",
    "phone": "+34 ...",
    "avatarUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    "availability": "available",
    "availabilityText": "Disponible para nuevos proyectos o empleo",
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/...",
      "github": "https://github.com/...",
      "twitter": "https://x.com/...",
      "website": "https://..."
    }
  },
  "stats": [
    { "id": "1", "label": "Años de Experiencia", "value": "X+", "description": "Resumen" },
    { "id": "2", "label": "Proyectos Completados", "value": "Y+", "description": "Resumen" },
    { "id": "3", "label": "Clientes o Equipos", "value": "Z+", "description": "Resumen" },
    { "id": "4", "label": "Tecnologías Clave", "value": "W+", "description": "Resumen" }
  ],
  "about": {
    "story": "Historia profesional detallada (2 párrafos breves)",
    "keyPoints": ["Punto clave 1", "Punto clave 2", "Punto clave 3", "Punto clave 4"],
    "languages": ["Español (Nativo)", "Inglés (Profesional)"]
  },
  "experience": [
    {
      "id": "exp-1",
      "role": "Cargo",
      "company": "Empresa",
      "location": "Ubicación",
      "period": "Año - Año",
      "current": true,
      "description": "Descripción del rol y responsabilidades principales",
      "achievements": ["Logro con impacto medible 1", "Logro 2"],
      "technologies": ["Tech1", "Tech2", "Tech3"]
    }
  ],
  "projects": [
    {
      "id": "proj-1",
      "title": "Nombre del proyecto representativo",
      "description": "Descripción del problema y solución desarrollada",
      "impact": "Métrica o resultado clave del proyecto",
      "category": "Categoría (ej: Web, Cloud, Mobile, etc.)",
      "tags": ["React", "Node", "etc"],
      "liveUrl": "https://ejemplo.com",
      "repoUrl": "https://github.com/...",
      "featured": true
    }
  ],
  "skillCategories": [
    {
      "category": "Nombre de categoría (ej: Frontend & UI, Backend, DevOps, etc.)",
      "skills": [
        { "name": "Tecnología / Habilidad", "level": 90 }
      ]
    }
  ],
  "education": [
    {
      "id": "edu-1",
      "degree": "Titulación o Grado",
      "institution": "Universidad o Escuela",
      "period": "Año - Año",
      "details": "Detalles o honores relevantes"
    }
  ],
  "theme": {
    "color": "indigo",
    "darkMode": false
  }
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.2,
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error('La respuesta de Gemini estuvo vacía.');
    }

    const parsedData = JSON.parse(text);
    return res.json({ success: true, data: parsedData });
  } catch (error: any) {
    console.error('Error parsing CV:', error);
    // Return heuristic fallback on error
    const fallback = heuristicCvParse(req.body?.cvText || '');
    return res.json({
      success: true,
      data: fallback,
      warning: 'No se pudo conectar con el modelo de IA. Se utilizó análisis inteligente local.',
    });
  }
});

// Heuristic fallback parser
function heuristicCvParse(text: string) {
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
  const firstLine = lines[0] || 'Profesional';
  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const phoneMatch = text.match(/(?:\+?\d{1,3}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,5}/);
  const linkedinMatch = text.match(/linkedin\.com\/in\/[a-zA-Z0-9_-]+/i);
  const githubMatch = text.match(/github\.com\/[a-zA-Z0-9_-]+/i);

  return {
    personal: {
      fullName: firstLine.length < 50 ? firstLine : 'Mi Nombre',
      title: lines[1] || 'Profesional Especialista',
      tagline: 'Impulsando resultados a través de experiencia y dedicación.',
      bio: text.slice(0, 300) || 'Profesional enfocado en la consecución de objetivos y la entrega de valor constante.',
      location: 'España / Remoto',
      email: emailMatch ? emailMatch[0] : 'contacto@ejemplo.com',
      phone: phoneMatch ? phoneMatch[0] : '+34 600 000 000',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      availability: 'available',
      availabilityText: 'Disponible para nuevas oportunidades',
      socialLinks: {
        linkedin: linkedinMatch ? `https://${linkedinMatch[0]}` : 'https://linkedin.com',
        github: githubMatch ? `https://${githubMatch[0]}` : 'https://github.com',
        email: emailMatch ? emailMatch[0] : 'contacto@ejemplo.com',
      },
    },
    stats: [
      { id: '1', label: 'Años de Experiencia', value: '5+', description: 'Trayectoria profesional' },
      { id: '2', label: 'Proyectos Clave', value: '20+', description: 'Entregados con éxito' },
      { id: '3', label: 'Habilidades', value: '15+', description: 'Dominio técnico y blando' },
      { id: '4', label: 'Satisfacción', value: '100%', description: 'Compromiso de calidad' },
    ],
    about: {
      story: text.slice(0, 500) || 'Trayectoria basada en constante aprendizaje y aportación de valor en proyectos de alta exigencia.',
      keyPoints: [
        'Orientación a resultados y resolución analítica de problemas.',
        'Capacidad de adaptación a nuevos entornos tecnológicos.',
        'Comunicación eficaz y trabajo colaborativo.',
        'Compromiso con la mejora continua.',
      ],
      languages: ['Español (Nativo)', 'Inglés (Intermedio-Avanzado)'],
    },
    experience: [
      {
        id: 'exp-1',
        role: lines[1] || 'Especialista Senior',
        company: 'Empresa Principal',
        location: 'Remoto',
        period: '2021 - Presente',
        current: true,
        description: 'Liderazgo y ejecución de proyectos estratégicos.',
        achievements: [
          'Optimización de procesos operativos y flujos de trabajo.',
          'Entrega puntual de entregables con altos estándares de calidad.',
        ],
        technologies: ['Gestión', 'Estrategia', 'Tecnología'],
      },
    ],
    projects: [
      {
        id: 'proj-1',
        title: 'Proyecto de Transformación Digital',
        description: 'Iniciativa integral para la modernización de flujos y herramientas de trabajo.',
        impact: 'Aumento significativo de la productividad y satisfacción de usuarios.',
        category: 'Estratégico',
        tags: ['Innovación', 'Gestión', 'Resultados'],
        liveUrl: '#',
        featured: true,
      },
    ],
    skillCategories: [
      {
        category: 'Competencias Principales',
        skills: [
          { name: 'Planificación Estratégica', level: 90 },
          { name: 'Resolución de Problemas', level: 95 },
          { name: 'Liderazgo de Proyectos', level: 85 },
        ],
      },
    ],
    education: [
      {
        id: 'edu-1',
        degree: 'Formación Superior Universitaria',
        institution: 'Institución Académica',
        period: '2015 - 2019',
        details: 'Especialización profesional con enfoque práctico.',
      },
    ],
    theme: {
      color: 'indigo',
      darkMode: false,
    },
  };
}

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
