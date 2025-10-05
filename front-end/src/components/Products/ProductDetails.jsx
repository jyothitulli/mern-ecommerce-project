import { useState } from "react";
import { toast } from "sonner";
import { ProductGrid } from "./ProductGrid";
import { useApp } from "../../context/AppContext";

const selectedProduct = {
  name: "Stylish Shirt",
  price: 120,
  originalPrice: 150,
  description:
    "A stylish shirt made from high-quality materials. Perfect for casual and formal occasions.",
  brand: "FashionBrand",
  material: "Leather",
  sizes: ["S", "M", "L", "XL"],
  colors: ["Red", "Blue"],
  images: [
    { url: "https://picsum.photos/500/500?random=1", alt: "Stylish Shirt Front View" },
    { url: "https://picsum.photos/500/500?random=2", alt: "Stylish Shirt Back View" },
  ],
};

const similarProducts = [
  {
    _id: 1,
    sku: "SIMILAR-001",
    name: "Product 1",
    price: 100,
    images: [{ url: "https://picsum.photos/500/500?random=3", altText: "Product 1" }],
  },
  {
    _id: 2,
    sku: "SIMILAR-002",
    name: "Product 2",
    price: 100,
    images: [{ url: "https://picsum.photos/500/500?random=4", altText: "Product 2" }],
  },
  {
    _id: 3,
    sku: "SIMILAR-003",
    name: "Product 3",
    price: 100,
    images: [{ url: "https://picsum.photos/500/500?random=5", altText: "Product 3" }],
  },
  {
    _id: 4,
    sku: "SIMILAR-004",
    name: "Product 4",
    price: 100,
    images: [{ url: "https://picsum.photos/500/500?random=6", altText: "Product 4" }],
  },
];

export const ProductDetails = () => {
  const [mainImage, setMainImage] = useState(selectedProduct.images[0]?.url);
  const [selectSize, setSelectSize] = useState(null);
  const [selectColor, setSelectColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const { addToCart } = useApp();

  const handleAddToCart = () => {
    if (!selectSize || !selectColor) {
      toast.error("Please select size and color before adding to cart", { duration: 1000 });
      return;
    }

    // Use AppContext helper signature: addToCart(product, selectedSize, selectedColor, quantity)
    setIsButtonDisabled(true);
    try {
      addToCart(
        { ...selectedProduct, images: selectedProduct.images || [{ url: mainImage }] },
        selectSize,
        selectColor,
        quantity
      );
      toast.success("Product added to cart successfully", { duration: 1000 });
    } finally {
      setTimeout(() => setIsButtonDisabled(false), 300);
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
        <div className="flex flex-col md:flex-row">
          {/* Thumbnails */}
          <div className="hidden md:flex flex-col space-y-4 mr-6">
            {selectedProduct.images.map((img, index) => (
              <img
                key={index}
                src={img.url}
                alt={img.alt}
                onClick={() => setMainImage(img.url)}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                  mainImage === img.url ? "border-black" : "border-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="md:w-1/2 mb-4 md:mb-0">
            <img src={mainImage} alt="Product" className="w-full h-auto object-cover rounded-lg" />
          </div>

          {/* Mobile Thumbnails */}
          <div className="md:hidden flex overflow-x-scroll space-x-4 mb-4">
            {selectedProduct.images.map((img, index) => (
              <img
                key={index}
                src={img.url}
                alt={img.alt}
                onClick={() => setMainImage(img.url)}
                className="w-20 h-20 object-cover rounded-lg cursor-pointer border"
              />
            ))}
          </div>

          {/* Product Info */}
          <div className="md:w-1/2 md:ml-10">
            <h1 className="text-2xl md:text-3xl font-semibold mb-2">{selectedProduct.name}</h1>
            <p className="text-lg text-gray-600 mb-1 line-through">{selectedProduct.originalPrice}</p>
            <p className="text-xl text-gray-500 mb-2">$ {selectedProduct.price}</p>
            <p className="text-gray-600 mb-4">{selectedProduct.description}</p>

            {/* Color selection */}
            <div className="mb-4">
              <p className="text-gray-700">Color:</p>
              <div className="flex gap-2 mt-2">
                {selectedProduct.colors.map((color, index) => (
                  <button
                    key={index}
                    className={`w-8 h-8 rounded-full border ${
                      selectColor === color ? "border-black" : "border-gray-300"
                    }`}
                    onClick={() => setSelectColor(color)}
                    style={{ backgroundColor: color.toLowerCase(), filter: "brightness(0.5)" }}
                  ></button>
                ))}
              </div>
            </div>

            {/* Size selection */}
            <div className="mb-4">
              <p className="text-gray-700">Size :</p>
              <div className="flex gap-2 mt-2">
                {selectedProduct.sizes.map((size, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 border rounded ${selectSize === size ? "bg-black text-white" : ""}`}
                    onClick={() => setSelectSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity selection */}
            <div className="mb-6">
              <p className="text-gray-700">Quantity:</p>
              <div className="flex items-center space-x-4 mt-2">
                <button
                  className="px-2 py-1 bg-gray-200 rounded text-lg"
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                >
                  -
                </button>
                <span className="text-lg">{quantity}</span>
                <button
                  className="px-2 py-1 bg-gray-200 rounded text-lg"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart button */}
            <button
              onClick={handleAddToCart}
              disabled={isButtonDisabled}
              className={`bg-black text-white py-2 px-6 rounded w-full mb-4 ${
                isButtonDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-900"
              }`}
            >
              {isButtonDisabled ? "Adding..." : "Add to Cart"}
            </button>

            {/* Product characteristics */}
            <div className="mt-10 text-gray-700">
              <h3 className="text-xl font-bold mb-4">Characteristics:</h3>
              <table className="w-full text-left text-sm text-gray-600">
                <tbody>
                  <tr>
                    <td className="py-1">Brand</td>
                    <td className="py-1">{selectedProduct.brand}</td>
                  </tr>
                  <tr>
                    <td className="py-1">Material</td>
                    <td className="py-1">{selectedProduct.material}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Similar products */}
        <div className="mt-20">
          <h2 className="text-2xl text-center font-medium mb-4">You May Also Like</h2>
          <ProductGrid products={similarProducts} />
        </div>
      </div>
    </div>
  );
};
