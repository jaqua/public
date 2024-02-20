/**
 * Passing a value of minutes, it will return full hours and minutes.
 * @param value minutes
 * @returns Array with hours as first element, and minutes as second element
 */
export const splitDurationHour = (value: number) => {
  return [Math.floor(value / 60), value % 60]
}

export const getRandomItem = (array) => {
  return array[Math.floor(Math.random() * array.length)]
}

export const getRandom = (arr, n) => {
  const result = new Array(n)
  let len = arr.length
  const taken = new Array(len)
  if (n > len)
    throw new RangeError('getRandom: more elements taken than available')
  while (n--) {
    const x = Math.floor(Math.random() * len)
    result[n] = arr[x in taken ? taken[x] : x]
    taken[x] = --len in taken ? taken[len] : len
  }
  return result
}

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
export const shuffle = (a) => {
  if (a.length === 0) return []
  let j, x, i
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1))
    x = a[i]
    a[i] = a[j]
    a[j] = x
  }
  return a
}

export const sort = (arr: string[], mode?: 'desc' | 'asc') =>
  !mode || mode === 'asc'
    ? arr.sort((a, b) => a.localeCompare(b))
    : arr.sort((a, b) => b.localeCompare(a))

export const groupBy = (
  array: Array<Record<string, any>>,
  key: string
): Record<string, any> => {
  return array.reduce(
    (result: Record<string, any>, currentValue: Record<string, string>) => {
      ;(result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      )
      return result
    },
    {}
  )
}
