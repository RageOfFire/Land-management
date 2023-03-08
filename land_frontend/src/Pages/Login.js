import { useState } from "react";
import { Image, FloatingLabel, Button, Form, Spinner } from "react-bootstrap";
import hunre from "../image/HUNRE.png";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const getToken = () => {
  //   const tokenString = sessionStorage.getItem('token');
  //   const userToken = JSON.parse(tokenString);
  //   return userToken;
  // }
  // const getUser = () => {
  //   const userString = sessionStorage.getItem('user');
  //   const userDetail = JSON.parse(userString);
  //   return userDetail;
  // }
  // const [token, setToken] = useState(getToken());
  // const [user,setUser] = useState(getUser());
  

  const saveToken = (user,token) => {
    sessionStorage.setItem('token', JSON.stringify(token));
    sessionStorage.setItem('user', JSON.stringify(user));
    // setToken(token);
    // setUser(user);
    window.location.reload();
    setIsLoading(false)
  }

  async function LoginToIt() {
    setIsLoading(true)
    try {
      await fetch("http://localhost:8000/api/auth/login", {
            method: "POST",
            body: JSON.stringify({email:email,password:password}),
            headers: {
              'Content-Type': 'application/json'
            },
          }).then((res) => res.json())
          .then((res) => {
            saveToken(res.user, res.access_token);
          })
    }
    catch (err) {
      console.error(err);
    }
  }
  return (
    <div className="text-center">
      <h1 className="mt-5">Quản lý đất đai</h1>
      <div className="container shadow-lg p-3 mb-5 bg-body rounded mt-5">
        <Image src={hunre} width="100" roundedCircle={true} />
          <div className="d-grid gap-2">
            <h2 className="my-3">Đăng nhập</h2>
            <FloatingLabel
              controlId="floatingEmail"
              label="Địa chỉ Email"
              className="mb-3"
            >
              <Form.Control
                required
                type="email"
                placeholder="name@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingPassword"
              label="Mật khẩu"
              className="mb-3"
            >
              <Form.Control
                required
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </FloatingLabel>
            <Button variant="primary" size="lg" disabled={isLoading} onClick={LoginToIt}>
              {isLoading ? <Spinner animation="border" variant="light" /> : 'Đăng nhập'}
            </Button>
          </div>
      </div>
    </div>
  );
}

export default Login;
