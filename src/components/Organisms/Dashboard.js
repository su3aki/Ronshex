import React, { useState } from 'react'
import ParamsGraph from '../Molecules/ParamsGraph'
import Recommend from '../Molecules/Recommend'
import ReTrackParams from '../Molecules/ReTrackParams'
import TrackCard from '../Molecules/TrackCard'
import { Button, Typography } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
const Dashboard = (props) => {
  const [lookRecommend, setLookRecommend] = useState([])
  const [reTrackInfo, setReTrackInfo] = useState("")
  const [selectedRecommend, setSelectedRecommend] = useState({
    reTrackId: "",
    reTrackName: "none",
    reTrackPopularity: "",
    reTrackArtwork: ""
  })
  const artistInfo = (props.artistInfo)
  const trackInfo = (props.trackInfo)
  const token = (props.token)
  const volumeToggle = (props.volumeToggle)
  return (
    <>
  {/* 選ばれた曲を元に類似曲を取得 */}
  {/* 発火条件：アーティスト情報取得後 */}
  {/* 注釈：ジャンル数が多いと検索に出ない為、3つまでしか取得しない */}
      <Recommend token={token}
        trackId={props.trackId}
        artistId={props.trackArtistId}
        artistGenres={(artistInfo.genres).slice(0,3)}
        setLookRecommend={setLookRecommend} />
  {/* 選ばれた類似曲のパラメータ取得 */}
      <ReTrackParams token={token}
        id={selectedRecommend.reTrackId}
        setReTrackInfo={setReTrackInfo} />
  {/* グラフコンポーネントへの値設定 */}
      <Grid container direction="row">
        <Grid item xs={12} sm={6}>
          {trackInfo.data !== undefined
            && reTrackInfo.data !== undefined
              && <ParamsGraph
        // 検索結果で選んだ曲のパラメータをグラフに投入
            trackName={props.trackName}
            FirstDanceAbility={trackInfo.data.danceability}
            FirstEnergy={trackInfo.data.energy}
            FirstLoudness={trackInfo.data.loudness}
            FirstPopularity={props.trackPopularity}
            FirstTempo={trackInfo.data.tempo}
            FirstValence={trackInfo.data.valence}
            FirstArtwork={props.trackArtworkUrl}
        // サジェストで選んだ曲のパラメータをグラフに投入
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
    {/* 類似曲の表示条件分岐 */}
      <Grid item xs={12} sm={6}>
        {lookRecommend !== undefined
          && (artistInfo.genres) !== undefined
            && <div className="recommend">
              <Typography component="h6" >
                {(artistInfo.genres).slice(0, 3).map(
                  (props, index) =>
                  <li key={index}>
                    <Button color="secondary">{props}</Button>
                  </li>)}
                のジャンルで{props.trackName}に似ている曲がこちら
              </Typography>
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
                    volumeToggle={volumeToggle}>
                  </TrackCard>
                </li>
              )}
            </ul></div>
        }
        </Grid>
        </Grid>
    </>
  )
}
export default Dashboard;
