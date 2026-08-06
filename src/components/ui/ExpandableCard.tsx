import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2 } from 'lucide-react';
import clsx from 'clsx';

interface ExpandableCardProps {
  id: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  title: string;
  icon?: React.ReactNode;
  compactContent: React.ReactNode;
  expandedContent: React.ReactNode;
  className?: string;
  backgroundImage?: string;
}

// Hook to detect click outside
function useOutsideClick(ref: React.RefObject<HTMLDivElement>, callback: () => void) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, callback]);
}

export const ExpandableCard: React.FC<ExpandableCardProps> = ({
  id,
  isOpen,
  onOpen,
  onClose,
  title,
  icon,
  compactContent,
  expandedContent,
  className,
  backgroundImage
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Close when clicking outside content when open
  useOutsideClick(cardRef, () => {
    if (isOpen) onClose();
  });

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* OVERLAY (Only visible when open) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* CARD CONTAINER */}
      <div className={clsx("relative", className, isOpen ? "z-50" : "z-0")}>
        <motion.div
          layoutId={`card-container-${id}`}
          ref={cardRef}
          onClick={!isOpen ? onOpen : undefined}
          className={clsx(
            "bg-slate-950 border border-white/10 overflow-hidden relative transition-all duration-500",
            isOpen 
              ? "fixed inset-0 md:inset-10 m-auto w-full h-full md:w-[90vw] md:h-[85vh] md:max-w-5xl rounded-none md:rounded-3xl shadow-2xl z-50 flex flex-col ring-1 ring-amber-400/20" 
              : "w-full h-full min-h-[180px] rounded-2xl cursor-pointer hover:border-amber-400/30 hover:shadow-[0_0_20px_rgba(251,191,36,0.1)] group backdrop-blur-sm"
          )}
        >
          {/* Background Image / Texture */}
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
             {backgroundImage && <img src={backgroundImage} className="w-full h-full object-cover grayscale mix-blend-overlay" alt="" />}
             <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/80 to-slate-950" />
          </div>

          {/* HEADER (Always visible but morphs) */}
          <motion.div 
            layoutId={`card-header-${id}`}
            className={clsx(
              "relative z-10 flex items-center justify-between p-6 border-b border-white/5",
              isOpen ? "bg-black/20" : "bg-transparent"
            )}
          >
            <div className="flex items-center gap-3">
              <div className={clsx(
                "p-2 rounded-full flex items-center justify-center transition-colors",
                isOpen ? "bg-amber-400/10 text-amber-400" : "bg-white/5 text-gray-400 group-hover:text-amber-400 group-hover:bg-amber-400/10"
              )}>
                {icon}
              </div>
              <motion.h3 
                layoutId={`card-title-${id}`}
                className={clsx(
                  "font-serif font-bold uppercase tracking-widest transition-colors",
                  isOpen ? "text-xl text-amber-400" : "text-sm text-gray-300 group-hover:text-amber-100"
                )}
              >
                {title}
              </motion.h3>
            </div>

            {isOpen ? (
              <button 
                onClick={(e) => { e.stopPropagation(); onClose(); }}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
              >
                <X size={20} />
              </button>
            ) : (
              <Maximize2 size={16} className="text-gray-600 group-hover:text-amber-400 opacity-0 group-hover:opacity-100 transition-all" />
            )}
          </motion.div>

          {/* CONTENT AREA */}
          <div className={clsx("relative z-10 flex-1 flex flex-col", isOpen ? "overflow-y-auto custom-scrollbar" : "overflow-hidden")}>
             <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div 
                    key="expanded"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: 0.1 }}
                    className="h-full"
                  >
                    {expandedContent}
                  </motion.div>
                ) : (
                  <motion.div 
                    key="compact"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full p-6 pt-0 flex flex-col justify-end"
                  >
                    {compactContent}
                  </motion.div>
                )}
             </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </>
  );
};
