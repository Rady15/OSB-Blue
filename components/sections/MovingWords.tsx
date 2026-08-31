const words = ["نحدّد", "نوجّه", "ننفّذ", "نخطط", "نتابع", "نطوّر", "نقيس", "ننمو"];

export function MovingWords() {
  return (
    <section className="overflow-hidden border-y border-white/5 bg-[#111] py-7 text-white">
      <div className="moving-word-track flex w-max gap-8 text-5xl font-extrabold opacity-90 md:text-7xl">
        {[...words, ...words, ...words].map((word, index) => (
          <span key={`${word}-${index}`} className="flex items-center gap-8">
            {word}
            <span className="h-3 w-3 rounded-full bg-white" />
          </span>
        ))}
      </div>
    </section>
  );
}
