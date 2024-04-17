import React from 'react';

const ProductCard = ({ product }) => {
  const { title, description, price, discountPercentage, rating, stock, brand, category, thumbnail } = product;

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <img className="w-full h-56 object-cover object-center" src={thumbnail} alt={title} />
      <div className="p-6">
        <div className="flex justify-between items-center">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-gray-600 uppercase tracking-widest bg-gray-200 rounded-full">{category}</span>
          <span className="inline-block px-3 py-1 text-xs font-semibold text-gray-600 uppercase tracking-widest bg-gray-200 rounded-full">{brand}</span>
        </div>
        <h2 className="mt-4 text-xl font-semibold">{title}</h2>
        <p className="mt-2 text-gray-600">{description}</p>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="text-xl font-bold">${(price - (price * (discountPercentage / 100))).toFixed(2)}</span>
            <span className="text-sm text-gray-500 line-through ml-2">${price}</span>
            <span className="text-sm text-green-500 ml-2">{discountPercentage}% off</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-600">Rating: {rating}</span>
            <span className="text-gray-600 ml-4">Stock: {stock}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
