type SectionHeadingProps = {
  eyebrow: string
  title: string
  description: string
}

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      <p className="text-sm font-medium uppercase tracking-[0.3em] text-emerald-400">{eyebrow}</p>
      <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">{title}</h2>
      <p className="mt-4 text-sm leading-7 text-zinc-400 sm:text-base">{description}</p>
    </div>
  )
}
