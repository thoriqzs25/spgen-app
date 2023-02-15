import {
  Button,
  ModalContent,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
} from '@chakra-ui/react';

const ModalCenter = ({ children, closeModal, isOpen, onClickB1 }) => {
  return (
    <Modal isOpen={isOpen} onClose={() => closeModal()}>
      <ModalOverlay />
      <ModalContent bgColor={'gray300'}>
        <ModalHeader>Delete Playlist?</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>

        <ModalFooter>
          <Button
            bgColor={'red'}
            borderColor={'white'}
            borderWidth={'2px'}
            color={'white'}
            mr={3}
            onClick={() => {
              onClickB1();
              closeModal();
            }}>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalCenter;
