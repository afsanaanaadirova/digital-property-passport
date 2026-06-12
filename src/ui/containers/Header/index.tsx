import { HeaderVM } from "./header.vm";

const Header = () => {
  const { user } = HeaderVM()
  return (
    <div className="flex justify-end bg-white text-black items-center px-8 h-[84px]">
      <div className="flex gap-2 items-center">
        <span className="w-[40px] h-[40px] bg-gray-200 flex justify-center items-center rounded-full">
          {user?.fullname?.split(" ").map((word: any) => word.charAt(0).toUpperCase()).join("")}
        </span>
        <h4 className="text-15px600 text-gray-800">{user?.fullname}</h4>
      </div>
    </div>
  );
};

export default Header;
