import React from 'react';
import { CheckCircle, X } from 'lucide-react';

function NotificationBar({ notification }) {
  if (!notification.show) return null;
  
  return (
    <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-2xl transform transition-all duration-300 ${
      notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white font-semibold flex items-center gap-3`}>
      {notification.type === 'success' ? (
        <CheckCircle className="w-6 h-6" />
      ) : (
        <X className="w-6 h-6" />
      )}
      <span>{notification.message}</span>
    </div>
  );
}

export default NotificationBar;