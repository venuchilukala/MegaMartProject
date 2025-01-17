import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from "../../components/Cards";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";


const Toppicks = () => {
  const [products, setProducts] = useState([]);
  const slider = React.useRef(null);

  const axiosPublic = useAxiosPublic()

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosPublic("/products");
      const data = await response.data;
      const filteredData = data.filter(item => item.isOnOffer)
      setProducts(filteredData);
    };
    fetchData();
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
 
  return (
    <div className="px-24 relative">
      <div className="">
        <div>
          <p className="text-5xl font-semibold my-4">Top picks</p>
          <p className="text-3xl font-bold py-2">Best Selling Products from different categories</p>
          
        </div>
        <div className="md:absolute right-3 top-8  mb-8 md:mr-24">
          <button
            onClick={() => slider?.current?.slickPrev()}
            className="btn p-2 ml-5 rounded-full"
            aria-label="Previous Slide"
          >
            <FaAngleLeft className="w-8 h-8 p-1" />
          </button>
          <button
            onClick={() => slider?.current?.slickNext()}
            className="btn p-2 ml-5 rounded-full bg-blue-600"
            aria-label="Next Slide"
          >
            <FaAngleRight className="w-8 h-8 p-1 text-white" />
          </button>
        </div>
      </div>
      <Slider ref={slider} {...settings} className="overflow-hidden mt-10 space-x-5">
        {products?.map((product, i) => (
          <Cards key={i} product={product} />
        ))}
      </Slider>
    </div>
  );
};

export default Toppicks;



