import {
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader,
  OffcanvasTitle,
  Stack,
} from "react-bootstrap";
import { useShoppingBasket } from "../context/BasketContext";
import { BasketItem } from "./BasketItem";

type ShoppingBasketProps = {
  isOpen: boolean;
};

export function ShoppingBasket({ isOpen }: ShoppingBasketProps) {
  const { closeBasket, basketItems } = useShoppingBasket();
  //implementing offcanvas from bootstrap
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
        </Stack>
      </OffcanvasBody>
    </Offcanvas>
  );
}
