import { Button, Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import { auth, urlLogin } from '../src/requests';
import { getAudioFeatures_Track, getAuth, getUser } from '../src/scripts';

const Home = () => {
  const [token, setToken] = useState('');
  const spotify = new SpotifyWebApi();

  const findToken = () => {
    return window.location.hash
      .substring(1)
      .split('&')
      .reduce((initial, item) => {
        let parts = item.split('=');
        initial[parts[0]] = decodeURIComponent(parts[1]);

        return initial;
      }, {});
  };

  useEffect(() => {
    console.log('Spotify token...', findToken());

    const spotifyToken = findToken().access_token;
    window.location.hash = '';

    if (spotifyToken) {
      setToken(spotifyToken);

      spotify.setAccessToken(spotifyToken);

      spotify.getMe().then((user) => {
        console.log('My account...', user);
      });
    }
  }, []);

  const checkTrack = () => {
    spotify.getMyCurrentPlayingTrack().then((song) => {
      console.log('Current Song:', song.item.name);
    });
    spotify.getcurrent;
  };

  const Profile = () => {
    return (
      <Flex justifyContent={'space-around'}>
        <a href={urlLogin}>
          <Button border={'1px solid black'}>Login</Button>
        </a>
        <Button border={'1px solid black'} onClick={checkTrack}>
          Check Current Track
        </Button>
      </Flex>
    );
  };

  return (
    <Flex bg={'greenYoung'} justifyContent={'center'} w={'full'}>
      <Flex bgColor={'white'} w={'full'} maxW={'420px'} minH={'100vh'} p={'12px'} justifyContent={'center'}>
        <Profile />
      </Flex>
    </Flex>
  );
};

export default Home;
