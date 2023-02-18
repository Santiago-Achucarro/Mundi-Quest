import { FlagContext } from "@/addons/FlagContext";
import { Box, Button } from "@chakra-ui/react";
import { useContext } from "react";

const OptionsBox = () => {
  const { countryFlag, options, handleOption } = useContext(FlagContext);

  if (Object.keys(options).length > 0 && options.length === 4) {
    return (
      <>
        {options.map((item, index) => {
          if (item?.name) {
            return (
              <Button
                key={index}
                width={"200px"}
                paddingX="40"
                paddingY="15px"
                boxShadow={"2px 2px 4px 0px black"}
                opacity="0.5"
                fontSize={
                  item?.translations.spa.common.length > 15 ? "12px" : "14px"
                }
                borderRadius="10"
                transition="0.3s all ease"
                _hover={{
                  backgroundColor: "grey",
                  opacity: "0.2",
                  transition: "0.3s all ease",
                }}
                value={item?.translations.spa.common}
                onClick={(e) => {
                  handleOption(e.target.value);
                }}
              >
                {item?.translations.spa.common}
              </Button>
            );
          }
        })}
      </>
    );
  }
};

export { OptionsBox };
