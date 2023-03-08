import React, { useState, useEffect } from "react";
import { Table ,Button, Pagination } from "react-bootstrap";
import Add from "../Components/Add";
import Update from "../Components/Update";
import Search from "../Components/Search";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import Swal from "sweetalert2";
function Owner() {
  // UseState
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [data, setData] = useState([]);
  const [link, setLink] = useState([]);
  const [url, setURL] = useState("");
  const [updateData, setUpdateData] = useState({
    name: '',
    address: '',
    phone_number: 0,
    email: ''
  });
  const [updateId, setUpdateId] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [modalShowUpdate, setModalShowUpdate] = useState(false);
  // Send to add form
  const AddData = {
    Form: [
    {
      controlId: 'floatingName',
      type: 'text',
      onChange: (e) => setName(e.target.value),
      label: 'Tên chủ sở hữu'
    },
    {
      controlId: 'floatingAddress',
      type: 'text',
      onChange: (e) => setAddress(e.target.value),
      label: 'Địa chỉ'
    },
    {
      controlId: 'floatingPhone',
      type: 'text',
      onChange: (e) => setPhone(e.target.value),
      label: 'Số điện thoại'
    },
    {
      controlId: 'floatingEmail',
      type: 'email',
      onChange: (e) => setEmail(e.target.value),
      label: 'Email'
    }
  ]
}
// Reload data
  useEffect(() => {
    fetchData().catch(console.error);
  }, [url]);
// Delete Item
  async function deleteOperation(id) {
    let result = await fetch("http://127.0.0.1:8000/api/owners/" + id, {
      method: "DELETE",
    });
    result = result.json();
    console.log(result);
    fetchData().catch(console.error);
    Swal.fire({
      toast: true,
      position: 'top-right',
      iconColor: 'white',
      icon: 'error',
      title: 'Xóa thành công',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true
    });
  }
// Add Item
  async function addItem() {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("address", address);
    formData.append("phone_number", phone);
    formData.append("email", email);
    await fetch("http://127.0.0.1:8000/api/owners", {
      method: "POST",
      body: formData,
    })
    Swal.fire({
      toast: true,
      position: 'top-right',
      iconColor: 'white',
      icon: 'success',
      title: 'Thêm thành công',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true
    });
    fetchData().catch(console.error);
  }
// Send to update form
const UpdateData = {
  Form: [
  {
    controlId: 'floatingName',
    type: 'text',
    onChange: (e) => setName(e.target.value),
    label: 'Tên chủ sở hữu',
    value: updateData.name,
  },
  {
    controlId: 'floatingAddress',
    type: 'text',
    onChange: (e) => setAddress(e.target.value),
    label: 'Địa chỉ',
    value: updateData.address,
  },
  {
    controlId: 'floatingPhone',
    type: 'text',
    onChange: (e) => setPhone(e.target.value),
    label: 'Số điện thoại',
    value: updateData.phone_number,
  },
  {
    controlId: 'floatingEmail',
    type: 'email',
    onChange: (e) => setEmail(e.target.value),
    label: 'Email',
    value: updateData.email,
  }
]
}
// Update Item
  async function updateItem() {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("address", address);
    formData.append("phone_number", phone);
    formData.append("email", email);
    await fetch("http://127.0.0.1:8000/api/owners/" + updateId, {
      method: "POST",
      body: formData,
    })
    Swal.fire({
      toast: true,
      position: 'top-right',
      iconColor: 'white',
      icon: 'success',
      title: 'Sửa thành công',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true
    });
    fetchData().catch(console.error);
  }
// Search item
async function SearchItem(key) {
  if(key) {
    let result = await fetch("http://127.0.0.1:8000/api/owners/search/" + key);
    result = await result.json();
    setData(result);
  }
  else {
    fetchData().catch(console.error);
  }
}
const onChangeSearch = (e) => SearchItem(e.target.value);
// Call Data ALl
  const fetchData = async () => {
    let result = await fetch(url || "http://127.0.0.1:8000/api/owners");
    result = await result.json();
    setData(result.data);
    setLink(result.links);
  };
// Call Data for only single Id
  const fetchDataUpdate = async (id) => {
    let result = await fetch(
      "http://127.0.0.1:8000/api/owners/" + id
    );
    result = await result.json();
    setUpdateData(result);
    setUpdateId(result.owner_id);
    setName(result.name);
    setAddress(result.address);
    setPhone(result.phone_number);
    setEmail(result.email);
    setModalShowUpdate(true);
  };
// Start form
  return (
    <div>
      <Header />
      <Sidebar />
      <h1 className="text-center my-3">Quản lý chủ sở hữu</h1>
      <div className="col-sm-8 offset-sm-2">
      <Search onChange={onChangeSearch} />
      <Button
        variant="outline-success"
        className="my-3"
        onClick={() => setModalShow(true)}
      >
        Thêm
      </Button>{" "}
      </div>
      <Add show={modalShow} data={AddData} onHide={() => setModalShow(false)} onSubmit={addItem} />
      <Update show={modalShowUpdate} data={UpdateData} onHide={() => setModalShowUpdate(false)} onSubmit={updateItem} />
      <div className="col-sm-8 offset-sm-2">
      <Table striped bordered hover size="sm" responsive className="text-center">
          <thead>
            <tr>
              <td>Id</td>
              <td>Tên chủ sở hữu</td>
              <td>Địa chỉ</td>
              <td>Số điện thoại</td>
              <td>Email</td>
              <td colSpan={2} className="text-center">Cài đặt</td>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.owner_id}>
                <td>{item.owner_id}</td>
                <td>{item.name}</td>
                <td>{item.address}</td>
                <td>{item.phone_number}</td>
                <td>{item.email}</td>
                <td>
                  <Button
                    variant="outline-danger"
                    onClick={() => deleteOperation(item.owner_id)}
                  >
                    Delete
                  </Button>
                </td>
                <td>
                    <Button 
                    variant="outline-primary" 
                    onClick={() => fetchDataUpdate(item.owner_id)}
                    >Update</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination className="text-center">
          {link.map((item) => (
            <Pagination.Item key={item.label} active={item.active} onClick={() => setURL(item.url)}>
                {item.label}
            </Pagination.Item>
          ))}
      </Pagination>
      </div>
    </div>
  );
}
export default Owner;
