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
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [plan, setPlan] = useState("");
  const [value, setValue] = useState(0);
  const [data, setData] = useState([]);
  const [updateData, setUpdateData] = useState({
    land_id: 0,
    contract_start: '',
    contract_end: '',
    use_plans: '',
    value: ''
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
        controlId: 'floatingStart',
        type: 'date',
        onChange: (e) => setStart(e.target.value),
        label: 'Ngày ký'
      },
      {
        controlId: 'floatingEnd',
        type: 'date',
        onChange: (e) => setEnd(e.target.value),
        label: 'Ngày hết hạn'
      },
      {
        controlId: 'floatingPlan',
        type: 'textarea',
        onChange: (e) => setPlan(e.target.value),
        label: 'Mục đích sử dụng'
      },
      {
        controlId: 'floatingValue',
        type: 'number',
        onChange: (e) => setValue(e.target.value),
        label: 'Giá trị'
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
    let result = await fetch("http://127.0.0.1:8000/api/contracts/" + id, {
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
    formData.append("contract_start", start);
    formData.append("contract_end", end);
    formData.append("use_plans", plan);
    formData.append("value", value);
    await fetch("http://127.0.0.1:8000/api/contracts", {
      method: "POST",
      body: formData,
    }).then(res => {
      console.log(res.message)
      Swal.fire("Good job!", "Contract Added Successfully", "success");
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
      controlId: 'floatingStart',
      type: 'date',
      onChange: (e) => setStart(e.target.value),
      label: 'Ngày ký',
      value: updateData.contract_start
    },
    {
      controlId: 'floatingEnd',
      type: 'date',
      onChange: (e) => setEnd(e.target.value),
      label: 'Ngày hết hạn',
      value: updateData.contract_end
    },
    {
      controlId: 'floatingPlan',
      type: 'textarea',
      onChange: (e) => setPlan(e.target.value),
      label: 'Mục đích sử dụng',
      value: updateData.use_plans
    },
    {
      controlId: 'floatingValue',
      type: 'number',
      onChange: (e) => setValue(e.target.value),
      label: 'Giá trị',
      value: updateData.value
    }
]
}
// Update Item
  async function updateItem() {
    const formData = new FormData();
    formData.append("land_id", landId);
    formData.append("contract_start", start);
    formData.append("contract_end", end);
    formData.append("use_plans", plan);
    formData.append("value", value);
    await fetch("http://127.0.0.1:8000/api/contracts/" + updateId, {
      method: "POST",
      body: formData,
    }).then(res => {
      console.log(res.message)
      Swal.fire("Good job!", "Contract Update Successfully", "success");
    })
    fetchData().catch(console.error);
  }
// Search item
async function SearchItem(key) {
  if(key) {
    let result = await fetch("http://127.0.0.1:8000/api/contracts/search/" + key);
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
    let result = await fetch("http://127.0.0.1:8000/api/contracts");
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
      "http://127.0.0.1:8000/api/contracts/" + id
    );
    result = await result.json();
    setUpdateData(result);
    setUpdateId(result.status_id);
    setLandId(result.land_id);
    setStart(result.contract_start);
    setEnd(result.contract_end);
    setPlan(result.use_plans);
    setValue(result.value);
    setModalShowUpdate(true);
  };
// Start form
  return (
    <div>
      <Header />
      <Sidebar />
      <h1 className="text-center my-3">Quản lý hợp đồng</h1>
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
              <td>Ngày ký</td>
              <td>Ngày hết hạn</td>
              <td>Mục đích sử dụng</td>
              <td>Giá trị</td>
              <td colSpan={2} className="text-center">Settings</td>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.contract_id}>
                <td>{item.contract_id}</td>
                <td>{item.land_id}</td>
                <td>{item.contract_start}</td>
                <td>{item.contract_end}</td>
                <td>{item.use_plans}</td>
                <td>{item.value}</td>
                <td>
                  <Button
                    variant="outline-danger"
                    onClick={() => deleteOperation(item.contract_id)}
                  >
                    Delete
                  </Button>
                </td>
                <td>
                    <Button 
                    variant="outline-primary" 
                    onClick={() => {fetchDataUpdate(item.contract_id)}}
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
