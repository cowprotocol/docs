import React from 'react';
import SearchBar from '@theme-original/SearchBar';
import type SearchBarType from '@theme/SearchBar';
import type { WrapperProps } from '@docusaurus/types';
import AskCookbook from "@cookbookdev/docsbot/react";

/** This is a public key, so it's safe to expose it here */
const COOKBOOK_PUBLIC_API_KEY = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmE5OWZmMWNhMjA3NDg1NDU1YTE2OWMiLCJpYXQiOjE3MjIzOTI1NjEsImV4cCI6MjAzNzk2ODU2MX0.Ek_QrKdX2a3udz50CbYe4HMBzlwkGKKxyj7qfW56TWY`;

type Props = WrapperProps<typeof SearchBarType>;

export default function SearchBarWrapper(props: Props): JSX.Element {
  return (
    <>
      <SearchBar {...props} />
      <AskCookbook apiKey={COOKBOOK_PUBLIC_API_KEY} />
    </>
  );
}
