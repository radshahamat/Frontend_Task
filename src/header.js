import axios from "axios";
import localforage from "localforage";
import {  useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header({cart,setCart}) {
  const [activeSearch, setActiveSearch] = useState(null);
  const [searchText, setSearchText] = useState([]);

  const navigate = useNavigate();

  async function searchItem(e) {
    setSearchText(e.target.value);
    // console.log(e.target.value);
    if (e.target.value === "") {
      setActiveSearch([]);
      return false;
    }

    try {
      let response = await axios.get(
        "https://dummyjson.com/products?skip=0&limit=100"
      );
      let productData = response.data.products;
      let searchData = productData
        .filter((w) =>
          w.title.toLowerCase().includes(e.target.value.toLowerCase())
        )
        // .map((x) => x.title)
        .slice(0, 8);
      console.log(searchData);
      setActiveSearch(searchData);
    } catch (ex) {
      console.log(ex);
    }
  }

  const handleNavigate = (data) => {
    console.log(data);
    setActiveSearch(null);
    setSearchText(data.title);

    localforage.setItem(data.id, data, function (err) {
      // if err is non-null, we got an error
      if (!err) {
        navigate(`details/${data.id}`);
      } else {
        console.log(err);
      }
    });
  };



  const getTotalCartItems = () => {
    let totalItems = 0;
    for (const productId in cart) {
      totalItems += cart[productId].quantity;
    }
    return totalItems;
  };

  return (
    <>
      <div className="flex justify-between items-center p-6 gap-6">
        <div className="">
          <form className="w-[500px] relative">
            <div className="relative">
              <input
                type="search"
                placeholder="Type your search here"
                className="w-full p-3 rounded-full bg-slate-200  "
                value={searchText}
                onChange={(e) => searchItem(e)}
              />
            </div>

            {searchText.length > 0 && activeSearch?.length > 0 && (
              <div className="absolute top-20 p-4 bg-slate-800 text-white w-full rounded-xl left-1/2 -translate-x-1/2 flex flex-col gap-2">
                {activeSearch?.map((s) => (
                  <p
                    className="mb-2 cursor-pointer capitalize"
                    onClick={() => handleNavigate(s)}
                    key={s.id}
                  >
                    {s.title}
                  </p>
                ))}
              </div>
            )}

            {searchText.length > 0 && activeSearch?.length <= 0 && (
              <div className="absolute top-20 p-4 bg-slate-800 text-white w-full rounded-xl left-1/2 -translate-x-1/2 flex flex-col gap-2">
                Nothing Found
              </div>
            )}
          </form>
        </div>

        <div className="flex justify-between items-center gap-6">
          <a href="/" className="font-semibold">
            Dashboard
          </a>
          {/* <a href="/">details</a> */}
          <a href="/checkout">Checkout</a>

          <button className="bg-blue-400 text-white p-2 rounded-md px-4 font-bold flex justify-center items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
            <p>Cart ({getTotalCartItems()})</p>
          </button>
        </div>
      </div>
    </>
  );
}
