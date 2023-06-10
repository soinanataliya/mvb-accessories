import { useEffect, useRef, useState } from "react";
import { getItems, getUser, logoutRequest } from "../api/requests";
import { AccessoriesList } from "../components/admin/AccessoriesList";
import { AddAccessory } from "../components/admin/AddAccessory";
import { User } from "../components/admin/User";
import { IAccessory } from "../types/types";

const Admin = () => {
  const [items, setItems] = useState<Array<IAccessory>>([]);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const componentDidMountRef = useRef(false);

  const getAccessories = async () => {
    const res = await getItems();
    setItems(res);
  };

  useEffect(() => {
    if (!componentDidMountRef.current) {
      componentDidMountRef.current = true;
      return;
    }
    getUser().then((response) => {
      response?.user && setCurrentUser(response.user);
    });
    getAccessories();
  }, []);

  const handleLogIn = (login: string) => {
    setCurrentUser(login);
  };
  const handleLogOut = () => {
    logoutRequest().then((response) => {
      if (response.status === 200) {
        setCurrentUser(null);
      }
    });
  };

  return (
    <div>
      <h1>Admin panel</h1>
      <User user={currentUser} onLogin={handleLogIn} onLogout={handleLogOut} />
      <AddAccessory />
      <AccessoriesList items={items} />
    </div>
  );
};

export default Admin;
