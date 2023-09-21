import { createContext, useContext, ReactNode, useState } from "react";
import { ShoppingBasket } from "../components/ShoppingBasket";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ShoppingBasketProviderProps = {
  children: ReactNode;
};

type BasketItem = {
  id: number;
  quantity: number;
};

type BasketContext = {
  getItemQuantity: (id: number) => number;
  increaseBasketQuantity: (id: number) => void;
  decreaseBasketQuantity: (id: number) => void;
  removeFromBasket: (id: number) => void;
  openBasket: () => void;
  closeBasket: () => void;
  basketQuantity: number;
  basketItems: BasketItem[];
};

const BasketContext = createContext({} as BasketContext);

export function useShoppingBasket() {
  return useContext(BasketContext);
}

export function ShoppingBasketProvider({
  children,
}: ShoppingBasketProviderProps) {
  const [basketItems, setBasketItems] = useLocalStorage<BasketItem[]>(
    "basket",
    []
  );
  const [isOpen, setIsOpen] = useState(false);

  function getItemQuantity(id: number) {
    return basketItems.find((item) => item.id === id)?.quantity || 0;
  }

  function increaseBasketQuantity(id: number) {
    setBasketItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseBasketQuantity(id: number) {
    setBasketItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromBasket(id: number) {
    setBasketItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  }

  const basketQuantity = basketItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const openBasket = () => setIsOpen(true);
  const closeBasket = () => setIsOpen(false);

  return (
    <BasketContext.Provider
      value={{
        getItemQuantity,
        increaseBasketQuantity,
        decreaseBasketQuantity,
        removeFromBasket,
        basketItems,
        basketQuantity,
        openBasket,
        closeBasket,
      }}
    >
      {children}
      <ShoppingBasket isOpen={isOpen} />
    </BasketContext.Provider>
  );
}
