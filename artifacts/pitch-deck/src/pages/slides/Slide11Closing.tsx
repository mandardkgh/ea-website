const base = import.meta.env.BASE_URL;

export default function Slide11Closing() {
  return (
    <div className="relative w-screen h-screen overflow-hidden font-body flex">
      {/* Left teal panel */}
      <div className="flex flex-col" style={{ width: "38vw", background: "#0077A8", padding: "4vh 4vw 3.5vh" }}>
        {/* EA logo — large, centered horizontally, upper section */}
        <div className="flex justify-center" style={{ paddingTop: "3vh", marginBottom: "5vh" }}>
          <img
            src={`${base}logo-enabelo.png`}
            crossOrigin="anonymous"
            alt="Enabelo Apps"
            style={{ height: "20vh", width: "auto", maxWidth: "88%", filter: "brightness(0) invert(1)", objectFit: "contain" }}
          />
        </div>
        {/* Contact info — reduced font to prevent overflow */}
        <div className="flex flex-col" style={{ gap: "2.5vh", flex: 1, justifyContent: "center" }}>
          <div>
            <div className="font-body font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.3vw", letterSpacing: "0.14em", marginBottom: "0.6vh" }}>Book a Conversation</div>
            <div className="font-body font-normal" style={{ color: "#ffffff", fontSize: "1.4vw", lineHeight: 1.4, wordBreak: "break-all" }}>calendly.com/mandar-zapurzaasystems</div>
          </div>
          <div style={{ height: "1px", background: "rgba(255,255,255,0.2)" }} />
          <div>
            <div className="font-body font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.3vw", letterSpacing: "0.14em", marginBottom: "0.6vh" }}>Email</div>
            <div className="font-body font-normal" style={{ color: "#ffffff", fontSize: "1.4vw", wordBreak: "break-all" }}>mandar@zapurzaasystems.com</div>
          </div>
          <div style={{ height: "1px", background: "rgba(255,255,255,0.2)" }} />
          <div>
            <div className="font-body font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.3vw", letterSpacing: "0.14em", marginBottom: "0.6vh" }}>Website</div>
            <div className="font-body font-normal" style={{ color: "#ffffff", fontSize: "1.4vw" }}>enabeloapps.com</div>
          </div>
        </div>
        <div className="font-body" style={{ color: "rgba(255,255,255,0.4)", fontSize: "1.3vw" }}>Zapurzaa Systems Pvt. Ltd. · Patent Pending</div>
      </div>

      {/* Right white panel */}
      <div className="flex flex-col justify-center" style={{ flex: 1, background: "#ffffff", padding: "6vh 5vw 6vh 6vw" }}>
        <div className="font-body font-bold uppercase tracking-widest" style={{ color: "#0077A8", fontSize: "1.7vw", letterSpacing: "0.16em", marginBottom: "3.5vh" }}>Ready to Partner</div>
        <h2 className="font-display font-black tracking-tight" style={{ color: "#0F2B3D", fontSize: "5.5vw", lineHeight: 1.05, textWrap: "balance", marginBottom: "4vh" }}>Let's Build an Inclusive Campus Together</h2>
        <div style={{ width: "6vw", height: "3px", background: "#0077A8", marginBottom: "4vh" }} />
        <p className="font-body font-normal" style={{ color: "#5B7A8C", fontSize: "2.3vw", lineHeight: 1.55 }}>Whether you are a trustee, administrator, disability officer, or policy maker — Enabelo Apps is ready to transform how your institution serves every student.</p>
      </div>
    </div>
  );
}
