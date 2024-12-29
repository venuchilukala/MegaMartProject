import React from "react";

const StoreCard = (props) => {
  const { store } = props;
  const {id, name, contact, floor, category, specialty } = store;

  return (
    <div className="card lg:card-side bg-base-100 shadow-xl xl:mx-16 xl:my-8 m-4">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp"
          alt="Album"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p className="flex-grow-0">{category}</p>
        <p className="flex-grow-0">{specialty}</p>
        <p className="flex-grow-0">
          <span className="text-lg font-medium">{floor}</span> Contact :{" "}
          {contact}
        </p>

        <div className="card-actions justify-end">
          <a href={`/store/${id}`}>
            <button className="btn btn-primary">Listen</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default StoreCard;
