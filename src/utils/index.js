export function clearObject(object) {
  if (!object) return object
  Object.keys(object).forEach(key => {
    object[key] = null
  })
  return object
}
