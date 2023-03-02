import { Button, Modal, FloatingLabel, Form } from "react-bootstrap";
// import React, { useState } from "react";

function Add(props) {
  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Thêm</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {props.data.Form.map((item) => {
            switch (item.type) {
              case "radio":
                return (
                  <div key={item.controlId} className="mb-3">
                    {item.radioControl.map((radioItem) => (
                      <Form.Check
                        inline
                        key={radioItem.id}
                        id={radioItem.id}
                        label={radioItem.label}
                        name={item.controlId}
                        type={item.type}
                        onChange={radioItem.onChange}
                      />
                    ))}
                  </div>
                );
              case "select":
                return (
                  <FloatingLabel
                    controlId={item.controlId}
                    key={item.controlId}
                    label={item.label}
                  >
                    <Form.Select
                      aria-label={item.label}
                      onChange={item.onChange}
                      defaultValue={"DEFAULT"}
                    >
                      <option value="DEFAULT" disabled hidden>
                        Chọn thông tin
                      </option>
                      {item.getItemForeign}
                    </Form.Select>
                  </FloatingLabel>
                );
              case "textarea":
                return (
                  <FloatingLabel
                    key={item.controlId}
                    controlId={item.controlId}
                    label={item.label}
                    className="mb-3"
                  >
                    <Form.Control as={item.type} placeholder={item.label} />
                  </FloatingLabel>
                );
              default:
                return (
                  <FloatingLabel
                    key={item.controlId}
                    controlId={item.controlId}
                    label={item.label}
                    className="mb-3"
                  >
                    <Form.Control
                      type={item.type}
                      placeholder={item.label}
                      onChange={item.onChange}
                    />
                  </FloatingLabel>
                );
            }
          })}
          <Button
            variant="outline-success"
            className="my-3 text-center"
            onClick={props.onSubmit}
          >
            Thêm
          </Button>{" "}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Add;
