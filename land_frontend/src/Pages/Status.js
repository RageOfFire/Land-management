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
  const [statusCharge, setStatusCharge] = useState("");
  const [oldStatus, setOldStatus] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [data, setData] = useState([]);
  const [link, setLink] = useState([]);
  const [url, setURL] = useState("");
  const [updateData, setUpdateData] = useState({
    land_id: 0,
    status_charge: "",
    old_status: "",
    new_status: "",
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
        controlId: "floatingStatusCharge",
        type: "date",
        onChange: (e) => setStatusCharge(e.target.value),
        label: "Ngày thay đổi",
      },
      {
        controlId: "floatingOldStatus",
        type: "textarea",
        onChange: (e) => setOldStatus(e.target.value),
        label: "Trạng thái ban đầu",
      },
      {
        controlId: "floatingNewStatus",
        type: "textarea",
        onChange: (e) => setNewStatus(e.target.value),
        label: "Trạng thái mới",
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
    await fetch("http://127.0.0.1:8000/api/statuses/" + id, {
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
    console.log(landId, statusCharge, oldStatus, newStatus);
    const formData = new FormData();
    formData.append("land_id", landId);
    formData.append("status_charge", statusCharge);
    formData.append("old_status", oldStatus);
    formData.append("new_status", newStatus);
    await fetch("http://127.0.0.1:8000/api/statuses", {
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
        controlId: "floatingStatusCharge",
        type: "date",
        onChange: (e) => setStatusCharge(e.target.value),
        label: "Ngày thay đổi",
        value: updateData.status_charge,
      },
      {
        controlId: "floatingOldStatus",
        type: "textarea",
        onChange: (e) => setOldStatus(e.target.value),
        label: "Trạng thái ban đầu",
        value: updateData.old_status,
      },
      {
        controlId: "floatingNewStatus",
        type: "textarea",
        onChange: (e) => setNewStatus(e.target.value),
        label: "Trạng thái mới",
        value: updateData.new_status,
      },
    ],
  };
  // Update Item
  async function updateItem() {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("land_id", landId);
    formData.append("status_charge", statusCharge);
    formData.append("old_status", oldStatus);
    formData.append("new_status", newStatus);
    await fetch("http://127.0.0.1:8000/api/statuses/" + updateId, {
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
      await fetch("http://127.0.0.1:8000/api/statuses/search/" + key)
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
    await fetch(url || "http://127.0.0.1:8000/api/statuses")
      .then((res) => res.json())
      .then((res) => {
        setData(res.data);
        setLink(res.links);
        setIsLoading(false);
      });
  };
  const fetchForeign = async () => {
    await fetch("http://127.0.0.1:8000/api/lands")
      .then((res) => {
        res.json();
      })
      .then((res) => {
        setLandData(res.data);
      });
  };
  // Call Data for only single Id
  const fetchDataUpdate = async (id) => {
    await fetch("http://127.0.0.1:8000/api/statuses/" + id)
      .then((res) => res.json())
      .then((res) => {
        setUpdateData(res);
        setUpdateId(res.status_id);
        setLandId(res.land_id);
        setStatusCharge(res.status_charge);
        setOldStatus(res.old_status);
        setNewStatus(res.new_status);
        setModalShowUpdate(true);
      });
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
              <td>Ngày thay đổi</td>
              <td>Trạng thái ban đầu</td>
              <td>Trạng thái mới</td>
              <td colSpan={2} className="text-center">
                Settings
              </td>
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
                    onClick={() => {
                      fetchDataUpdate(item.status_id);
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
