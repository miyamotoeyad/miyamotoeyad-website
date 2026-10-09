const WORDS_PER_MINUTE = 180; // conservative for Arabic

export function readingTime(markdown = ''): number {
  const text = markdown.replace(/```[\s\S]*?```/g, ' ').replace(/[#>*_`\[\]()!-]/g, ' ');
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}
