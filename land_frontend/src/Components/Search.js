import { InputGroup, Form } from 'react-bootstrap'
function Search(props) {
  return (
    <div>
        <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
          Tìm kiếm
        </InputGroup.Text>
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          onChange={props.onChange}
        />
      </InputGroup>
    </div>
  );
}

export default Search;
