// src/utils/index.js (or your utils file)
const toCamelCase = str =>
  str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())

const transformKeys = obj => {
  if (obj === null || typeof obj !== 'object') return obj
  if (Array.isArray(obj)) return obj.map(transformKeys)

  const transformedObj = {}
  Object.keys(obj).forEach(key => {
    // Fixed: Use Object.keys and forEach instead of for..in
    const camelKey = toCamelCase(key)
    transformedObj[camelKey] = transformKeys(obj[key])
  })
  return transformedObj
}

export default transformKeys
