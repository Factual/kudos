export const isPresent = (object) => {
  switch (typeof object) {
    case 'string':
      return object && object.trim() != '';
    default:
      throw `isPresent does not support objects of type ${typeof object}`
  }
}
