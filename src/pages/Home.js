import React, { useState } from "react";
import ProductList from "../components/ProductList";


const Home = ({ searchQuery, cart, setCart }) => {
  const [category, setCategory] = useState("");

  return (
    <div>
      <div className="categories">
        <button onClick={() => setCategory("")}>All</button>
        <button onClick={() => setCategory("Fruits")}>Fruits</button>
        <button onClick={() => setCategory("Vegetables")}>Vegetables</button>
      </div>
      <ProductList category={category} searchQuery={searchQuery} cart={cart} setCart={setCart} />
    </div>
  );
};

export default Home;
