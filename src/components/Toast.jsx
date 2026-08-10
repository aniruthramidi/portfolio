import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';
import './Toast.css';

const Toast = ({ message, type = 'success', onClose }) => {
  if (!message) return null;

  const icons = {
    success: <CheckCircle2 size={18} className="toast-icon success" />,
    info: <Info size={18} className="toast-icon info" />,
    error: <AlertCircle size={18} className="toast-icon error" />,
  };

  return (
    <AnimatePresence>
      <motion.div
        className="toast-container"
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        <div className={`toast-content toast-${type}`}>
          {icons[type] || icons.info}
          <span className="toast-message">{message}</span>
          {onClose && (
            <button
              onClick={onClose}
              style={{ background: 'transparent', border: 'none', color: 'inherit', cursor: 'pointer', marginLeft: 8 }}
            >
              <X size={14} />
            </button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Toast;
