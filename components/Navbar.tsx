import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import { FaGasPump } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { FiUser, FiUsers } from "react-icons/fi";
import { useRouter } from "next/router";

const Navbar = (): JSX.Element => {
  const router = useRouter();
  return (
    <div className="px-6 py-12 flex flex-col space-y-4 text-gray-400 text-base uppercase">
      <Link href="/">
        <div className="flex items-center space-x-6">
          <AiOutlineHome size={24} />
          <div className={router.pathname == "/" ? "text-xl text-white" : ""}>
            Home
          </div>
        </div>
      </Link>
      <Link href="/gasstations">
        <div className="flex items-center space-x-6">
          <FaGasPump size={24} />
          <div
            className={
              router.pathname == "/gasstations" ? "text-white text-xl" : ""
            }
          >
            Gas Stations
          </div>
        </div>
      </Link>
      <Link href="/agents">
        <div className="flex items-center space-x-6">
          <FiUsers size={24} />
          <div
            className={router.pathname == "/agents" ? "text-white text-xl" : ""}
          >
            Agents
          </div>
        </div>
      </Link>
      <div className="fixed bottom-16">
        <div className="flex items-center space-x-6">
          <CiLogout size={24} />
          <Link href="/login">
            <div>Log out</div>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
