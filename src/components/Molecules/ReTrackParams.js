import React, { useEffect } from 'react'
import axios from 'axios'

const ReTrackParams = (props) => {
  useEffect(() => {
    //曲IDからトラックパラメータ取得
    axios(`https://api.spotify.com/v1/audio-features/${props.id}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + props.token,
        Accept: "application/json",
        "Content-type": "application/json"}
    }).then((reTrackInfoResponse) => {
      props.setReTrackInfo(reTrackInfoResponse)
      console.log(reTrackInfoResponse)
    })
    .catch((err) => {
        console.log("err:", err)
      })
  }, [props.id])
  return (
    <div>
      { props.setReTrackInfo }
    </div>
  )
}
export default ReTrackParams;
