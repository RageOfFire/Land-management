import React, { useState, useEffect } from "react";
import { Table, Button, Pagination } from "react-bootstrap";
import Add from "../Components/Add";
import Update from "../Components/Update";
import Search from "../Components/Search";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import Swal from "sweetalert2";
function Status() {
  // UseState
  const [landId, setLandId] = useState(0);
  const [service, setService] = useState(0);
  const [maintenance, setMaintenance] = useState(0);
  const [manage, setManage] = useState(0);
  const [data, setData] = useState([]);
  const [link, setLink] = useState([]);
  const [url, setURL] = useState("");
  const [updateData, setUpdateData] = useState({
    land_id: 0,
    service_cost: 0,
    maintenance_cost: 0,
    manage_cost: 0,
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
        controlId: "floatingService",
        type: "number",
        onChange: (e) => setService(e.target.value),
        label: "Phí dịch vụ",
      },
      {
        controlId: "floatingMaintenance",
        type: "number",
        onChange: (e) => setMaintenance(e.target.value),
        label: "Phí bảo trì",
      },
      {
        controlId: "floatingManage",
        type: "number",
        onChange: (e) => setManage(e.target.value),
        label: "Phí quản lý",
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
    await fetch("http://127.0.0.1:8000/api/costs/" + id, {
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
    formData.append("service_cost", service);
    formData.append("maintenance_cost", maintenance);
    formData.append("manage_cost", manage);
    await fetch("http://127.0.0.1:8000/api/costs", {
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
        controlId: "floatingService",
        type: "number",
        onChange: (e) => setService(e.target.value),
        label: "Phí dịch vụ",
        value: updateData.service_cost,
      },
      {
        controlId: "floatingMaintenance",
        type: "number",
        onChange: (e) => setMaintenance(e.target.value),
        label: "Phí bảo trì",
        value: updateData.maintenance_cost,
      },
      {
        controlId: "floatingManage",
        type: "number",
        onChange: (e) => setManage(e.target.value),
        label: "Phí quản lý",
        value: updateData.manage_cost,
      },
    ],
  };
  // Update Item
  async function updateItem() {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("land_id", landId);
    formData.append("service_cost", service);
    formData.append("maintenance_cost", maintenance);
    formData.append("manage_cost", manage);
    await fetch("http://127.0.0.1:8000/api/costs/" + updateId, {
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
      await fetch("http://127.0.0.1:8000/api/costs/search/" + key)
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
    await fetch(url || "http://127.0.0.1:8000/api/costs")
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
    await fetch("http://127.0.0.1:8000/api/costs/" + id)
      .then((res) => res.json())
      .then((res) => {
        setUpdateData(res);
        setUpdateId(res.status_id);
        setLandId(res.land_id);
        setService(res.service_cost);
        setMaintenance(res.maintenance_cost);
        setManage(res.manage_cost);
        setModalShowUpdate(true);
      });
  };
  // Start form
  return (
    <div>
      <Header />
      <Sidebar />
      <h1 className="text-center my-3">Quản lý biểu phí</h1>
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
              <td>Phí dịch vụ</td>
              <td>Phí bảo trì</td>
              <td>Phí quản lý</td>
              <td colSpan={2} className="text-center">
                Settings
              </td>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.cost_id}>
                <td>{item.cost_id}</td>
                <td>{item.land_id}</td>
                <td>{item.service_cost}</td>
                <td>{item.maintenance_cost}</td>
                <td>{item.manage_cost}</td>
                <td>
                  <Button
                    variant="outline-danger"
                    onClick={() => deleteOperation(item.cost_id)}
                  >
                    Delete
                  </Button>
                </td>
                <td>
                  <Button
                    variant="outline-primary"
                    onClick={() => {
                      fetchDataUpdate(item.cost_id);
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
