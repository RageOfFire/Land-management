import React, { useState, useEffect } from "react";
import { Table ,Button } from "react-bootstrap";
import Add from "../Components/Add";
import Update from "../Components/Update";
import Search from "../Components/Search";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import Swal from "sweetalert2";
function Transaction() {
  // UseState
  const [date, setDate] = useState("");
  const [value, setValue] = useState(0);
  const [OwnerId, setOwnerId] = useState(0);
  const [data, setData] = useState([]);
  const [updateData, setUpdateData] = useState({
    date: '',
    value: 0,
    owner_id: 0
  });
  const [ownerData, setOwnerData] = useState([]);
  const [updateId, setUpdateId] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [modalShowUpdate, setModalShowUpdate] = useState(false);

  // Send to add form
  const AddData = {
    Form: [
    {
      controlId: 'floatingDate',
      type: 'date',
      onChange: (e) => setDate(e.target.value),
      label: 'Ngày giao dịch'
    },
    {
      controlId: 'floatingValue',
      type: 'number',
      onChange: (e) => setValue(e.target.value),
      label: 'Giá trị'
    },
    {
      controlId: 'floatingOwnerId',
      type: 'select',
      label: 'Chủ sở hữu',
      onChange: (e) => setOwnerId(e.target.value),
      getItemForeign: ownerData.map((item) => (
        <option key={item.owner_id} value={item.owner_id}>{item.name} - {item.address}</option>
      ))
    }
    ]
}
// Reload data
  useEffect(() => {
    fetchData().catch(console.error);
    fetchForeign().catch(console.error);
  }, []);
// Delete Item
  async function deleteOperation(id) {
    let result = await fetch("http://127.0.0.1:8000/api/transactions/" + id, {
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
    formData.append("transaction_date", date);
    formData.append("value", value);
    formData.append("owner_id", OwnerId);
    console.warn(date);
    await fetch("http://127.0.0.1:8000/api/transactions", {
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
    controlId: 'floatingDate',
    type: 'date',
    onChange: (e) => setDate(e.target.value),
    label: 'Ngày giao dịch',
    value: updateData.transaction_date
  },
  {
    controlId: 'floatingValue',
    type: 'number',
    onChange: (e) => setValue(e.target.value),
    label: 'Giá trị',
    value: updateData.value
  },
  {
    controlId: 'floatingOwnerId',
    type: 'select',
    label: 'Chủ sở hữu',
    value: updateData.owner_id,
    onChange: (e) => setOwnerId(e.target.value),
    getItemForeign: ownerData.map((item) => (
      <option key={item.owner_id} value={item.owner_id}>{item.name} - {item.address}</option>
    ))
    
  }
]
}
// Update Item
  async function updateItem() {
    const formData = new FormData();
    formData.append("transaction_date", date);
    formData.append("value", value);
    formData.append("owner_id", OwnerId);
    await fetch("http://127.0.0.1:8000/api/transactions/" + updateId, {
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
    let result = await fetch("http://127.0.0.1:8000/api/transactions/search/" + key);
    result = await result.json();
    setData(result);
  }
  else {
    fetchData().catch(console.error);
  }
}
const onChangeSearch = (e) => SearchItem(e.target.value)
// Call Data ALl
  const fetchData = async () => {
    let result = await fetch("http://127.0.0.1:8000/api/transactions");
    result = await result.json();
    setData(result);
  };
  const fetchForeign = async () => {
    let result = await fetch("http://127.0.0.1:8000/api/owners");
    result = await result.json();
    setOwnerData(result)
  };
// Call Data for only single Id
  const fetchDataUpdate = async (id) => {
    let result = await fetch(
      "http://127.0.0.1:8000/api/transactions/" + id
    );
    result = await result.json();
    setUpdateData(result);
    setUpdateId(result.transaction_id);
    setDate(result.transaction_date);
    setValue(result.value);
    setOwnerId(result.owner_id);
    setModalShowUpdate(true);
  };
// Start form
  return (
    <div>
      <Header />
      <Sidebar />
      <h1 className="text-center my-3">Quản lý giao dịch</h1>
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
              <td>Ngày giao dịch</td>
              <td>Giá trị</td>
              <td>Chủ sở hữu</td>
              <td colSpan={2} className="text-center">Settings</td>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.transaction_id}>
                <td>{item.transaction_id}</td>
                <td>{item.transaction_date}</td>
                <td>{item.value}</td>
                <td>{item.owner_id}</td>
                <td>
                  <Button
                    variant="outline-danger"
                    onClick={() => deleteOperation(item.transaction_id)}
                  >
                    Delete
                  </Button>
                </td>
                <td>
                    <Button 
                    variant="outline-primary" 
                    onClick={() => {fetchDataUpdate(item.transaction_id)}}
                    >Update</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
export default Transaction;
