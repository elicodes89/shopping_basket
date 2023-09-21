import { useEffect, useState } from "react";

//gets the value from localstorage or it gets the initialValue that it's being passed in

export function useLocalStorage<CustomType>(
  key: string,
  initialValue: CustomType | (() => CustomType)
) {
  const [value, setValue] = useState<CustomType>(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue != null) return JSON.parse(jsonValue);
    if (typeof initialValue === "function") {
      return (initialValue as () => CustomType)();
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as [CustomType, typeof setValue];
}
