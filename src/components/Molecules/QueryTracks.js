import React,{ useEffect }from 'react'
import axios from 'axios'

const QueryTracks = React.memo((props) => {
  useEffect(() => {
    //曲名単語検索
    axios(`https://api.spotify.com/v1/search?query=${props.wordFormData}&type=track&limit=20`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + props.token,
        Accept: "application/json",
        "Content-type": "application/json"},
    })
      .then((trackContentsResponse) => {
        props.setItemResult(trackContentsResponse.data.tracks.items)
        console.log("🔻トラック検索結果：" + props.wordFormData)
        console.log(trackContentsResponse.data)
      })
      .catch((err) => {
        console.log("err:", err)
      })
  }, [props.wordFormData]
  )
  return (
    <div>
      { props.setItemResult }
    </div>
  )
})
export default QueryTracks;
