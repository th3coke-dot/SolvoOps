type EditorialHeadingProps = {
  text: string
  accent: string
}

/** Compatibility wrapper: production uses one clean sans-serif display style. */
export function EditorialHeading({ text, accent: _accent }: EditorialHeadingProps) {
  return text
}
