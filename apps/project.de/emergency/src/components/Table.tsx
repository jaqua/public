import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import {
  Dosis,
  calculateDosis,
  doses,
  immediateCare,
  perfusors,
  weightDisplay
} from '@jaqua/shared/util/emergency'

type Props = {
  title: string
  weightInKg: number
}
export const TablePanel = ({ title, weightInKg }: Props) => {
  const type = title.toLowerCase()
  let list

  switch (type) {
    case 'perfusoren':
      list = perfusors
      break
    case 'notfallmedikamente':
      list = doses
      break
    case 'erstversorgung':
      list = immediateCare
      break
  }

  if (!list) return null

  return (
    <TableContainer component={Paper} sx={{ mb: 1 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontSize: 18, fontWeight: 'bold', width: 155 }}>
              {title}
              <br />
              {weightDisplay(weightInKg)}
            </TableCell>

            <TableCell align="right" sx={{ fontStyle: 'italic' }}>
              Dosierung
            </TableCell>
            {weightInKg && type === 'perfusoren' ? (
              <TableCell align="right" sx={{ fontStyle: 'italic' }}>
                Laufrate
              </TableCell>
            ) : null}
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((data: Dosis) => {
            if (data.limit && weightInKg > data.limit) return
            const result = calculateDosis(type, weightInKg, data)
            if (!result) return
            const {
              wirkstoff,
              konzentration,
              warning,
              dosis,
              dosisPerKg,
              quantity
            } = result

            return (
              <TableRow
                key={wirkstoff}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <strong>{wirkstoff}</strong>
                  <br />
                  <span style={{ fontSize: 11, lineHeight: 10 + 'px' }}>
                    {konzentration}{' '}
                  </span>
                  {warning ? (
                    <WarningAmberIcon
                      color="warning"
                      sx={{ fontSize: 1 + 'rem', top: 5, position: 'relative' }}
                    />
                  ) : null}
                </TableCell>
                {weightInKg ? (
                  type === 'perfusoren' ? (
                    <>
                      <TableCell align="right">
                        <strong>{dosis}</strong> {quantity}
                      </TableCell>
                      <TableCell align="right">{dosisPerKg}</TableCell>
                    </>
                  ) : (
                    <TableCell align="right">
                      <strong>{dosis}</strong> {dosisPerKg}
                      <br />
                      <em>{quantity}</em>
                    </TableCell>
                  )
                ) : (
                  <TableCell align="right">{dosis}</TableCell>
                )}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TablePanel
