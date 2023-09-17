import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Store } from "./pages/Store";
import { NavBar } from "./components/Navbar";
import { ShoppingBasketProvider } from "./context/BasketContext";

function App() {
  return (
    <ShoppingBasketProvider>
      <NavBar />
      <Container>
        <Routes>
          <Route path="/" element={<Store />} />
        </Routes>
      </Container>
    </ShoppingBasketProvider>
  );
}

export default App;
