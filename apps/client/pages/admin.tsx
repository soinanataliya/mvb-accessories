import { useEffect, useRef, useState } from "react";
import { getUser, logoutRequest } from "../api/requests";
import { AccessoriesList } from "../components/admin/AccessoriesList";
import { AddAccessory } from "../components/admin/AddAccessory";
import { User } from "../components/admin/User";
import { PageLayout } from "../components/shared/PageLayout";

const Admin = () => {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const componentDidMountRef = useRef(false);


  useEffect(() => {
    if (!componentDidMountRef.current) {
      componentDidMountRef.current = true;
      return;
    }
    getUser().then((response) => {
      if (response?.user) {
        setCurrentUser(response.user);
      }
    })
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
      <h1>Admin panel</h1>
      <User user={currentUser} onLogin={handleLogIn} onLogout={handleLogOut} />
      <AddAccessory />
      { !!currentUser && <AccessoriesList /> }
    </PageLayout>
  );
};

export default Admin;
