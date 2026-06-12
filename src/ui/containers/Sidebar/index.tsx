import { Link } from "react-router-dom";
import FormulyarLogoFullText from "@svg/main-logo.svg?react";
import FormulyarLogo from "@svg/single-logo.svg?react";
import ChevronRight from "@svg/Expand.svg?react";
import DocumentText from "@svg/document-text.svg?react";
import Setting from "@svg/setting.svg?react";
import Logout from "@svg/logout.svg?react";
import Plus from "@svg/Plus.svg?react";
import ChartThreeLine from "@svg/chart_three_line.svg?react";
import { useAppDispatch, useAppSelector } from "@/app/hooks/useRedux";
import { setOpenSidebar } from "@/app/store/root/sidebarControllSlice";
import Tooltip from "@mui/material/Tooltip";
import { clearCookies } from "@/app/helpers/cookies";

const data = [
  {
    id: 1,
    icon: <DocumentText />,
    name: "Passports",
    path: "/passports",
  },
  {
    id: 2,
    icon: <Plus />,
    name: "New passport",
    path: "/passports/create",
  },
  {
    id: 6,
    icon: <ChartThreeLine />,
    name: "Hesabatlılıq",
    path: "/passports/create",
  },
];

const Sidebar = () => {
  const sidebar = useAppSelector((state) => state.sidebar);
  const dispatch = useAppDispatch();
  const logout = () => {
    clearCookies("tokenPA");
    clearCookies("lcl");
    window.location.href = "/login";
  };

  return (
    <div className="bg-black">
      <div
        className={[
          `overflow-hidden duration-100 relative z-50 min-h-screen ${
            sidebar.isOpenDesktop ? "inline-block" : "hidden"
          } md:inline-block`,
          sidebar.isOpenDesktop ? "min-w-[292px]" : "min-w-[94px] w-0",
        ].join(" ")}
      >
        <div
          className={[
            " duration-100  h-screen fixed left-0 top-0 bg-gradient-to-b from-[#141414] via-[#1D1D1D] via-62.5%  to-[#424649]",
            sidebar.isOpenDesktop ? "min-w-[292px]" : "min-w-[94px] w-0",
          ].join(" ")}
        >
          <div className="border-b border-gray-800 h-28 flex items-center p-5">
            <h1>
              {sidebar.isOpenDesktop ? (
                <FormulyarLogoFullText />
              ) : (
                <FormulyarLogo />
              )}
            </h1>
          </div>
          <p
            className="hidden h-[66px] rounded-tl-[18px] rounded-bl-[18px]  cursor-pointer absolute right-[-13px] top-6 md:flex items-center"
            onClick={() => dispatch(setOpenSidebar("desktop"))}
          >
            <ChevronRight
              className={`${
                sidebar.isOpenDesktop ? "rotate-180" : "rotate-0"
              } text-white`}
            />
          </p>
          <div className="flex flex-col justify-between h-[86vh] px-3">
            <div className="flex flex-col pt-[39px]">
              {data.map((item) => (
                <Link
                  key={item.id}
                  aria-label={item?.name}
                  to={item?.path}
                  className={`${
                    sidebar.isOpenDesktop ? "" : "justify-center"
                  } w-full h-14 flex items-center cursor-pointer rounded-[10px] transition duration-150 [&.active]:opacity-100 `}
                >
                  {sidebar.isOpenDesktop ? (
                    <div className="text-white flex items-center opacity-70 pl-3  hover:fill-[#D2AB67]   relative hover:opacity-100  w-full h-14 cursor-pointer rounded-[10px] transition duration-150 hover:bg-gray-800 [&.active]:bg-gray-800 &.active]:opacity-100">
                      <span
                        className={` ${
                          sidebar.isOpenDesktop
                            ? "mr-3"
                            : "mr-0  relative group"
                        }`}
                      >
                        {item.icon}
                      </span>
                      <p>{item.name}</p>
                    </div>
                  ) : (
                    <Tooltip
                      key={item.id}
                      componentsProps={{
                        tooltip: {
                          sx: {
                            bgcolor: "#292929",
                            color: "white",
                            height: "34px",
                            borderRadius: "8px",
                            marginLeft: "20px!important",
                            boxShadow: "0px 12px 16px -4px #10182814!important",
                          },
                        },
                        arrow: {
                          sx: {
                            color: "#292929",
                            marginRight: "90px",
                          },
                        },
                      }}
                      title={
                        !sidebar.isOpenDesktop ? (
                          <p className="h-[26px] w-full flex items-center">
                            {item?.name}
                          </p>
                        ) : null
                      }
                      arrow
                      placement="right"
                    >
                      <div
                        aria-label={item?.name}
                        // to={item?.path}
                        className={`${
                          sidebar.isOpenDesktop ? "" : "justify-center"
                        }
                        w-full h-14 flex items-center cursor-pointer opacity-70 rounded-[10px] p-6 transition duration-150  [&.active]:opacity-100`}
                      >
                        <div className="flex">
                          <p className="text-white flex items-center">
                            <span
                              className={`${
                                sidebar.isOpenDesktop ? "mr-2" : "mr-0"
                              }`}
                            >
                              {item?.icon}
                            </span>
                            {sidebar.isOpenDesktop && (
                              <span className="text-15px">{item.name}</span>
                            )}
                          </p>
                        </div>
                      </div>
                    </Tooltip>
                  )}
                </Link>
              ))}
            </div>
            {sidebar.isOpenDesktop && (
              <div>
                <div className="text-white flex items-center opacity-70 pl-3  relative hover:opacity-100 fill-[#A3A3A3] hover:fill-[#D2AB67]  w-full h-14 cursor-pointer rounded-[10px] transition duration-150 hover:bg-gray-700 [&.active]:bg-gray-700 [&.active]:opacity-100">
                  <div className="flex items-center">
                    <span
                      className={`${
                        sidebar.isOpenDesktop ? "mr-2" : "mr-0  relative group"
                      }`}
                    >
                      <Setting />
                    </span>
                    <p>Tənzimləmələr</p>
                  </div>
                </div>
                <div
                  onClick={logout}
                  className="text-white flex items-center  pl-3 fill-[#A3A3A3] relative hover:fill-[#D2AB67]   w-full h-14 cursor-pointer rounded-[10px] transition duration-150 hover:bg-gray-700 [&.active]:bg-gray-700 &.active]:opacity-100"
                >
                  <div className="flex items-center">
                    <span
                      className={` ${
                        sidebar.isOpenDesktop ? "mr-2" : "mr-0  relative group"
                      }`}
                    >
                      <Logout />
                    </span>
                    <p>Çıxış</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
