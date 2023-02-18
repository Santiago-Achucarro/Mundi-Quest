import { Box, Button, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import { BoxAttempts } from "./BoxAttempts";
import { FlagBox } from "./FlagBox";
import { OptionsBox } from "./OptionsBox";
import { ModalAlert } from "./ModalAlert";
import { FlagContext } from "@/addons/FlagContext";
const BoxCountry = () => {
  const router = useRouter();

  const { decodedModes, endpoint } = useContext(FlagContext);
  let mode;
  decodedModes ? (mode = JSON.parse(decodedModes)) : (mode = "");
  const tryAgain = true;
  const [gameOverModalOpen, setGameOverModalOpen] = useState(false);
  const [gameWonModalOpen, setGameWonModalOpen] = useState(false);

  const handleMenu = (tryAgain) => {
    if (tryAgain) {
      sessionStorage.clear();
    } else {
      router.push({
        pathname: "/",
      });
      sessionStorage.clear();
    }
  };

  let attempts = JSON.parse(sessionStorage.getItem("Attempts"));

  useEffect(() => {
    const checkGameOver = () => {
      if (attempts?.missed == mode[0]?.missed) {
        setGameOverModalOpen(true);
      } else if (attempts?.pass == mode[0]?.pass) {
        setGameWonModalOpen(true);
      }
    };
    checkGameOver();
  }, [attempts, mode]);

  return (
    <Box
      width={{ base: "100%", md: "80%", lg: "60%" }}
      height="100%"
      display="flex"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        width="100%"
        height={{ base: "35%", md: "40%", xl: "30%" }}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <FlagBox />
      </Box>
      <Box
        color="white"
        mb="2"
        mt={"1"}
        fontSize={{ base: "20px", md: "30px" }}
      >
        <h1>
          Level: <strong>{mode[0].mode}</strong>
        </h1>
      </Box>
      <Box
        width="100%"
        display="flex"
        flexDir={{ base: "column" }}
        justifyContent="center"
        alignItems="center"
      >
        <Box width={{ base: "70%", md: "50%" }}>
          <BoxAttempts handleMenu={handleMenu} tryAgain={tryAgain} />
        </Box>
        <Box width={{ base: "100%", md: "50%" }}>
          <Stack
            mt="2"
            spacing={2}
            display="flex"
            flexWrap="wrap"
            justifyContent={"center"}
            alignItems="center"
          >
            <OptionsBox />
            <Button width={"55%"} onClick={(e) => handleMenu()}>
              Change continent
            </Button>
          </Stack>
        </Box>
      </Box>
      <ModalAlert
        isOpen={gameOverModalOpen}
        tryAgain={tryAgain}
        onClose={(tryAgain) => {
          setGameOverModalOpen(false), handleMenu(tryAgain);
        }}
        title="Game over"
        msg="You've reached the maximum number of attempts."
      />
      <ModalAlert
        isOpen={gameWonModalOpen}
        tryAgain={tryAgain}
        onClose={(tryAgain) => {
          setGameWonModalOpen(false), handleMenu(tryAgain);
        }}
        title="Game Win"
        msg="You've won the game"
      />
    </Box>
  );
};

export { BoxCountry };
