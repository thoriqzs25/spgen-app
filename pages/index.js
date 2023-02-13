import {
  Box,
  Button,
  Flex,
  Input,
  ModalContent,
  Text,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import { urlLogin, newLogin } from '../src/auth';

const Home = () => {
  const [token, setToken] = useState('');
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

  const toast = useToast({
    position: 'top',
    duration: 2400,
    isClosable: true,
  });

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
    const spotifyToken = findToken().access_token;
    window.location.hash = '';

    if (spotifyToken) {
      setToken(spotifyToken);

      spotify.setAccessToken(spotifyToken);

      spotify.getMe().then((user) => {
        setUser(user);
        getPlaylist(user.id);
      });
    }
  }, []);

  const checkTrack = () => {
    toast({ title: 'Finding current track...', status: 'loading' });
    spotify.getMyCurrentPlayingTrack().then((song) => {
      if (!song) {
        toast({ title: 'Gaada lagu yang diputar', status: 'warning' });
      } else setCurrent(song);
      setTimeout(() => {
        console.log('line 76');
        toast.closeAll();
      }, 700);
    });
  };

  const getPlaylist = (id) => {
    spotify.getUserPlaylists(id).then((pl) => {
      // spotify.getUserPlaylists(id, { limit: 4 }).then((pl) => {
      setUserPl(pl);
    });
  };

  const deletePlaylist = (id) => {
    spotify.unfollowPlaylist(id).then(() => {
      toast({ title: 'Success deleting playlist', status: 'info' });
      getPlaylist(user.id);
    });
  };

  const addToPlaylist = async (plId, tUri) => {
    let tracks = await spotify.getPlaylistTracks(plId).then((tracks) => {
      return tracks;
    });
    let allTracks = tracks.items;
    while (tracks.next !== null) {
      const next = await spotify.getPlaylistTracks(plId, { offset: allTracks.length, limit: 100 });
      allTracks = [...allTracks, ...next.items];
      tracks = next;
    }

    if (!checkIfExist(allTracks, tUri)) {
      spotify.addTracksToPlaylist(plId, tUri).then(() => {
        getPlaylist(user.id);
        toast({ title: 'Success adding track to playlist', status: 'info' });
      });
    } else toast({ title: 'Track already in the playlist', status: 'warning' });
  };

  const checkIfExist = (data, tUri) => {
    const tId = tUri[0].split(':')[2];
    let flag = false;

    data.map((item, _) => {
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
        getPlaylist(user.id);
      })
      .catch((e) => {
        toast({ title: 'ERROR WHILE CREATING PLAYLIST', status: 'warning' });
      });
  };

  const searchTrack = (key) => {
    if (key.length > 2) {
      spotify.searchTracks(key).then((res) => {
        let totalRes = [];
        res.tracks.items.map((track, _) => {
          const name = track.name;
          const id = track.id;
          const img = track.album.images.length > 0 ? track.album.images[1].url : '';
          const obj = { value: id, label: name, img: img };
          totalRes.push(obj);
        });
        setSearchRes(totalRes);
      });
    } else setSearchRes([]);
  };

  const showSearchRes = (id) => {
    spotify.getTracks([id]).then((res) => {
      setCurrent({ item: res.tracks[0] });
      setSearchRes([]);
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
            <Button border={'1px solid black'} fontSize={'12px'} p={'8px'}>
              <a href={newLogin}>Switch</a>
            </Button>
          </Flex>
        ) : (
          <Button border={'1px solid black'}>
            <a href={urlLogin}>Login</a>
          </Button>
        )}
      </Box>
    );
  };

  const Playlist = () => {
    return (
      <Box
        paddingLeft={'10px'}
        paddingRight={'10px'}
        w={'340px'}
        maxH={'400px'}
        bgColor={'yellowYoung'}
        overflowY={'scroll'}
        paddingTop={'8px'}>
        {userPl.items.map((pl, idx) => {
          return <PlaylistCard item={pl} key={idx.toString()} />;
        })}
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
            onClick={() => {
              setPlModal(item);
              setOpenModal(true);
            }}
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
        alignItems={'center'}
        pos={'relative'}>
        <Text pos={'absolute'} color={'white'} left={'20px'} p={'4px'} borderRadius={'8px'} bgColor={'blue.300'}>
          v1.0.0
        </Text>
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
            <Text>limit 20 per search</Text>
            {searchRes.length > 0 && (
              <Flex
                flexDir={'column'}
                maxH={'200px'}
                bgColor={'gray300'}
                overflowY={'scroll'}
                paddingLeft={'12px'}
                w={'400px'}>
                {searchRes.map((res, idx) => {
                  return (
                    <Button
                      marginBottom={'12px'}
                      w={'full'}
                      key={idx.toString()}
                      onClick={() => showSearchRes(res.value)}>
                      <Flex w={'full'}>
                        <img src={res.img} width={40} height={40} />
                        <Flex w={'full'} bgColor={'greenYoung'}>
                          <Text w={'full'} bgColor={'yellow'} textAlign={'left'} marginLeft={'12px'}>
                            {res.label}
                          </Text>
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
                bg={'Highlight'}
                onClick={() => newPlaylist()}>
                +
              </Button>
            </Flex>
            <Playlist />
          </Box>
        )}
        {openModal && plModal && (
          <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
            <ModalOverlay />
            <ModalContent bgColor={'gray300'}>
              <ModalHeader>Delete Playlist?</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
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
              </ModalBody>

              <ModalFooter>
                <Button
                  bgColor={'red'}
                  borderColor={'white'}
                  borderWidth={'2px'}
                  color={'white'}
                  mr={3}
                  onClick={() => {
                    deletePlaylist(plModal.id);
                    setOpenModal(false);
                  }}>
                  Delete
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </Flex>
    </Flex>
  );
};

export default Home;
