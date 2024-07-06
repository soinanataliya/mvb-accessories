import { useEffect, useRef, useState } from "react";
import { getUser, logoutRequest } from "../api/requests";
import { AccessoriesList } from "../components/admin/AccessoriesList";
import { AddAccessory } from "../components/admin/AddAccessory";
import { User } from "../components/admin/User";
import { PageLayout } from "../components/shared/PageLayout";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";

const Admin = () => {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const componentDidMountRef = useRef(false);

  const router = useRouter();
  const { locale, locales, defaultLocale } = router;

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
      <AddAccessory />
      {!!currentUser && <AccessoriesList />}
    </PageLayout>
  );
};

export default Admin;
