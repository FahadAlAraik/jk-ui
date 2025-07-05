import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function AppNavbar() {
  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      dir="rtl"
      className="py-2 pt-3 pb-3"
      style={{ marginBottom: "105px" }}
    >
      <Container className="d-flex justify-content-between align-items-center">

        {/* Logo section */}
        <div className="d-flex align-items-center">
        <a href="/">
          <img
            src="https://www.moia.gov.sa/Style%20Library/MOIA-Branding2023/img/MOIALOGO.svg"
            alt="رؤية 2030"
            height="60"
          />
        </a>
        </div>

        {/* Toggle Button for Burger Menu */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        {/* Collapsible Navigation Links */}
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
          <Nav className="align-items-center text-white text-navbar">
            <Nav.Link as={Link} to="/" className="text-white px-2">الرئيسية</Nav.Link>
            <div className="text-white px-1">|</div>
            <Nav.Link as={Link} to="/translate" className="text-white px-2">ترجم الخطبة</Nav.Link>
            <div className="text-white px-1">|</div>
            <Nav.Link as={Link} to="/demo" className="text-white px-2">عرض تجريبي</Nav.Link>
          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}

export default AppNavbar;
