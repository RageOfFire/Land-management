import { Container, Navbar, Spinner } from 'react-bootstrap';
import hunre from "../image/HUNRE.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import Swal from "sweetalert2";

function Header() {
  const navigate = useNavigate();
  const [userDetail, setUserDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const tokenString = sessionStorage.getItem('token');
  const token = JSON.parse(tokenString);
  useEffect(() => {
    fetchUserDetail().catch(console.error);
  }, [])
  const logout = async () => {
    setIsLoading(true)
    await fetch("http://127.0.0.1:8000/api/auth/logout", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer' + token
    },
  }).then((res) => res.json())
  .then((res) => {
    console.log(res)
    sessionStorage.clear();
    Swal.fire({
      toast: true,
      position: "bottom-right",
      iconColor: "white",
      icon: "info",
      title: "Bạn đã đăng xuất",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    })
    navigate("/");
    window.location.reload();
  })}
  const fetchUserDetail = async () => {
  setIsLoading(true)
  try {
    await fetch("http://127.0.0.1:8000/api/auth/me", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer' + token
    },
  }).then((res) => res.json())
  .then((res) => {
    setUserDetail(res)
    setIsLoading(false)
  })
  }
  catch(err) {
    console.error(err)
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
            {isLoading ? <Navbar.Text><Spinner animation="border" variant="warning" /></Navbar.Text> : <Navbar.Text>Đăng nhập với tên: <span style={{cursor: 'pointer'}} onClick={logout} className="link-warning">{userDetail.name}</span></Navbar.Text>}
          {/* {LoadingUser()} */}
        </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;