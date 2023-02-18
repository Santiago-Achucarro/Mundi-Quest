import { Box, Stack, Text } from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";

const BoxAttempts = ({ handleMenu, tryAgain }) => {
  let attempts = JSON.parse(sessionStorage.getItem("Attempts"));
  const [Attempts, setAttempts] = useState(attempts);

  return (
    <>
      <Text color={"white"} fontSize="20" mb={"2"} textAlign="center">
        Attempts
      </Text>
      <Box borderWidth={1} borderRadius={10} p={3}>
        <Stack
          direction="row"
          spacing={5}
          justifyContent="center"
          alignItems="center"
        >
          <Text fontSize={20} color="red">
            Missed: {attempts ? attempts.missed : 0}
          </Text>
          <Text fontSize={20} color="green">
            Hits: {attempts ? attempts.pass : 0}
          </Text>
          <Box>
            <RepeatIcon
              color={"white"}
              fontSize="20"
              transition="all ease-in 0.3s"
              cursor={"pointer"}
              _hover={{
                color: "grey",
                transition: "all ease-out 0.3s",
              }}
              onClick={() => {
                handleMenu(tryAgain);
                setAttempts(attempts);
              }}
            />
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export { BoxAttempts };
