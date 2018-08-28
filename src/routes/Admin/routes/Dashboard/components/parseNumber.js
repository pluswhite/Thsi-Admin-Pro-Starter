export const parseNumber = number => {
  let numberList = (number + '').split('.')
  let list = []
  numberList[0]
    .split('')
    .reverse()
    .map((item, idx) => {
      if (idx && idx % 3 === 0) {
        item += ','
      }
      list.push(item)
    })
  numberList[0] = list.reverse().join('')
  return numberList.join('.')
}
