import { AccessoriesList } from "../components/accessories/AccessoriesList";
import { PageLayout } from "../components/shared/PageLayout";
import { Typography } from "@mui/material";

const Accessories = () => {
  return (
    <PageLayout>
      <Typography variant="h3">Аксессуары</Typography>
      <AccessoriesList />
    </PageLayout>
  );
};

export default Accessories;
