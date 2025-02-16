import { useEffect, useRef, useState } from "react";
import { getCategories, getUser, logoutRequest } from "../api/requests";
import { AccessoriesList } from "../components/admin/AccessoriesList";
import { AddAccessory } from "../components/admin/AddAccessory";
import { User } from "../components/admin/User";
import { PageLayout } from "../components/shared/PageLayout";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import { CategoriesList } from "../components/admin/CategoriesList";
import { AddCategory } from "../components/admin/AddCategory";
import { useQuery } from "@tanstack/react-query";

const Admin = () => {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const componentDidMountRef = useRef(false);

  const router = useRouter();
  const { locale, locales, defaultLocale } = router;

  const { data: categories, isLoading, isSuccess } = useQuery({
    queryFn: getCategories,
    queryKey: ["categories"],
  });

  useEffect(() => {
    if (!componentDidMountRef.current) {
      componentDidMountRef.current = true;
      return;
    }
    getUser().then((response) => {
      if (response?.user) {
        setCurrentUser(response.user);
      }
    });
  }, []);

  const handleLogIn = (login: string) => {
    setCurrentUser(login);
  };
  const handleLogOut = () => {
    logoutRequest().then((response) => {
      if (response?.status === 200) {
        setCurrentUser(null);
      }
    });
  };

  return (
    <PageLayout>
      <Typography variant="h3" style={{ color: "var(--primaryText)" }}>
        Admin panel
      </Typography>
      <p style={{ color: "var(--primaryText)" }}>Current locale: {locale}</p>
      <p style={{ color: "var(--primaryText)" }}>
        Default locale: {defaultLocale}
      </p>
      <p style={{ color: "var(--primaryText)" }}>
        Configured locales: {JSON.stringify(locales)}
      </p>
      <User user={currentUser} onLogin={handleLogIn} onLogout={handleLogOut} />
      {!!currentUser && (
        <>
          <AddAccessory categories={categories} />
          <AccessoriesList />
          <AddCategory />
          <CategoriesList categories={categories} isLoading={isLoading} isSuccess={isSuccess} />
        </>
      )}
    </PageLayout>
  );
};

export default Admin;
