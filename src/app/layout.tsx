"use client";

import "@radix-ui/themes/styles.css";
import "./globals.css";
import "flag-icons/css/flag-icons.min.css";

import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apolloClient";
import { Box, Theme } from "@radix-ui/themes";
import Navigation from "@/components/navigation";
import TurbineStatusPie from "@/components/dataviz/statusPie";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ApolloProvider client={client}>
          <Theme
            appearance="dark"
            accentColor="teal"
            grayColor="mauve"
            radius="small"
            scaling="90%"
          >
            <Box p="4">
              <Navigation />
              <TurbineStatusPie />
              {children}
            </Box>
          </Theme>
        </ApolloProvider>
      </body>
    </html>
  );
}
