export type ThemeColor = 'indigo' | 'emerald' | 'amber' | 'violet' | 'rose' | 'slate';

export interface SocialLinks {
  linkedin?: string;
  github?: string;
  twitter?: string;
  website?: string;
  email?: string;
}

export interface PersonalDetails {
  fullName: string;
  title: string;
  tagline: string;
  bio: string;
  location: string;
  email: string;
  phone?: string;
  avatarUrl: string;
  availability: 'available' | 'limited' | 'not_available';
  availabilityText: string;
  socialLinks: SocialLinks;
}

export interface StatMetric {
  id: string;
  label: string;
  value: string;
  description?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location?: string;
  period: string;
  current?: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  impact?: string;
  category: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;
}

export interface SkillItem {
  name: string;
  level?: number; // 1-100
}

export interface SkillCategory {
  category: string;
  skills: SkillItem[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  details?: string;
}

export interface PortfolioData {
  personal: PersonalDetails;
  stats: StatMetric[];
  about: {
    story: string;
    keyPoints: string[];
    languages: string[];
  };
  experience: ExperienceItem[];
  projects: ProjectItem[];
  skillCategories: SkillCategory[];
  education: EducationItem[];
  theme: {
    color: ThemeColor;
    darkMode: boolean;
  };
}
