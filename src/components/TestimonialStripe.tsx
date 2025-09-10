export default function TestimonialStripe() {
  return (
    <section className="my-10">
      {/* Colorful stripe (replace src with your exported image from Figma) */}
      <div className="relative rounded-2xl overflow-hidden">
        <img
          src="/stripe-hero.png"
          alt="Largence stripe"
          className="w-full h-[220px] md:h-[260px] object-cover"
        />

        {/* Overlay card */}
        <div className="absolute inset-x-0 -bottom-8 md:bottom-6 flex justify-center px-4">
          <div className="w-full max-w-xl bg-black/90 text-white rounded-2xl shadow-xl p-5 md:p-6 border border-black/60">
            <p className="text-[15px] md:text-base leading-relaxed">
              “Largence helped me lock down a producer agreement in minutes.”
            </p>

            <div className="mt-4 flex items-center gap-3">
              <img
                src="/avatar.png"
                alt="User avatar"
                className="h-8 w-8 rounded-full object-cover border border-white/20"
              />
              <div className="text-sm">
                <div className="font-semibold">Figga Columbus</div>
                <div className="text-white/70">Indie Artist</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
