import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import { FaGasPump } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { FiUser, FiUsers } from "react-icons/fi";

const Navbar = (): JSX.Element => {
  return (
    <div className="px-6 py-12 flex flex-col space-y-4 text-gray-400 text-base uppercase">
      <Link href="/">
        <div className="flex items-center space-x-6">
          <AiOutlineHome size={24} />
          <div>Home</div>
        </div>
      </Link>
      <Link href="/gasstations">
        <div className="flex items-center space-x-6">
          <FaGasPump size={24} />
          <div>Gas Stations</div>
        </div>
      </Link>
      <Link href="/users">
        <div className="flex items-center space-x-6">
          <FiUsers size={24} />
          <div>Users</div>
        </div>
      </Link>
      <div className="fixed bottom-16">
        <Link href="/logout">
          <div className="flex items-center space-x-6">
            <CiLogout size={24} />
            <div>Log out</div>
          </div>
        </Link>
      </div>
    </div>
  );
};
export default Navbar;
