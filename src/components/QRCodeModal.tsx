import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import {
  QrCode,
  X,
  Download,
  Copy,
  Check,
  Share2,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';
import { PortfolioData, ThemeColor } from '../types';
import { themeConfigs } from '../lib/theme';
import { ui, siteUrl } from '../i18n';

export const FIXED_PORTFOLIO_URL = siteUrl;

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
  themeColor: ThemeColor;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({
  isOpen,
  onClose,
  data,
  themeColor,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const theme = themeConfigs[themeColor];

  // Generate QR code encoding exclusively the fixed production URL
  useEffect(() => {
    if (!isOpen || !canvasRef.current) return;

    QRCode.toCanvas(
      canvasRef.current,
      FIXED_PORTFOLIO_URL,
      {
        width: 280,
        margin: 2,
        color: {
          dark: '#0f172a', // Slate 900
          light: '#ffffff',
        },
        errorCorrectionLevel: 'H',
      },
      (error) => {
        if (error) console.error('Error generating QR code:', error);
      }
    );
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(FIXED_PORTFOLIO_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        await navigator.share({
          title: `${data.personal.fullName} | ${data.personal.title}`,
          text: `${ui.qr.shareText} ${data.personal.fullName}:`,
          url: FIXED_PORTFOLIO_URL,
        });
      } catch {
        // User cancelled share dialog
      }
    } else {
      handleCopyLink();
    }
  };

  const handleDownloadQR = () => {
    if (!canvasRef.current) return;
    setDownloading(true);

    try {
      // Create a high-res canvas with border & branding
      const mainCanvas = canvasRef.current;
      const exportCanvas = document.createElement('canvas');
      const ctx = exportCanvas.getContext('2d');
      if (!ctx) return;

      const padding = 40;
      const headerHeight = 80;
      const footerHeight = 60;
      exportCanvas.width = mainCanvas.width + padding * 2;
      exportCanvas.height = mainCanvas.height + padding * 2 + headerHeight + footerHeight;

      // Background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);

      // Border outline
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 4;
      ctx.strokeRect(8, 8, exportCanvas.width - 16, exportCanvas.height - 16);

      // Header text
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 22px system-ui, -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(data.personal.fullName, exportCanvas.width / 2, 50);

      ctx.fillStyle = '#64748b';
      ctx.font = '14px system-ui, -apple-system, sans-serif';
      ctx.fillText(data.personal.title, exportCanvas.width / 2, 75);

      // Draw QR Code
      ctx.drawImage(mainCanvas, padding, padding + headerHeight);

      // Footer text
      ctx.fillStyle = '#334155';
      ctx.font = '600 13px system-ui, -apple-system, sans-serif';
      ctx.fillText(ui.qr.scan, exportCanvas.width / 2, exportCanvas.height - 35);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px system-ui, -apple-system, sans-serif';
      ctx.fillText(
        FIXED_PORTFOLIO_URL.replace(/^https?:\/\//, ''),
        exportCanvas.width / 2,
        exportCanvas.height - 18
      );

      const link = document.createElement('a');
      link.download = `QR-${data.personal.fullName.replace(/\s+/g, '-')}-${ui.qr.fileSuffix}.png`;
      link.href = exportCanvas.toDataURL('image/png');
      link.click();
    } finally {
      setDownloading(false);
    }
  };

  const shareWhatsappUrl = `https://wa.me/?text=${encodeURIComponent(
    `${ui.qr.waShare} ${FIXED_PORTFOLIO_URL}`
  )}`;

  const supportsNativeShare =
    typeof navigator !== 'undefined' && typeof navigator.share === 'function';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden text-slate-900 dark:text-white animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-xl text-white ${theme.accentBg}`}>
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">{ui.qr.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {ui.qr.subtitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 flex flex-col items-center text-center">
          <p className="text-xs text-slate-600 dark:text-slate-300 mb-4 max-w-xs leading-relaxed">
            {ui.qr.desc}
          </p>

          {/* QR Code Canvas Frame */}
          <div className="p-4 bg-white rounded-2xl border-2 border-slate-200 shadow-inner flex flex-col items-center justify-center relative">
            <canvas ref={canvasRef} className="rounded-lg max-w-full h-auto" />
            <div className="mt-2 text-[11px] font-bold text-slate-800 tracking-wide uppercase">
              {data.personal.fullName}
            </div>
          </div>

          {/* URL Input with copy button */}
          <div className="w-full mt-5">
            <label className="block text-left text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
              {ui.qr.linkLabel}
            </label>
            <div className="flex items-center gap-2 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60">
              <input
                type="text"
                readOnly
                value={FIXED_PORTFOLIO_URL}
                className="w-full bg-transparent text-xs text-slate-800 dark:text-slate-200 px-2 py-1 outline-hidden font-mono select-all cursor-text"
              />
              <button
                onClick={handleCopyLink}
                className="px-3 py-1.5 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold hover:opacity-90 transition-opacity flex items-center gap-1 shrink-0 cursor-pointer shadow-xs"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{ui.qr.copied}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{ui.qr.copy}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="w-full grid grid-cols-2 gap-3 mt-4">
            <button
              onClick={handleDownloadQR}
              disabled={downloading}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 text-slate-800 dark:text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Download className="w-4 h-4 text-indigo-500" />
              <span>{ui.qr.downloadPng}</span>
            </button>

            <a
              href={shareWhatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{ui.qr.shareWa}</span>
            </a>
          </div>

          {supportsNativeShare && (
            <button
              onClick={handleNativeShare}
              className="w-full mt-2.5 py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Share2 className="w-4 h-4 text-indigo-500" />
              <span>{ui.qr.moreShare}</span>
            </button>
          )}

          <a
            href={FIXED_PORTFOLIO_URL}
            target="_blank"
            rel="noreferrer"
            className="text-[11px] text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center justify-center gap-1 mt-3 transition-colors"
          >
            <span>{ui.qr.open} ({FIXED_PORTFOLIO_URL.replace(/^https?:\/\//, '')})</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Modal Footer Tips */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 text-center">
          {ui.qr.tip}
        </div>
      </div>
    </div>
  );
};
