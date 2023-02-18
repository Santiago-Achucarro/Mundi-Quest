import NextImage from "next/image";
import react, { useContext, useEffect, useState } from "react";
import { chakra, Flex } from "@chakra-ui/react";
import { FlagContext } from "@/addons/FlagContext";

const Image = chakra(NextImage, {
  baseStyle: { maxW: "100%", height: "auto" },
  shouldForwardProp: (prop) =>
    [
      "width",
      "height",
      "src",
      "alt",
      "quality",
      "placeholder",
      "blurDataURL",
      "loader ",
    ].includes(prop),
});

const FlagBox = () => {
  const { countryFlag } = useContext(FlagContext);

  return (
    <Flex width="90%" height="auto" justifyContent="center" alignItems="center">
      {countryFlag && countryFlag.flags?.svg && (
        <Image
          src={countryFlag.flags.svg}
          alt={`imageCountry`}
          width="450"
          height="230"
        />
      )}
    </Flex>
  );
};

export { FlagBox };
