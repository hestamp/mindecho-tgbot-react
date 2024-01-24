export const renderContentWithLineBreaks = (content) => {
  const paragraphs = content.split('\n')

  // Remove empty paragraphs at the beginning and end
  while (paragraphs.length > 0 && paragraphs[0].trim() === '') {
    paragraphs.shift()
  }

  while (
    paragraphs.length > 0 &&
    paragraphs[paragraphs.length - 1].trim() === ''
  ) {
    paragraphs.pop()
  }

  return paragraphs.map((paragraph, i) => (
    <div key={i}>
      {paragraph}
      <br />
    </div>
  ))
}
