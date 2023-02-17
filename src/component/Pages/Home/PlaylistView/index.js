import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

const PlaylistView = ({ uId, plList, setPlModal, setIsModal, addToPlaylist, trackAvailPl, removeFromPlaylist }) => {
  const router = useRouter();

  const PlaylistCard = ({ item }) => {
    // const [exist, setExist] = useState();
    const exist = trackAvailPl.includes(item.id);

    return (
      <Flex marginBottom={'8px'} justifyContent={'space-between'} alignItems={'center'}>
        <Flex>
          <Box width={'80px'} height={'80px'} marginRight={'8px'}>
            <Flex
              w={'full'}
              h={'full'}
              pos={'relative'}
              cursor={'pointer'}
              onClick={() => router.push({ pathname: '/playlist', query: { userId: uId, plId: item.id } })}>
              <Flex
                zIndex={10}
                opacity={0}
                width={'80px'}
                height={'80px'}
                pos={'absolute'}
                bgColor={'gray700'}
                alignItems={'center'}
                _hover={{ opacity: 0.85 }}>
                <Text color={'white'} textAlign={'center'} fontWeight={'bold'}>
                  Show Details
                </Text>
              </Flex>
              {item.images.length > 0 ? (
                <img src={item.images[0].url} style={{ objectFit: 'cover', width: 80, height: 80 }} />
              ) : (
                <Text bgColor={'redYoung'} w={'full'} h={'full'} textAlign={'center'}>
                  No Pict
                </Text>
              )}
            </Flex>
          </Box>
          <Flex flexDir={'column'} justifyContent={'space-between'}>
            <Text noOfLines={1}>{item.name}</Text>
            {/* <Text noOfLines={1}>{!item.public ? 'public' : 'private'}</Text> */}
            <Text>Total track: {item.tracks.total}</Text>
          </Flex>
        </Flex>
        <Flex flexDir={'column'} h={'full'}>
          <Button
            p={'4px'}
            h={'24px'}
            w={'60px'}
            bgColor={'red'}
            color={'white'}
            fontSize={'12px'}
            cursor={'pointer'}
            borderRadius={'4px'}
            marginBottom={'4px'}
            justifySelf={'flex-end'}
            border={'1px solid white'}
            onClick={() => {
              setPlModal(item);
              setIsModal(true);
            }}>
            <Text>Delete</Text>
          </Button>
          <Button
            p={'4px'}
            h={'24px'}
            color={exist ? 'red' : 'white'}
            fontSize={'12px'}
            cursor={'pointer'}
            borderRadius={'4px'}
            bgColor={exist ? 'white' : 'greenYoung'}
            justifySelf={'flex-end'}
            border={'1px solid'}
            borderColor={exist ? 'red' : 'white'}
            onClick={() => {
              if (exist) removeFromPlaylist(item.id);
              else addToPlaylist(item.id);
            }}>
            <Text>{exist ? 'Remove' : 'Add'}</Text>
          </Button>
        </Flex>
      </Flex>
    );
  };

  return (
    <Box
      w={'340px'}
      maxH={'400px'}
      bgColor={'yellow'}
      paddingTop={'8px'}
      overflowY={'scroll'}
      borderRadius={'6px'}
      paddingLeft={'10px'}
      paddingRight={'10px'}
      sx={{
        '&::-webkit-scrollbar': {
          width: '12px',
          borderRadius: '12px',
          backgroundColor: `rgba(0, 0, 0, 0.25)`,
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: `rgba(0, 0, 0, 0.05)`,
        },
      }}>
      {plList.map((pl, idx) => {
        return <PlaylistCard item={pl} key={idx.toString()} />;
      })}
    </Box>
  );
};

export default PlaylistView;
