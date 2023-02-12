import axios from 'axios';
import queryString from 'query-string';
import { CLIENT_ID } from '../key';

var querystring = require('querystring');

// export const auth = () => {
//   const generateRandomString = (length) => {
//     var text = '';
//     var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

//     for (var i = 0; i < length; i++) {
//       text += possible.charAt(Math.floor(Math.random() * possible.length));
//     }
//     return text;
//   };

//   const redirect_uri = 'http://localhost:8888/';
//   const state = generateRandomString(16);
//   const scope = 'user-read-private user-read-email user-read-currently-playing user-read-playback-state';

//   const url =
//     'https://accounts.spotify.com/authorize?' +
//     querystring.stringify({
//       response_type: 'code',
//       client_id: CLIENT_ID,
//       scope: scope,
//       redirect_uri: redirect_uri,
//       state: state,
//     });

//   axios
//     .get(url)
//     .then(function (response) {
//       // handle success
//     })
//     .catch(function (error) {
//       // handle error
//     });
// };

const scope = 'user-read-private user-read-email user-read-currently-playing user-read-playback-state';
const redirect_uri = 'http://spgen-app.vercel.app/';
// const redirect_uri = 'http://localhost:8888/';

export const urlLogin =
  'https://accounts.spotify.com/authorize?' +
  querystring.stringify({
    response_type: 'token',
    client_id: CLIENT_ID,
    scope: scope,
    redirect_uri: redirect_uri,
    show_dialog: true,
  });
