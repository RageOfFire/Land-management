import { Button, Modal, FloatingLabel, Form } from "react-bootstrap";

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
          {props.data.Form.map((item) => (
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
          ))}
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
