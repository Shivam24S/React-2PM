import { Button, Col, Container, Row } from "react-bootstrap";
import { NavLink, useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  const status = error?.status;
  const isNotFound = status === 404;

  return (
    <Container fluid className="min-vh-100 d-flex align-items-center px-3">
      <Row className="w-100 justify-content-center text-center">
        <Col xs={12} md={8} lg={6}>
          <div className="app-card anim-fade-up">
            <div className="app-card-body state-block" style={{ padding: "3rem 2rem" }}>
              <div className="state-icon" style={{ width: 84, height: 84, fontSize: "2.2rem" }}>
                {isNotFound ? "?" : "!"}
              </div>

              <h1
                className="fw-bold mb-0"
                style={{
                  fontSize: "clamp(56px, 12vw, 96px)",
                  lineHeight: "1",
                  color: "var(--ems-primary)",
                  letterSpacing: "-0.04em",
                }}
              >
                {status || 404}
              </h1>

              <div
                style={{
                  width: "70px",
                  height: "4px",
                  background: "var(--ems-primary)",
                  margin: "18px auto 22px",
                  borderRadius: "10px",
                }}
              />

              <h5 className="fw-bold mb-2">
                {isNotFound ? "Page Not Found" : "Something went wrong"}
              </h5>

              <p>
                {isNotFound
                  ? "Sorry, the page you are looking for doesn't exist or may have been moved."
                  : error?.message || "An unexpected error occurred. Please try again."}
              </p>

              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <Button variant="primary" onClick={() => window.location.reload()}>
                  Try Again
                </Button>

                <NavLink to="/" className="text-decoration-none">
                  <Button variant="outline-secondary">Back to Home</Button>
                </NavLink>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Error;
