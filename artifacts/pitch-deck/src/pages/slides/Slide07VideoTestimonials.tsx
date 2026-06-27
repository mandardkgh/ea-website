function VideoThumb({ videoId, label, isShort }: { videoId: string; label: string; isShort?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-[1.5vh]" style={{ flex: "0 0 auto" }}>
      <a
        href={`https://youtu.be/${videoId}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "block",
          position: "relative",
          height: "52vh",
          aspectRatio: isShort ? "9/16" : "16/9",
          borderRadius: "0.8vw",
          overflow: "hidden",
          boxShadow: "0 1.5vh 3vw rgba(0,61,87,0.14)",
          cursor: "pointer",
        }}
      >
        <img
          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
          alt={label}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        {/* Overlay */}
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.18)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: isShort ? "4vw" : "5vw", height: isShort ? "4vw" : "5vw", borderRadius: "50%", background: "rgba(220,0,0,0.92)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgba(0,0,0,0.4)" }}>
            <svg viewBox="0 0 24 24" fill="white" style={{ width: "38%", height: "38%", marginLeft: "12%" }}>
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: "4%", left: 0, right: 0, textAlign: "center" }}>
          <span className="font-body" style={{ background: "rgba(0,0,0,0.55)", color: "#ffffff", padding: "0.3vh 0.8vw", borderRadius: "0.3vw", fontSize: "1.4vw" }}>Click to play</span>
        </div>
      </a>
      <div className="font-body font-normal text-center" style={{ color: "#5B7A8C", fontSize: "1.9vw" }}>{label}</div>
    </div>
  );
}

export default function Slide07VideoTestimonials() {
  return (
    <div className="relative w-screen h-screen overflow-hidden font-body" style={{ background: "#ffffff" }}>
      <div className="absolute top-0 left-0 bottom-0" style={{ width: "0.6vw", background: "#0077A8" }} />
      <div className="absolute flex flex-col" style={{ top: "8vh", left: "5.5vw", right: "5vw", bottom: "6vh" }}>
        <div className="font-body font-bold uppercase tracking-widest" style={{ color: "#0077A8", fontSize: "1.8vw", letterSpacing: "0.16em", marginBottom: "1.2vh" }}>Hear It Directly</div>
        <h2 className="font-display font-bold" style={{ color: "#0F2B3D", fontSize: "4vw", lineHeight: 1.1, marginBottom: "1.5vh" }}>Student &amp; Educator Voices</h2>
        <div style={{ width: "5vw", height: "3px", background: "#0077A8", marginBottom: "3.5vh" }} />
        <div className="flex justify-center gap-[4vw]" style={{ flex: 1 }}>
          <VideoThumb videoId="XGLwIXgqcyQ" label="Student Experience" isShort />
          <VideoThumb videoId="v-5UDXx1nj8" label="Student Experience" isShort />
        </div>
      </div>
    </div>
  );
}
