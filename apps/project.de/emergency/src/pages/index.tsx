import { ChangeEvent, useState } from 'react'

import PrintIcon from '@mui/icons-material/Print'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import InputAdornment from '@mui/material/InputAdornment'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Unstable_Grid2'

import {
  getTubusData,
  getWeightInKg
} from '@jaqua/shared/util/emergency'

import TablePanel from '../components/Table'
import Tubus from '../components/Tubus'

type TTubus = {
  size: number
  oral: number
  nasal?: number | undefined
}
const Index: React.FC = () => {
  const [weight, setWeight] = useState<number | null>(null)
  const [, setAge] = useState<number | null>(null)
  const [ageWeight, setAgeWeight] = useState<number | null>(null)
  const [tubus, setTubus] = useState<TTubus | null>(null)
  const [defi, setDefi] = useState<number | null>(null)

  const weightInKg = weight ? getWeightInKg(weight) : 0

  /**
   * Store value to state object.
   * @param {Event} event
   */
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const weight = parseFloat(value) || 0
    const tubusData = getTubusData(weight)
    if (!tubusData) return
    const { size, oral, nasal, defi } = tubusData
    setWeight(weight)
    setAgeWeight(null)
    if (weight) setTubus({ size, oral, nasal })
    if (defi) setDefi(weight ? defi : null)
  }

  /**
   * Calculate weight and store value to state object.
   * @param {Event} event
   */
  const calculateWeight = (event: SelectChangeEvent<number>) => {
    const value = (event.target.value as number) || 0
    const age = value < 1 ? value * 12 : value
    const weight = value
      ? value < 1
        ? (age + 9) / 2 // Best guess
        : age * 3 + 7 // new APLS
      : 0
    const tubusData = getTubusData(weight)
    if (!tubusData) return
    const { size, oral, nasal, defi } = tubusData
    setWeight(weight)
    setAgeWeight(value)
    setAge(age)
    setTubus({ size, oral, nasal })
    if (defi) setDefi(defi)
  }

  return (
      <Container>
        <Box component="form" mb={2}>
          <TextField
            placeholder="Gewicht"
            label="Gewicht"
            type="number"
            autoFocus
            InputProps={{
              inputProps: { min: 0 },
              endAdornment: (
                <InputAdornment position="end" data-testid="label">
                  {weight ? (weight > 200 ? 'g' : 'kg') : ''}
                </InputAdornment>
              )
            }}
            name="weight"
            value={weight ?? ''}
            onChange={handleOnChange}
          />

          <Select
            value={ageWeight || ''}
            placeholder="Schätzgewicht nach Alter"
            onChange={(event: SelectChangeEvent<number>) =>
              calculateWeight(event)
            }
            sx={{ ml: 2, width: 150 }}
          >
            <MenuItem value={1 / 12}>1 Monat</MenuItem>
            <MenuItem value={3 / 12}>3 Monate</MenuItem>
            <MenuItem value={5 / 12}>5 Monate</MenuItem>
            <MenuItem value={6 / 12}>6 Monate</MenuItem>
            <MenuItem value={8 / 12}>8 Monate</MenuItem>
            <MenuItem value={10 / 12}>10 Monate</MenuItem>

            <MenuItem value={1}>1 Jahre</MenuItem>
            <MenuItem value={2}>2 Jahre</MenuItem>
            <MenuItem value={3}>3 Jahre</MenuItem>
            <MenuItem value={4}>4 Jahre</MenuItem>
            <MenuItem value={5}>5 Jahre</MenuItem>
            <MenuItem value={6}>6 Jahre</MenuItem>
            <MenuItem value={7}>7 Jahre</MenuItem>
            <MenuItem value={8}>8 Jahre</MenuItem>
            <MenuItem value={10}>10 Jahre</MenuItem>
            <MenuItem value={12}>12 Jahre</MenuItem>
            <MenuItem value={14}>14 Jahre</MenuItem>
          </Select>

          <Button
            href={[
              process.env['NEXT_PUBLIC_BACKEND'],
              'emergency',
              weightInKg
            ].join('/')}
            variant="contained"
            startIcon={<PrintIcon />}
            sx={{
              position: 'absolute',
              top: 12,
              right: 1 + 'rem',
              display: { mobile: 'none', laptop: 'inline-flex' }
            }}
            disabled={!(weightInKg && process.env['NEXT_PUBLIC_BACKEND'])}
          >
            Drucken
          </Button>
        </Box>
        <Box sx={{ flexGrow: 1, mb: 1 }}>
          <Grid container spacing={2}>
            <Grid xs={12} xl={6}>
              <TablePanel title="Notfallmedikamente" weightInKg={weightInKg} />
            </Grid>

            <div className="pagebreak" />

            <Grid xs={12} xl={6}>
              {tubus ? (
                <Tubus weight={weightInKg} tubus={tubus} defi={defi} />
              ) : null}
              {!weightInKg || weightInKg < 6.5 ? (
                <TablePanel title="Erstversorgung" weightInKg={weightInKg} />
              ) : null}
              <TablePanel title="Perfusoren" weightInKg={weightInKg} />
            </Grid>
          </Grid>
        </Box>
      </Container>
  )
}

export default Index
