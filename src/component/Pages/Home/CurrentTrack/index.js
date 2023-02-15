import { Flex, Text } from '@chakra-ui/react';

const CurrentTrack = ({ track }) => {
  return (
    <Flex
      flexDir={'column'}
      alignItems={'center'}
      marginBottom={'12px'}
      bgColor={'background'}
      w={'full'}
      paddingBottom={'8px'}
      borderRadius={'10'}
      shadow={'base'}>
      <Text>
        {track.item.name}: {track.item.popularity}/100
      </Text>
      <img src={track.item.album.images[1].url} width={80} height={80} />
    </Flex>
  );
};

export default CurrentTrack;
