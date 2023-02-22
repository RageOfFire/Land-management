import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Image, FloatingLabel, Form, Button } from "react-bootstrap";
import hunre from "../image/HUNRE.png";
function Login() {
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    else {
      event.preventDefault();
      try {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        console.warn(formData);
        await fetch("http://127.0.0.1:8000/api/users/login", {
          method: "POST",
          body: formData,
        })
          .then((res) => {
            console.warn(res);
            if (res["status"] === "success") {
              localStorage.setItem("user-info", JSON.stringify(res));
              Swal.fire("Đăng nhập", "Thành công!", "success");
              navigate("/");
            } else {
              Swal.fire("Đăng nhập", "Thất bại!", "error");
              console.error(res.error);
            }
          });
      } catch (error) {
        console.error(error);
      }
    }
    setValidated(true);
  };
  async function Getlogin() {}
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
