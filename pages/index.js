import { Box, Button, Flex, Input, Text, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useStore } from 'react-redux';
import SpotifyWebApi from 'spotify-web-api-js';
import PlaylistView from '../src/component/Pages/Home/PlaylistView';
import { userLogin } from '../src/redux/action';
import CurrentTrack from '../src/component/Pages/Home/CurrentTrack';
import Profile from '../src/component/Pages/Home/Profile';
import ModalCenter from '../src/component/ModalCenter';
import { checkTrack, deletePlaylist, findToken, getPlaylist, showSearchRes } from '../src/utils/calls';

const Home = () => {
  const [sessToken, setSessToken] = useState('');
  const [user, setUser] = useState();
  const [curr, setCurrent] = useState('');
  const [userPl, setUserPl] = useState({
    items: [],
  });

  const [inputPl, setInputPl] = useState('');
  const [searchRes, setSearchRes] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [plModal, setPlModal] = useState();

  const spotify = new SpotifyWebApi();

  const dispatch = useDispatch();

  const states = useStore().getState();

  const toast = useToast({
    position: 'top',
    duration: 2400,
    isClosable: true,
  });

  useEffect(() => {
    const spotifyToken = findToken().access_token;
    window.location.hash = '';

    if (spotifyToken || sessToken || states.auth.token) {
      const token = spotifyToken ? spotifyToken : sessToken ? sessToken : states.auth.token;
      if (!states.auth.token) dispatch(userLogin(spotifyToken));
      setSessToken(token);

      spotify.setAccessToken(token);

      spotify
        .getMe()
        .then((user) => {
          setUser(user);
          getPlaylist(user.id, setUserPl);
        })
        .catch((e) => {
          console.log(e, 'line76');
          dispatch(userLogin(''));
          setSessToken('');
        });
    }
  }, []);

  const addToPlaylist = async (plId) => {
    if (!curr) {
      checkTrack(setCurrent);
      return;
    }
    toast({ title: 'Adding track to playlist...', status: 'loading' });

    const isExist = await checkIfExist(plId, curr.item.id);

    if (!isExist) {
      spotify.addTracksToPlaylist(plId, [curr.item.uri]).then(() => {
        toast({ title: 'Success adding track to playlist', status: 'info' });
        getPlaylist(user.id, setUserPl);
      });
    } else toast({ title: 'Track already in the playlist', status: 'warning' });
  };

  const checkIfExist = async (plId, tId) => {
    let tracks = await spotify.getPlaylistTracks(plId).then((tracks) => {
      return tracks;
    });
    let allTracks = tracks.items;
    while (tracks.next !== null) {
      const next = await spotify.getPlaylistTracks(plId, { offset: allTracks.length, limit: 100 });
      allTracks = [...allTracks, ...next.items];
      tracks = next;
    }

    let flag = false;

    allTracks.map((item, _) => {
      if (item.track.id === tId) flag = true;
    });

    return flag;
  };

  const checkIfPlExist = (plName) => {
    let flag = false;

    userPl.items.map((pl, _) => {
      if (pl.name === plName) flag = true;
    });

    return flag;
  };

  const newPlaylist = () => {
    if (checkIfPlExist(inputPl)) {
      toast({ title: 'Playlist with requested name exists', status: 'warning' });
      return;
    }

    spotify
      .createPlaylist(user.id, { name: inputPl })
      .then(() => {
        toast({ title: 'Success creating playlist', status: 'info' });
        getPlaylist(user.id, setUserPl);
      })
      .catch((e) => {
        toast({ title: 'ERROR WHILE CREATING PLAYLIST', status: 'warning' });
      });
  };

  const searchTrack = (key) => {
    if (key.length > 2) {
      spotify.searchTracks(key, { limit: 4 }).then((res) => {
        let totalRes = [];
        res.tracks.items.map((track, _) => {
          const name = track.name;
          let artistName = '';
          track.artists.map((art, idx) => {
            if (idx === 0) {
              artistName = `${art.name}`;
            } else {
              if (idx <= 2) {
                artistName = `${artistName}, ${art.name}`;
              }
            }
          });
          if (track.artists.length > 3) {
            artistName = `${artistName}, +${track.artists.length - 3}`;
          }

          const artist = artistName;
          const id = track.id;
          const img = track.album.images.length > 0 ? track.album.images[1].url : '';
          const obj = { value: id, label: name, img: img, artist: artist };
          totalRes.push(obj);
        });
        setSearchRes(totalRes);
      });
    } else setSearchRes([]);
  };

  const ModalBody = () => {
    return (
      <Flex>
        <Box bgColor={'redYoung'} width={'80px'} height={'80px'} marginRight={'8px'}>
          {plModal.images.length > 0 ? (
            <img src={plModal.images[0].url} style={{ objectFit: 'cover', width: 80, height: 80 }} />
          ) : (
            <Text>No Pict</Text>
          )}
        </Box>
        <Flex flexDir={'column'} justifyContent={'space-between'}>
          <Text noOfLines={1}>{plModal.name}</Text>
          <Text>Total track: {plModal.tracks.total}</Text>
        </Flex>
      </Flex>
    );
  };

  return (
    <Flex bg={'greenYoung'} justifyContent={'center'} w={'full'}>
      <Flex
        flexDir={'column'}
        bgColor={'orange'}
        w={'full'}
        maxW={'420px'}
        minH={'100vh'}
        p={'12px'}
        alignItems={'center'}
        pos={'relative'}>
        <Text
          pos={'absolute'}
          color={'white'}
          left={'20px'}
          p={'4px'}
          border={'1px'}
          borderRadius={'8px'}
          bgColor={'orange'}>
          v1.1.0
        </Text>
        {user && (
          <Flex flexDir={'column'} alignItems={'center'}>
            <Button
              border={'1px solid black'}
              onClick={() => {
                checkTrack(setCurrent);
              }}
              marginBottom={'12px'}
              bgColor={'yellow'}
              boxShadow={'xl'}>
              Check Current Track
            </Button>
          </Flex>
        )}
        <Profile user={user} sessToken={sessToken} />
        {curr && <CurrentTrack track={curr} />}
        {user && (
          <>
            <Input
              marginBottom={'12px'}
              width={'80%'}
              type={'search'}
              placeholder={'Cari lagu...'}
              _placeholder={{ fontSize: '14px', color: 'gray500' }}
              onBlur={(e) => searchTrack(e.target.value)}
              onChange={(e) => searchTrack(e.target.value)}
            />
            <Text>limit 4 per search</Text>
            {searchRes.length > 0 && (
              <Flex flexDir={'column'} maxH={'200px'} bgColor={'gray300'} paddingLeft={'12px'} w={'400px'}>
                {searchRes.map((res, idx) => {
                  return (
                    <Button
                      marginBottom={'12px'}
                      w={'full'}
                      key={idx.toString()}
                      onClick={() => showSearchRes(res.value, setCurrent, setSearchRes)}>
                      <Flex w={'full'}>
                        <img src={res.img} width={40} height={40} />
                        <Flex
                          flexDir={'column'}
                          w={'full'}
                          bgColor={'greenYoung'}
                          paddingTop={'2px'}
                          paddingBottom={'2px'}
                          justifyContent={'space-between'}>
                          <Text w={'full'} textAlign={'left'} marginLeft={'12px'}>
                            {res.label}
                          </Text>
                          <Flex>
                            <Text fontSize={'12px'} textAlign={'left'} marginLeft={'12px'}>
                              {res.artist}
                            </Text>
                          </Flex>
                        </Flex>
                      </Flex>
                    </Button>
                  );
                })}
              </Flex>
            )}
          </>
        )}
        {userPl.total > 0 && (
          <Box>
            <Flex marginBottom={'8px'}>
              <Text fontSize={'20px'} fontWeight={'bold'} marginRight={'20px'}>
                List Playlist
              </Text>
              <Input
                type={'text'}
                value={inputPl}
                placeholder={'Nama playlist...'}
                _placeholder={{ color: 'gray500', fontSize: '12px' }}
                onChange={(e) => setInputPl(e.target.value)}
                w={'140px'}
                fontSize={'14px'}
              />
              <Button
                marginLeft={'4px'}
                border={'1px solid black'}
                borderRadius={'8px'}
                bg={'yellow'}
                onClick={() => newPlaylist()}>
                +
              </Button>
            </Flex>
            <PlaylistView
              uId={user.id}
              plList={userPl}
              setPlModal={setPlModal}
              setOpenModal={setOpenModal}
              addToPlaylist={addToPlaylist}
            />
          </Box>
        )}
        {openModal && plModal && (
          <ModalCenter
            children={<ModalBody />}
            isOpen={openModal}
            onClickB1={() => deletePlaylist(plModal.id, user.id, setUserPl)}
            closeModal={() => setOpenModal(false)}
          />
        )}
      </Flex>
    </Flex>
  );
};

export default Home;
