import { useState, useEffect } from "react";
import "./Toast.css";
import { FiCheck, FiX, FiAlert } from "react-icons/fi";

export const useToast = () => {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success", duration = 3000) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), duration);
  };

  return { toast, showToast };
};

const Toast = ({ message, type = "success" }) => {
  if (!message) return null;

  const icons = {
    success: <FiCheck size={18} />,
    error: <FiX size={18} />,
    info: <FiAlert size={18} />,
  };

  return (
    <div className={`toast toast-${type}`}>
      <span className="toast-icon">{icons[type]}</span>
      <span className="toast-message">{message}</span>
    </div>
  );
};

export default Toast;
