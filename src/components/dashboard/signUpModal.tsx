
export default function Modal({ isOpen, onClose, onSignUp }) {
    if (!isOpen) return null;
  
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "relative",
            padding: "20px",
            backgroundColor: "#fff",
            borderRadius: "10px",
            width: "300px",
            textAlign: "center",
          }}
        >
          <h2>Please consider creating an account for a better experience!</h2>
          <button
            onClick={onSignUp}
            style={{ margin: "10px", padding: "5px 20px" }}
          >
            Sign Up
          </button>
          <button
            onClick={onClose}
            style={{ position: "absolute", top: "10px", right: "10px" }}
          >
            Close Window
          </button>
        </div>
      </div>
    );
  }