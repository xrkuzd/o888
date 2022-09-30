export const addressFormatter = (str: any, n: number) => {
  if (typeof str === typeof '') {
    return `${str.slice(0, n)}...${str.slice(str.length - n)}`
  }
  return 'loading...'
}
