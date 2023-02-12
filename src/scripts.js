// const axios = require('axios');
// const qs = require('qs');
// const key = require('../key');

// const REDIRECT_URI = 'http://localhost:8888/';
// const client_id = key.CLIENT_ID;
// const client_secret = key.CLIENT_SCR;
// const auth_token = Buffer.from(`${client_id}:${client_secret}`, 'utf-8').toString('base64');

// export const getAuth = async () => {
//   try {
//     //make post request to SPOTIFY API for access token, sending relavent info
//     const token_url = 'https://accounts.spotify.com/api/token';
//     const data = qs.stringify({ grant_type: 'client_credentials' });

//     const response = await axios.post(token_url, data, {
//       headers: {
//         Authorization: `Basic ${auth_token}`,
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//     });
//     //return access token
//     return response.data.access_token;
//     //console.log(response.data.access_token);
//   } catch (error) {
//     //on fail, log the error in console
//     console.log(error);
//   }
// };

// export const getUser = async (token) => {
//   const usedToken = 'Bearer ' + token;
//   console.log('token', usedToken, 'line 32');
//   try {
//     //make post request to SPOTIFY API for access token, sending relavent info
//     const token_url = 'https://api.spotify.com/v1/me';

//     const response = await axios.post(token_url, {
//       headers: {
//         Authorization: usedToken,
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//     });

//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getAudioFeatures_Track = async (track_id) => {
//   //request token using getAuth() function
//   const access_token = await getAuth();
//   //console.log(access_token);

//   const api_url = `https://api.spotify.com/v1/audio-features/${track_id}`;
//   //console.log(api_url);
//   try {
//     const response = await axios.get(api_url, {
//       headers: {
//         Authorization: `Bearer ${access_token}`,
//       },
//     });
//     //console.log(response.data);
//     return response.data;
//   } catch (error) {
//     console.log(error);
//   }
// };
