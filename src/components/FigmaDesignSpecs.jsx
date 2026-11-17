import React, { useState } from 'react';
import { 
  Palette, 
  Type, 
  ExternalLink, 
  Layers, 
  Code, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  Smartphone
} from 'lucide-react';

export default function FigmaDesignSpecs() {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedColor, setCopiedColor] = useState('');

  const colors = [
    { name: 'Primary 600', hex: '#6938EF', desc: 'Main CTA & Active' },
    { name: 'Primary 500', hex: '#7A5AF8', desc: 'Gradient' },
    { name: 'Primary 100', hex: '#EBE9FE', desc: 'Pill Badges' },
    { name: 'Heading', hex: '#252D3C', desc: 'Titles & Headings' },
    { name: 'Subtitle', hex: '#5D6676', desc: 'Body Text' },
    { name: 'Dark Nav', hex: '#18181B', desc: 'Bottom 5-tab Bar' },
    { name: 'Success', hex: '#19B36E', desc: 'Check-in / Done' },
    { name: 'High Priority', hex: '#F95555', desc: 'High Flag' },
  ];

  const handleCopy = (hex) => {
    navigator.clipboard?.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(''), 1500);
  };

  return (
    <div className="bg-slate-900 border-t border-slate-800 text-white transition-all duration-300">
      {/* Bar toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2.5 flex items-center justify-between text-xs text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-[#6938EF] flex items-center justify-center text-white">
            <Layers className="w-3.5 h-3.5" />
          </div>
          <span className="font-semibold text-white">Figma Design System Inspector</span>
          <span className="px-2 py-0.5 rounded-full bg-[#EBE9FE]/10 text-[#BDB4FE] text-[10px] font-mono">
            node-id=2059-2830
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 text-[11px] hidden sm:inline">
            {isOpen ? 'Collapse design tokens' : 'Inspect Figma colors & typography'}
          </span>
          {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </div>
      </button>

      {/* Expanded panel */}
      {isOpen && (
        <div className="p-4 px-6 border-t border-slate-800/80 bg-slate-950/70 text-xs space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Column 1: Node & Figma Link */}
            <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
              <div className="flex items-center gap-1.5 text-[#BDB4FE] font-bold text-xs mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Target Node Reference</span>
              </div>
              <p className="text-[11px] text-slate-400 mb-2">
                Inspected Node: <code className="text-white font-mono bg-slate-800 px-1 py-0.5 rounded">2059-2830</code> (SignIn Frame with EmployeeID, Email, Phone variants connected to Home).
              </p>
              <a
                href="https://www.figma.com/design/Wp7s6xQLqBQa8BM48Xijkf/UI-HR-Management---Task-Management-for-Mobile-Apps--figmamarket.com-?node-id=2059-2830&t=UJHW35azQk4AIYyK-1"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#9B8AFB] hover:text-[#BDB4FE] hover:underline"
              >
                <span>Open Figma File in New Tab</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Column 2: Color Palette Swatches */}
            <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 md:col-span-2">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 text-[#BDB4FE] font-bold text-xs">
                  <Palette className="w-4 h-4" />
                  <span>Workmate Design Tokens (Click to Copy)</span>
                </div>
                {copiedColor && (
                  <span className="text-[11px] text-[#19B36E] font-medium flex items-center gap-1">
                    <Check className="w-3 h-3" /> Copied {copiedColor}!
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {colors.map((c) => (
                  <div
                    key={c.hex}
                    onClick={() => handleCopy(c.hex)}
                    className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 cursor-pointer transition-all flex items-center gap-2 group"
                  >
                    <div
                      className="w-5 h-5 rounded-md border border-white/20 shrink-0 shadow-xs"
                      style={{ backgroundColor: c.hex }}
                    />
                    <div className="overflow-hidden">
                      <div className="font-semibold text-slate-200 text-[11px] truncate group-hover:text-white">
                        {c.name}
                      </div>
                      <div className="text-[10px] font-mono text-slate-400">
                        {c.hex}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-[11px] text-slate-400 border-t border-slate-800">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Type className="w-3.5 h-3.5 text-[#9B8AFB]" />
                Typography: <strong className="text-slate-200">Inter</strong> (400, 500, 600, 700)
              </span>
              <span>•</span>
              <span>
                Engine: <strong className="text-slate-200">React 19 + Tailwind CSS v4</strong>
              </span>
            </div>
            <div className="text-slate-500 font-mono text-[10px]">
              Prototype Flow: SignIn (Node 2059-2830) ➔ Tap Sign In ➔ Home Screen
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
