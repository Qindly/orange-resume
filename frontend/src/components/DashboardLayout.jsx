// 控制面板Layout框架，简历详情的那个框架
import React, { useContext } from "react";
import Navbar from "./Navbar";
import { UserContext } from '../context/UserContext';

const DashboardLayout = ({ activeMenu, children }) => {
  const {user}=useContext(UserContext);

  return (
    <div>
      <Navbar activeMenu={activeMenu} />
      {user && <div className="container  mx-auto pt-4 pb-4">{children}</div>}
    </div>
  );
};

export default DashboardLayout;
