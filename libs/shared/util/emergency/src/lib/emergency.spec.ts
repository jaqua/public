/**
 * @author        Dr. J. Quader
 * @copyright     © 2019-2024 by J. Quader
 */
import cases from 'jest-in-case'

import {
  calculateDosis,
  doses, // generateDosisString,
  // generateQuantityString,
  getRoundFactorWeight,
  getTubusData,
  getUnit,
  getWeightInKg,
  immediateCare,
  perfusors,
  roundDecimals,
  surfactantAmp // weightDisplay
} from './emergency'

const drugObj = {
  ampulleDosis: 500,
  ampulleMenge: 1,
  ampulleEinheit: 'mg'
}
const dosisObj = {
  dosis: 150,
  max: 3000,
  einheit: 'mg',
  proKg: false,
  perfusor: undefined
}
const perfusorObj = {
  dosis: 0.15,
  einheit: 'mg',
  perfusor: 'min'
}

test('doses array should be defined', () => {
  expect(Array.isArray(doses)).toBe(true)
})
test('immediateCare array should be defined', () => {
  expect(Array.isArray(immediateCare)).toBe(true)
})
test('perfusors array should be defined', () => {
  expect(Array.isArray(perfusors)).toBe(true)
})

// prettier-ignore
cases(
  'getRoundFactorWeight(value)',
  (opts) => {
    expect(getRoundFactorWeight(opts.value)).toBe(opts.result)
  },
  {
    '400 g': { value: 400, result: 1000 },
    '1000 g': { value: 1000, result: 100 },
    '3000 g': { value: 3000, result: 100 },
    '4999 g': { value: 4999, result: 100 },
    '5000 g': { value: 5000, result: 10 },
    '10000 g': { value: 10000, result: 10 },
    '0.4 kg': { value: 0.4, result: 1000 },
    '1 kg': { value: 1, result: 100 },
    '3 kg': { value: 3, result: 100 },
    '4.999 kg': { value: 4.999, result: 100 },
    '5 kg': { value: 5, result: 10 },
    '10 kg': { value: 10, result: 10 },
  }
)

// prettier-ignore
cases(
  'roundDecimals(value, decimals)',
  (opts) => {
    expect(roundDecimals(opts.value, opts.decimals)).toBe(opts.result)
  },
  {
    'no decimal up': { value: 34.5678, decimals: 0, result: 35 },
    'one decimal up': { value: 34.5678, decimals: 1, result: 34.6 },
    'two decimals up': { value: 34.5678, decimals: 2, result: 34.57 },
    'three decimals up': { value: 34.5678, decimals: 3, result: 34.568 },
    'no decimal down': { value: 54.3210, decimals: 0, result: 54 },
    'one decimal down': { value: 54.3210, decimals: 1, result: 54.3 },
    'two decimals down': { value: 54.3210, decimals: 2, result: 54.32 },
    'three decimals down': { value: 54.3210, decimals: 3, result: 54.321 },

  }
)

// prettier-ignore
cases(
  'getWeightInKg(value)',
  (opts) => {
    expect(getWeightInKg(opts.value)).toBe(opts.result)
  },
  {
    '400 g': { value: 400, result: 0.4 },
    '1000 g': { value: 1000, result: 1 },
    '1750 g': { value: 1750, result: 1.75 },
    '3000 g': { value: 3000, result: 3 },
    '10.000 g': { value: 10000, result: 10 },
    '15.000 g': { value: 15000, result: 15 },
    '50.000 g': { value: 50000, result: 50 },
    '100.000 g': { value: 100000, result: 100 },

    '0.75 kg': { value: 0.75, result: 0.75 },
    '1 kg': { value: 1, result: 1 },
    '10 kg': { value: 10, result: 10 },
    '12.5 kg': { value: 12.5, result: 12.5 },
    '30 kg': { value: 30, result: 30 },
    '50 kg': { value: 50, result: 50 },
    '100 kg': { value: 100, result: 100 },
    '150 kg': { value: 150, result: 150 },
    '200 kg': { value: 200, result: 200 },
  }
)

// prettier-ignore
// cases(
//   'getInfusionAmount(value)',
//   (opts) => {
//     expect(getInfusionAmount(opts.value)).toBe(opts.result)
//   },
//   {
//     '750 g': { value: 0.75, result: 12 },
//     '1000 g': { value: 1, result: 12 },
//     '1200 g': { value: 1.2, result: 24 },
//     '2900 g': { value: 2.9, result: 24 },
//     '3000 g': { value: 3, result: 24 },
//     '3100 g': { value: 3.1, result: 48 },
//     '5000 g': { value: 5, result: 48 },
//   }
// )

// prettier-ignore
cases(
  'calculateDosis(drug, dosis, weight)',
  (opts) => {
    expect(calculateDosis(opts.drug, opts.dosis, opts.weight, )).toBe(opts.result)
  },
  {
    'is perfusor per minute, drug and ampulle in mg': {
      drug: { ...drugObj, ampulleDosis: 100 },
      dosis: { ...perfusorObj },
      weight: 2300,
      result: 4.97 
    },
    'is perfusor per hour, drug and ampulle in mg': {
      drug: { ...drugObj, ampulleDosis: 100 },
      dosis: { ...perfusorObj, perfusor: 'hour' },
      weight: 2300,
      result: 0.08 
    },
    'is perfusor per min, drug in µg, ampulle in mg': {
      drug: { ...drugObj, ampulleDosis: 1 },
      dosis: { ...perfusorObj, einheit: 'µg' },
      weight: 2300,
      result: 0.5 
    },
    'is not perfusor, not max dosis / ampulle, no dilution': {
      drug: { ...drugObj },
      dosis: { ...dosisObj, max: undefined },
      weight: 2300,
      result: 0.69
    },
    'is not perfusor, max dosis, no dilution': {
      drug: { ...drugObj },
      dosis: { ...dosisObj, max: 200 },
      weight: 2300,
      result: 0.4
    },
    'is not perfusor, max ampulle, no dilution': {
      drug: { ...drugObj, ampulleDosis: 200 },
      dosis: { ...dosisObj, max: undefined },
      weight: 2300,
      result: 1
    },
    'is not perfusor, not max dosis / ampulle, dilution': {
      drug: { ...drugObj },
      dosis: { ...dosisObj, max: undefined, verduennung: 10 },
      weight: 2300,
      result: 6.9
    },
  }
)

describe('getCalculatedDosis()', () => {
  doses.forEach((data) => {
    test('should return dosis for ' + data.wirkstoff, () => {
      data.doses.forEach((dosis) => {
        if (dosis.test) {
          // eslint-disable-next-line @typescript-eslint/no-extra-semi
          ;[0.5, 0.75, 1.3, 12.5, 30, 50, 100].forEach((weight, i) => {
            const calculatedDosis = calculateDosis(
              'notfallmedikamente',
              weight,
              dosis
            )
            expect(calculatedDosis).toBe(dosis.test[i])
          })
        }
      })
    })
  })
})

// prettier-ignore
cases(
  'getUnit(weight, data)',
  (opts) => {
    expect(getUnit(opts.weight, opts.data)).toBe(opts.result)
  },
  {
    'perfusor per kg': { 
      weight: 10,
      data:  { ...dosisObj, proKg: true, perfusor: true },
      result: 'ml/h'
    },
    'perfusor without weight': { 
      weight: undefined,
      data:  { ...dosisObj, perfusor: true },
      result: 'ml/h'
    },
    'non perfusor per kg': { 
      weight: 10,
      data:  { ...dosisObj, proKg: true },
      result: 'mg'
    },
    'non perfusor without weight': { 
      weight: undefined,
      data:  { ...dosisObj },
      result: 'mg'
    },
  }
)

// prettier-ignore
cases(
  'surfactantAmp(weight)',
  (opts) => {
    expect(surfactantAmp(opts.value, true)).toBe(opts.result)
  },
  {
    '400 g': { weight: 0.4, result: 1 },
    '500 g': { value: 0.5, result: 1 },
    '600 g': { value: 0.6, result: 1 },
    '700 g': { value: 0.7, result: 1 },
    '800 g': { value: 0.8, result: 1 },
    '900 g': { value: 0.9, result: 1 },
    '1000 g': { value: 1, result: 2 },
    '1100 g': { value: 1.1, result: 2 },
    '1200 g': { value: 1.2, result: 2 },
    '1300 g': { value: 1.3, result: 2 },
    '1400 g': { value: 1.4, result: 2 },
    '1500 g': { value: 1.5, result: 2 },
    '1600 g': { value: 1.6, result: 2 },
    '1700 g': { value: 1.7, result: 3 },
    '1800 g': { value: 1.8, result: 3 },
    '1900 g': { value: 1.9, result: 3 },
    '2000 g': { value: 2, result: 3 },
    '2100 g': { value: 2.1, result: 3 },
    '2200 g': { value: 2.2, result: 3 },
    '2300 g': { value: 2.3, result: 3 },
    '2400 g': { value: 2.4, result: 4 },
    '2500 g': { value: 2.5, result: 4 },
    '2600 g': { value: 2.6, result: 4 },
    '2700 g': { value: 2.7, result: 4 },
    '2800 g': { value: 2.8, result: 4 },
    '2900 g': { value: 2.9, result: 4 },
    '3000 g': { value: 3, result: 5 },
  }
)

// prettier-ignore
// cases(
//   'generateDosisString(weight, data, name)',
//   (opts) => {
//     expect(generateDosisString(opts.weight, opts.data, opts.name)).toBe(opts.result)
//   },
//   {
//     'No weight': {
//       weight: undefined,
//       data:  { ...dosisObj, dosis: 123 },
//       name: 'drugname',
//       result: 123
//     },
//     'Non perfusor': {
//       weight: 10,
//       data:  { ...dosisObj, proKg: true, einheit: 'mg' },
//       name: 'drugname',
//       result: 1500
//     },
//     'Perfusor, weight 750 g': {
//       weight: 0.75,
//       data:  { ...dosisObj, perfusor: true },
//       name: 'drugname',
//       result: 0.5
//     },
//     'Perfusor, weight 2 kg': {
//       weight: 2,
//       data:  { ...dosisObj, perfusor: true },
//       name: 'drugname',
//       result: 1
//     },
//     'Perfusor, weight 5 kg': {
//       weight: 5,
//       data:  { ...dosisObj, perfusor: true },
//       name: 'drugname',
//       result: 2
//     },
//     'Minprog, weight 2 kg': {
//       weight: 2.45,
//       data:  { ...dosisObj, perfusor: true },
//       name: 'Minprog',
//       result: 0.74
//     },
//     'Milrinon, weight 2 kg': {
//       weight: 2.45,
//       data:  { ...dosisObj, perfusor: true },
//       name: 'Milrinon',
//       result: 0.37
//     },
//   }
// )

// prettier-ignore
cases(
  'getTubusData(value)',
  (opts) => {
    expect(getTubusData(opts.value)).toStrictEqual(opts.result)
  },
  {
    '750 g': { value: 750, result: { weight: 0.75, size: 2.5, oral: 6, nasal: 7.5 } },
    '1000 g': { value: 1, result: { weight: 1, size: 2.5, oral: 7.5, nasal: 8 } },
    '3000 g': { value: 3, result: { weight: 3, size: 3.0, oral: 9, nasal: 11, defi: 12 } },
    '5000 g': { value: 5, result: { weight: 5, size: 3.5, oral: 11, nasal: 12, defi: 20 } },
  }
)
