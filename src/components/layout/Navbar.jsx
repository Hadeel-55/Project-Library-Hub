import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BiSolidCollection, BiSolidBookContent } from "react-icons/bi";
function NavBar() {
  return (
    <Navbar expand="lg" bg="primary">
      <Container>
        <Navbar.Brand className="text-white fw-bold">تطبيقاتي</Navbar.Brand>

        <Navbar.Toggle aria-colcount="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="text-white fw-bold">
              <BiSolidCollection size={30} color="white" /> ادارة المشاريع
            </Nav.Link>
            <Nav.Link as={Link} to="/library" className="text-white fw-bold">
              <BiSolidBookContent size={30} color="white" /> المكتبة الرقمية
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default NavBar;
