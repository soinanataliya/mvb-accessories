import { useEffect, useState } from "react";
import { getItems } from "../api/requests";
import { AccessoriesList } from "../components/admin/AccessoriesList";
import { AddAccessory } from "../components/admin/AddAccessory";
import { User } from "../components/admin/User";
import { IAccessory } from "../types/types";

const Admin = () => {
  const [items, setItems] = useState<Array<IAccessory>>([]);

  const getAccessories = async () => {
    const res = await getItems();
    setItems(res);
  };

  useEffect(() => {
    getAccessories();
  }, []);


  return (
    <div>
      <h1>Admin panel</h1>
      <User />
      <AddAccessory />
      <AccessoriesList items={items} />
    </div>
  );
};

export default Admin;
