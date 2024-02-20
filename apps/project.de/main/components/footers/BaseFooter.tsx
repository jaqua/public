import LogoSmall from '../../assets/images/logo-small.png';
import Copyright from '../../components/footers/Copyright';
import Link from '../../components/ui/links/Link';
import BaseSection from '../../components/ui/sections/BaseSection';
import FacebookIcon from '../../components/ui/socialIcons/FacebookIcon';
import InstagramIcon from '../../components/ui/socialIcons/InstagramIcon';
import TwitterIcon from '../../components/ui/socialIcons/TwitterIcon';
import YoutubeIcon from '../../components/ui/socialIcons/YoutubeIcon';
import { socialIconLinks } from '@jaqua/project.de/config';
import { Box, Grid } from '@mui/material';
import { Divider, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useSession } from 'next-auth/react';
import NextImage from 'next/image';

const footerMenuLinksPart2 = [
  {
    label: 'Contact',
    href: '/contact',
  },
  {
    label: 'About us',
    href: '/about-us',
  },
  {
    label: 'Imprint',
    href: '/imprint',
  },
];
const footerMenuLinksPart1 = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Login',
    href: '/login',
  },
];

const StyledInfoStack = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: theme.spacing(2),
  alignItems: 'center',
  color: theme.palette.primary.main,
  '& > .MuiTypography-root': {
    color: theme.palette.common.white,
  },
}));
const StyledSocialIcon = styled(Link)(({ theme }) => ({
  color: theme.palette.common.white,
  borderRadius: '50%',
  width: 48,
  aspectRatio: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: theme.transitions.create(['background-color', 'color']),
  '&:hover': {
    color: theme.palette.primary.dark,
    backgroundColor: theme.palette.common.white,
  },
}));

StyledSocialIcon.defaultProps = {
  target: '_blank',
};

const FooterMenuGridItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <Grid item mobile={12} tablet={4}>
      {children}
    </Grid>
  );
};
const FooterMenuStack = ({
  menuLinks,
}: {
  menuLinks: { label: string; href: string }[];
}) => {
  const { data: session }: any = useSession();

  return (
    <Stack height={'100%'} spacing={{ mobile: 2 }}>
      <Stack spacing={2}>
        {menuLinks.map((menuLink, menuLinkIdx) => {
          if (session && menuLink.label === 'Login') return null;
          return (
            <Link
              key={menuLinkIdx}
              color="inherit"
              variant="link"
              underline="none"
              href={menuLink.href}
              sx={{ '&:hover': { fontWeight: 'bold' } }}
            >
              {menuLink.label}
            </Link>
          );
        })}
      </Stack>
    </Stack>
  );
};
const BaseFooter = () => {
  return (
    <Box>
      <BaseSection
        sx={{ backgroundColor: 'primary.dark', color: 'common.white' }}
      >
        <Stack spacing={{ mobile: 5, tablet: 15 }}>
          <Stack
            direction={{ mobile: 'column', laptop: 'row' }}
            spacing={{ mobile: 5, tablet: 15 }}
          >
            <Box textAlign={'center'}>
              <Box
                sx={{
                  maxWidth: 150,
                  width: '100%',
                  height: 'auto',
                }}
                component={NextImage}
                src={LogoSmall}
                alt="Logo klein"
              />
            </Box>
            <Grid
              sx={{ flex: 1 }}
              container
              spacing={{ mobile: 4 }}
              alignContent={'center'}
              justifyContent={'center'}
            >
              <FooterMenuGridItem>
                <FooterMenuStack menuLinks={footerMenuLinksPart1} />
              </FooterMenuGridItem>
              <FooterMenuGridItem>
                <FooterMenuStack menuLinks={footerMenuLinksPart2} />
              </FooterMenuGridItem>
              <FooterMenuGridItem>
                <Stack flexWrap={'wrap'} spacing={{ mobile: 4 }}>
                  <Typography variant="h5" align="center">
                    Social links
                  </Typography>
                  <Stack
                    direction={'row'}
                    flexWrap={'wrap'}
                    spacing={{ mobile: 2 }}
                    justifyContent={'center'}
                    sx={{
                      fontSize: {
                        mobile: (theme) => theme.spacing(2),
                        tablet: (theme) => theme.spacing(4),
                        desktop: (theme) => theme.spacing(5),
                      },
                    }}
                  >
                    <StyledSocialIcon href={socialIconLinks.facebook}>
                      <FacebookIcon />
                    </StyledSocialIcon>
                    <StyledSocialIcon href={socialIconLinks.twitter}>
                      <TwitterIcon />
                    </StyledSocialIcon>
                    <StyledSocialIcon href={socialIconLinks.youtube}>
                      <YoutubeIcon />
                    </StyledSocialIcon>
                    <StyledSocialIcon href={socialIconLinks.instagram}>
                      <InstagramIcon />
                    </StyledSocialIcon>
                  </Stack>
                </Stack>
              </FooterMenuGridItem>
            </Grid>
          </Stack>
        </Stack>
      </BaseSection>

      <Divider light />
      <Copyright />
    </Box>
  );
};

export default BaseFooter;
