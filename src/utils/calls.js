// import { useToast } from '@chakra-ui/react';

import SpotifyWebApi from 'spotify-web-api-js';

// const toast = useToast({
//   position: 'top',
//   duration: 2400,
//   isClosable: true,
// });

export const findToken = () => {
  return window.location.hash
    .substring(1)
    .split('&')
    .reduce((initial, item) => {
      let parts = item.split('=');
      initial[parts[0]] = decodeURIComponent(parts[1]);

      return initial;
    }, {});
};

export const checkTrack = (setter) => {
  const spotify = new SpotifyWebApi();
  // toast({ title: 'Finding current track...', status: 'loading' });
  spotify.getMyCurrentPlayingTrack().then((track) => {
    if (!track) {
      // toast.closeAll();
      // toast({ title: 'Gaada lagu yang diputar', status: 'warning' });
    } else {
      setTimeout(() => {
        // toast.closeAll();
      }, 800);
      setter(track);
      // console.log('Popularity: ', song.item.popularity, 'line 98');
    }
  });
};

export const getPlaylist = (plId, setter) => {
  const spotify = new SpotifyWebApi();
  spotify.getUserPlaylists(plId).then((pl) => {
    setter(pl);
  });
};

export const showSearchRes = (tId, setter, setToDefault) => {
  const spotify = new SpotifyWebApi();

  spotify.getTracks([tId]).then((res) => {
    setter({ item: res.tracks[0] });
    setToDefault([]);
  });
};

export const deletePlaylist = (plId, uId, setter) => {
  const spotify = new SpotifyWebApi();

  spotify.unfollowPlaylist(plId).then(() => {
    // toast({ title: 'Success deleting playlist', status: 'info' });
    getPlaylist(uId, setter);
  });
};
