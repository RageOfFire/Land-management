import React, { useState, useEffect } from "react";
import { Table, Button, Pagination, Spinner } from "react-bootstrap";
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
  const [link, setLink] = useState([]);
  const [url, setURL] = useState("");
  const [updateData, setUpdateData] = useState({
    land_id: 0,
    contract_start: "",
    contract_end: "",
    use_plans: "",
    value: "",
  });
  const [landData, setLandData] = useState([]);
  const [updateId, setUpdateId] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [modalShowUpdate, setModalShowUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Send to add form
  const AddData = {
    Form: [
      {
        controlId: "floatingLandId",
        type: "select",
        label: "Đất đai",
        onChange: (e) => setLandId(e.target.value),
        getItemForeign: landData.map((item) => (
          <option key={item.land_id} value={item.land_id}>
            {item.address}
          </option>
        )),
      },
      {
        controlId: "floatingStart",
        type: "date",
        onChange: (e) => setStart(e.target.value),
        label: "Ngày ký",
      },
      {
        controlId: "floatingEnd",
        type: "date",
        onChange: (e) => setEnd(e.target.value),
        label: "Ngày hết hạn",
      },
      {
        controlId: "floatingPlan",
        type: "textarea",
        onChange: (e) => setPlan(e.target.value),
        label: "Mục đích sử dụng",
      },
      {
        controlId: "floatingValue",
        type: "number",
        onChange: (e) => setValue(e.target.value),
        label: "Giá trị",
      },
    ],
  };
  // Reload data
  useEffect(() => {
    fetchData().catch(console.error);
    fetchForeign().catch(console.error);
  }, [url]);
  // Delete Item
  async function deleteOperation(id) {
    await fetch("http://127.0.0.1:8000/api/contracts/" + id, {
      method: "DELETE",
    });
    fetchData().catch(console.error);
    Swal.fire({
      toast: true,
      position: "top-right",
      icon: "error",
      title: "Xóa thành công",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });
  }
  // Add Item
  async function addItem() {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("land_id", landId);
    formData.append("contract_start", start);
    formData.append("contract_end", end);
    formData.append("use_plans", plan);
    formData.append("value", value);
    await fetch("http://127.0.0.1:8000/api/contracts", {
      method: "POST",
      body: formData,
    });
    Swal.fire({
      toast: true,
      position: "top-right",
      icon: "success",
      title: "Thêm thành công",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });
    setIsLoading(false);
    fetchData().catch(console.error);
  }
  // Send to update form
  const UpdateData = {
    Form: [
      {
        controlId: "floatingLandId",
        type: "select",
        label: "Đất đai",
        value: updateData.land_id,
        onChange: (e) => setLandId(e.target.value),
        getItemForeign: landData.map((item) => (
          <option key={item.land_id} value={item.land_id}>
            {item.address}
          </option>
        )),
      },
      {
        controlId: "floatingStart",
        type: "date",
        onChange: (e) => setStart(e.target.value),
        label: "Ngày ký",
        value: updateData.contract_start,
      },
      {
        controlId: "floatingEnd",
        type: "date",
        onChange: (e) => setEnd(e.target.value),
        label: "Ngày hết hạn",
        value: updateData.contract_end,
      },
      {
        controlId: "floatingPlan",
        type: "textarea",
        onChange: (e) => setPlan(e.target.value),
        label: "Mục đích sử dụng",
        value: updateData.use_plans,
      },
      {
        controlId: "floatingValue",
        type: "number",
        onChange: (e) => setValue(e.target.value),
        label: "Giá trị",
        value: updateData.value,
      },
    ],
  };
  // Update Item
  async function updateItem() {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("land_id", landId);
    formData.append("contract_start", start);
    formData.append("contract_end", end);
    formData.append("use_plans", plan);
    formData.append("value", value);
    await fetch("http://127.0.0.1:8000/api/contracts/" + updateId, {
      method: "POST",
      body: formData,
    });
    Swal.fire({
      toast: true,
      position: "top-right",
      icon: "success",
      title: "Sửa thành công",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });
    setIsLoading(false);
    fetchData().catch(console.error);
  }
  // Search item
  async function SearchItem(key) {
    if (key) {
      await fetch("http://127.0.0.1:8000/api/contracts/search/" + key)
        .then((res) => res.json())
        .then((res) => {
          setData(res);
        });
    } else {
      fetchData().catch(console.error);
    }
  }
  const onChangeSearch = (e) => SearchItem(e.target.value);
  // Call Data ALl
  const fetchData = async () => {
    setIsLoading(true);
    await fetch(url || "http://127.0.0.1:8000/api/contracts")
      .then((res) => res.json())
      .then((res) => {
        setData(res.data);
        setLink(res.links);
        setIsLoading(false);
      });
  };
  const fetchForeign = async () => {
    await fetch("http://127.0.0.1:8000/api/lands")
      .then((res) => res.json())
      .then((res) => {
        setLandData(res.data);
      });
  };
  // Call Data for only single Id
  const fetchDataUpdate = async (id) => {
    await fetch("http://127.0.0.1:8000/api/contracts/" + id)
      .then((res) => res.json())
      .then((res) => {
        setUpdateData(res);
        setUpdateId(res.status_id);
        setLandId(res.land_id);
        setStart(res.contract_start);
        setEnd(res.contract_end);
        setPlan(res.use_plans);
        setValue(res.value);
        setModalShowUpdate(true);
      });
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
      <Add
        show={modalShow}
        data={AddData}
        onHide={() => setModalShow(false)}
        onSubmit={addItem}
        isLoading={isLoading}
      />
      <Update
        show={modalShowUpdate}
        data={UpdateData}
        onHide={() => setModalShowUpdate(false)}
        onSubmit={updateItem}
        isLoading={isLoading}
      />
      <div className="col-sm-8 offset-sm-2">
        <Table
          striped
          bordered
          hover
          size="sm"
          responsive
          className="text-center"
        >
          <thead>
            <tr>
              <td>Id</td>
              <td>Đất đai</td>
              <td>Ngày ký</td>
              <td>Ngày hết hạn</td>
              <td>Mục đích sử dụng</td>
              <td>Giá trị</td>
              <td colSpan={2} className="text-center">
                Settings
              </td>
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
                    onClick={() => {
                      fetchDataUpdate(item.contract_id);
                    }}
                  >
                    Update
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination className="text-center">
          {link.map((item) => (
            <Pagination.Item
              key={item.label}
              active={item.active}
              onClick={() => setURL(item.url)}
            >
              {item.label}
            </Pagination.Item>
          ))}
        </Pagination>
        {isLoading ? (
          <div className="text-center my-5">
            <Spinner animation="border" variant="info" />
            <br />
            Đang tải...
          </div>
        ) : null}
      </div>
    </div>
  );
}
export default Status;
