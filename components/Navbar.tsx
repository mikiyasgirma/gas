import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import { FaGasPump } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";

const Navbar = (): JSX.Element => {
  return (
    <div className="px-6 py-12 flex flex-col space-y-4 text-gray-300 text-lg uppercase">
      <Link href="/">
        <div className="flex items-center space-x-6">
          <AiOutlineHome size={36} />
          <div>Home</div>
        </div>
      </Link>
      <Link href="/updategasstation">
        <div className="flex items-center space-x-6">
          <FaGasPump size={36} />
          <div>Update Gas Station</div>
        </div>
      </Link>
      <div className="fixed bottom-16">
        <Link href="/logout">
          <div className="flex items-center space-x-6">
            <CiLogout size={36} />
            <div>Log out</div>
          </div>
        </Link>
      </div>
    </div>
  );
};
export default Navbar;
