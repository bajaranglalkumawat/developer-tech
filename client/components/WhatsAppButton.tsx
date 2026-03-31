import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/919828920866", "_blank");
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="button-3d fixed bottom-6 right-6 z-40 flex items-center gap-3 rounded-full border border-white/20 bg-slate-950 px-5 py-4 text-white shadow-[0_22px_60px_rgba(15,23,42,0.3)] transition-all duration-300 hover:bg-green-500"
      style={{
        animation: "whatsappPulse 2s ease-in-out infinite",
      }}
      title="Chat with us on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="hidden text-sm font-semibold sm:inline">Chat Now</span>
    </button>
  );
}
