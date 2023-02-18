import react from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalOverlay,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

const ModalAlert = ({
  isOpen,
  onClose,
  title,
  msg,
  tryAgain,
  AdviserForReload,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color={title === "Game over" ? "red" : "green"}>
          {title}
        </ModalHeader>
        <ModalBody>{msg}</ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => {
              onClose();
            }}
          >
            {AdviserForReload ? "Try Again" : "Back to menu"}
          </Button>
          {tryAgain && (
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                onClose(tryAgain);
              }}
            >
              Try again
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export { ModalAlert };
