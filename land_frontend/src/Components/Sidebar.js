import {
  Button,
  Offcanvas,
  ListGroup
} from "react-bootstrap";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // let user = JSON.parse(localStorage.getItem('user-info'));
  return (
    <div>
      <Button
        variant="outline-secondary"
        className="mt-3 ms-3"
        onClick={handleShow}
      >
        &gt;
      </Button>

      <Offcanvas show={show} onHide={handleClose} backdrop={false}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Quản lý đất đai</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup as="ul" variant="flush">
            <ListGroup.Item as="li">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "link-primary" : "text-dark"
                }
              >
                Trang chủ
              </NavLink>
            </ListGroup.Item>
            <ListGroup.Item as="li">
              <NavLink
                to="/owner"
                className={({ isActive }) =>
                  isActive ? "link-primary" : "text-dark"
                }
              >
                Chủ sở hữu
              </NavLink>
            </ListGroup.Item>
            <ListGroup.Item as="li"><NavLink
                to="/land"
                className={({ isActive }) =>
                  isActive ? "link-primary" : "text-dark"
                }
              >
                Đất đai
              </NavLink></ListGroup.Item>
            <ListGroup.Item as="li"><NavLink
                to="/transaction"
                className={({ isActive }) =>
                  isActive ? "link-primary" : "text-dark"
                }
              >
                Giao dịch
              </NavLink></ListGroup.Item>
            <ListGroup.Item as="li"><NavLink
                to="/status"
                className={({ isActive }) =>
                  isActive ? "link-primary" : "text-dark"
                }
              >
                Trạng thái
              </NavLink></ListGroup.Item>
            <ListGroup.Item as="li">Biểu phí</ListGroup.Item>
            <ListGroup.Item as="li">Lịch sử thay đổi</ListGroup.Item>
          </ListGroup>
        </Offcanvas.Body>
        {/* <div className="position-relative">
          <div className="position-absolute bottom-0 end-0 mb-3 me-3">
            <DropdownButton
              key="up"
              id={`login-dropdown`}
              drop="up"
              variant="info"
              title={"Chào mừng trở lại"}
            >
              <Dropdown.Item eventKey="1" onClick={logOut}>
                Đăng xuất
              </Dropdown.Item>
            </DropdownButton>
          </div>
        </div> */}
      </Offcanvas>
    </div>
  );
}

export default Sidebar;
