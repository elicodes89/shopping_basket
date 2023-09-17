import { Button, Card } from "react-bootstrap";
import { useShoppingBasket } from "../context/BasketContext";
import { Currency } from "../utilities/Currency";

type StoreProductProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

export function StoreProduct({ id, name, price, imgUrl }: StoreProductProps) {
  const {
    getItemQuantity,
    increaseBasketQuantity,
    decreaseBasketQuantity,
    removeFromBasket,
  } = useShoppingBasket();
  const quantity = getItemQuantity(id);

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={imgUrl}
        height="200px"
        style={{ objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{name}</span>
          <span className="ms-2 text-muted">{Currency(price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button
              className="w-100"
              onClick={() => increaseBasketQuantity(id)}
            >
              + Add Me
            </Button>
          ) : (
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: ".5rem" }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: ".5rem" }}
              >
                <Button onClick={() => decreaseBasketQuantity(id)}>-</Button>
                <div>
                  <span className="fs-3">{quantity}</span> in cart
                </div>
                <Button onClick={() => increaseBasketQuantity(id)}>+</Button>
              </div>
              <Button
                onClick={() => removeFromBasket(id)}
                variant="danger"
                size="sm"
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
