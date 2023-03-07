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
  const [date, setDate] = useState("");
  const [info, setInfo] = useState("");
  const [name, setName] = useState("");
  const [reason, setReason] = useState("");
  const [data, setData] = useState([]);
  const [updateData, setUpdateData] = useState({
    land_id: 0,
    mod_date: '',
    mod_info: '',
    mod_name: '',
    mod_reason: ''
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
        controlId: 'floatingDate',
        type: 'date',
        onChange: (e) => setDate(e.target.value),
        label: 'Ngày sửa đổi'
      },
      {
        controlId: 'floatingInfo',
        type: 'textarea',
        onChange: (e) => setInfo(e.target.value),
        label: 'Nội dung sửa đổi'
      },
      {
        controlId: 'floatingName',
        type: 'text',
        onChange: (e) => setName(e.target.value),
        label: 'Người sửa đổi'
      },
      {
        controlId: 'floatingReason',
        type: 'textarea',
        onChange: (e) => setReason(e.target.value),
        label: 'Lý do sửa đổi'
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
    let result = await fetch("http://127.0.0.1:8000/api/modstatuses/" + id, {
      method: "DELETE",
    });
    result = result.json();
    console.log(result);
    fetchData().catch(console.error);
  }
// Add Item
  async function addItem() {
    const formData = new FormData();
    formData.append("land_id", landId);
    formData.append("mod_date", date);
    formData.append("mod_info", info);
    formData.append("mod_name", name);
    formData.append("mod_reason", reason);
    await fetch("http://127.0.0.1:8000/api/modstatuses", {
      method: "POST",
      body: formData,
    }).then(res => {
      console.log(res.message)
      Swal.fire("Good job!", "ModStatus Added Successfully", "success");
    })
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
      controlId: 'floatingDate',
      type: 'date',
      onChange: (e) => setDate(e.target.value),
      label: 'Ngày sửa đổi',
      value: updateData.mod_date
    },
    {
      controlId: 'floatingInfo',
      type: 'textarea',
      onChange: (e) => setInfo(e.target.value),
      label: 'Nội dung sửa đổi',
      value: updateData.mod_info
    },
    {
      controlId: 'floatingName',
      type: 'text',
      onChange: (e) => setName(e.target.value),
      label: 'Người sửa đổi',
      value: updateData.mod_name
    },
    {
      controlId: 'floatingReason',
      type: 'textarea',
      onChange: (e) => setReason(e.target.value),
      label: 'Lý do sửa đổi',
      value: updateData.mod_reason
    }
]
}
// Update Item
  async function updateItem() {
    const formData = new FormData();
    formData.append("land_id", landId);
    formData.append("mod_date", date);
    formData.append("mod_info", info);
    formData.append("mod_name", name);
    formData.append("mod_reason", reason);
    await fetch("http://127.0.0.1:8000/api/modstatuses/" + updateId, {
      method: "POST",
      body: formData,
    }).then(res => {
      console.log(res.message)
      Swal.fire("Good job!", "ModStatus Update Successfully", "success");
    })
    fetchData().catch(console.error);
  }
// Search item
async function SearchItem(key) {
  if(key) {
    let result = await fetch("http://127.0.0.1:8000/api/modstatuses/search/" + key);
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
    let result = await fetch("http://127.0.0.1:8000/api/modstatuses");
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
      "http://127.0.0.1:8000/api/modstatuses/" + id
    );
    result = await result.json();
    setUpdateData(result);
    setUpdateId(result.status_id);
    setLandId(result.land_id);
    setDate(result.mod_date);
    setInfo(result.mod_info);
    setName(result.mod_name);
    setReason(result.mod_reason);
    setModalShowUpdate(true);
  };
// Start form
  return (
    <div>
      <Header />
      <Sidebar />
      <h1 className="text-center my-3">Quản lý lịch sử thay đổi</h1>
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
              <td>Ngày sửa đổi</td>
              <td>Nội dung sửa đổi</td>
              <td>Người sửa đổi</td>
              <td>Lý do sửa đổi</td>
              <td colSpan={2} className="text-center">Settings</td>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.mod_id}>
                <td>{item.mod_id}</td>
                <td>{item.land_id}</td>
                <td>{item.mod_date}</td>
                <td>{item.mod_info}</td>
                <td>{item.mod_name}</td>
                <td>{item.mod_reason}</td>
                <td>
                  <Button
                    variant="outline-danger"
                    onClick={() => deleteOperation(item.mod_id)}
                  >
                    Delete
                  </Button>
                </td>
                <td>
                    <Button 
                    variant="outline-primary" 
                    onClick={() => {fetchDataUpdate(item.mod_id)}}
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
