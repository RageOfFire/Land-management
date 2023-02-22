import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import hunre from "../image/HUNRE.png";

function Header() {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <img
              src={hunre}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Hunre Logo"
            />{' '}
            Quản lý đất đai thành phố Bắc Ninh
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;