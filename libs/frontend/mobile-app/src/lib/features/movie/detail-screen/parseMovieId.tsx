export function parseMovieId(id: string | string[] | undefined) {
  if (!id) return 0

  if (Array.isArray(id)) return 0

  return parseInt(id, 10)
}
