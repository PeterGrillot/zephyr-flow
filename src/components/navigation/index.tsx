import { useThemeContext } from "@radix-ui/themes";
import Image from "next/image";

const Navigation = () => {
  const context = useThemeContext();
  if (context.appearance === "dark") {
    return <Image alt="Logo" src="/logo-dark.svg" width={120} height={60} />;
  }
  return <Image alt="Logo" src="/logo.svg" width={120} height={60} />;
};

export default Navigation;
