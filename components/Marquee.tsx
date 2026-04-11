"use client";

const items = [
  "React & Next.js",
  "Python",
  "TypeScript",
  "LangChain & RAG",
  "TensorFlow",
  "Node.js",
  "AWS",
  "Docker",
  "SQL",
  "Java (DSA)",
];

export function Marquee() {
  return (
    <div
      className="w-full bg-crust py-7 overflow-hidden group"
      style={{
        borderTop: "1px solid rgba(205, 214, 244, 0.06)",
        borderBottom: "1px solid rgba(205, 214, 244, 0.06)",
      }}
    >
      <div
        className="flex whitespace-nowrap group-hover:[animation-play-state:paused]"
        style={{ animation: "marquee 30s linear infinite" }}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="font-display text-[28px] font-light italic text-surface2 hover:text-peach transition-colors duration-250 mx-6 shrink-0"
          >
            {item} <span className="text-surface1 mx-2">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
