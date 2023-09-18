import { Button, Stack } from "react-bootstrap";
import { useShoppingBasket } from "../context/BasketContext";
import products from "../data/products.json";
import { Currency } from "../utilities/Currency";

type BasketItemProps = {
  id: number;
  quantity: number;
};

export function BasketItem({ id, quantity }: BasketItemProps) {
  const { removeFromBasket } = useShoppingBasket();
  const item = products.find((i) => i.id === id);
  if (item == null) return null;

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={item.imgUrl}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          {item.name}{" "}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {Currency(item.price)}
        </div>
      </div>
      <div>{Currency(item.price * quantity)}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromBasket(item.id)}
      >
        &times;
      </Button>
    </Stack>
  );
}
