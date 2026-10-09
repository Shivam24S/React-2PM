import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import NavbarComponent from "../ui/Navbar";

const MainLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarComponent />

      <Container fluid className="px-3 px-lg-4 flex-grow-1">
        <main>
          <Outlet />
        </main>

        <footer className="app-footer">
          <span>
            © {new Date().getFullYear()} Employee Management System
          </span>
          <span>Built with React, Vite &amp; Bootstrap</span>
        </footer>
      </Container>
    </div>
  );
};

export default MainLayout;
