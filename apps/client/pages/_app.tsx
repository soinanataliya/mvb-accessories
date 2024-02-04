import type { AppProps } from "next/app";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorStub } from "../components/shared/ErrorStub";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const client = new QueryClient;

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary fallback={<ErrorStub />}>
      <QueryClientProvider client={client}>
      <Component {...pageProps} />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
