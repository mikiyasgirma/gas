import Link from "next/link";
import useAgentsStore from "../store/agentsStore";
import useAuthStore from "../store/authStore";
import Avatar from "./Avatar";
import Navbar from "./Navbar";

const SideBar = (): JSX.Element => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const agents = useAgentsStore((state) => state.agents);
  const role = agents.find((agent) => agent.email === currentUser?.user.email);
  console.log("current user from navbar", currentUser);
  return (
    <div className="bg-primary min-h-screen h-full z-10 w-full">
      <div className="pt-24 pb-6">
        <Link href="/profile">
          <Avatar
            name={`${role && role?.firstName}   ${role?.lastName}`}
            image="https://res.cloudinary.com/dwp8dlbsu/image/upload/v1673780751/avatar_juzuxp.svg"
            role={role?.role}
          />
        </Link>
      </div>
      <div>
        <Navbar />
      </div>
    </div>
  );
};
export default SideBar;
