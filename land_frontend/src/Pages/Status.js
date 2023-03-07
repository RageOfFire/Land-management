import React, { useState, useEffect } from "react";
import { Table ,Button } from "react-bootstrap";
import Add from "../Components/Add";
import Update from "../Components/Update";
import Search from "../Components/Search";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import Swal from "sweetalert2";
function Status() {
  // UseState
  const [landId, setLandId] = useState(0);
  const [statusCharge, setStatusCharge] = useState("");
  const [oldStatus, setOldStatus] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [data, setData] = useState([]);
  const [updateData, setUpdateData] = useState({
    land_id: 0,
    status_charge: '',
    old_status: '',
    new_status: ''
  });
  const [landData, setLandData] = useState([]);
  const [updateId, setUpdateId] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [modalShowUpdate, setModalShowUpdate] = useState(false);

  // Send to add form
  const AddData = {
    Form: [
      {
        controlId: 'floatingLandId',
        type: 'select',
        label: 'Đất đai',
        onChange: (e) => setLandId(e.target.value),
        getItemForeign: landData.map((item) => (
          <option key={item.land_id} value={item.land_id}>{item.address}</option>
        ))
      },
      {
        controlId: 'floatingStatusCharge',
        type: 'date',
        onChange: (e) => setStatusCharge(e.target.value),
        label: 'Ngày thay đổi'
      },
      {
        controlId: 'floatingOldStatus',
        type: 'textarea',
        onChange: (e) => setOldStatus(e.target.value),
        label: 'Trạng thái ban đầu'
      },
      {
        controlId: 'floatingNewStatus',
        type: 'textarea',
        onChange: (e) => setNewStatus(e.target.value),
        label: 'Trạng thái mới'
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
    let result = await fetch("http://127.0.0.1:8000/api/statuses/" + id, {
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
    console.log(landId, statusCharge, oldStatus, newStatus);
    const formData = new FormData();
    formData.append("land_id", landId);
    formData.append("status_charge", statusCharge);
    formData.append("old_status", oldStatus);
    formData.append("new_status", newStatus);
    await fetch("http://127.0.0.1:8000/api/statuses", {
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
      controlId: 'floatingLandId',
      type: 'select',
      label: 'Đất đai',
      value: updateData.land_id,
      onChange: (e) => setLandId(e.target.value),
      getItemForeign: landData.map((item) => (
        <option key={item.land_id} value={item.land_id}>{item.address}</option>
      ))
    },
    {
      controlId: 'floatingStatusCharge',
      type: 'date',
      onChange: (e) => setStatusCharge(e.target.value),
      label: 'Ngày thay đổi',
      value: updateData.status_charge
    },
    {
      controlId: 'floatingOldStatus',
      type: 'textarea',
      onChange: (e) => setOldStatus(e.target.value),
      label: 'Trạng thái ban đầu',
      value: updateData.old_status
    },
    {
      controlId: 'floatingNewStatus',
      type: 'textarea',
      onChange: (e) => setNewStatus(e.target.value),
      label: 'Trạng thái mới',
      value: updateData.new_status
    }
]
}
// Update Item
  async function updateItem() {
    const formData = new FormData();
    formData.append("land_id", landId);
    formData.append("status_charge", statusCharge);
    formData.append("old_status", oldStatus);
    formData.append("new_status", newStatus);
    await fetch("http://127.0.0.1:8000/api/statuses/" + updateId, {
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
    let result = await fetch("http://127.0.0.1:8000/api/statuses/search/" + key);
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
    let result = await fetch("http://127.0.0.1:8000/api/statuses");
    result = await result.json();
    setData(result);
  };
  const fetchForeign = async () => {
    let result = await fetch("http://127.0.0.1:8000/api/lands");
    result = await result.json();
    setLandData(result)
  };
// Call Data for only single Id
  const fetchDataUpdate = async (id) => {
    let result = await fetch(
      "http://127.0.0.1:8000/api/statuses/" + id
    );
    result = await result.json();
    setUpdateData(result);
    setUpdateId(result.status_id);
    setLandId(result.land_id);
    setStatusCharge(result.status_charge);
    setOldStatus(result.old_status);
    setNewStatus(result.new_status);
    setModalShowUpdate(true);
  };
// Start form
  return (
    <div>
      <Header />
      <Sidebar />
      <h1 className="text-center my-3">Quản lý trạng thái</h1>
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
              <td>Đất đai</td>
              <td>Ngày thay đổi</td>
              <td>Trạng thái ban đầu</td>
              <td>Trạng thái mới</td>
              <td colSpan={2} className="text-center">Settings</td>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.status_id}>
                <td>{item.status_id}</td>
                <td>{item.land_id}</td>
                <td>{item.status_charge}</td>
                <td>{item.old_status}</td>
                <td>{item.new_status}</td>
                <td>
                  <Button
                    variant="outline-danger"
                    onClick={() => deleteOperation(item.status_id)}
                  >
                    Delete
                  </Button>
                </td>
                <td>
                    <Button 
                    variant="outline-primary" 
                    onClick={() => {fetchDataUpdate(item.status_id)}}
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
export default Status;
