export default function Hero() {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/919828920866", "_blank");
  };

  return (
    <section
      id="home"
      className="relative min-h-screen pt-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-950 via-blue-950 to-cyan-950"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center">
        {/* Main heading with fade-in animation */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 animate-fade-in leading-tight text-3d uppercase tracking-tight">
          We Build{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Modern & Scalable
          </span>{" "}
          Web Applications
        </h1>

        {/* Subtext with tech stack */}
        <p className="text-xl sm:text-2xl mb-4 animate-slide-up">
          <span className="inline-block px-4 py-2 rounded-full bg-blue-500/20 text-blue-300 font-semibold mr-2 border border-blue-400/50">
            React
          </span>
          <span className="inline-block px-4 py-2 rounded-full bg-green-500/20 text-green-300 font-semibold mr-2 border border-green-400/50">
            Node.js
          </span>
          <span className="inline-block px-4 py-2 rounded-full bg-purple-500/20 text-purple-300 font-semibold border border-purple-400/50">
            MongoDB
          </span>
        </p>

        {/* Description */}
        <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto animate-slide-up animation-delay-1000">
          Building fast, secure, and scalable web applications that help
          businesses grow online. We specialize in responsive, user-friendly
          designs powered by modern technologies.
        </p>

        {/* CTA Button */}
        <button
          onClick={handleWhatsAppClick}
          className="button-3d inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg animate-slide-up animation-delay-2000"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-3.055 2.2-3.71 6.175-1.467 9.254 2.243 3.079 6.175 3.734 9.254 1.491 3.079-2.243 3.733-6.175 1.49-9.254a9.87 9.87 0 00-4.242-2.869zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z" />
          </svg>
          Contact on WhatsApp
        </button>
      </div>
    </section>
  );
}
