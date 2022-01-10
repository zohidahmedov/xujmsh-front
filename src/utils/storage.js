export function getItem(key) {
  const value = localStorage.getItem(key)
  try {
    return JSON.parse(value)
  } catch (error) {
    return null
  }
  return value ? JSON.parse(value) : null
}
export function setItem(key, value) {
  return localStorage.setItem(key, JSON.stringify(value))
}
export function removeItem(key) {
  return localStorage.removeItem(key)
}
