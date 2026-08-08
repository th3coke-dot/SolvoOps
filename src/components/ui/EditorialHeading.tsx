type EditorialHeadingProps = {
  text: string
  accent: string
}

/** Applies the restrained two-tone accent used for key page statements. */
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
