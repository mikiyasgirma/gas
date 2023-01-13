import Link from "next/link";
import Avatar from "./Avatar";
import Navbar from "./Navbar";

const SideBar = (): JSX.Element => {
  return (
    <div className="bg-primary min-h-screen h-full z-10 w-full">
      <div className="pt-24 pb-6">
        <Avatar
          name="Jon Doe"
          image="https://res.cloudinary.com/dwp8dlbsu/image/upload/v1667345646/photo-1508214751196-bcfd4ca60f91_nkhz9m.jpg"
          role="System Administrator"
        />
      </div>
      <div>
        <Navbar />
      </div>
    </div>
  );
};
export default SideBar;
