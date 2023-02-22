import Header from "./Header";
import { withRouter } from "../hoc";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

function Update() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData().catch(console.error);
  }, []);
  async function updateItem() {
    console.log(name, address, phone, email);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("address", address);
    formData.append("phone", phone);
    formData.append("email", email);
    await fetch("http://localhost:8000/api/owners" + id, {
      method: "PUT",
      body: formData,
    });
    Swal.fire("Good job!", "Owner Added Successfully", "success");
  }
  const fetchData = async () => {
    let result = await fetch(
      "http://127.0.0.1:8000/api/owners/" + id
    );
    result = await result.json();
    console.log(result);
    setData(result);
  };
  return (
    <div>
      <Header />
      <h1>Update page</h1>
      <input
        type="text"
        value={data.name}
        onChange={(e) => setName(e.target.value)}
      />{" "}
      <br />
      <input
        type="text"
        value={data.address}
        onChange={(e) => setAddress(e.target.value)}
      />{" "}
      <br />
      <input
        type="tel"
        value={data.phone_number}
        onChange={(e) => setPhone(e.target.value)}
      />{" "}
      <br />
      <input
        type="email"
        value={data.email}
        onChange={(e) => setEmail(e.target.value)}
      />{" "}
      <br />
      <button onClick={updateItem} className="btn btn-primary">
        Update
      </button>
    </div>
  );
}

export default withRouter(Update);
