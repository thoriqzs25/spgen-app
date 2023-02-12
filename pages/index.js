import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import { urlLogin } from '../src/auth';

const Home = () => {
  const [token, setToken] = useState('');
  const [user, setUser] = useState();
  const [curr, setCurrent] = useState('');
  const [userPl, setUserPl] = useState({
    items: [],
  });

  const [inputPl, setInputPl] = useState('');

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
    // console.log('Spotify token...', findToken());

    const spotifyToken = findToken().access_token;
    window.location.hash = '';

    if (spotifyToken) {
      setToken(spotifyToken);

      spotify.setAccessToken(spotifyToken);

      spotify.getMe().then((user) => {
        setUser(user);
        getPlaylist(user.id);
        // console.log('My account...', user);
      });
    }
  }, []);

  const checkTrack = () => {
    spotify.getMyCurrentPlayingTrack().then((song) => {
      setCurrent(song);
      // console.log('Current Song:', song.item);
    });
    spotify.getcurrent;
  };

  const getPlaylist = (id) => {
    spotify.getUserPlaylists(id).then((pl) => {
      // spotify.getUserPlaylists(id, { limit: 4 }).then((pl) => {
      setUserPl(pl);
      console.log('User playlists...', pl.items);
    });
  };

  const deletePlaylist = (id) => {
    spotify.unfollowPlaylist(id).then(() => {
      console.log('Success deleting');
      getPlaylist(user.id);
    });
  };

  const addToPlaylist = (plId, tUri) => {
    spotify.addTracksToPlaylist(plId, tUri).then(() => {
      console.log('Success adding track to playlist');
      getPlaylist(user.id);
    });
  };

  const newPlaylist = () => {
    spotify
      .createPlaylist(user.id, { name: inputPl })
      .then(() => {
        console.log('Success creating new playlist');
        getPlaylist(user.id);
      })
      .catch((e) => {
        console.log('ERROR WHILE CREATING PLAYLIST', e);
      });
  };

  const Profile = () => {
    return (
      <Box marginBottom={'12px'}>
        {user && (
          <Flex flexDir={'column'} alignItems={'center'}>
            <Button border={'1px solid black'} onClick={checkTrack} marginBottom={'12px'}>
              Check Current Track
            </Button>
          </Flex>
        )}
        {user ? (
          <Flex>
            <Box bgColor={'redYoung'} width={'80px'} height={'80px'} marginRight={'8px'}>
              <img src={user.images[0].url} style={{ objectFit: 'cover', width: 80, height: 80, borderRadius: 40 }} />
            </Box>
            <Box>
              <Text>{`${user.display_name}, ${user.country}`}</Text>
              <Text>{user.id}</Text>
              <Text>{user.email}</Text>
            </Box>
          </Flex>
        ) : (
          <Button border={'1px solid black'}>
            <a href={urlLogin}>Login</a>
          </Button>
        )}
      </Box>
    );
  };

  const PlaylistCard = ({ item }) => {
    return (
      <Flex marginBottom={'8px'} justifyContent={'space-between'} alignItems={'center'}>
        <Flex>
          <Box bgColor={'redYoung'} width={'80px'} height={'80px'} marginRight={'8px'}>
            {item.images.length > 0 ? (
              <img src={item.images[0].url} style={{ objectFit: 'cover', width: 80, height: 80 }} />
            ) : (
              <Text>No Pict</Text>
            )}
          </Box>
          <Flex flexDir={'column'} justifyContent={'space-between'}>
            <Text noOfLines={1}>{item.name}</Text>
            <Text>Total track: {item.tracks.total}</Text>
          </Flex>
        </Flex>
        <Flex flexDir={'column'} h={'full'}>
          <Button
            justifySelf={'flex-end'}
            onClick={() => deletePlaylist(item.id)}
            cursor={'pointer'}
            borderRadius={'4px'}
            border={'1px solid white'}
            bgColor={'red'}
            color={'white'}
            p={'4px'}
            h={'24px'}
            fontSize={'12px'}
            marginBottom={'4px'}>
            <Text>Delete</Text>
          </Button>
          <Button
            justifySelf={'flex-end'}
            onClick={() => {
              if (curr.item?.uri) addToPlaylist(item.id, [curr.item.uri]);
              else checkTrack();
            }}
            cursor={'pointer'}
            borderRadius={'4px'}
            border={'1px solid white'}
            bgColor={'greenYoung'}
            color={'white'}
            p={'4px'}
            h={'24px'}
            fontSize={'12px'}>
            <Text>Add</Text>
          </Button>
        </Flex>
      </Flex>
    );
  };

  return (
    <Flex bg={'greenYoung'} justifyContent={'center'} w={'full'}>
      <Flex
        flexDir={'column'}
        bgColor={'white'}
        w={'full'}
        maxW={'420px'}
        minH={'100vh'}
        p={'12px'}
        alignItems={'center'}>
        <Profile />
        {curr && (
          <Flex
            flexDir={'column'}
            alignItems={'center'}
            marginBottom={'12px'}
            bgColor={'background'}
            w={'full'}
            paddingBottom={'8px'}>
            <Text>{curr.item.name}</Text>
            <img src={curr.item.album.images[1].url} width={80} height={80} />
          </Flex>
        )}
        {userPl.total > 0 && (
          <Box>
            <Flex marginBottom={'8px'}>
              <Text fontSize={'20px'} fontWeight={'bold'} marginRight={'20px'}>
                List Playlist
              </Text>
              <Input
                type={'text'}
                placeholder={'Nama playlist...'}
                onChange={(e) => {
                  setInputPl(e.target.value);
                }}
                w={'140px'}
              />
              <Button border={'1px solid black'} borderRadius={'8px'} onClick={() => newPlaylist()}>
                +
              </Button>
            </Flex>
            <Box w={'320px'} maxH={'400px'} bgColor={'yellowYoung'} overflowY={'scroll'} paddingTop={'8px'}>
              {userPl.items.map((pl, idx) => {
                return <PlaylistCard item={pl} key={idx.toString()} />;
              })}
            </Box>
          </Box>
        )}
      </Flex>
    </Flex>
  );
};

export default Home;
