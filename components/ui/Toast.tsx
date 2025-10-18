
import React, { useEffect, useState } from 'react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onDismiss: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onDismiss }) => {
  const [isShowing, setIsShowing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShowing(false);
      setTimeout(onDismiss, 500); // Wait for fade-out animation
    }, 3000);

    return () => clearTimeout(timer);
  }, [onDismiss]);

  const Icon = type === 'success' ? CheckCircleIcon : XCircleIcon;
  const colors = type === 'success' 
    ? 'bg-green-500/80 border-green-600' 
    : 'bg-red-500/80 border-red-600';

  return (
    <div
      className={`fixed bottom-5 right-5 flex items-center p-4 text-white rounded-lg shadow-lg border backdrop-blur-sm ${colors} ${isShowing ? 'motion-safe:animate-toast-in' : 'motion-safe:animate-toast-out'}`}
    >
      <Icon className="w-6 h-6 mr-3" />
      <span>{message}</span>
    </div>
  );
};

export default Toast;
