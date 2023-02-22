import Header from "./Header";
import { useState } from "react";
import Swal from "sweetalert2";
function Add() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  async function addItem() {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("address", address);
    formData.append("phone_number", phone);
    formData.append("email", email);
    console.log(formData);
    await fetch("http://127.0.0.1:8000/api/owners", {
      method: "POST",
      body: formData,
    }).then(res => console.log(res.data))
    Swal.fire("Good job!", "Owner Added Successfully", "success");
  }
  return (
    <div>
      <Header />
      <div className="col-sm-6 offset-sm-3">
        <br />
        <input
          type="text"
          className="form-control"
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <br />
        <input
          type="text"
          className="form-control"
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
        />
        <br />
        <input
          type="tel"
          className="form-control"
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone number"
        />
        <br />
        <input
          type="email"
          className="form-control"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <br />
        <button onClick={addItem} className="btn btn-primary">
          Add
        </button>
      </div>
    </div>
  );
}

export default Add;
