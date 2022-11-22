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
    const decode = JSON.parse(atob(accessToken.split('.')[1]));
    return decode.exp * 1000 > new Date().getTime();
}

