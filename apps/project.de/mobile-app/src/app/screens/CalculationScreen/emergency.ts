/**
 * @fileoverview  Calculation and data (tubus, doses)
 * @author        Dr. J. Quader
 * @copyright     © 2019-2024 by J. Quader
 *
 * @requires      @jaqua/shared/util/formatting
 */


export const round = (num: any, decimalPlaces = 0) => {
    const p = Math.pow(10, decimalPlaces)
    const n = num * p * (1 + Number.EPSILON)
    return Math.round(n) / p
  }
  

export type TubusData = {
  weight: number
  size: number
  oral: number
  nasal?: number
  defi?: number
}

export type DosisData = {
  indikation: string
  dosis: number
  max?: number
  einheit: string
  verduennung?: number
  loesungsmittel?: string
  proKg: boolean
  verabreichung: string
  test?: Array<number>
  aufzug?: number
  perfusor?: string
}

export type Dosis = {
  wirkstoff: string
  ampulleDosis: number
  ampulleEinheit: string
  ampulleMenge: number
  limit?: number
  doses: DosisData[]
}

export type DosisResult = {
  wirkstoff: string
  konzentration: string
  warning?: boolean
  dosis: string
  dosisPerKg: string
  quantity: string
}

/**
 * Calculate dosis and quantity.
 * @param type
 * @param weightInKg
 * @param data drug dataset
 * @returns Object to be used in table panel component
 */
export const calculateDosis = (
  type: string,
  weightInKg: number,
  data: IDrug
): DosisResult | null => {
  const {
    wirkstoff,
    ampulleDosis,
    ampulleMenge,
    ampulleEinheit,
    warning = false,
    doses
  } = data ?? {}
  if (doses == null) return null
  const { dosis, max, einheit, perfusor } = doses[0] ?? {}
  if (!einheit) throw new Error('Missing dosis unit')
  if (!dosis) throw new Error('Missing dosis value')
  const d = doses[0]
  if (!d) throw new Error('Missing dosis value')

  const faktor = ampulleEinheit === 'mg' && einheit === 'µg' ? 1000 : 1
  const unit = faktor === 1000 ? 'mg' : einheit

  let dosisCalculated = 0
  switch (type) {
    case 'perfusoren':
      dosisCalculated =
        (dosis * weightInKg * (perfusor === 'min' ? 60 : 1) * 50) / faktor
      break
    case 'notfallmedikamente':
      dosisCalculated =
        max && dosis * weightInKg > max ? max : dosis * weightInKg
      break
    case 'erstversorgung':
      dosisCalculated = dosis * weightInKg
      break
  }

  const quantityCalculated = dosisCalculated * (ampulleMenge / ampulleDosis)
  const rate =
    quantityCalculated < 50
      ? 1
      : dosisCalculated
      ? dosisCalculated / 50 / (ampulleDosis / ampulleMenge)
      : 0 // if dosisCalculated is missing

  return {
    wirkstoff,
    konzentration: [ampulleDosis, ampulleEinheit, '/', ampulleMenge, 'ml']
      .join(' ')
      .replace('.', ','),
    warning,
    dosis:
      wirkstoff === 'Surfactant'
        ? '150-200 mg/kg i.t.'
        : type === 'perfusoren' && quantityCalculated >= 50
        ? ''
        : generateDosisString(dosisCalculated, weightInKg, d, unit),
    dosisPerKg:
      wirkstoff === 'Surfactant'
        ? ''
        : (type === 'perfusoren'
            ? roundDecimals(rate, 2, true) + ' ml/h'
            : '') +
          ' (= ' +
          dosis.toString().replace('.', ',') +
          ' ' +
          einheit +
          (type === 'perfusoren' ? '/kg/' + perfusor : '/kg') +
          ')',
    quantity:
      wirkstoff === 'Surfactant'
        ? (surfactantAmp(weightInKg) as string)
        : generateQuantityString(quantityCalculated, d)
  }
}

/**
 * Calculate round factor depending on input weight value.
 * We need precise calculated dosis values for preterm neonates with weight < 1000 g.
 * Babies with weight < 5 kg need calculated dosis values with two decimals precision.
 * @param weightInKg {number} Weight in kg
 * @returns {number} round factor, which can be used for rounding
 */
export const getRoundFactorWeight = (weightInKg: number): number | null => {
  if (!weightInKg) return null
  return weightInKg < 1 ? 1000 : weightInKg < 5 ? 100 : 10
}

/**
 * Round value to given decimals.
 * @param value {number}
 * @param decimals {number}
 * @returns {number}
 */
export const roundDecimals = (
  value: number,
  decimals?: number,
  outputAsString?: boolean
): number | string | null => {
  if (decimals == null) return null
  const roundFactor =
    decimals >= 10
      ? decimals
      : decimals
      ? Math.pow(10, decimals)
      : value < 10
      ? 10
      : 1
  const result = Math.round(value * roundFactor) / roundFactor
  return outputAsString ? result.toString().replace('.', ',') : result
}

/**
 * Calculate kg value
 * @param weight {number}
 * @returns {number} weight value in kg
 */
export const getWeightInKg = (weight: number): number => {
  if (!weight) return 0
  return weight > 200 ? weight / 1000 : weight
}

/**
 * Weight string for table heading
 * @param weightInKg
 * @returns {string}
 */
export const weightDisplay = (weightInKg: number): string => {
  if (!weightInKg) return ''
  const weight = weightInKg < 1 ? weightInKg * 1000 : weightInKg
  const unit = weightInKg < 1 ? ' g' : ' kg'
  return ' ' + ['(', weight, unit, ')'].join('')
}

/**
 * Generate dosis string
 * @param value calculated dosis
 * @param weightInKg
 * @param data Dosis dataset
 * @param unit calculated unit
 * @returns {string}
 */
export const generateDosisString = (
  value: number,
  weightInKg: number,
  data: IDosis,
  unit: string
): string => {
  const { dosis, verabreichung, perfusor } = data

  if (!value)
    return [
      dosis.toString().replace('.', ','),
      getUnit(weightInKg, data),
      !perfusor ? verabreichung : ''
    ].join(' ')

  const roundFactor =
    data.dosis <= 0.01 ? 1000 : getRoundFactorWeight(weightInKg)
  const dosisCalculated =
    weightInKg && roundFactor ? roundDecimals(value, roundFactor, true) : dosis

  return [dosisCalculated, unit, !perfusor ? verabreichung : ''].join(' ')
}

/**
 * Generate quantity string
 * @param value quantity value in ml
 * @param data Dosis dataset
 * @returns {string}
 */
export const generateQuantityString = (value: number, data: IDosis): string => {
  if (!value) return ''

  const { loesungsmittel, perfusor, verduennung, ki } = data

  const factor =
    verduennung === 1
      ? 2
      : verduennung === -1
      ? 1
      : verduennung || (value < 0.1 && !perfusor)
      ? verduennung || 10
      : 1
  const quantityValue = roundDecimals(value * factor, 2, false) as number
  const quantityString = [quantityValue.toString().replace('.', ','), 'ml']

  if (perfusor) {
    if (quantityValue >= 50) return 'pur aufziehen'
    return [
      '(= ',
      quantityValue.toString(),
      ' ml',
      ')',
      ' ad 50 ml NaCl 0,9%'
    ].join('')
  }

  if (verduennung !== -1 && (factor > 1 || verduennung))
    quantityString.push(
      'einer 1:' + (factor === 2 ? 1 : factor),
      'Verdünnung mit',
      loesungsmittel || 'NaCl 0,9%'
    )
  if (ki)
    quantityString.push('als KI verlängert mit', loesungsmittel || 'NaCl 0,9%')
  return quantityString.join(' ')
}

/**
 * Get matching unit
 * @param weight {number}
 * @param data {object}
 * @returns {string}
 */
export const getUnit = (weight: number, data: DosisData): string => {
  const { einheit, proKg, perfusor } = data
  return weight || !proKg
    ? perfusor
      ? 'ml/h'
      : einheit
    : perfusor
    ? einheit + '/kg/' + perfusor
    : einheit + '/kg'
}

export const surfactantAmp = (
  weight: number,
  returnNumber = false
): string | number => {
  const count = Math.floor((weight * 200) / 120)
  const mgPerKg = (count * 120) / weight
  const result = mgPerKg < 150 ? count + 1 : count

  if (returnNumber) return result
  return (
    'z.B. ' +
    result +
    ' Ampulle' +
    (result > 1 ? 'n' : '') +
    ' (= ' +
    round((result * 120) / weight) +
    ' mg/kg)'
  )
}

export const getTubusData = (value: number): TubusData | null => {
  const w = getWeightInKg(value)
  const result = [
    { weight: 0.3, size: 2.0, oral: 5.2, nasal: 6.7 },
    { weight: 0.5, size: 2.0, oral: 5.5, nasal: 7 },
    { weight: 0.75, size: 2.5, oral: 6, nasal: 7.6 },
    { weight: 1, size: 2.5, oral: 7.5, nasal: 8.2 },
    { weight: 1.25, size: 2.5, oral: 8, nasal: 8.6 },
    { weight: 1.5, size: 2.5, oral: 8, nasal: 9 },
    { weight: 1.75, size: 2.5, oral: 8, nasal: 9.3 },
    { weight: 2, size: 3.0, oral: 8.5, nasal: 10 },
    { weight: 3, size: 3.0, oral: 9, nasal: 11, defi: 12 },
    { weight: 3.5, size: 3.0, oral: 9.5, nasal: 11, defi: 14 },
    { weight: 4, size: 3.5, oral: 10, nasal: 11.5, defi: 16 },
    { weight: 4.5, size: 3.5, oral: 10.5, nasal: 12, defi: 18 },
    { weight: 5, size: 3.5, oral: 11, nasal: 12, defi: 20 },
    { weight: 6, size: 3.5, oral: 11, nasal: 12, defi: 24 },
    { weight: 7, size: 3.5, oral: 11.5, nasal: 12.5, defi: 28 },
    { weight: 8, size: 3.5, oral: 12, nasal: 13, defi: 32 },
    { weight: 9, size: 3.5, oral: 13, nasal: 14, defi: 36 },
    { weight: 10, size: 4.0, oral: 13, nasal: 15.5, defi: 40 },
    { weight: 15, size: 4.5, oral: 14, nasal: 16.5, defi: 60 },
    { weight: 20, size: 5.0, oral: 16, nasal: 18, defi: 80 },
    { weight: 25, size: 5.5, oral: 17, nasal: 19, defi: 100 },
    { weight: 30, size: 6.0, oral: 18, nasal: 20, defi: 120 },
    { weight: 40, size: 7.0, oral: 21, defi: 160 },
    { weight: 50, size: 8.0, oral: 22, defi: 200 }
  ]
    .reverse()
    .find(({ weight }) => weight <= (w < 0.3 ? 0.3 : w))

  return result ?? null
}

export interface IDosis {
  indikation: string
  dosis: number
  einheit: string
  proKg: boolean
  perfusor?: string
  loesungsmittel?: string
  verabreichung: string
  max?: number
  verduennung?: number
  ki?: boolean
}
export interface IDrug {
  wirkstoff: string
  ampulleMenge: number
  ampulleEinheit: string
  ampulleDosis: number
  warning?: boolean
  doses?: IDosis[]
}

export const doses = [
  {
    wirkstoff: 'Adrenalin',
    ampulleMenge: 1,
    ampulleEinheit: 'mg',
    ampulleDosis: 1,
    doses: [
      {
        indikation: 'Reanimation',
        dosis: 0.01,
        einheit: 'mg',
        proKg: true,
        max: 1,
        verduennung: 10,
        verabreichung: 'i.v. Bolus',
        test: [0.005, 0.008, 0.01, 0.1, 0.3, 0.5, 1]
      }
    ]
  },
  {
    wirkstoff: 'Atropin',
    ampulleDosis: 0.5,
    ampulleEinheit: 'mg',
    ampulleMenge: 1,
    doses: [
      {
        indikation: 'Bradykardie',
        dosis: 0.02,
        max: 0.5,
        einheit: 'mg',
        verduennung: 5,
        proKg: true,
        verabreichung: 'i.v.',
        test: [0.005, 0.008, 0.01, 0.1, 0.3, 0.5, 0.5]
      }
    ]
  },
  {
    wirkstoff: 'Amiodaron',
    // Bei Reanimation über 3 Min als Bolus, sonst in z.B. 20 ml Glukose 5 % verdünnen
    ampulleDosis: 150,
    ampulleEinheit: 'mg',
    ampulleMenge: 3,
    doses: [
      {
        indikation: 'Reanimation',
        dosis: 5,
        max: 300,
        einheit: 'mg',
        proKg: true,
        verabreichung: 'i.v.',
        loesungsmittel: 'Glukose 5%',
        test: [2.5, 3.75, 6.5, 62.5, 150, 150, 150]
      }
    ]
  },
  {
    wirkstoff: 'Adenosin',
    ampulleDosis: 6,
    ampulleEinheit: 'mg',
    ampulleMenge: 2,
    doses: [
      {
        indikation: 'SVT',
        dosis: 0.1,
        max: 6,
        einheit: 'mg',
        proKg: true,
        verabreichung: 'i.v.',
        test: [0.05, 0.075, 0.13, 1.3, 3, 5, 6]
      }
    ]
  },
  {
    wirkstoff: 'Midazolam',
    ampulleDosis: 15,
    ampulleEinheit: 'mg',
    ampulleMenge: 3,
    warning: true,
    doses: [
      {
        indikation: 'Krampfanfall',
        dosis: 0.1,
        max: 5,
        einheit: 'mg',
        proKg: true,
        verabreichung: 'i.v.',
        test: [0.05, 0.075, 0.13, 1.3, 3, 5, 7.5]
      }
    ]
  },
  {
    wirkstoff: 'Lorazepam',
    ampulleDosis: 2,
    ampulleEinheit: 'mg',
    ampulleMenge: 1,
    doses: [
      {
        indikation: 'Krampfanfall',
        dosis: 0.1,
        max: 4,
        einheit: 'mg',
        proKg: true,
        verabreichung: 'i.v.',
        test: [0.05, 0.075, 0.13, 1.3, 2, 2, 2]
      }
    ]
  },
  {
    wirkstoff: 'Phenobarbital',
    ampulleDosis: 200,
    ampulleEinheit: 'mg',
    ampulleMenge: 1,
    doses: [
      {
        indikation: 'Krampfanfall',
        dosis: 20,
        max: 400,
        einheit: 'mg',
        proKg: true,
        verabreichung: 'i.v.',
        test: [5, 7.5, 13, 125, 200, 200, 200]
      }
    ]
  },
  {
    wirkstoff: 'Levetiracetam',
    ampulleDosis: 500,
    ampulleEinheit: 'mg',
    ampulleMenge: 5,
    doses: [
      {
        indikation: 'Krampfanfall',
        dosis: 40,
        max: 3000,
        einheit: 'mg',
        proKg: true,
        ki: true,
        verabreichung: 'i.v.'
        // test: [5, 7.5, 13, 125, 200, 200, 200]
      }
    ]
  },
  {
    wirkstoff: 'Propofol (0,5 %)',
    ampulleDosis: 100,
    ampulleEinheit: 'mg',
    ampulleMenge: 20,
    warning: true,
    doses: [
      {
        indikation: 'Sedierung',
        dosis: 1,
        max: 200,
        einheit: 'mg',
        proKg: true,
        verabreichung: 'i.v.',
        verduennung: -1,
        test: [0.5, 0.75, 1.3, 12.5, 30, 50, 100]
      }
    ]
  },
  {
    wirkstoff: 'Ketamin',
    ampulleDosis: 50,
    ampulleEinheit: 'mg',
    ampulleMenge: 5,
    warning: true,
    doses: [
      {
        indikation: 'Sedierung',
        dosis: 1,
        max: 50,
        einheit: 'mg',
        proKg: true,
        verabreichung: 'i.v.',
        test: [0.5, 0.75, 1.3, 12.5, 30, 50, 50]
      }
    ]
  },
  {
    wirkstoff: 'Morphin',
    ampulleDosis: 10,
    ampulleEinheit: 'mg',
    ampulleMenge: 1,
    doses: [
      {
        indikation: 'Analgesie',
        dosis: 0.1,
        max: 10,
        einheit: 'mg',
        proKg: true,
        verabreichung: 'i.v.',
        test: [0.05, 0.075, 0.13, 1.3, 3, 5, 10]
      }
    ]
  },
  {
    wirkstoff: 'Naloxon',
    ampulleDosis: 0.4,
    ampulleEinheit: 'mg',
    ampulleMenge: 1,
    doses: [
      {
        indikation: 'Antidot',
        dosis: 0.01,
        max: 0.4,
        einheit: 'mg',
        proKg: true,
        verabreichung: 'i.v.',
        test: [0.005, 0.008, 0.01, 0.1, 0.3, 0.4, 0.4]
      }
    ]
  },
  {
    wirkstoff: 'Magnesiumsulfat (10 %)',
    // 10% = 1 g / 10ml = 4 mmol / 10 ml
    // 20% = 2 g / 10ml = 8 mmol / 10 ml
    // 50% = 5 g / 10ml = 20 mmol / 10 ml
    ampulleDosis: 4,
    ampulleEinheit: 'mmol',
    ampulleMenge: 10,
    warning: true,
    doses: [
      {
        indikation: 'Torsade de pointes',
        // Über 1-2 Minuten
        dosis: 0.2, // 50 mg / kg
        max: 8, // 2 g
        einheit: 'mmol',
        proKg: true,
        verabreichung: 'i.v.'
        // test: [5, 7.5, 13, 125, 200, 200, 200]
      }
    ]
  },
  {
    wirkstoff: 'Natriumhydrogencarbonat (8,4 %)',
    // 8,4 g / 100 ml = 100 mmol / 100 ml
    ampulleDosis: 100,
    ampulleEinheit: 'mmol',
    ampulleMenge: 100,
    doses: [
      {
        indikation: 'Blindpufferung', // Bei Kleinkindern mit Glukose 1:1
        verduennung: 1,
        loesungsmittel: 'Aqua',
        // Pufferung nach BGA: BE * kg * 0.3
        dosis: 1,
        einheit: 'mmol',
        proKg: true,
        ki: true,
        verabreichung: 'i.v.'
        // test: [5, 7.5, 13, 125, 200, 200, 200]
      }
    ]
  }
]

export const immediateCare = [
  {
    wirkstoff: 'Surfactant',
    ampulleMenge: 1.5,
    ampulleEinheit: 'mg',
    ampulleDosis: 120,
    limit: 5,
    doses: [
      {
        indikation: 'Surfactant-Mangel',
        dosis: 200,
        einheit: 'mg',
        proKg: true,
        verabreichung: 'i.t.'
      }
    ]
  },
  {
    wirkstoff: 'Budesonid',
    ampulleMenge: 2,
    ampulleEinheit: 'mg',
    ampulleDosis: 1,
    doses: [
      {
        indikation: 'BPD-Prophylaxe',
        dosis: 0.25,
        einheit: 'mg',
        proKg: true,
        loesungsmittel: 'Surfactant',
        verabreichung: 'i.t.'
      }
    ]
  },
  {
    wirkstoff: 'Iloprost',
    ampulleMenge: 1,
    ampulleEinheit: 'µg',
    ampulleDosis: 10,
    doses: [
      {
        indikation: 'PPHN',
        dosis: 2,
        einheit: 'µg',
        proKg: true,
        loesungsmittel: 'NaCl 0,9%',
        verduennung: 5,
        verabreichung: 'i.t.'
      }
    ]
  },
  {
    wirkstoff: 'Ampicillin',
    ampulleMenge: 5,
    ampulleEinheit: 'mg',
    ampulleDosis: 500,
    doses: [
      {
        indikation: 'Sepsis',
        dosis: 50,
        einheit: 'mg',
        proKg: true,
        verabreichung: 'i.v.'
      }
    ]
  },
  {
    wirkstoff: 'Gentamicin',
    ampulleMenge: 1,
    ampulleEinheit: 'mg',
    ampulleDosis: 40,
    doses: [
      {
        indikation: 'Sepsis',
        dosis: 4,
        einheit: 'mg',
        proKg: true,
        ki: true,
        verabreichung: 'i.v.'
      }
    ]
  },
  {
    wirkstoff: 'Coffeincitrat',
    ampulleMenge: 1,
    ampulleEinheit: 'mg',
    ampulleDosis: 20,
    doses: [
      {
        indikation: 'Loading dose',
        dosis: 20,
        einheit: 'mg',
        proKg: true,
        verabreichung: 'i.v.'
      }
    ]
  }
]

export const perfusors = [
  {
    wirkstoff: 'Adrenalin',
    ampulleMenge: 1,
    ampulleEinheit: 'mg',
    ampulleDosis: 1,
    doses: [
      {
        indikation: 'Perfusor',
        dosis: 0.1,
        einheit: 'µg',
        proKg: true,
        perfusor: 'min',
        loesungsmittel: 'NaCl 0,9%',
        verabreichung: 'i.v.'
        // test: [0.05, 0.075, 0.13, 1.25, 3, 5, 10]
      }
    ]
  },
  {
    wirkstoff: 'Nordrenalin',
    ampulleMenge: 1,
    ampulleEinheit: 'mg',
    ampulleDosis: 1,
    doses: [
      {
        indikation: 'Perfusor',
        dosis: 0.1,
        einheit: 'µg',
        proKg: true,
        perfusor: 'min',
        loesungsmittel: 'NaCl 0,9%',
        verabreichung: 'i.v.'
        // test: [0.05, 0.075, 0.13, 1.25, 3, 5, 10]
      }
    ]
  },
  {
    wirkstoff: 'Dobutamin',
    ampulleMenge: 50,
    ampulleEinheit: 'mg',
    ampulleDosis: 250,
    doses: [
      {
        indikation: 'Perfusor',
        dosis: 10,
        einheit: 'µg',
        proKg: true,
        perfusor: 'min',
        loesungsmittel: 'NaCl 0,9%',
        verabreichung: 'i.v.'
        // test: [2.5, 3.75, 6.5, 62.5, 150, 250, 500]
      }
    ]
  },
  {
    wirkstoff: 'Midazolam',
    ampulleDosis: 15,
    ampulleEinheit: 'mg',
    ampulleMenge: 3,
    warning: true,
    doses: [
      {
        indikation: 'Perfusor',
        dosis: 0.1,
        einheit: 'mg',
        proKg: true,
        perfusor: 'h',
        loesungsmittel: 'NaCl 0,9%',
        verabreichung: 'i.v.'
        // test: [0.05, 0.075, 0.1, 1, 1.3, 3, 5, 10]
      }
    ]
  },
  {
    wirkstoff: 'Milrinon',
    ampulleDosis: 10,
    ampulleEinheit: 'mg',
    ampulleMenge: 10,
    doses: [
      {
        indikation: 'Perfusor', // 1 Amp auf 50 ml -> 0.15 ml/h
        dosis: 0.5,
        einheit: 'µg',
        proKg: true,
        perfusor: 'min',
        aufzug: 50,
        loesungsmittel: 'NaCl 0,9%',
        verabreichung: 'i.v.'
        // test: [5, 7.5, 13, 125, 300, 500, 1000]
      }
    ]
  },
  {
    wirkstoff: 'Minprog',
    ampulleDosis: 500,
    ampulleEinheit: 'µg',
    ampulleMenge: 1,
    limit: 6,
    doses: [
      {
        indikation: 'Perfusor', // 1 Amp auf 50 ml -> 3 * kg / 10
        dosis: 0.02,
        einheit: 'µg',
        proKg: true,
        perfusor: 'min',
        loesungsmittel: 'NaCl 0,9%',
        verabreichung: 'i.v.'
        // test: [5, 7.5, 13, 125, 300, 500, 1000]
      }
    ]
  },
  {
    wirkstoff: 'Dexmedetomidin',
    ampulleDosis: 400,
    ampulleEinheit: 'µg',
    ampulleMenge: 4,
    doses: [
      {
        indikation: 'Perfusor',
        dosis: 0.3,
        einheit: 'µg',
        proKg: true,
        perfusor: 'h',
        loesungsmittel: 'NaCl 0,9%',
        verabreichung: 'i.v.'
      }
    ]
  }
]
