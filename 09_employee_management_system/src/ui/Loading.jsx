import { Spinner } from "react-bootstrap";

const Loading = ({ fullPage = false }) => {
  return (
    <div
      className="d-flex justify-content-center align-items-center anim-fade-in"
      style={{ minHeight: fullPage ? "100vh" : "60vh" }}
    >
      <div className="text-center">
        <Spinner
          animation="border"
          style={{
            width: "48px",
            height: "48px",
            borderWidth: "4px",
            color: "var(--ems-primary)",
          }}
        />

        <div className="mt-3">
          <h6 className="mb-1 fw-bold">Loading</h6>
          <div className="text-muted" style={{ fontSize: "0.87rem" }}>
            Please wait<span className="loading-dots">...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
