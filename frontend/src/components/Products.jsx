import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice/cartSlice";
import Category from "./category";

const Products = () => {
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState("All");

  const dispatch = useDispatch();

  async function ProductsData(selectCategory = "All") {
    try {
      const response = await fetch(
        `/api/userproducts?category=${selectCategory}`
      );
      const record = await response.json();
      if (response.ok) {
        setProduct(record.data);
      } else {
        console.log(record);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    ProductsData(category);
  }, [category, dispatch]);

  return (
    <section className="py-10 px-6 max-w-7xl mx-auto">
      <Category onSelectCategory={setCategory} />
      <h2 className="text-2xl font-semibold text-gray-600 mb-6">
        Treading Products 🔥
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-7">
        {product.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow rounded-lg p-4 hover:shadow-lg transition"
          >
            <img
              src={`/uploads/${item.productImage}`}
              alt="ProductImage"
              className="w-full h-32 object-contain rounded"
            />
            <h3 className="mt-2 font-medium text-gray-700">
              {item.productName}
            </h3>
            <p className="text-green-600 font-bold">₹{item.productPrice}</p>
            <button
              className="mt-2 w-full bg-green-500 text-white py-1 rounded hover:bg-green-900"
              onClick={() => {
                dispatch(addToCart(item));
              }}
            >
              Add To Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;