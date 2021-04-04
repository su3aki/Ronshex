import React, { useEffect } from 'react'
import axios from 'axios'

const ArtistParams = React.memo((props) => {
  useEffect(() => {
    //受け取ったアーティストIDから
    axios(`https://api.spotify.com/v1/artists/${props.artistId}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + props.token,
        Accept: "application/json",
        "Content-type": "application/json"}
    }).then((artistResponse) => {
      props.setArtistInfo(artistResponse.data)
      console.log(artistResponse.data)
    })
    .catch((err) => {
        console.log("err:", err)
      })
  }, [props.artistId])
  return (
    <div>
      { props.setArtistInfo }
    </div>
  )
})
export default ArtistParams;
