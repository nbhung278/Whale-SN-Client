"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { ApolloProvider } from "@apollo/client";
import { graphqlClient } from "@/graphql/gql.setup";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <ApolloProvider client={graphqlClient}>
      <NextThemesProvider {...props}>{children}</NextThemesProvider>
    </ApolloProvider>
  );
}
