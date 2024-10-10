import { Flex, Text } from "@chakra-ui/react";

const TextCell = ({ getValue }) => {
    const value = getValue(); // Değer alınıyor

    return (
        <Flex
            align="center"
            h={"100%"}
            pl={2}

        >
           {value}
        </Flex>
    );
};

export default TextCell;