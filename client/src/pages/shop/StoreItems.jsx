import React, { useEffect, useState } from "react";
import Cards from "../../components/Cards";
import { useParams } from "react-router-dom";

const StoreItems = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  const {id} = useParams() 

  useEffect(() => {
    const getProductsData = async () => {
      const response = await fetch("/products.json");
      const data = await response.json();
      setProducts(data);
      console.log(data);
    };
    getProductsData();
    setCurrentPage(1);
  }, []);

  //Paginaton Logic is here
  const indexOfLastPage = currentPage * itemsPerPage;
  const indexOfFirstPage = indexOfLastPage - itemsPerPage;
  const currentItems = products.slice(indexOfFirstPage, indexOfLastPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h1>Store ID : {id}</h1>
      <h1>Store Items Filter Section</h1>

      {/* Items */}
      <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 w-full">
        {currentItems.map((product, index) => (
          <Cards key={index} product={product} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center my-5">
        {
            Array.from({ length: Math.ceil(products.length / itemsPerPage)}).map((_,index)=>(
                <button 
                    key={index + 1} 
                    onClick={()=>paginate(index + 1)}
                    className={`mx-3 px-3 py-1 rounded-full bg-gray-300 ${currentPage === index + 1 ? "bg-blue-500 text-white" : ""}`}
                >
                    {index + 1}
                </button>
            ))
        }
      </div>
    </div>
  );
};

export default StoreItems;
