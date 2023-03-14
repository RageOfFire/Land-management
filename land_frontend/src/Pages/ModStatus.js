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
  const [date, setDate] = useState("");
  const [info, setInfo] = useState("");
  const [name, setName] = useState("");
  const [reason, setReason] = useState("");
  const [data, setData] = useState([]);
  const [link, setLink] = useState([]);
  const [url, setURL] = useState("");
  const [updateData, setUpdateData] = useState({
    land_id: 0,
    mod_date: "",
    mod_info: "",
    mod_name: "",
    mod_reason: "",
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
        controlId: "floatingDate",
        type: "date",
        onChange: (e) => setDate(e.target.value),
        label: "Ngày sửa đổi",
      },
      {
        controlId: "floatingInfo",
        type: "textarea",
        onChange: (e) => setInfo(e.target.value),
        label: "Nội dung sửa đổi",
      },
      {
        controlId: "floatingName",
        type: "text",
        onChange: (e) => setName(e.target.value),
        label: "Người sửa đổi",
      },
      {
        controlId: "floatingReason",
        type: "textarea",
        onChange: (e) => setReason(e.target.value),
        label: "Lý do sửa đổi",
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
    await fetch("http://127.0.0.1:8000/api/modstatuses/" + id, {
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
    formData.append("mod_date", date);
    formData.append("mod_info", info);
    formData.append("mod_name", name);
    formData.append("mod_reason", reason);
    await fetch("http://127.0.0.1:8000/api/modstatuses", {
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
        controlId: "floatingDate",
        type: "date",
        onChange: (e) => setDate(e.target.value),
        label: "Ngày sửa đổi",
        value: updateData.mod_date,
      },
      {
        controlId: "floatingInfo",
        type: "textarea",
        onChange: (e) => setInfo(e.target.value),
        label: "Nội dung sửa đổi",
        value: updateData.mod_info,
      },
      {
        controlId: "floatingName",
        type: "text",
        onChange: (e) => setName(e.target.value),
        label: "Người sửa đổi",
        value: updateData.mod_name,
      },
      {
        controlId: "floatingReason",
        type: "textarea",
        onChange: (e) => setReason(e.target.value),
        label: "Lý do sửa đổi",
        value: updateData.mod_reason,
      },
    ],
  };
  // Update Item
  async function updateItem() {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("land_id", landId);
    formData.append("mod_date", date);
    formData.append("mod_info", info);
    formData.append("mod_name", name);
    formData.append("mod_reason", reason);
    await fetch("http://127.0.0.1:8000/api/modstatuses/" + updateId, {
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
      await fetch("http://127.0.0.1:8000/api/modstatuses/search/" + key)
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
    await fetch(url || "http://127.0.0.1:8000/api/modstatuses")
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
    await fetch("http://127.0.0.1:8000/api/modstatuses/" + id)
      .then((res) => res.json())
      .then((res) => {
        setUpdateData(res);
        setUpdateId(res.status_id);
        setLandId(res.land_id);
        setDate(res.mod_date);
        setInfo(res.mod_info);
        setName(res.mod_name);
        setReason(res.mod_reason);
        setModalShowUpdate(true);
      });
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
              <td>Ngày sửa đổi</td>
              <td>Nội dung sửa đổi</td>
              <td>Người sửa đổi</td>
              <td>Lý do sửa đổi</td>
              <td colSpan={2} className="text-center">
                Settings
              </td>
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
                    onClick={() => {
                      fetchDataUpdate(item.mod_id);
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
