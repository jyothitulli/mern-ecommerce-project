import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export const ProductGrid = ({products}) => {
  // Determine grid columns based on product count for better centering
  const getGridClasses = () => {
    const count = products.length;
    if (count === 1) {
      return "grid grid-cols-1 gap-6 justify-items-center";
    } else if (count === 2) {
      return "grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center";
    } else if (count === 3) {
      return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center";
    } else {
      return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6";
    }
  };

  // Map common product keywords to representative images in /images/products
  const keywordImages = [
    { key: 'blouse', file: '/images/products/blouse-1.jpg' },
    { key: 'dress shirt', file: '/images/products/dress-shirt-24.jpg' },
    { key: 'shirt', file: '/images/products/graphic-t-shirt-30.jpg' },
    { key: 't-shirt', file: '/images/products/graphic-t-shirt-30.jpg' },
    { key: 'hoodie', file: '/images/products/hoodie-35.jpg' },
    { key: 'jacket', file: '/images/products/denim-jacket-62.jpg' },
    { key: 'bomber', file: '/images/products/bomber-jacket-28.jpg' },
    { key: 'blazer', file: '/images/products/formal-blazer-78.jpg' },
    { key: 'jeans', file: '/images/products/bootcut-jeans-17.jpg' },
    { key: 'pants', file: '/images/products/dress-pants-84.jpg' },
    { key: 'shorts', file: '/images/products/board-shorts-56.jpg' },
    { key: 'trench', file: '/images/products/trench-coat-130.jpg' },
    { key: 'coat', file: '/images/products/peacoat-92.jpg' },
    { key: 'sweater', file: '/images/products/sweater-98.jpg' },
    { key: 'sweatshirt', file: '/images/products/sweatshirt-124.jpg' },
    { key: 'polo', file: '/images/products/polo-shirt-94.jpg' },
    { key: 'sneakers', file: '/images/products/canvas-sneakers-64.jpg' },
    { key: 'shoes', file: '/images/products/loafers-131.jpg' },
    { key: 'boots', file: '/images/products/leather-boots-54.jpg' },
    { key: 'belt', file: '/images/products/leather-belt-67.jpg' },
    { key: 'sunglasses', file: '/images/products/sunglasses-22.jpg' },
    { key: 'watch', file: '/images/products/watch-68.jpg' },
    { key: 'dress', file: '/images/products/wrap-dress-144.jpg' },
    { key: 'gown', file: '/images/products/evening-gown-65.jpg' },
    { key: 'tie', file: '/images/products/tie-128.jpg' },
    { key: 'scarf', file: '/images/products/silk-scarf-137.jpg' },
    { key: 'wallet', file: '/images/products/wallet-106.jpg' },
  ];

  const getProductCardImage = (product) => {
    // Prefer API-provided images
    if (product?.images?.length && product.images[0]?.url) {
      return product.images[0].url;
    }
    // Try name-based mapping
    const name = (product?.name || '').toLowerCase();
    for (const m of keywordImages) {
      if (name.includes(m.key)) return m.file;
    }
    // Try category fallback
    const cat = (product?.category || '').toLowerCase();
    if (cat.includes('top')) return '/images/products/graphic-t-shirt-30.jpg';
    if (cat.includes('bottom')) return '/images/products/dress-pants-84.jpg';
    // Generic fallback
    return '/images/products/denim-jacket-62.jpg';
  };

  const getColorHex = (colorName) => {
    if (!colorName) return undefined;
    const map = {
      'black': '#000000',
      'white': '#FFFFFF',
      'red': '#DC2626',
      'blue': '#2563EB',
      'navy blue': '#1E3A8A',
      'navy': '#1E3A8A',
      'dark blue': '#1E40AF',
      'light blue': '#3B82F6',
      'gray': '#6B7280',
      'grey': '#6B7280',
      'green': '#059669',
      'yellow': '#FACC15',
      'burgundy': '#7C2D12',
      'purple': '#7C3AED',
      'pink': '#EC4899',
      'orange': '#EA580C',
      'brown': '#A16207',
      'beige': '#F5F5DC',
      'cream': '#FFFDD0',
      'olive': '#6B8E23',
    };
    const key = String(colorName).toLowerCase();
    return map[key] || key; // fallback: use raw value as CSS color
  };

  const ProductCard = ({ product }) => {
    const [hoverColor, setHoverColor] = useState(null);

    const primaryColorHex = getColorHex(product?.colors?.[0]);
    const baseImg = getProductCardImage(product);
    const secondImg = product?.images?.[1]?.url;
    const displayImg = hoverColor && secondImg ? secondImg : baseImg;
    const altText = product?.images?.[0]?.altText || product?.name || 'Product image';

    return (
      <Link to={`/product/${product.sku}`} className="block">
        <div className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow">
          <div
            className="relative w-full h-96 mb-4 overflow-hidden rounded-lg border"
            style={{ borderColor: primaryColorHex || '#e5e7eb', borderWidth: '2px' }}
          >
            <img 
              src={displayImg}
              alt={altText}
              className='w-full h-full object-cover hover:scale-105 transition-transform duration-300' 
            />
            {/* Color-tinted overlay shown when hovering a swatch */}
            <div
              className="absolute inset-0 pointer-events-none mix-blend-multiply transition-opacity duration-200"
              style={{ backgroundColor: getColorHex(hoverColor || ''), opacity: hoverColor ? 0.18 : 0 }}
            />
          </div>
          <h3 className="text-sm mb-2 font-medium">{product.name}</h3>
          <div className="flex items-center gap-2 mb-2">
            {product.discountPrice ? (
              <>
                <span className="text-gray-900 font-semibold text-sm">
                  ${product.discountPrice}
                </span>
                <span className="text-gray-500 text-sm line-through">
                  ${product.price}
                </span>
              </>
            ) : (
              <span className="text-gray-900 font-semibold text-sm">
                ${product.price}
              </span>
            )}
          </div>
          {/* Show up to 4 color swatches to visualize available colors */}
          {product?.colors?.length > 0 && (
            <div className="flex items-center gap-1 mb-2">
              {product.colors.slice(0, 4).map((c) => (
                <span
                  key={c}
                  title={c}
                  className="inline-block w-3 h-3 rounded-full border cursor-pointer"
                  style={{ backgroundColor: getColorHex(c), borderColor: '#e5e7eb' }}
                  onMouseEnter={() => setHoverColor(c)}
                  onMouseLeave={() => setHoverColor(null)}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="text-xs text-gray-500 ml-1">+{product.colors.length - 4}</span>
              )}
            </div>
          )}
          {product.rating && (
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <span>★</span>
              <span>{product.rating}</span>
              <span>({product.numReviews})</span>
            </div>
          )}
        </div>
      </Link>
    );
  };

  return (
    <div className="w-full flex justify-center">
      <div className={getGridClasses()}>
        {products.map((product) => (
          <ProductCard key={product.sku} product={product} />
        ))}
      </div>
    </div>
  )
}
