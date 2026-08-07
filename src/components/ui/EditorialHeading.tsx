type EditorialHeadingProps = {
  text: string
  accent: string
}

/** Keeps page copy sourced from content while applying the homepage's serif accent. */
export function EditorialHeading({ text, accent }: EditorialHeadingProps) {
  const index = text.toLocaleLowerCase().indexOf(accent.toLocaleLowerCase())

  if (index < 0) return text

  const end = index + accent.length
  return (
    <>
      {text.slice(0, index)}
      <em>{text.slice(index, end)}</em>
      {text.slice(end)}
    </>
  )
}
