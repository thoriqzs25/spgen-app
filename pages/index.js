import { Flex, Text } from '@chakra-ui/react';

const Home = () => {
  const Profile = () => {
    return <Flex>profile</Flex>;
  };

  return (
    <Flex justifyContent={'center'} w={'full'}>
      <Flex bgColor={'redYoung'} w={'full'} maxW={'420px'}>
        <Profile />
      </Flex>
    </Flex>
  );
};

export default Home;
