import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sliders as Slider, Grid, List, Filter, Star } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  brand: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Classic White Sneakers',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=500',
    rating: 4.5,
    brand: 'Nike'
  },
  // Add more products here
];

const ProductList: React.FC = () => {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('relevance');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">All Products</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setView('grid')}
            className={`p-2 ${view === 'grid' ? 'text-blue-600' : 'text-gray-600'}`}
          >
            <Grid size={20} />
          </button>
          <button
            onClick={() => setView('list')}
            className={`p-2 ${view === 'list' ? 'text-blue-600' : 'text-gray-600'}`}
          >
            <List size={20} />
          </button>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded-md px-3 py-1"
          >
            <option value="relevance">Relevance</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Filters */}
        <div className="w-64 flex-shrink-0">
          <div className="border rounded-lg p-4">
            <h2 className="font-semibold mb-4">Filters</h2>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Price Range</h3>
              <div className="flex items-center space-x-4">
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  className="w-20 border rounded px-2 py-1"
                />
                <span>-</span>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-20 border rounded px-2 py-1"
                />
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Brands</h3>
              <div className="space-y-2">
                {['Nike', 'Adidas', 'Puma', 'Reebok'].map((brand) => (
                  <label key={brand} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedBrands([...selectedBrands, brand]);
                        } else {
                          setSelectedBrands(selectedBrands.filter((b) => b !== brand));
                        }
                      }}
                      className="mr-2"
                    />
                    {brand}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className={`grid ${view === 'grid' ? 'grid-cols-3' : 'grid-cols-1'} gap-6`}>
            {products.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className={`group ${
                  view === 'grid'
                    ? 'block'
                    : 'flex items-center space-x-4'
                }`}
              >
                <div className={`relative ${
                  view === 'grid' ? 'aspect-w-1 aspect-h-1' : 'w-48 h-48'
                }`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className={view === 'grid' ? 'mt-4' : 'flex-1'}>
                  <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
                  <div className="flex items-center mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-1 text-sm text-gray-500">
                      ({product.rating})
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;