function isEmptyObj(obj) {
  if (!obj && typeof obj !== 'object') return false

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (obj[key] instanceof Array && obj[key].length === 0) delete obj[key]
      typeof obj[key] === 'object' ? isEmptyObj(obj[key]) : obj[key] == '' ? delete obj[key] : undefined
    }
  }
  return obj
}

export default isEmptyObj
