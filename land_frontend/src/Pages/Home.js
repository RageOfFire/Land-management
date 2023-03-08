import { Container, Row, Col, Spinner } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
function Home() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // Reload data
  useEffect(() => {
    fetchData().catch(console.error);
  }, []);
  // Call Data ALl
  const fetchData = async () => {
    setIsLoading(true)
    await fetch("http://127.0.0.1:8000/api/all").then((res) => res.json())
    .then((res) => {
      setData(res);
      setIsLoading(false)
    })
  };
  return (
    <div>
      <Header />
      <Sidebar />
      <h1 className="text-center my-3">Trang chủ</h1>
      <Container>
        {isLoading ?
        <div className="text-center my-5">
        <Spinner animation="border" variant="dark" /><br />
        Đang tải...
        </div>: null}
        <Row md={2}>
        {data.map((item) => (
          <Col key={item.name}>
            <div className="shadow p-3 mb-5 bg-body rounded">{item.name}: {item.count}</div>
          </Col>
        ))}
        </Row>
      </Container>
    </div>
  );
}
export default Home;
