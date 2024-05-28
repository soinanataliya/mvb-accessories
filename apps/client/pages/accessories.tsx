import { useRouter } from "next/router";
import { AccessoriesList } from "../components/accessories/AccessoriesList";
import { PageLayout } from "../components/shared/PageLayout";

export async function getStaticProps(props: { locale: string }) {
  return {
    props: {
      messages: (await import(`../messages/${props.locale}.json`)).default,
    },
  };
}

const Accessories = () => {
  const router = useRouter();
  const { locale, locales, defaultLocale } = router;

  return (
    <PageLayout>
      <p style={{ color: "var(--primaryText)" }}>Current locale: {locale}</p>
      <p style={{ color: "var(--primaryText)" }}>
        Default locale: {defaultLocale}
      </p>
      <p style={{ color: "var(--primaryText)" }}>
        Configured locales: {JSON.stringify(locales)}
      </p>
      <AccessoriesList />
    </PageLayout>
  );
};

export default Accessories;
