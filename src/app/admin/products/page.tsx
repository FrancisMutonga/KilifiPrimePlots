"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";

interface Category {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  location: string;
  unitsavailable: string;
  images: string[];
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from("category").select("id, name");
      if (error) {
        setError("Failed to fetch categories.");
        console.error(error.message);
      } else {
        setCategories(data || []);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      let query = supabase.from("plots").select("id, name, description, price, location, unitsavailable, images, category_id");
      if (selectedCategory) {
        query = query.eq("category_id", selectedCategory);
      }
      const { data, error } = await query;
      if (error) {
        setError("Failed to fetch products. Please try again.");
        console.error(error.message);
      } else {
        setProducts(data.map(product => ({ ...product, images: product.images || [] })) || []);
      }
      setLoading(false);
    };
    fetchProducts();
  }, [selectedCategory]);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
  };

  const handleSave = async () => {
    if (!editingProduct) return;
    const { error } = await supabase.from("products").update({
      name: editingProduct.name,
      description: editingProduct.description,
      price: editingProduct.price,
      location: editingProduct.location,
      unitsavailable: editingProduct.unitsavailable,
      images: editingProduct.images,
    }).eq("id", editingProduct.id);

    if (error) {
      alert("Failed to update product.");
    } else {
      alert("Product updated successfully!");
      setEditingProduct(null);
      const { data } = await supabase.from("products").select("*");
      setProducts(data || []);
    }
  };

  return (
     <div className="min-h-screen overflow-x-hidden  mt-20 ">
      <div className="w-full p-6 flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-center text-kilifigreen text-link">Products</h1>

        {error && <p className="text-center text-red-500">{error}</p>}

        <div className="mb-2 item-center justify-center">
          <label htmlFor="category" className="block text-lg text-bold text-kilifigreen mb-2">
            Filter by Category
          </label>
          <select
            id="category"
            className="px-4 py-2 border bg-gray-200 text-black rounded-md w-1/2"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.length === 0 ? (
              <option value="" disabled>
                No categories available
              </option>
            ) : (
              categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))
            )}
          </select>
        </div>

        {loading ? (
          <p className="text-center text-gray-600">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-600">No products available.</p>
        ) : (
          <div className="w-full overflow-mx-auto">
            <table className="border-collapse bg-gray-200 shadow-md rounded-lg overflow-hidden w-full">
              <thead>
                <tr className="bg-kilifigreen text-white">
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Price</th>
                  <th className="py-3 px-4 text-left">Location</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b text-black">
                    <td className="py-3 px-4">{product.name}</td>
                    <td className="py-3 px-4">{product.price}</td>
                    <td className="py-3 px-4">{product.location}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-kilifigreen hover:underline"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      <div className="w-full p-6 flex flex-col gap-4">
        {error && <p className="text-center text-red-500">{error}</p>}
        {editingProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 mt-20">
            <div className="bg-warm p-6 rounded-lg shadow-lg w-full">
              <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
              <form>
                <label className="block mb-2">Name:
                  <input type="text" value={editingProduct.name} onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})} className="block w-full bg-gray-200 text-black border rounded-md px-3 py-2 mt-1" />
                </label>
                <label className="block mb-2">Description:
                  <textarea value={editingProduct.description} onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})} className="block w-full bg-gray-200 text-black border rounded-md px-3 py-2 mt-1" />
                </label>
                <label className="block mb-2">Price:
                  <input type="text" value={editingProduct.price} onChange={(e) => setEditingProduct({...editingProduct, price: e.target.value})} className="block w-full bg-gray-200 text-black border rounded-md px-3 py-2 mt-1" />
                </label>
                <label className="block mb-2">Location:
                  <input type="text" value={editingProduct.location} onChange={(e) => setEditingProduct({...editingProduct, location: e.target.value})} className="block w-full bg-gray-200 text-black border rounded-md px-3 py-2 mt-1" />
                </label>
                <label className="block mb-2">Available Units:
                  <input type="text" value={editingProduct.unitsavailable} onChange={(e) => setEditingProduct({...editingProduct, unitsavailable: e.target.value})} className="block w-full bg-gray-200 text-black border rounded-md px-3 py-2 mt-1" />
                </label>
                <label className="block mb-2">Images (comma-separated URLs):
                  <input type="text" value={editingProduct.images.join(", ")} onChange={(e) => setEditingProduct({...editingProduct, images: e.target.value.split(", ")})} className="block w-full bg-gray-200 text-black border rounded-md px-3 py-2 mt-1" />
                </label>
                <div className="flex justify-between gap-3 mt-4">
                  <button type="button" onClick={() => setEditingProduct(null)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded">Cancel</button>
                  <button type="button" onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded ml-2">Save</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
  )
};

export default ProductList;
