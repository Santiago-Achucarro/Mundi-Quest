import {
  Box,
  Button,
  ChakraProvider,
  Flex,
  Select,
  FormControl,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { groupRegion, difficulties } from "@/addons/findRegion";
import { useRouter } from "next/router";
import { useState } from "react";
import { Layout } from "@/addons/Layout";

export default function Home() {
  const [endpoint, setEndpoint] = useState("");
  const [modes, setModes] = useState("");
  const [missData, setMissData] = useState(false);

  const router = useRouter();
  const handleRegion = (e) => {
    if (endpoint !== "" && modes !== "") {
      setMissData(false);
      const query = {
        endpoint: encodeURIComponent(endpoint),
        modes: encodeURIComponent(modes),
      };
      router.push({
        pathname: "/region",
        query,
      });
      sessionStorage.clear();
    } else {
      setMissData(true);
    }
  };

  return (
    <ChakraProvider>
      <Layout title={"Mundi Quest"}>
        <Box
          width="100vw"
          height="100vh"
          display={"flex"}
          justifyContent="center"
          alignItems={"center"}
        >
          <Box
            width={{ base: "100%", xl: "45%", md: "45%" }}
            height={{ base: "75%", xl: "50%", md: "70%" }}
            backgroundColor="white"
            borderRadius={"10"}
            display={"flex"}
            justifyContent="center"
            flexDir="column"
          >
            <Box
              color={"black"}
              fontSize={{ base: 22, xl: 25, md: 20, lg: 35 }}
              textAlign="center"
              mb={10}
            >
              <h1>
                <strong>Mundi Quest</strong>
              </h1>
              <h3>Choose continent and difficulty</h3>
            </Box>

            <FormControl
              as={"form"}
              display="flex"
              flexDir={"column"}
              gap="10px"
              mb={"5"}
              onSubmit={(e) => handleRegion(e)}
            >
              <Select
                placeholder="Choose Continent"
                color={"black"}
                width="50%"
                margin={"0 auto"}
                value={endpoint}
                onChange={(e) => setEndpoint(e.target.value)}
              >
                {groupRegion.map((item, index) => {
                  return (
                    <option key={index} value={item.endpoint}>
                      {item.region}
                    </option>
                  );
                })}
              </Select>

              <Select
                placeholder="Choose Difficulty"
                color={"black"}
                width="50%"
                margin={"0 auto"}
                value={modes}
                onChange={(e) => setModes(e.target.value)}
              >
                {difficulties.map((item, index) => {
                  return (
                    <option key={index} value={JSON.stringify([item])}>
                      {item.mode} [Missed: {item.missed}, Hits: {item.pass}]
                    </option>
                  );
                })}
              </Select>
            </FormControl>
            {missData && (
              <Box
                display="flex"
                alignItems={"center"}
                justifyContent={"center"}
                margin="0 auto"
                transition={"all ease-in 1s"}
              >
                <Alert status="error" borderRadius={"5"}>
                  <AlertIcon />
                  <AlertTitle>Input error</AlertTitle>
                  <AlertDescription>Enter the missing data</AlertDescription>
                </Alert>
              </Box>
            )}
            <Button
              width={"40%"}
              margin="0 auto"
              mt={"5"}
              onClick={(e) => handleRegion(e)}
            >
              Jugar
            </Button>
          </Box>
        </Box>
      </Layout>
    </ChakraProvider>
  );
}
