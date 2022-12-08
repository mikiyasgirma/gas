import Footer from "./Footer";
import SideBar from "./SideBar";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="bg-background min-h-screen font-poppins">
      {children}
      <Footer />
    </div>
  );
};
export default Layout;
