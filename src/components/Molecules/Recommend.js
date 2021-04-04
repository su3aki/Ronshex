import React, { useEffect } from 'react'
import axios from 'axios'

const Recommend = (props) => {
  console.log(props.artistGenres)
  useEffect(() => {
    //曲IDからトラックパラメータ取得
    axios(`https://api.spotify.com/v1/recommendations?limit=10&seed_artists=${props.artistId}&seed_genres=${props.artistGenres}&seed_tracks=${props.trackId}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + props.token,
        Accept: "application/json",
        "Content-type": "application/json"}
    }).then((recommendResponse) => {
      props.setLookRecommend(recommendResponse.data.tracks)
      console.log(recommendResponse.data)
    })
    .catch((err) => {
        console.log("err:", err)
      })
  }, [props.trackId])
  return (
    <div>
      { props.setLookRecommend }
    </div>
  )

}
export default Recommend;
