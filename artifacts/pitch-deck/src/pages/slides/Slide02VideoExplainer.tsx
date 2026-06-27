export default function Slide02VideoExplainer() {
  const videoId = "IGF9dGaYeeA";
  return (
    <div className="relative w-screen h-screen overflow-hidden font-body" style={{ background: "#F2F8FB" }}>
      <div className="absolute top-0 left-0 bottom-0" style={{ width: "0.6vw", background: "#0077A8" }} />
      <div className="absolute flex flex-col items-center" style={{ top: "8vh", left: "5.5vw", right: "5vw", bottom: "6vh" }}>
        <div className="w-full flex flex-col items-start" style={{ marginBottom: "3.5vh" }}>
          <div className="font-body font-bold uppercase tracking-widest" style={{ color: "#0077A8", fontSize: "1.8vw", letterSpacing: "0.16em", marginBottom: "1.2vh" }}>See It in Action</div>
          <h2 className="font-display font-bold tracking-tight" style={{ color: "#0F2B3D", fontSize: "4.5vw", lineHeight: 1.1 }}>A Student. A Voice. An Exam.</h2>
        </div>
        {/* Clickable thumbnail — opens YouTube */}
        <a
          href={`https://youtu.be/${videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "block", position: "relative", width: "82vw", maxHeight: "62vh", aspectRatio: "16/9", borderRadius: "0.5vw", overflow: "hidden", boxShadow: "0 2vh 4vw rgba(0,61,87,0.18)", flexShrink: 0, cursor: "pointer" }}
        >
          <img
            src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
            alt="Enabelo Apps — Explainer Video"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          {/* Overlay */}
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.18)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: "7vw", height: "7vw", borderRadius: "50%", background: "rgba(220,0,0,0.92)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.4)" }}>
              <svg viewBox="0 0 24 24" fill="white" style={{ width: "38%", height: "38%", marginLeft: "12%" }}>
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </div>
          </div>
          <div style={{ position: "absolute", bottom: "3%", left: 0, right: 0, textAlign: "center" }}>
            <span className="font-body" style={{ background: "rgba(0,0,0,0.55)", color: "#ffffff", padding: "0.4vh 1.2vw", borderRadius: "0.3vw", fontSize: "1.5vw" }}>Click to play on YouTube</span>
          </div>
        </a>
      </div>
    </div>
  );
}
