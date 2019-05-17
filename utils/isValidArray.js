function isValidArray( array ) {
  return typeof array !== undefined && array.length > -1 && array.length < Number.MAX_SAFE_INTEGER;
}

export default isValidArray;
