function GMTtoLocale (gmt) {
  if (gmt instanceof Date) {
    gmt = gmt.toISOString()
  }
  return gmt.slice(0, 10) + ' ' + gmt.slice(11, 19)
}

export {
  GMTtoLocale
}
