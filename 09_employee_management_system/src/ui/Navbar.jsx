import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const UsersIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const PlusIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const NavbarComponent = () => {
  return (
    <Navbar expand="lg" sticky="top" className="app-navbar">
      <Container fluid className="px-3 px-lg-4">
        <Navbar.Brand as={NavLink} to="/" end>
          <span className="brand-mark">EMS</span>
          <span>
            Employee Management
            <span className="d-none d-sm-inline"> System</span>
          </span>
        </Navbar.Brand>

        <div className="d-flex align-items-center gap-2 order-lg-3">
          <ThemeToggle />
          <Navbar.Toggle aria-controls="main-navbar-nav" />
        </div>

        <Navbar.Collapse id="main-navbar-nav" className="order-lg-2">
          <Nav className="ms-lg-3 gap-1">
            <Nav.Link as={NavLink} to="/" end>
              <UsersIcon /> Employees
            </Nav.Link>
            <Nav.Link as={NavLink} to="/add">
              <PlusIcon /> Add Employee
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
