import {
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader,
  OffcanvasTitle,
  Stack,
} from "react-bootstrap";
import { useShoppingBasket } from "../context/BasketContext";
import { BasketItem } from "./BasketItem";
import { Currency } from "../utilities/Currency";
import products from "../data/products.json";

type ShoppingBasketProps = {
  isOpen: boolean;
};

export function ShoppingBasket({ isOpen }: ShoppingBasketProps) {
  const { closeBasket, basketItems } = useShoppingBasket();
  return (
    <Offcanvas show={isOpen} onHide={closeBasket} placement="end">
      <OffcanvasHeader closeButton>
        <OffcanvasTitle>What you've got so far</OffcanvasTitle>
      </OffcanvasHeader>
      <OffcanvasBody>
        <Stack gap={3}>
          {basketItems.map((item) => (
            <BasketItem key={item.id} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Your Total is:{" "}
            {Currency(
              basketItems.reduce((total, basketItem) => {
                const item = products.find((i) => i.id === basketItem.id);
                return total + (item?.price || 0) * basketItem.quantity;
              }, 0)
            )}
          </div>
        </Stack>
      </OffcanvasBody>
    </Offcanvas>
  );
}
