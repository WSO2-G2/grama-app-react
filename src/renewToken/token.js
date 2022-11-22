import axios from "axios";

export async function renewToken(){
    const refreshToken = JSON.parse(localStorage.getItem("API_TOKEN")).refresh_token
    const response = await axios.post(
        'https://sts.choreo.dev/oauth2/token',
        new URLSearchParams({
            'grant_type': 'refresh_token',
            'refresh_token': refreshToken
        }),
        {
            headers: {
                'Authorization': 'Basic VmhnbjEzMXI4Y0lnRjNTeGFlYlFzdnZJMnlBYTppZDFTVmI5WW5XNG4xUzM5cUpLRUhpU08wX1Vh'
            }
        }
    );

    const responseJSON = await response.json();
    console.log("About to change the current access token and refresh token...")
    try {
        localStorage.setItem("API_TOKEN", JSON.stringify(responseJSON))
        return responseJSON.access_token;
    } catch (error) {
        console.log("An error occured...")
        console.log(error)
    }
    
}

export function isTokenExpired(){
    const accessToken = JSON.parse(localStorage.getItem("API_TOKEN")).access_token
    // const accessToken = "eyJ4NXQiOiJNV1E1TldVd1lXWmlNbU16WlRJek16ZG1NekJoTVdNNFlqUXlNalZoTldNNE5qaGtNR1JtTnpGbE1HSTNaRGxtWW1Rek5tRXlNemhoWWpCaU5tWmhZdyIsImtpZCI6Ik1XUTVOV1V3WVdaaU1tTXpaVEl6TXpkbU16QmhNV000WWpReU1qVmhOV000Tmpoa01HUm1OekZsTUdJM1pEbG1ZbVF6Tm1FeU16aGhZakJpTm1aaFl3X1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI2Yzk4YjA0Zi02MjYyLTRlNDQtYjMwMy1mOGZiNTM5MzBjNmEiLCJhdXQiOiJBUFBMSUNBVElPTl9VU0VSIiwiYXVkIjoiVmhnbjEzMXI4Y0lnRjNTeGFlYlFzdnZJMnlBYSIsIm5iZiI6MTY2OTAyNzA3OCwiYXpwIjoiVmhnbjEzMXI4Y0lnRjNTeGFlYlFzdnZJMnlBYSIsInNjb3BlIjoiZGVmYXVsdCIsIm9yZ2FuaXphdGlvbiI6eyJ1dWlkIjoiN2ZhMmMxYTQtMmJmYy00YzU4LTg5OWYtOTU2OWMxMTIxNTBiIn0sImlzcyI6Imh0dHBzOlwvXC9zdHMuY2hvcmVvLmRldjo0NDNcL29hdXRoMlwvdG9rZW4iLCJleHAiOjE2NjkwMzA2NzgsImlkcF9jbGFpbXMiOnsibmFtZSI6IkhhYXRoaW0gTXVuYXMiLCJlbWFpbCI6ImhhYXRoaW1tdW5hc0BnbWFpbC5jb20ifSwiaWF0IjoxNjY5MDI3MDc4LCJqdGkiOiJiYTEzOTcxNy0zMGVhLTQxNWUtOGMyZC0yNDYzOGE1NWQ0OGQifQ.bUPUggz7VDKQ39Hqe65Rp4yuTFOvkDvo4QZeCb86nMr84xgabdKeU47rPjV8t8qGgyeEEn3ltLBSFXz0UKzA0NZyTqPl55kp-nBWftQmL4_k5sCBY3Vr7igNB2Z2RVfEGveaev4-UkyVLc0u0NjO5_tjUG8QZqs1_Tf71O98uNArSkURKw4QJhLsucFo-21nTqYghBBj7gPBTZ0MNgdSEkCi37pU6DN1w4fVZxCrzyjkRtdJmcCWbs07HMNXnLjDLkXzQbCQh0hwmB84WYBVPKFFG3NxR5moEN5m6rCLg7Wd4tZe3a2xn2B-npj_KV-iBnAkeNox9dwh7RFsuBBKn0xN2KvfmtqWpX42m0iF6AOtnb8h71xXeM0zWp8SlikANOKnjWc425VPkMKIqqtGa35u9PZ-6N-igaZw16OMaC_cDvzWvKQgqetMGmh8lpmg5PBFhlOqQfao2rbmjpuwWHJ94gGZu5s2MV1FoRwP2A8AL03DD78jBjeHmVv6U46aVBH2qk7bqlqKqMRUIktdHOmEl5_dnMlx3HZBHErWGtyw6LyAtPmWi_rp-6WpFZauGjkvOfdHzfM5jPYEGDG1_mrInHOT-TZftnIpnvpwumrHNTSUyawJzzWun9ge_RriUbmNYDmtJHRXoAzVITDD1XQ7RC5SrpvpPzOLFBP1gaY"
    const decode = JSON.parse(atob(accessToken.split('.')[1]));
    return decode.exp * 1000 < new Date().getTime();
}

export function checkTokenAndRenew(){
    if(isTokenExpired()){
        console.log("Token is expired")
        const refreshToken = JSON.parse(localStorage.getItem("API_TOKEN")).refresh_token
        return axios.post(
          'https://sts.choreo.dev/oauth2/token',
          new URLSearchParams({
              'grant_type': 'refresh_token',
              'refresh_token': refreshToken
          }),
          {
              headers: {
                  'Authorization': 'Basic VmhnbjEzMXI4Y0lnRjNTeGFlYlFzdnZJMnlBYTppZDFTVmI5WW5XNG4xUzM5cUpLRUhpU08wX1Vh'
              }
          }
        )
        .then((response) => {
          console.log("Changing access token")
          localStorage.setItem("API_TOKEN",JSON.stringify(response.data))
        })
        .catch((err) => console.log(err))
      }          
}



