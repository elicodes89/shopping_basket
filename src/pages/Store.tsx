import { Row, Col } from "react-bootstrap";
import { StoreProduct } from "../components/StoreProduct";
import storeProduct from "../data/products.json";

export function Store() {
  return (
    <>
      <h1>Store</h1>
      <Row md={2} xs={1} lg={3} className="g-3">
        {storeProduct.map((product) => (
          <Col key={product.id}>
            <StoreProduct {...product} />
          </Col>
        ))}
      </Row>
    </>
  );
}
