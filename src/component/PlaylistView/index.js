import { Box, Button, Flex, Text } from '@chakra-ui/react';

const PlaylistView = ({ plList, setPlModal, setOpenModal, addToPlaylist }) => {
  const PlaylistCard = ({ item }) => {
    return (
      <Flex marginBottom={'8px'} justifyContent={'space-between'} alignItems={'center'}>
        <Flex>
          <Box width={'80px'} height={'80px'} marginRight={'8px'}>
            <Flex
              cursor={'pointer'}
              pos={'relative'}
              w={'full'}
              h={'full'}
              onClick={() => router.push({ pathname: '/playlist', query: { userId: user.id, plId: item.id } })}>
              <Flex
                pos={'absolute'}
                opacity={0}
                _hover={{ opacity: 0.85 }}
                width={'80px'}
                height={'80px'}
                zIndex={10}
                bgColor={'gray700'}
                alignItems={'center'}>
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
              addToPlaylist(item.id);
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
    <Box
      sx={{
        '&::-webkit-scrollbar': {
          width: '16px',
          borderRadius: '8px',
          backgroundColor: `rgba(0, 0, 0, 0.05)`,
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: `rgba(0, 0, 0, 0.05)`,
        },
      }}
      paddingLeft={'10px'}
      paddingRight={'10px'}
      w={'340px'}
      maxH={'400px'}
      bgColor={'yellow'}
      overflowY={'scroll'}
      paddingTop={'8px'}>
      {plList.items.map((pl, idx) => {
        return <PlaylistCard item={pl} key={idx.toString()} />;
      })}
    </Box>
  );
};

export default PlaylistView;
