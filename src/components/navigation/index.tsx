import { Flex, useThemeContext } from "@radix-ui/themes";
import Image from "next/image";

const Logo = () => {
  const context = useThemeContext();
  if (context.appearance === "dark") {
    return <Image alt="Logo" src="/logo-dark.svg" width={120} height={60} />;
  }
  return <Image alt="Logo" src="/logo.svg" width={120} height={60} />;
};

function Navigation() {
  return (
    <Flex gap="4" align="center">
      <Logo />
    </Flex>
  );
}

export default Navigation;
