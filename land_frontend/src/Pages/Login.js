import { useState } from "react";
// import Swal from "sweetalert2";
import { Image, FloatingLabel, Form, Button } from "react-bootstrap";
import hunre from "../image/HUNRE.png";
function Login() {
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken;
  }
  const getUser = () => {
    const userString = sessionStorage.getItem('user');
    const userDetail = JSON.parse(userString);
    return userDetail;
  }
  const [token, setToken] = useState(getToken());
  const [user,setUser] = useState(getUser());
  

  const saveToken = (user,token) => {
    sessionStorage.setItem('token', JSON.stringify(token));
    sessionStorage.setItem('user', JSON.stringify(user));
    setToken(token);
    setUser(user);
    window.location.reload();
  }

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    else {
    event.preventDefault();
    setValidated(true);
    LoginToIt()
    };
  }
  async function LoginToIt() {
    try {
      let result = await fetch("http://localhost:8000/api/auth/login", {
            method: "POST",
            body: JSON.stringify({email:email,password:password}),
            headers: {
              'Content-Type': 'application/json',
              'Authorization' : 'Bearer ' + token
            },
          })
          result = await result.json();
          saveToken(result.user, result.access_token);
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
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
              <Form.Control.Feedback type="invalid">
                Bạn cần nhập email để tiếp tục.
              </Form.Control.Feedback>
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
              <Form.Control.Feedback type="invalid">
                Bạn cần nhập mật khẩu để tiếp tục.
              </Form.Control.Feedback>
            </FloatingLabel>
            <Button variant="primary" size="lg" type="submit">
              Đăng nhập
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
