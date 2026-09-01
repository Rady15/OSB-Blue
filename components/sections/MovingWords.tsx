import { getT } from "@/lib/get-t";

const wordKeys = [
  "movingWords.word1",
  "movingWords.word2",
  "movingWords.word3",
  "movingWords.word4",
  "movingWords.word5",
  "movingWords.word6",
  "movingWords.word7",
  "movingWords.word8",
];

export function MovingWords() {
  const { t } = getT();
  const allWords = [...wordKeys, ...wordKeys, ...wordKeys].map((key) => t(key));
  return (
    <section className="overflow-hidden border-y border-white/5 bg-[#111] py-7 text-white">
      <div className="moving-word-track flex w-max gap-8 text-5xl font-extrabold opacity-90 md:text-7xl">
        {allWords.map((word, index) => (
          <span key={`${word}-${index}`} className="flex items-center gap-8">
            {word}
            <span className="h-3 w-3 rounded-full bg-white" />
          </span>
        ))}
      </div>
    </section>
  );
}
