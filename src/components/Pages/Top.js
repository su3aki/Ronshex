import React, { useState } from 'react'
import Credentials from '../Molecules/Credentials'
import Header from '../Organisms/Header'
import Search from '../Organisms/Search'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import './Top.css'

const Top = () => {
  const [token, setToken] = useState("")
  const [wordFormData, setWordFormData] = useState("")
  //アクセストークン取得
  const handleSubmit = (e) => {
    e.preventDefault();
    if (wordFormData === "") {
      alert("入力してください");
    }
  }
  const customFont = "'Economica', 'Sawarabi Mincho', sans-serif"

  const theme = createMuiTheme({
    palette: {
      white: {
        text: "#FFF"
      }
    },
    typography: {
      fontFamily: customFont,
    }
  })
  const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  input: {
    backgroundColor: "#1e1022",
    color: "#FFF"
  },
}));

  const useLabelStyles = makeStyles({
  root: {
    color: "white",
    "&.Mui-focused": {
      color: "#1db954"
    }
  }
})
  const classes = useStyles()
  const labelClasses = useLabelStyles()
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Credentials setToken={ setToken }/>
        <Header />
        <Typography variant="h3"><br/>Search from here↓</Typography>
        <form className={classes.root} noValidate onSubmit={handleSubmit}>
          <TextField
            id="standard-basic"
            InputProps={{ classes: classes }}
            InputLabelProps={{ classes: labelClasses }}
            label="Trackname? or Artistname?"
            value={wordFormData}
            fullWidth
            variant="filled"
            color="secondary"
            onChange={(e) => setWordFormData(e.target.value)}/>
        </form>
        {wordFormData.length === 0
          ? <Typography variant="h5">
            <br />楽曲を検索
            <br />曲を選択
            <br />グラフ表示を押すと・・・？
          </Typography>
          : <Search token={token} wordFormData={wordFormData} />
        }
      </ThemeProvider>
    </div>
    )
  }
export default Top;
