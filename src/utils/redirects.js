import { CLIENT_ID } from '../../key';

var querystring = require('querystring');

// **prod
// const redirect_uri = 'http://spgen-app.vercel.app/';
// **dev
// const redirect_uri = 'http://localhost:8888/';

const scope =
  'user-read-private user-read-email user-read-currently-playing user-read-playback-state playlist-modify-public playlist-modify-private playlist-read-private';

export const urlLogin =
  'https://accounts.spotify.com/authorize?' +
  querystring.stringify({
    response_type: 'token',
    client_id: CLIENT_ID,
    scope: scope,
    // redirect_uri: redirect_uri,
  });

export const newLogin =
  'https://accounts.spotify.com/authorize?' +
  querystring.stringify({
    response_type: 'token',
    client_id: CLIENT_ID,
    scope: scope,
    show_dialog: true,
    // redirect_uri: redirect_uri,
  });
