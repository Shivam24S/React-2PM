import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from "lucide-react";

const Toast = ({ toasts = [], onClose }) => {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((toast) => {
        let Icon = CheckCircle2;
        let iconColor = "var(--income)";

        if (toast.type === "error") {
          Icon = AlertCircle;
          iconColor = "var(--expense)";
        } else if (toast.type === "warning") {
          Icon = AlertTriangle;
          iconColor = "var(--warning)";
        } else if (toast.type === "info") {
          Icon = Info;
          iconColor = "var(--info)";
        }

        return (
          <div
            key={toast.id}
            className={`toast toast-${toast.type || "success"}`}
            role="status"
          >
            <Icon size={18} style={{ color: iconColor, flexShrink: 0 }} />
            <span style={{ flex: 1 }}>{toast.message}</span>
            <button
              type="button"
              className="btn-icon"
              style={{ width: 24, height: 24 }}
              onClick={() => onClose(toast.id)}
              aria-label="Dismiss notification"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Toast;
