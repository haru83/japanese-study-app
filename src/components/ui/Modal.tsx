"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? "modal-title" : undefined}
          className="fixed inset-0 bg-black/50 flex items-end justify-center z-[100]"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
            className={clsx(
              "w-full max-w-md bg-paper-white rounded-t-[30px] border-t-4 border-x-4 border-black p-6 pb-[calc(env(safe-area-inset-bottom)+28px)]",
              className
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {title && (
              <h2 id="modal-title" className="text-xl font-black text-type-black text-center mb-4">
                {title}
              </h2>
            )}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
