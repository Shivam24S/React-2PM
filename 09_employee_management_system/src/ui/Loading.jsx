
import { Spinner, Container } from "react-bootstrap";

const Loading = () => {
    return (
        <Container
            fluid
            className="d-flex justify-content-center align-items-center"
            style={{
                minHeight: "100vh",
                background: "#ffffff",
            }}
        >
            <div className="text-center">
                <Spinner
                    animation="border"
                    variant="primary"
                    style={{
                        width: "55px",
                        height: "55px",
                        borderWidth: "4px",
                    }}
                />

                <div className="mt-3">
                    <h5 className="mb-1">Loading</h5>

                    <div className="text-muted">
                        Please wait<span className="loading-dots">...</span>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Loading;