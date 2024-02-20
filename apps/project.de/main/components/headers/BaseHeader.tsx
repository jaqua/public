import LogoFull from '../../assets/images/logo-full.png';
import LogoSmall from '../../assets/images/logo-small.png';
import FullwidthImage from '../images/FullwidthImage';
import Menubar from '../menubar/Menubar';
import Appbar from './Appbar';
import Toolbar from './Toolbar';
import { basicConfig } from '@jaqua/project.de/config';
import {
  Box,
  Container,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Slide,
  Stack,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { signOut, useSession } from 'next-auth/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';

const navItems = [
  {
    label: 'Home',
    href: '/',
  },
];

const StyledMenuIcon = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'colorMode',
})<{ colorMode: 'light' | 'dark' }>(({ theme, colorMode }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: '6px',
  width: 35,
  '& > div': {
    height: 2,
    backgroundColor:
      colorMode === 'light'
        ? theme.palette.common.white
        : theme.palette.primary.dark,
  },
}));
const StyledMenuIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.common.white,
  width: 64,
  height: 64,
  padding: 0,
}));
export const EmptyAppBar = () => {
  return (
    <Appbar color="default" empty={true} sx={{ pointerEvents: 'none' }}>
      <Toolbar>
        <StyledMenuIconButton />
      </Toolbar>
    </Appbar>
  );
};

const MenuOpenIcon = ({
  colorMode = 'light',
}: {
  colorMode: 'dark' | 'light';
}) => {
  return (
    <StyledMenuIcon colorMode={'light'}>
      <Box width={'50%'} />
      <Box width={'75%'} />
      <Box width={'100%'} />
    </StyledMenuIcon>
  );
};

const BaseHeader = () => {
  const { data: session }: any = useSession();

  const [menuOpened, setMenuOpened] = useState(false);
  const handleMenuToggle = () => setMenuOpened((p) => !p);
  const [drawerOpened, setDrawerOpened] = useState(false);
  const handleDrawerToggle = () => setDrawerOpened((p) => !p);
  const router = useRouter();
  const isLoginPage = router.pathname === '/login';
  const slideParentRef = useRef<HTMLDivElement>(null);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <List>
        {navItems.map((navItem, navItemIdx) => (
          <ListItem key={navItemIdx} disablePadding>
            <ListItemButton
              href={navItem.href}
              LinkComponent={NextLink}
              selected={router.pathname === navItem.href}
              sx={{ textAlign: 'center' }}
            >
              <ListItemText primary={navItem.label} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          {session ? (
            <ListItemButton
              onClick={() => signOut({ callbackUrl: '/login' })}
              sx={{ textAlign: 'center' }}
            >
              <ListItemText primary="Logout" />
            </ListItemButton>
          ) : (
            <ListItemButton
              href="/login"
              LinkComponent={NextLink}
              sx={{ textAlign: 'center' }}
            >
              <ListItemText primary="Login" />
            </ListItemButton>
          )}
        </ListItem>
      </List>
    </Box>
  );
  return (
    <>
      <Appbar color="default">
        <Container sx={{ py: 1 }}>
          <Toolbar>
            <Link
              component={NextLink}
              href={'/'}
              mr={'auto'}
              sx={{
                display: { mobile: 'inherit', tablet: 'none' },
                height: 30,
              }}
            >
              <FullwidthImage priority src={LogoSmall} alt="Logo project" />
            </Link>
            <Link
              component={NextLink}
              href={'/'}
              mr={'auto'}
              sx={{
                display: { mobile: 'none', tablet: 'inherit' },
                width: {
                  desktop: 350,
                  tablet: 300,
                  mobile: 200,
                },
              }}
            >
              <FullwidthImage priority src={LogoFull} alt="Logo project" />
            </Link>

            <Box
              sx={{
                overflow: 'hidden',
                display: { mobile: 'none', laptop: 'block' },
              }}
              ref={slideParentRef}
            >
              <Slide
                container={slideParentRef.current}
                in={menuOpened}
                direction="left"
              >
                <Stack direction={'row'} spacing={4}>
                  {navItems.map((navItem, navItemIdx) => {
                    const active = router.pathname === navItem.href;
                    return (
                      <Link
                        underline="none"
                        variant="body2"
                        component={NextLink}
                        href={navItem.href}
                        key={navItemIdx}
                        sx={{
                          color: !active && 'common.white',
                          '&:hover': { fontWeight: 'bold' },
                        }}
                      >
                        {navItem.label}
                      </Link>
                    );
                  })}
                  {session ? (
                    <>
                      <Link
                        underline="none"
                        variant="body2"
                        component={NextLink}
                        href="/weiterbildung"
                        sx={{
                          color:
                            router.pathname !== '/weiterbildung' &&
                            'common.white',
                          '&:hover': { fontWeight: 'bold' },
                        }}
                      >
                        Weiterbildung
                      </Link>
                      <Link
                        underline="none"
                        variant="body2"
                        component={NextLink}
                        href="/"
                        onClick={() => signOut({ callbackUrl: '/login' })}
                        sx={{
                          color: 'common.white',
                          '&:hover': { fontWeight: 'bold' },
                        }}
                      >
                        Logout
                      </Link>
                    </>
                  ) : (
                    <Link
                      underline="hover"
                      variant="body2"
                      component={NextLink}
                      href="/login"
                      sx={{
                        color: 'common.white',
                      }}
                    >
                      Login
                    </Link>
                  )}
                </Stack>
              </Slide>
            </Box>
            {/* button for drawer */}
            <Box
              sx={{
                display: { mobile: 'inherit', laptop: 'none' },
              }}
            >
              <Menubar open={drawerOpened} onClick={handleDrawerToggle} />
            </Box>

            {/* <StyledMenuIconButton
              
              onClick={() => {
                handleDrawerToggle();
              }}>
              {drawerOpened ? (
                <CloseIcon fontSize={"large"} />
              ) : (
                <MenuOpenIcon colorMode={isLoginPage ? "dark" : "light"} />
              )}
            </StyledMenuIconButton> */}
            {/* button for menu duplicated for simplicity */}
            <Box
              sx={{
                display: { mobile: 'none', laptop: 'inherit' },
              }}
            >
              <Menubar open={menuOpened} onClick={handleMenuToggle} />
            </Box>
            {/* <StyledMenuIconButton
              sx={{
                display: { mobile: "none", laptop: "inherit" },
              }}
              onClick={() => {
                handleMenuToggle();
              }}>
              {menuOpened ? (
                <CloseIcon fontSize={"large"} />
              ) : (
                <MenuOpenIcon colorMode={isLoginPage ? "dark" : "light"} />
              )}
            </StyledMenuIconButton> */}
          </Toolbar>
        </Container>
      </Appbar>
      <Drawer
        variant="temporary"
        anchor={basicConfig.drawer.anchor}
        open={drawerOpened}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { mobile: 'block', laptop: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: '50%',
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default BaseHeader;
