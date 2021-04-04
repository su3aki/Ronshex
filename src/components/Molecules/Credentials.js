import React,{ useEffect }from 'react'
import axios from 'axios'

const Credentials = React.memo((props) => {
  useEffect(() => {
    axios("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization:
        "Basic " + btoa(process.env.REACT_APP_clientId + ":" + process.env.REACT_APP_clientSecret),
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: "grant_type=client_credentials"
    }).then((tokenResponse) => {
      console.log(
          "アクセストークン："
          + tokenResponse.data.access_token)
          {props.setToken(tokenResponse.data.access_token)}
    }
    )
  }, [])
  return (
    <div>
      { props.setToken }
    </div>
  )
  })
export default Credentials;
