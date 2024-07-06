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
  return (
    <PageLayout>
      <AccessoriesList />
    </PageLayout>
  );
};

export default Accessories;
