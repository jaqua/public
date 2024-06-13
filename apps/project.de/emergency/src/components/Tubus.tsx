import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import { roundDecimals } from '@jaqua/shared/util/emergency'

type Props = {
  weight: number
  tubus: { size: number; oral: number; nasal?: number | undefined }
  defi: number | null
}
export const Tubus = ({ weight, tubus, defi }: Props) => {
  return (
    <TableContainer component={Paper} sx={{ width: 100 + '%', mb: 1 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Intubation</strong>
            </TableCell>
            {defi && weight > 2 ? (
              <TableCell>
                <strong>Defibrillation</strong>
              </TableCell>
            ) : null}
            {weight < 6 && (
              <TableCell>
                <strong>Katheter</strong>
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              Tubusgröße: {tubus.size.toString().replace('.', ',')}
            </TableCell>
            {weight > 2 && (
              <TableCell>
                Reanimation: {defi ? defi + ' J' : '4 J/kg'}
              </TableCell>
            )}
            {weight < 6 && (
              <TableCell>
                NVK: {roundDecimals(weight * 1.5 + 5, 1, true) + ' cm'}
              </TableCell>
            )}
          </TableRow>
          <TableRow>
            <TableCell>
              Tubustiefe oral: {tubus.oral.toString().replace('.', ',')} cm
            </TableCell>
            {weight > 2 && (
              <TableCell>
                Kardioversion: {defi ? defi / 4 + ' J' : '1 J/kg'}
              </TableCell>
            )}
            {weight < 6 && (
              <TableCell>
                NAK: {roundDecimals(weight * 3 + 9, 1, true) + ' cm'}
              </TableCell>
            )}
          </TableRow>
          {tubus.nasal && (
            <TableRow>
              <TableCell>
                Tubustiefe nasal: {tubus.nasal.toString().replace('.', ',')} cm
              </TableCell>
              <TableCell />
              {weight < 6 && weight > 2 && <TableCell />}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Tubus
