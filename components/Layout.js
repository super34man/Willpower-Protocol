import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar></Navbar>
      <div
        style={{
          paddingBottom: "4rem",
          paddingTop: "5.7rem",
          minHeight: "100vh",
        }}
      >
        {children}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Layout;
