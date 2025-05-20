"use client";

import "@radix-ui/themes/styles.css";
import "flag-icons/css/flag-icons.min.css";

import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apolloClient";
import { Box, Theme } from "@radix-ui/themes";
import Navigation from "@/components/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ApolloProvider client={client}>
          <Theme accentColor="green">
            <Box p="4">
              <Navigation />
              {children}
            </Box>
          </Theme>
        </ApolloProvider>
      </body>
    </html>
  );
}
