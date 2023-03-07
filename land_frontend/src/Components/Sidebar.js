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
            <ListGroup.Item as="li"><NavLink
                to="/asset"
                className={({ isActive }) =>
                  isActive ? "link-primary" : "text-dark"
                }
              >
                Tài sản gắn liền
              </NavLink></ListGroup.Item>
            <ListGroup.Item as="li"><NavLink
                to="/contract"
                className={({ isActive }) =>
                  isActive ? "link-primary" : "text-dark"
                }
              >
                Hợp đồng
              </NavLink></ListGroup.Item>
            <ListGroup.Item as="li"><NavLink
                to="/cost"
                className={({ isActive }) =>
                  isActive ? "link-primary" : "text-dark"
                }
              >
                Biểu phí
              </NavLink></ListGroup.Item>
            <ListGroup.Item as="li"><NavLink
                to="/modstatus"
                className={({ isActive }) =>
                  isActive ? "link-primary" : "text-dark"
                }
              >
                Lịch sử thay đổi
              </NavLink></ListGroup.Item>
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default Sidebar;
