import React, { useState, useEffect } from "react";
import { Table ,Button } from "react-bootstrap";
import Add from "../Components/Add";
import Update from "../Components/Update";
import Search from "../Components/Search";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import Swal from "sweetalert2";
function Land() {
  // UseState
  const [address, setAddress] = useState("");
  const [area, setArea] = useState(0);
  const [plan, setPlan] = useState("");
  const [status, setStatus] = useState(false);
  const [value, setValue] = useState(0);
  const [OwnerId, setOwnerId] = useState(0);
  const [data, setData] = useState([]);
  const [updateData, setUpdateData] = useState({
    address: '',
    area: 0,
    plan: '',
    status: false,
    value: 0,
    owner_id: 0,
  });
  const [ownerData, setOwnerData] = useState([]);
  const [updateId, setUpdateId] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [modalShowUpdate, setModalShowUpdate] = useState(false);

  // Send to add form
  const AddData = {
    Form: [
    {
      controlId: 'floatingAddress',
      type: 'text',
      onChange: (e) => setAddress(e.target.value),
      label: 'Địa chỉ'
    },
    {
      controlId: 'floatingArea',
      type: 'number',
      onChange: (e) => setArea(e.target.value),
      label: 'Diện tích'
    },
    {
      controlId: 'floatingPlan',
      type: 'text',
      onChange: (e) => setPlan(e.target.value),
      label: 'Mục đích sử dụng'
    },
    {
      controlId: 'floatingStatusTrue',
      type: 'radio',
      onChange: (e) => setStatus(true),
      label: 'Đã đăng ký'
    },
    {
      controlId: 'floatingStatusFalse',
      type: 'radio',
      onChange: (e) => setStatus(false),
      label: 'Chưa đăng ký'
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
    let result = await fetch("http://127.0.0.1:8000/api/lands/" + id, {
      method: "DELETE",
    });
    result = result.json();
    console.log(result);
    fetchData().catch(console.error);
  }
// Add Item
  async function addItem() {
    const formData = new FormData();
    formData.append("address", address);
    formData.append("area_decimal", area);
    formData.append("use_plans", plan);
    formData.append("status", status?1:0);
    formData.append("value", value);
    formData.append("owner_id", OwnerId);
    console.log(address, area, plan, status, value, OwnerId);
    await fetch("http://127.0.0.1:8000/api/lands", {
      method: "POST",
      body: formData,
    }).then(res => {
      console.log(res.message)
      Swal.fire("Good job!", "Land Added Successfully", "success");
    })
    fetchData().catch(console.error);
  }
// Send to update form
const UpdateData = {
  Form: [
  {
    controlId: 'floatingAddress',
    type: 'text',
    onChange: (e) => setAddress(e.target.value),
    label: 'Địa chỉ',
    value: updateData.address,
    onLoad: () => setAddress(updateData.address)
  },
  {
    controlId: 'floatingArea',
    type: 'number',
    onChange: (e) => setArea(e.target.value),
    label: 'Diện tích',
    value: updateData.area_decimal,
    onLoad: () => setArea(updateData.area_decimal)
  },
  {
    controlId: 'floatingPlan',
    type: 'text',
    onChange: (e) => setPlan(e.target.value),
    label: 'Mục đích sử dụng',
    value: updateData.use_plans,
    onLoad: () => setPlan(updateData.use_plans)
  },
  {
    controlId: 'floatingStatusTrue',
    type: 'radio',
    onChange: (e) => setStatus(true),
    label: 'Đã đăng ký',
    value: updateData.status,
    onLoad: () => setStatus(updateData.status)
  },
  {
    controlId: 'floatingStatusFalse',
    type: 'radio',
    onChange: (e) => setStatus(false),
    label: 'Chưa đăng ký',
    value: updateData.status,
    onLoad: () => setStatus(updateData.status)
  },
  {
    controlId: 'floatingValue',
    type: 'number',
    onChange: (e) => setValue(e.target.value),
    label: 'Giá trị',
    value: updateData.value,
    onLoad: () => setValue(updateData.value)
  }
]
}
// Update Item
  async function updateItem() {
    const formData = new FormData();
    formData.append("address", address);
    formData.append("area_decimal", area);
    formData.append("use_plans", plan);
    formData.append("status", status);
    formData.append("value", value);
    formData.append("owner_id", OwnerId);
    await fetch("http://127.0.0.1:8000/api/lands/" + updateId, {
      method: "POST",
      body: formData,
    }).then(res => {
      console.log(res.message)
      Swal.fire("Good job!", "Land Update Successfully", "success");
    })
    fetchData().catch(console.error);
  }
// Search item
async function SearchItem(key) {
  if(key) {
    const searchParams = new URLSearchParams({ key });
    let result = await fetch("http://127.0.0.1:8000/api/lands/search?" + searchParams);
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
    let result = await fetch("http://127.0.0.1:8000/api/lands");
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
      "http://127.0.0.1:8000/api/lands/" + id
    );
    result = await result.json();
    setUpdateData(result);
    setUpdateId(result.land_id);
    setAddress(result.address);
    setArea(result.area_decimal);
    setPlan(result.use_plans);
    setStatus(result.status);
    setValue(result.value);
    setOwnerId(result.owner_id);
    setModalShowUpdate(true);
  };
// Start form
  return (
    <div>
      <Header />
      <Sidebar />
      <h1 className="text-center my-3">Quản lý đất đai</h1>
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
              <td>Địa chỉ</td>
              <td>Diện tích</td>
              <td>Mục đích sử dụng</td>
              <td>Trạng thái</td>
              <td>Giá trị</td>
              <td>Chủ sở hữu</td>
              <td colSpan={2} className="text-center">Settings</td>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.land_id}>
                <td>{item.land_id}</td>
                <td>{item.address}</td>
                <td>{item.area_decimal}</td>
                <td>{item.use_plans}</td>
                <td>{item.status}</td>
                <td>{item.value}</td>
                <td>{item.owner_id}</td>
                <td>
                  <Button
                    variant="outline-danger"
                    onClick={() => deleteOperation(item.land_id)}
                  >
                    Delete
                  </Button>
                </td>
                <td>
                    <Button 
                    variant="outline-primary" 
                    onClick={() => {fetchDataUpdate(item.land_id)}}
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
export default Land;
