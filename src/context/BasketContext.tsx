import { createContext, useContext, ReactNode, useState } from "react";

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
};

const BasketContext = createContext({} as BasketContext);

export function useShoppingBasket() {
  return useContext(BasketContext);
}

export function ShoppingBasketProvider({
  children,
}: ShoppingBasketProviderProps) {
  const [basketItems, setBasketItems] = useState<BasketItem[]>([]);

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

  return (
    <BasketContext.Provider
      value={{
        getItemQuantity,
        increaseBasketQuantity,
        decreaseBasketQuantity,
        removeFromBasket,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
}
