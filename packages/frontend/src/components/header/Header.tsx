import styled from "@emotion/styled"
import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { home } from '../../paths'
import { Logo } from './Logo'

const pages = [{
  label: 'Home',
  path: home
}
]

export const Header = () => {
  return (
    <AppBar position="static" sx={{ boxShadow: 0 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Vacations
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map(({ label, path }) => (
              <Button
                key={label}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <LinkStyle>
                  <Link to={path}>{label}</Link>
                </LinkStyle>
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

const LinkStyle = styled.div`
  a {
    color: white;
    text-decoration: none;
  }
`
