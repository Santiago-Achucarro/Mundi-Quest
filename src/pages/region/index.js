import { FlagContext } from "@/addons/FlagContext";
import { Layout } from "@/addons/Layout";
import { generateOptions, generateUniqueOptions } from "@/addons/Randomizer";
import { fetchDataFromApi } from "@/addons/useFetching";
import { BoxCountry } from "@/components/findCountry/BoxCountry";
import { ModalAlert } from "@/components/findCountry/ModalAlert";
import { ChakraProvider, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Region() {
  const router = useRouter();
  const { endpoint, modes } = router.query;
  const decodedEndpoint = decodeURIComponent(endpoint);
  const decodedModes = decodeURIComponent(modes);

  if (decodedModes) {
    const mode = JSON.parse(decodedModes);
  }

  const [dataFetching, setDataFetching] = useState([]);
  const [countryFlag, setCountryFlag] = useState(null);
  const [options, setOptions] = useState([]);
  const [AdviserForReload, setAdviserForReload] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (decodedEndpoint) {
          const response = await fetchDataFromApi(
            decodedEndpoint == "all" ? decodedEndpoint : `${decodedEndpoint}`
          );
          setDataFetching(response);
        } else {
          sessionStorage.clear();
          setAdviserForReload(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [decodedEndpoint]);

  useEffect(() => {
    if (dataFetching.length) {
      const countryOptions = generateOptions(dataFetching);
      setCountryFlag(countryOptions[0]);
      setOptions(countryOptions[1]);
    }
  }, [dataFetching]);

  function handleOption(selectedOption) {
    if (selectedOption === countryFlag.translations.spa.common) {
      if (sessionStorage.getItem("Attempts")) {
        let testA = JSON.parse(sessionStorage.getItem("Attempts"));
        testA = { ...testA, pass: testA.pass + 1 };
        sessionStorage.setItem("Attempts", JSON.stringify(testA));
      } else {
        sessionStorage.setItem(
          "Attempts",
          JSON.stringify({ missed: 0, pass: 1 })
        );
      }
    } else {
      if (sessionStorage.getItem("Attempts")) {
        let testA = JSON.parse(sessionStorage.getItem("Attempts"));
        testA = { ...testA, missed: testA.missed + 1 };
        sessionStorage.setItem("Attempts", JSON.stringify(testA));
      } else {
        sessionStorage.setItem(
          "Attempts",
          JSON.stringify({ missed: 1, pass: 0 })
        );
      }
    }
    const newOptions = generateUniqueOptions(dataFetching, options);
    setCountryFlag(newOptions[0]);
    setOptions(newOptions[1]);
  }

  return (
    <>
      {dataFetching && dataFetching.length > 0 && (
        <FlagContext.Provider
          value={{ countryFlag, options, handleOption, decodedModes }}
        >
          <ChakraProvider>
            <Layout title={`Mundi Quest `}>
              <Box
                width={"100%"}
                height={"100vh"}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <BoxCountry />
                <ModalAlert
                  isOpen={AdviserForReload}
                  AdviserForReload={AdviserForReload}
                  onClose={() => {
                    setAdviserForReload(false);
                  }}
                  title="Warning"
                  msg="Dont reload the page, be a well player"
                />
              </Box>
            </Layout>
          </ChakraProvider>
        </FlagContext.Provider>
      )}
    </>
  );
}
