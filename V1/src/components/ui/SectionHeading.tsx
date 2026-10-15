type SectionHeadingProps = {
  eyebrow: string;
  sans: string;
  serif: string;
  tone?: "dark" | "light";
  className?: string;
  as?: "h2" | "h3";
  id?: string;
};

/** Titular editorial: etiqueta + mezcla Sans / Serif cursiva. */
export default function SectionHeading({
  eyebrow,
  sans,
  serif,
  tone = "dark",
  className = "",
  as: Tag = "h2",
  id,
}: SectionHeadingProps) {
  const light = tone === "light";
  return (
    <div className={className}>
      <p
        className={`mb-6 flex items-center gap-3 text-[0.7rem] font-medium uppercase tracking-[0.28em] ${
          light ? "text-alabaster/60" : "text-warmstone"
        }`}
      >
        <span className="h-px w-8 bg-clay" />
        {eyebrow}
      </p>
      <Tag
        id={id}
        className={`text-balance text-[2.75rem] leading-[0.95] tracking-[-0.03em] sm:text-6xl lg:text-7xl ${
          light ? "text-alabaster" : "text-espresso"
        }`}
      >
        <span className="font-light">{sans} </span>
        <span className="font-serif text-[1.12em] font-normal italic tracking-[-0.01em] text-clay">{serif}</span>
      </Tag>
    </div>
  );
}
