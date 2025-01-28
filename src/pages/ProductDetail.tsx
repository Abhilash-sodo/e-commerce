import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Heart, Share2, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const product = {
  id: 1,
  name: 'Classic White Sneakers',
  price: 89.99,
  description: 'Premium quality sneakers made with genuine leather and durable rubber sole.',
  images: [
    'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800',
    'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800',
  ],
  sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11'],
  colors: ['White', 'Black', 'Gray'],
  rating: 4.5,
  reviews: [
    {
      id: 1,
      user: 'John D.',
      rating: 5,
      comment: 'Great quality and comfortable fit!',
      date: '2024-02-15',
      verified: true,
    },
    {
      id: 2,
      user: 'Abhi s.',
      rating: 4,
      comment: 'nice quality and fit comfortable!',
      date: '2024-02-15',
      verified: true,
    },
    // Add more reviews
  ],
};

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [currentImage, setCurrentImage] = useState(0);
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select size and color');
      return;
    }

    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.images[0],
      },
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="relative">
          <div className="aspect-w-1 aspect-h-1">
            <img
              src={product.images[currentImage]}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <button
            onClick={() => setCurrentImage((prev) => (prev > 0 ? prev - 1 : prev))}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => setCurrentImage((prev) => (prev < product.images.length - 1 ? prev + 1 : prev))}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
          >
            <ChevronRight size={24} />
          </button>
          <div className="flex justify-center mt-4 space-x-4">
            {product.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-2 h-2 rounded-full ${
                  currentImage === index ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <div className="flex items-center mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={20}
                className={`${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
            <span className="ml-2 text-gray-600">
              ({product.rating} rating)
            </span>
          </div>

          <p className="text-2xl font-bold text-gray-900 mt-4">${product.price}</p>
          <p className="mt-4 text-gray-600">{product.description}</p>

          {/* Size Selection */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900">Size</h3>
            <div className="grid grid-cols-4 gap-2 mt-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    selectedSize === size
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900">Color</h3>
            <div className="grid grid-cols-4 gap-2 mt-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    selectedColor === color
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 space-y-4">
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
            >
              <ShoppingCart className="mr-2" size={20} />
              Add to Cart
            </button>
            <div className="flex space-x-4">
              <button className="flex-1 flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">
                <Heart className="mr-2" size={20} />
                Save
              </button>
              <button className="flex-1 flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">
                <Share2 className="mr-2" size={20} />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Customer Reviews</h2>
        <div className="space-y-8">
          {product.reviews.map((review) => (
            <div key={review.id} className="border-b pb-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{review.user}</p>
                  <div className="flex items-center mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`${
                          i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {review.date}
                  {review.verified && (
                    <span className="ml-2 text-green-600">Verified Purchase</span>
                  )}
                </div>
              </div>
              <p className="mt-4 text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;