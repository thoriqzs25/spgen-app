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
            mr={3}
            color={'white'}
            bgColor={'red'}
            borderWidth={'2px'}
            borderColor={'white'}
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
