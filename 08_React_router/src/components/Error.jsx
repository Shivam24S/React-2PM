function ErrorPage() {
    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f8f9fa",
                padding: "20px",
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: "450px",
                    padding: "40px 30px",
                    textAlign: "center",
                    backgroundColor: "#ffffff",
                    borderRadius: "16px",
                    boxShadow: "0 10px 35px rgba(0, 0, 0, 0.08)",
                }}
            >
                <div
                    style={{
                        width: "70px",
                        height: "70px",
                        margin: "0 auto 20px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "50%",
                        backgroundColor: "#dc3545",
                        color: "#ffffff",
                        fontSize: "40px",
                        fontWeight: "bold",
                    }}
                >
                    !
                </div>

                <h1
                    style={{
                        margin: "0 0 5px",
                        fontSize: "42px",
                        color: "#dc3545",
                    }}
                >
                    Oops!
                </h1>

                <h2
                    style={{
                        margin: "0 0 12px",
                        fontSize: "22px",
                        color: "#222",
                    }}
                >
                    Something went wrong
                </h2>

                <p
                    style={{
                        margin: "0 0 25px",
                        color: "#777",
                        fontSize: "15px",
                        lineHeight: "1.6",
                    }}
                >
                    We couldn't process your request. Please try again later.
                </p>

                <button
                    style={{
                        width: "100%",
                        padding: "12px 20px",
                        border: "none",
                        borderRadius: "7px",
                        backgroundColor: "#dc3545",
                        color: "#ffffff",
                        fontSize: "15px",
                        fontWeight: "600",
                        cursor: "pointer",
                    }}
                >
                    Try Again
                </button>

                <button
                    style={{
                        width: "100%",
                        marginTop: "10px",
                        padding: "12px 20px",
                        border: "1px solid #ddd",
                        borderRadius: "7px",
                        backgroundColor: "#ffffff",
                        color: "#555",
                        fontSize: "15px",
                        fontWeight: "600",
                        cursor: "pointer",
                    }}
                >
                    Go Back
                </button>
            </div>
        </div>
    );
}

export default ErrorPage;