import axios from "axios";
import localforage from "localforage";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard({ cart, setCart }) {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    price: [],
    rating: [],
    category: [],
    brand: [],
  });

  const limit = 12;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://dummyjson.com/products?skip=${
            (page - 1) * limit
          }&limit=${limit}`
        );
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [page]);

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    setPage(page - 1);
  };

  const handleNavigate = (data) => {
    localforage.setItem(data.id, data, function (err) {
      // if err is non-null, we got an error
      if (!err) {
        navigate(`details/${data.id}`);
      } else {
        console.log(err);
      }
    });
  };

  // price

  const handleAddToCart = async (productId) => {
    try {
      const updatedCart = { ...cart };
      const product = products.find((product) => product.id === productId);
      updatedCart[productId] = {
        id: productId,
        title: product.title,
        quantity: updatedCart[productId]
          ? updatedCart[productId].quantity + 1
          : 1,
        price: product.price * ((100 - product.discountPercentage) / 100),
      };
      setCart(updatedCart);
      await localforage.setItem("cart", updatedCart);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // Filter Products
  const filteredProducts = products.filter((product) => {
    if (filters.price.length > 0 && !filters.price.includes(product.price))
      return false;
    if (filters.rating.length > 0 && !filters.rating.includes(product.rating))
      return false;
    if (
      filters.category.length > 0 &&
      !filters.category.includes(product.category)
    )
      return false;
    if (filters.brand.length > 0 && !filters.brand.includes(product.brand))
      return false;
    return true;
  });

  return (
    <div className=" mx-auto">
        <div className="flex">
        <div className="w-1/2 md:w-1/3 p-4">
            <div className="mb-4">
            <h2 className="font-semibold mb-2">Category</h2>
    
            <select
                className="mt-4"
                multiple
                value={filters.category}
                onChange={(e) =>
                setFilters({
                    ...filters,
                    category: Array.from(
                    e.target.selectedOptions,
                    (option) => option.value
                    ),
                })
                }
                className="w-full rounded border"
            >
                <option value="smartphones">Smartphones</option>
                <option value="laptops">Laptops</option>
                <option value="fragrances">fragrances</option>
                <option value="skin care">skin care</option>
            </select>
            </div>
            <div className="mb-4">
            <h2 className="font-semibold mb-2">Brand</h2>
            <select
                multiple
                value={filters.brand}
                onChange={(e) =>
                setFilters({
                    ...filters,
                    brand: Array.from(
                    e.target.selectedOptions,
                    (option) => option.value
                    ),
                })
                }
                className="w-full rounded border"
            >
                <option value="Apple">Apple</option>
                <option value="Samsung">Samsung</option>
                <option value="OPPO">OPPO</option>
                <option value="Huawei">Huawei</option>
                {/* Add more brands as needed */}
            </select>
            </div>
        </div>
            <div className="">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredProducts.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white cursor-pointer p-4 shadow-md rounded-lg flex flex-col justify-between"
                    >
                        <div>
                        <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="w-full h-48 object-cover mb-4 rounded-md"
                        />
                        <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                        <p className="text-gray-600 mb-2 line-clamp-2">
                            {product.description}
                        </p>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-800">${product.price}</span>
                            <span className="text-green-500 font-semibold">
                            $
                            {(
                                ((100 - product.discountPercentage) / 100) *
                                product.price
                            ).toFixed(2)}
                            </span>
                        </div>
                        </div>
                        <div className="flex justify-between items-center mt-8">
                        <p
                            className="hover:underline"
                            onClick={() => handleNavigate(product)}
                        >
                            View Details...
                        </p>
                        <button
                            onClick={() => handleAddToCart(product.id)}
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        >
                            Add to Cart
                        </button>
                        </div>
                    </div>
                    ))}
                </div>
                <div className="my-8 flex justify-start items-center gap-2">
                    <button
                    onClick={handlePrevPage}
                    disabled={page === 1}
                    className={`bg-blue-500 text-white py-2 px-4 rounded ${
                        page === 1 && "opacity-50 cursor-not-allowed"
                    }`}
                    >
                    Previous
                    </button>
                    <span>Page {page}</span>
                    <button
                    onClick={handleNextPage}
                    disabled={products.length < limit}
                    className={`bg-blue-500 text-white py-2 px-4 rounded ${
                        products.length < limit && "opacity-50 cursor-not-allowed"
                    }`}
                    >
                    Next
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
}
