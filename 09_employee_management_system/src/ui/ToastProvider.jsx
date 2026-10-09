import { useCallback, useMemo, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { ToastContext } from "./ToastContext";

const STYLES = {
  success: { accent: "#10b981", icon: "✓" },
  error: { accent: "#ef4444", icon: "✕" },
  info: { accent: "#0ea5e9", icon: "i" },
  warning: { accent: "#f59e0b", icon: "!" },
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message, type = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    return id;
  }, []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}

      <ToastContainer position="top-end" className="toast-container p-3">
        {toasts.map((t) => {
          const style = STYLES[t.type] || STYLES.info;

          return (
            <Toast
              key={t.id}
              className="app-toast position-relative"
              onClose={() => removeToast(t.id)}
              delay={3000}
              autohide
            >
              <span className="toast-accent" style={{ background: style.accent }} />
              <Toast.Body>
                <span
                  className="rounded-circle text-white"
                  style={{
                    width: 22,
                    height: 22,
                    fontSize: "0.75rem",
                    background: style.accent,
                    display: "grid",
                    placeItems: "center",
                    flex: "0 0 auto",
                  }}
                >
                  {style.icon}
                </span>
                <span>{t.message}</span>
              </Toast.Body>
            </Toast>
          );
        })}
      </ToastContainer>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
