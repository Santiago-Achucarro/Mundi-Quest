import react from "react";
import { Spinner, Box, Stack } from "@chakra-ui/react";

const Loader = () => {
  return (
    <Box
      width={"100vw"}
      height="100vh"
      display={"flex"}
      justifyContent="center"
      alignItems={"center"}
    >
      <Spinner
        thickness="5px"
        speed="0.95s"
        emptyColor="gray.200"
        color="blue.700"
        size="xl"
        width={"150px"}
        height="150px"
      />
    </Box>
  );
};

export { Loader };
