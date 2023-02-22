import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
function Header() {
  let user = JSON.parse(localStorage.getItem('user-info'))
  const navigate = useNavigate();
  function logOut() {
    localStorage.clear();
    navigate("/register")
  }
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto navbar_warapper">
            {localStorage.getItem("user-info") ? (
              <div>
                <Link to="/">List</Link>
                <Link to="/add">Add</Link>
                <Link to="/update">Update</Link>
                <Link to="/search">Search</Link>
              </div>
            ) : (
              <div>
                <Link to="/login">Login</Link>
              </div>
            )}
          </Nav>
          {localStorage.getItem('user-info') ?
          <Nav>
            <NavDropdown title={user && user.name}>
              <NavDropdown.Item onClick={logOut}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          :null
          }
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
