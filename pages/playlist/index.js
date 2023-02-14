import { Box, Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

const PlaylistPage = () => {
  const router = useRouter();
  const { userId, plId } = router.query;
  const [item, setItem] = useState();

  const spotify = new SpotifyWebApi();

  const getPlaylistById = () => {
    spotify.getPlaylist(plId).then((res) => {
      setItem(res);
    });
  };

  useEffect(() => {
    getPlaylistById();
  }, []);

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
        {item ? (
          <Flex w={'full'}>
            <Box>
              {item.images.length > 0 ? (
                <img src={item.images[0].url} style={{ objectFit: 'cover', width: 80, height: 80 }} />
              ) : (
                <Text bgColor={'redYoung'} w={'full'} h={'full'} textAlign={'center'}>
                  No Pict
                </Text>
              )}
            </Box>
            <Box>
              <Text>{item.name}</Text>
              <Text>{item.tracks.total}</Text>
            </Box>
          </Flex>
        ) : (
          <Text>Loading...</Text>
        )}
      </Flex>
    </Flex>
  );
};

export default PlaylistPage;
