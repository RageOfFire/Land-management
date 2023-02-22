import { Button, Modal, FloatingLabel, Form } from "react-bootstrap";

function Update(props) {
  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Chỉnh sửa</Modal.Title>
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
                defaultValue={item.value}
              />
            </FloatingLabel>
          ))}
          <Button variant="outline-primary" className="my-3 text-center" onClick={props.onSubmit}>
            Chỉnh sửa
          </Button>{" "}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Update;
