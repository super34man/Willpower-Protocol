import Link from "next/link";

const Footer = () => {
  return (
    <nav className="navbar bg-dark text-secondary">
      <div className="container-fluid">
        <span className="navbar-text">
          <i className="far fa-copyright me-2"></i>
          {"2021 - " + new Date().getUTCFullYear()}
        </span>
        <Link href="/">
          <a className="nav-link link-secondary">
            <span className="navbar-text">{"Support"}</span>
            <i className="fab fa-discord fa-lg ms-2"></i>
          </a>
        </Link>
      </div>
    </nav>
  );
};

export default Footer;
