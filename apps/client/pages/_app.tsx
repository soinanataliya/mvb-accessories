import type { AppProps } from "next/app";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorStub } from "../components/shared/ErrorStub";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary fallback={<ErrorStub />}>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}
