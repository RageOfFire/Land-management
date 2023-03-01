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
            switch(item.type) {
              case "radio":
                return (
                <Form.Check
                    inline
                    key={item.controlId}
                    label={item.label}
                    type={item.type}
                    className="mb-3"
                    onChange={item.onChange}
                    id={item.controlId}
                  />
              )
              case "select":
                return (
                <Form.Select aria-label="Default select example" key={item.controlId} onChange={item.onChange} defaultValue={'DEFAULT'}>
                  <option value="DEFAULT" disabled>{item.label}</option>
                  {item.getItemForeign}
                  {/* <option value="1">1</option> */}
                </Form.Select>
              )
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
                )
            }
          })}
          <Button variant="outline-success" className="my-3 text-center" onClick={props.onSubmit}>
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
