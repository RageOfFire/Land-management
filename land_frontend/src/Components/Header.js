import { Container, Navbar, Button, Spinner } from 'react-bootstrap';
import hunre from "../image/HUNRE.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

function Header() {
  const navigate = useNavigate();
  const [userDetail, setUserDetail] = useState([]);
  const tokenString = sessionStorage.getItem('token');
  const token = JSON.parse(tokenString);
  useEffect(() => {
    fetchUserDetail();
  }, [])
  const logout = async () => {
    let result = await fetch("http://127.0.0.1:8000/api/auth/logout", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer' + token
    },
  })
    result = await result.json();
    sessionStorage.clear();
    console.log(result);
    navigate("/");
    window.location.reload();
  }
  const fetchUserDetail = async () => {
  try {
    let result = await fetch("http://127.0.0.1:8000/api/auth/me", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer' + token
    },
  })
  result = await result.json();
  setUserDetail(result);
  }
  catch(err) {
    console.error(err)
  }
}
  const LoadingUser = () => {
    if(userDetail) {
      <Navbar.Text>
        Đăng nhập với tên: <span onClick={logout} className="link-warning">{userDetail.name}</span>
      </Navbar.Text>
    } else {
      <Navbar.Text>
        <Spinner animation="border" variant="primary" />
      </Navbar.Text>
    }
  }
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
          <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Đăng nhập với tên: <span style={{cursor: 'pointer'}} onClick={logout} className="link-warning">{userDetail.name}</span>
          </Navbar.Text>
          {/* {LoadingUser()} */}
        </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;