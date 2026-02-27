import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/919828920866", "_blank");
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-8 right-8 z-40 p-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 button-3d"
      style={{
        animation: "whatsappPulse 2s ease-in-out infinite",
      }}
      title="Chat with us on WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </button>
  );
}
