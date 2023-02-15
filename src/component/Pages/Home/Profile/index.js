import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { newLogin, urlLogin } from '../../../../utils/redirects';

const Profile = ({ user, sessToken }) => {
  return (
    <Box marginBottom={'12px'}>
      {user ? (
        <Flex>
          <Box bgColor={'white'} width={'80px'} height={'80px'} marginRight={'8px'}>
            <img src={user.images[0].url} style={{ objectFit: 'cover', width: 80, height: 80, borderRadius: 40 }} />
          </Box>
          <Box>
            <Text>{`${user.display_name}, ${user.country}`}</Text>
            <Text>{user.id}</Text>
            <Text>{user.email}</Text>
          </Box>
          <Button border={'1px solid black'} fontSize={'12px'} p={'8px'} bgColor={'yellow'}>
            <a href={newLogin}>Switch</a>
          </Button>
        </Flex>
      ) : sessToken ? (
        <Text>Loading...</Text>
      ) : (
        <Button border={'1px solid black'} bgColor={'yellow'}>
          <a href={urlLogin}>Login</a>
        </Button>
      )}
    </Box>
  );
};

export default Profile;
