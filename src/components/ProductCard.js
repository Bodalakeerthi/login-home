import React from "react";

const ProductCard = ({ product, cart, setCart }) => {
  const handleAdd = () => setCart((prev) => ({ ...prev, [product.id]: (prev[product.id] || 0) + 1 }));
  const handleRemove = () => {
    setCart((prev) => {
      if (!prev[product.id]) return prev;
      const updated = { ...prev, [product.id]: prev[product.id] - 1 };
      if (updated[product.id] <= 0) delete updated[product.id];
      return updated;
    });
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <div className="buttons">
        <button onClick={handleRemove}>-</button>
        <span>{cart[product.id] || 0}</span>
        <button onClick={handleAdd}>+</button>
      </div>
    </div>
  );
};

export default ProductCard;
