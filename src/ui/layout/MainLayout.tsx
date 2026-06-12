import { Outlet } from "react-router-dom";
import Header from "@/ui/containers/Header";
import { Suspense } from "react";
import Sidebar from "../containers/Sidebar";
import { useAppSelector } from "@/app/hooks/useRedux";

const MainLayout = () => {
  const sidebar = useAppSelector((state) => state.sidebar);
  return (
    <div
      className={`${
        sidebar.isOpenMobile ? "overflow-hidden h-screen" : "overflow-auto"
      }
    flex items-stretch min-h-screen
    `}
    >
      <Sidebar />
      <div className="w-full flex flex-col bg-gray-100">
        <Header />
        <Suspense
          fallback={
            <div className="min-h-screen">
              <h1>Loading...</h1>
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default MainLayout;
