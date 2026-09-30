function Loading() {
    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f8f9fa",
            }}
        >
            <div
                style={{
                    textAlign: "center",
                    padding: "40px",
                    backgroundColor: "#fff",
                    borderRadius: "16px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                }}
            >
                {/* Spinner */}
                <div
                    style={{
                        width: "50px",
                        height: "50px",
                        margin: "0 auto 20px",
                        border: "5px solid #e9ecef",
                        borderTop: "5px solid #0d6efd",
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite",
                    }}
                />

                <h3
                    style={{
                        margin: "0 0 8px",
                        color: "#212529",
                        fontSize: "20px",
                    }}
                >
                    Loading...
                </h3>

                <p
                    style={{
                        margin: 0,
                        color: "#6c757d",
                        fontSize: "14px",
                    }}
                >
                    Please wait while we load your data.
                </p>
            </div>

            {/* Animation */}
            <style>
                {`
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}
            </style>
        </div>
    );
}

export default Loading;