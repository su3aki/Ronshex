import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import CssBaseline from '@material-ui/core/CssBaseline'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
const Header = React.memo(() => {

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#1e1022'
      },
      secondary: {
        main: '#DF0869'
      }}

  })
  theme.typography.h3 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.4rem',
  },
  }

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar>
          <Toolbar>
          <Typography color="secondary" variant="h3">Ronshex</Typography>
        </Toolbar>
      </AppBar>
      </ThemeProvider>
    </React.Fragment>
  )
})
export default Header;
