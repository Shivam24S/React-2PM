
import { Container, Row, Col, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Error = () => {
    return (
        <Container fluid className="min-vh-100 d-flex align-items-center">
            <Row className="w-100 justify-content-center text-center">
                <Col xs={12} md={8} lg={6}>

                    <div className="mb-4">
                        <h1
                            className="fw-bold text-danger"
                            style={{ fontSize: "100px", lineHeight: "1" }}
                        >
                            404
                        </h1>

                        <div
                            style={{
                                width: "80px",
                                height: "4px",
                                backgroundColor: "#dc3545",
                                margin: "20px auto",
                                borderRadius: "10px",
                            }}
                        />
                    </div>

                    <h2 className="fw-bold mb-3">
                        Page Not Found
                    </h2>

                    <p className="text-secondary mb-4">
                        Sorry, the page you are looking for doesn't exist or may have
                        been moved to another location.
                    </p>

                    <div className="d-flex justify-content-center gap-3 flex-wrap">

                        <Button
                            variant="danger"
                            onClick={() => window.location.reload()}
                        >
                            Try Again
                        </Button>

                        <NavLink to="/" className="text-decoration-none">
                            <Button variant="outline-dark">
                                ← Back to Home
                            </Button>
                        </NavLink>

                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Error;