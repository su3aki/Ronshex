import React, { useState } from 'react'
import ArtistParams from '../Molecules/ArtistParams'
import ParamsGraph from '../Molecules/ParamsGraph'
import QueryTracks from "../Molecules/QueryTracks"
import {ReactComponent as Logo } from '../Atoms/SpotifyLogo.svg'
import Recommend from '../Molecules/Recommend'
import ReTrackParams from '../Molecules/ReTrackParams'
import TrackCard from '../Molecules/TrackCard'
import TrackParams from '../Molecules/TrackParams'
import Trail from '../Atoms/Trail'
import { WaveLoading } from 'react-loadingg';
import { Button, Typography } from '@material-ui/core'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/styles'
import MuiAlert from '@material-ui/lab/Alert';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import ReactHowler from 'react-howler'
import Slider from '@material-ui/core/Slider';
import Snackbar from '@material-ui/core/Snackbar';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';
import './Search.css'

const Search = React.memo((props) => {
  const [itemResult, setItemResult] = useState([])
  const [trackInfo, setTrackInfo] = useState("")
  const [selectedTrack, setSelectedTrack] = useState({
    trackId: "",
    trackName: "",
    trackArtistName: "",
    trackArtistId: "",
    trackArtistGenres: "",
    trackArtworkUrl: "",
    trackPopularity: ""
  })
  const [artistInfo, setArtistInfo] = useState("")
  const [lookRecommend, setLookRecommend] = useState([])
  const [selectedRecommend, setSelectedRecommend] = useState({
    reTrackId: "",
    reTrackName: "none",
    reTrackPopularity: "",
    reTrackArtwork: ""
  })
  const [reTrackInfo, setReTrackInfo] = useState("")
  const [graphReDisplay, setGraphReDisplay] = useState("none")
  const [trailOpen, setTrailOpen] = useState(true)
  const [snackBarOpen, setSnackBarOpen] = useState(false)
  const [volumeToggle, setVolumeToggle] = useState(0.2)
  const [playing, setPlaying] = useState(false)
  const [playSrc, setPlaySrc] = useState("")

  const Alert = (props) =>{
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
  const handleChange = (event, newValue) => {
    setVolumeToggle(newValue);
  };
  const token = props.token
  const wordFormData = props.wordFormData
  const handleSnackBarOpen = () => {
    setSnackBarOpen(true)
  }
  const handleSnackBarClose = () => {
    setSnackBarOpen(false)
  }
  const handleSearchView = () => {
    setGraphReDisplay("none")
    setTrailOpen(true)
  }
  const handleDataView = () => {
    setGraphReDisplay("block")
    setTrailOpen(false)
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      paddingTop: 10
    },
    buttonContainer: {
      display: 'flex',
      textAlign: 'center',
      justifyContent: 'center',
      whiteSpace: "nowrap"
    },
    loading: {
      verticalAlign: 'middle'
    },
    snackBar: {
      width: '80%',
    },
    volumeBar: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }))
  const classes = useStyles()
  const theme = createMuiTheme({
    overrides: {
      MuiSlider: {
        rail: {
          color: '#db5dfe'
        },
        root: {
          color: '#FFF'
        },
        track: {
          color: '#1db954'
        },
      }
    }
  })
  console.log("????????????")
  console.log(selectedTrack.trackArtistId)
  console.log(token)
  console.log(artistInfo.genres)
  console.log(playSrc)
  console.log(playing)
  //trackParams????????????????????????trackInfo?????????
  return (
    <div className={classes.root}>
      <div className="tracks">
        {/* ????????????????????????????????? */}
        {playSrc !== null &&playSrc.length !== 0
          && <ReactHowler format={"mp3"} playing={playing} src={playSrc} volume={volumeToggle}/>}
        {/* ??????????????????????????????????????? */}
        <QueryTracks token={token}
          wordFormData={wordFormData}
          setItemResult={setItemResult} />
        {/* ?????????????????????????????????????????? */}
        <TrackParams token={token}
          id={selectedTrack.trackId}
          trackName={selectedTrack.trackName}
          trackArtist={selectedTrack.trackArtist}
          setTrackInfo={setTrackInfo} />
        {/* ????????????????????? */}
        <div className={classes.snackBar}>
          <Snackbar open={snackBarOpen} autoHideDuration={4000} onClose={handleSnackBarClose}>
            <Alert severity="success" action={
              <Button size="small" variant="contained" onClick={() => handleDataView()}>open!</Button>}>
              ????????????????????????????????????????????????????????????
            </Alert>
          </Snackbar>
        </div>
        {/* ??????????????????????????????????????????????????? */}
        {/* ?????????????????????????????????????????? */}
        { selectedTrack.trackArtistId.length !== 0
          &&<ArtistParams token={token}
            artistId={selectedTrack.trackArtistId}
            setArtistInfo={setArtistInfo} />}
        {/* ?????????????????????????????????????????? */}
        {/* ???????????????????????????????????????????????? */}
        {/* ????????????????????????????????????????????????????????????3?????????????????????????????? */}
        { artistInfo.length !== 0
          &&<Recommend token={token}
            trackId={selectedTrack.trackId}
            artistId={selectedTrack.trackArtistId}
            artistGenres={(artistInfo.genres).slice(0,3)}
            setLookRecommend={setLookRecommend} />}
        {/* ????????????????????????????????????????????? */}
        <ReTrackParams token={token}
          id={selectedRecommend.reTrackId}
          setReTrackInfo={setReTrackInfo} />
        {/* ???????????????????????????????????? */}
        <Grid container spacing={0}>
          <Grid item className={classes.buttonContainer} xs={6} sm={3}>
            <Button variant="outlined" color="secondary"
              onClick={() => handleDataView()}>???????????????????????????</Button>
            </Grid>
          <Grid item className={classes.buttonContainer} xs={6} sm={3}>
            <Button variant="outlined" color="secondary"
              onClick={() => handleSearchView()}>????????????</Button>
          </Grid>
          <Grid item className={classes.volumeBar} xs={2} sm={1} >
            <VolumeDown />
          </Grid>
          <Grid item className={classes.volumeBar} xs={8} sm={4}>
              <ThemeProvider theme={theme}>
              <Slider value={volumeToggle} min={0} step={0.001} max={1} onChange={handleChange} aria-labelledby="continuous-slider" />
              </ThemeProvider>
          </Grid>
          <Grid item className={classes.volumeBar} xs={2} sm={1} >
            <VolumeUp />
        </Grid>
        </Grid>
        {/* ????????????????????????????????????????????? */}
        <Grid container direction="row" spacing={1}>
          <Grid item xs={12} sm={6} style={{ display: graphReDisplay}}>
          {trackInfo.data !== undefined
            && reTrackInfo.data !== undefined
              && <ParamsGraph
        // ??????????????????????????????????????????????????????????????????
            trackName={selectedTrack.trackName}
            FirstDanceAbility={trackInfo.data.danceability}
            FirstEnergy={trackInfo.data.energy}
            FirstLoudness={trackInfo.data.loudness}
            FirstPopularity={selectedTrack.trackPopularity}
            FirstTempo={trackInfo.data.tempo}
            FirstValence={trackInfo.data.valence}
            FirstArtwork={selectedTrack.trackArtworkUrl}
        // ?????????????????????????????????????????????????????????????????????
            reTrackName={selectedRecommend.reTrackName}
            ReDanceAbility={reTrackInfo.data.danceability}
            ReEnergy={reTrackInfo.data.energy}
            ReLoudness={reTrackInfo.data.loudness}
            RePopularity={selectedRecommend.reTrackPopularity}
            ReTempo={reTrackInfo.data.tempo}
            ReValence={reTrackInfo.data.valence}
            ReArtwork={selectedRecommend.reTrackArtwork}
            />
          }
          </Grid>
        {/* ?????????????????????????????? */}
        <Grid item xs={12} sm={6} style={{ display: graphReDisplay}}>
        {lookRecommend !== undefined
          && (artistInfo.genres) !== undefined
              && <>
              <Grid >
              <Typography variant="h3" style={{ color: "#d0d1ff" }}>
              RecommendList</Typography>
                {/* {(artistInfo.genres).slice(0, 3).map(
                  (props, index) =>
                  <Button color="secondary">{props}</Button>)} */}
                  </Grid>
              <ul>
              {lookRecommend.map((props) =>
                <li
                key={props.id}
                onClick={() => setSelectedRecommend({
                  reTrackArtwork: props.album.images[1].url,
                  reTrackId: props.id,
                  reTrackName: props.name,
                  reTrackPopularity: props.popularity
                })}>
                  <TrackCard
                    audioId={props.id}
                    artistName={props.album.artists[0].name}
                    artworkUrl={props.album.images[1].url}
                    trackName={props.name}
                    previewUrl={props.preview_url}
                    spotifyUrl={props.external_urls.spotify}
                    playing={playing}
                    playSrc={playSrc}
                    setPlaying={setPlaying}
                    setPlaySrc={setPlaySrc}>
                  </TrackCard>
                </li>
              )}
            </ul></>
        }
        </Grid>
        </Grid>
        <Typography variant="subtitle2" style={{color:"#ff87d6",fontSize: 13}}>
          <br />??????????????????????????????????????????????????????
          <br />??????/??????????????????????????????????????????????????????
          <br /><NotInterestedIcon style={{ color: "#7f7f7f",fontSize: 15 }} />
          ?????????????????????????????????????????????????????????????????????
          <br /><Logo/>????????????Spotify?????????????????????web?????????????????????
        </Typography>
        {itemResult !== undefined
          && itemResult.length === 0
          ? <><WaveLoading size={'large'} color="#1db954" speed={1} /></>
          :<><Typography variant="h3" color="secondary">TrackList</Typography>
          <ul onClick={handleSnackBarOpen}>
              {itemResult.map((props) =>
                <li
                  key={props.id}
                  onClick={() => setSelectedTrack({
                    trackId: props.id,
                    trackName: props.name,
                    trackArtistId: props.artists[0].id,
                    trackArtistName: props.artists[0].name,
                    trackArtworkUrl: props.album.images[1].url,
                    trackPopularity: props.popularity,
                  })}>
                    <Trail open={trailOpen}>
                    <TrackCard
                    audioId={props.id}
                    artistName={props.album.artists[0].name}
                    artworkUrl={props.album.images[1].url}
                    trackName={props.name}
                    previewUrl={props.preview_url}
                    spotifyUrl={props.external_urls.spotify}
                    playing={playing}
                    playSrc={playSrc}
                    setPlaying={setPlaying}
                    setPlaySrc={setPlaySrc}>
                  </TrackCard>
              </Trail>
                </li>
              )}
            </ul></>
        }
      </div>
    </div>
  )
})
export default Search;
