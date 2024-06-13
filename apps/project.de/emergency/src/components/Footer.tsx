import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        paddingX: 2,
        pb: 2
      }}
    >
      <Box>
        <Typography
          variant="h6"
          sx={{ fontSize: 1 + 'rem', fontWeight: 'bold' }}
        >
          Legende / Hinweise
        </Typography>
        <Typography variant="body1" sx={{ fontSize: 0.8 + 'rem' }}>
          <WarningAmberIcon
            sx={{ fontSize: 1 + 'rem', top: 5, position: 'relative' }}
          />{' '}
          = Es existieren verschiedene Konzentrationen mit diesem Wirkstoff
        </Typography>
        <Typography variant="body1" sx={{ fontSize: 0.8 + 'rem' }}>
          Applikationsformen: i.t. = intratracheal, i.v. = intravenös
        </Typography>
        <Typography variant="body1" sx={{ fontSize: 0.8 + 'rem' }}>
          Verdünnung 1:5 = Einer von insgesamt fünf Teilen enthält Wirkstoff,
          d.h. ein Teil Wirkstoff und <strong>vier</strong> Teile Lösungsmittel
        </Typography>
        <Typography variant="body1" sx={{ fontSize: 0.8 + 'rem' }}>
          Verdünnung 1:10 = Einer von insgesamt zehn Teilen enthält Wirkstoff,
          d.h. ein Teil Wirkstoff und <strong>neun</strong> Teile Lösungsmittel
        </Typography>
        <Typography variant="body1" sx={{ fontSize: 0.8 + 'rem' }}>
          x mg ad 50 ml NaCl 0,9% = Wirkstoff wird mit NaCl 0,9 % auf insgesamt
          50 ml Spritzeninhalt aufgezogen
        </Typography>
      </Box>
      <Divider sx={{ mt: 3 }} />
      <Box sx={{ color: (theme) => theme.palette.grey[600], mt: 1 }}>
        <Typography
          variant="h6"
          sx={{ fontSize: 0.8 + 'rem', fontWeight: 'bold' }}
        >
          Haftungsausschluss / Disclaimer
        </Typography>
        <Typography variant="body1" sx={{ fontSize: 0.7 + 'rem' }}>
          Die Informationen dieser Seite sind nicht für Patienten, sondern
          ausschließlich für selbstverantwortlich handelnde Ärzte gedacht. Sie
          stellen somit keine Anleitung zur Selbstmedikation dar und können
          keinerlei Ersatz für eine ärztliche Beratung oder Behandlung sein.
        </Typography>
        <Typography variant="body1" sx={{ fontSize: 0.7 + 'rem' }}>
          Die beschriebenen Informationen sind ausschließlich dafür gedacht, die
          Arbeit des Arztes zu unterstützen. Die Therapieempfehlungen dieser
          Seiten dürfen nicht ungeprüft umgesetzt werden, die Verantwortung für
          die Anwendung der Informationen bleibt bei dem behandelnden Arzt.
        </Typography>
        <Typography variant="body1" sx={{ fontSize: 0.7 + 'rem' }}>
          Beachten Sie unbedingt die Gebrauchsinformationen der Hersteller
          bezüglich der Medikamente, da es gelegentlich Änderungen bei
          Anwendung, Dosierung, Nebenwirkungen, Gegenanzeigen und
          Wechselwirkungen gibt.
        </Typography>
        {process.env['NEXT_PUBLIC_VERSION'] ? (
          <Typography variant="body2" sx={{ pt: 2, fontSize: 0.6 + 'rem' }}>
            Version {process.env['NEXT_PUBLIC_VERSION']}
          </Typography>
        ) : null}
      </Box>
    </Box>
  )
}
