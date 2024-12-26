import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const Cards = (props) => {
  const { product } = props;
  const { name, description } = product;

  const [isFavourite, setFavourite] = useState(false);

  const handleFavouriteClick = () => {
    setFavourite(!isFavourite);
  };

  return (
    <div className="card bg-base-100 w-96 shadow-xl relative">
      <div
        className={`absolute right-2 top-2 rating z-10 p-4 bg-blue-400 rounded-tr-3xl rounded-bl-3xl ${
          isFavourite ? "text-rose-600" : "text-white"
        }`}
        onClick={handleFavouriteClick}
      >
        <FaHeart className="h-5 w-5 cursor-pointer" />
      </div>
      <Link to="/">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes"
            className="hover:scale-105 transition-all duration-200"
          />
        </figure>
      </Link>
      <div className="card-body">
        <Link to="/"><h2 className="card-title">{name}</h2></Link>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
