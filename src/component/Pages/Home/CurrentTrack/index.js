import { Flex, Text } from '@chakra-ui/react';

const CurrentTrack = ({ track }) => {
  let arrArtists = track.item.artists;
  let artistName = '';
  let excessCount = '';
  if (arrArtists.length > 3) {
    excessCount = `, +${arrArtists.length - 3}`;
  }

  arrArtists = arrArtists.slice(0, 3);

  arrArtists.map((art, idx) => {
    if (idx === 0) {
      artistName = `${art.name}`;
    } else artistName = `${artistName}, ${art.name}`;
  });

  return (
    <Flex
      w={'full'}
      shadow={'base'}
      flexDir={'column'}
      paddingTop={'4px'}
      borderRadius={'10'}
      alignItems={'center'}
      marginBottom={'12px'}
      paddingBottom={'4px'}
      bgColor={'background'}>
      <Text marginBottom={'4px'}>{track.item.name}</Text>
      <Flex alignItems={'center'} pos={'relative'}>
        <img src={track.item.album.images[1].url} width={80} height={80} />
        <Flex flexDir={'column'} pos={'absolute'} right={'-120px'} bgColor={'blue.200'} borderRadius={'8px'} p={'8px'}>
          <Text fontWeight={'bold'} textAlign={'center'}>
            Popularity
          </Text>
          <Text fontWeight={'bold'} textAlign={'center'}>
            {track.item.popularity}/100
          </Text>
        </Flex>
      </Flex>
      <Text fontSize={'12px'} marginTop={'8px'}>
        {artistName}
      </Text>
    </Flex>
  );
};

export default CurrentTrack;
