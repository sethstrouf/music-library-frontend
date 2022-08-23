import axios from "axios"

const getToken = async () => {
  const res = await axios({
    method: 'post',
    url: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`,
    headers: { 'content-type': 'application/json' },
    data: { client_id: process.env.REACT_APP_CLIENT_ID,
            client_secret: process.env.REACT_APP_CLIENT_SECRET,
            audience: process.env.REACT_APP_AUTH0_AUDIENCE,
            grant_type:"client_credentials"
    }
  })

  return `${res.data.token_type} ${res.data.access_token}`
}

export default getToken
