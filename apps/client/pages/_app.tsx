import type { AppProps } from "next/app";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorStub } from "../components/shared/ErrorStub";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextIntlClientProvider } from "next-intl";

import "../styles/reset.css";
import "../styles/global.css";
import { useRouter } from "next/router";

const client = new QueryClient();

export default function MvbAccessories({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <ErrorBoundary fallback={<ErrorStub />}>
      <NextIntlClientProvider
        locale={router.locale}
        messages={pageProps.messages}
      >
        <QueryClientProvider client={client}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </NextIntlClientProvider>
    </ErrorBoundary>
  );
}
