import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import toast from "react-hot-toast";

import { Footer, Navbar } from "../components";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    const getProduct = async () => {
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/products/${id}`
      );
      const data = await response.json();
      console.log("hhh : ", data);
      setProduct(data);
    };
    getProduct();
  }, [id]);

  console.log("data  : ", product);

  const ShowProduct = () => {
    if (!product || !product.category) {
      return <p>Loading...</p>;
    }

    return (
      <>
        <div className="container my-5 py-2">
          <div className="row">
            <div className="col-md-6 col-sm-12 py-3">
              <img
                className="img-fluid"
                src={product.category["image"]}
                alt={product.title}
                width="400px"
                height="400px"
              />
            </div>
            <div className="col-md-6 col-md-6 py-5">
              <h4 className="text-uppercase text-muted">
                {product.category.name}
              </h4>
              <h1 className="display-5">{product.title}</h1>
              <p className="lead">
                {product.rating && product.rating.rate}{" "}
                <i className="fa fa-star"></i>
              </p>
              <h3 className="display-6  my-4">${product.price}</h3>
              <p className="lead">{product.description}</p>
              <button
                className="btn btn-dark m-1"
                onClick={() => {
                  toast.success("Added to cart");
                  addProduct(product);
                }}
              >
                Add to Cart
              </button>
              <Link to="/cart" className="btn btn-dark mx-3">
                Go to Cart
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          <ShowProduct />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;
