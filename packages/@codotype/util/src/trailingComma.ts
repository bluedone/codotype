
// trailingComma
// Helper function to conditionally add a trailing comma
// while iterating over an array in a generator template
// Auto-injected into the EJS runtime
export default (arr: any[], index: number): string => {
  if (!arr.length || ((arr.length - 1) === index)) return ''
  return ','
}
