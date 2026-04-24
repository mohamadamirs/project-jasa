/**
 * Spintax utility for rotating words to increase content originality.
 * Usage: spin("{Terbaik|Profesional|Terpercaya} Layanan Kami")
 */
export function spin(text: string): string {
  return text.replace(/\{([^{}]+)\}/g, (match, options) => {
    const choices = options.split('|');
    return choices[Math.floor(Math.random() * choices.length)];
  });
}

/**
 * Deterministic spin based on a seed (e.g., cityName) 
 * so the same city always gets the same word until build.
 */
export function seededSpin(text: string, seed: string): string {
  return text.replace(/\{([^{}]+)\}/g, (match, options) => {
    const choices = options.split('|');
    // Simple hash for the seed
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = ((hash << 5) - hash) + seed.charCodeAt(i);
      hash |= 0; 
    }
    const index = Math.abs(hash) % choices.length;
    return choices[index];
  });
}
