/**
 * @copyright     © 2023-2024 by J. Quader
 * @author        Dr. J. Quader
 * @author        A. Naseem
 */
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import MuiAccordionSummary, {
  AccordionSummaryProps
} from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

import { TProcessedNodeObj } from '@jaqua/project.de/util/notecard'

export const StyledAccordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  '&:not(:last-child)': {
    borderBottom: 0
  },
  '&:before': {
    display: 'none'
  }
}))
export const StyledAccordionSummary = styled(
  (
    props: AccordionSummaryProps & { showIcon: boolean; isItemGroup: boolean }
  ) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
      {...props}
    />
  ),
  {
    shouldForwardProp: (prop: string) =>
      prop !== 'showIcon' && prop !== 'isItemGroup'
  }
)(({ theme, showIcon, isItemGroup }) => ({
  backgroundColor: isItemGroup ? 'rgba(0, 0, 0, .1)' : 'rgba(0,0,0,.03)',
  flexDirection: 'row-reverse',
  borderBottom: '1px solid rgba(0, 0, 0, .1)',
  '& .MuiAccordionSummary-expandIconWrapper': {
    display: showIcon ? 'block' : 'none',
    '&.Mui-expanded': {
      transform: 'rotate(90deg)'
    }
  },
  '& .MuiAccordionSummary-content': {
    margin: 0,
    marginLeft: theme.spacing(1),
    gap: '1rem',
    alignItems: 'center',

    '& .MuiTypography-subtitle2': {
      color: theme.palette.grey[500],
      display: 'flex',
      alignItems: 'center'
    }
  }
}))

export const StyledAccordionDetails = styled(MuiAccordionDetails)(
  ({ theme }) => ({
    padding: 0,
    paddingLeft: theme.spacing(2),
    border: 0,
    borderTop: '1px solid rgba(0, 0, 0, .125)'
  })
)

type Content = TProcessedNodeObj

export const Accordion = ({ contents }: { contents: Content[] | null }) => {
  if (!contents || !Array.isArray(contents)) return null

  const Item = contents.map((item, itemIdx) => {
    if (item) {
      const isTypeItem = item.type === 'item'
      const hasDescription =
        isTypeItem &&
        Boolean(item.description) &&
        typeof item.description === 'string'
      return (
        <StyledAccordion key={itemIdx}>
          <StyledAccordionSummary
            isItemGroup={item.type === 'group'}
            showIcon={item.type === 'group' || hasDescription}
          >
            <Typography
              variant="body1"
              component={'p'}
              dangerouslySetInnerHTML={{
                __html: item.title
              }}
            />
          </StyledAccordionSummary>
          {hasDescription ? (
            <StyledAccordionDetails
              sx={{ backgroundColor: (t) => t.palette.grey[700] }}
            >
              <Typography
                color={'white'}
                component={'p'}
                dangerouslySetInnerHTML={{
                  __html: item.description ? item.description : ''
                }}
                sx={{
                  whiteSpace: 'pre'
                }}
              />
            </StyledAccordionDetails>
          ) : null}

          {item.type === 'group' && item.items.length > 0 ? (
            <StyledAccordionDetails>
              <div>
                <Accordion contents={item.items} />
              </div>
            </StyledAccordionDetails>
          ) : null}
        </StyledAccordion>
      )
    }
    return null
  })
  return <div>{Item}</div>
}
