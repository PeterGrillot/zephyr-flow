import { Flex, Text } from "@radix-ui/themes";
import Image from "next/image";

export type LoaderProps = {
  message: string;
};

const Loader = ({ message }: LoaderProps) => {
  return (
    <Flex
      flexGrow="1"
      align="center"
      justify="center"
      height="100vh"
      direction="column"
    >
      <Image alt="loader" src="/loader.gif" width={80} height={80} />
      <Text size="2" color="gray">
        {message}
      </Text>
    </Flex>
  );
};

export default Loader;
