import { Container, Row, Col } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
function Home() {
  const [data, setData] = useState([]);
  // Reload data
  useEffect(() => {
    fetchData().catch(console.error);
  }, []);
  // Call Data ALl
  const fetchData = async () => {
    let result = await fetch("http://127.0.0.1:8000/api/all");
    result = await result.json();
    setData(result);
  };
  return (
    <div>
      <Header />
      <Sidebar />
      <h1 className="text-center my-3">Trang chủ</h1>
      <Container>
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
