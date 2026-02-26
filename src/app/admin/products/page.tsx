"use client";
import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/client";
import Link from "next/link";

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
  category_id: string;
  feature?: string;
  available: boolean;
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
      try {
        const snapshot = await getDocs(collection(db, "category"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Category[];
        setCategories(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch categories.");
      }
    };

    fetchCategories();
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const snapshot = await getDocs(collection(db, "plots"));
        const data = snapshot.docs.map((doc) => {
          const docData = doc.data() as Omit<Product, "id">;

          // Find the category object from categories array
          const categoryObj =
            categories.find((c) => c.id === docData.category_id) || null;

          return {
            id: doc.id,
            name: docData.name,
            images: docData.images,
            description: docData.description,
            location: docData.location,
            price: docData.price,
            available: docData.available,
            category: categoryObj,
            unitsavailable: docData.unitsavailable,
            category_id: docData.category_id,
          } as Product;
        });

        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    if (categories.length > 0) fetchProducts(); // wait until categories are loaded
  }, [categories]);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
  };

  const handleSave = async () => {
    if (!editingProduct) return;
    

      try {
        const productRef = doc(db, "plots", editingProduct.id);

        await updateDoc(productRef, {
          name: editingProduct.name,
          description: editingProduct.description,
          price: editingProduct.price,
          location: editingProduct.location,
          unitsavailable: editingProduct.unitsavailable,
          images: editingProduct.images,
          category_id: editingProduct.category_id,
          feature: editingProduct.feature || "",
          available: editingProduct.available,
        });

        alert("Product updated successfully!");

        // Refresh products
        const snapshot = await getDocs(collection(db, "plots"));
        const updatedProducts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];

        setProducts(updatedProducts);
        setEditingProduct(null);
      } catch (error) {
        console.error(error);
        alert("Failed to update product.");
      }
   
  };

  return (
    <div className="min-h-screen overflow-x-hidden mt-8">
      <div className="w-full p-6 flex flex-col gap-4">
        <div className=" flex flex-row gap-20 justify-center ">
          <h1 className="text-3xl  lg:text-5xl font-bold text-center text-kilifigreen">
            Products
          </h1>
          <Link href="/admin/add-product">
            <h5 className="text-md lg:text-xl font-semibold border border-kilifigreen bg-beige/80 text-kilifigreen text-center rounded-full px-4 lg:px-6  py-3">
              + New
            </h5>
          </Link>
        </div>

        {error && <p className="text-center text-red-500">{error}</p>}

        <div className="mb-2 flex items-center justify-center gap-2">
          <label
            htmlFor="category"
            className="block text-lg font-bold text-kilifigreen mb-2"
          >
            Filter by Category
          </label>
          <select
            id="category"
            className="px-4 py-2 border border-kilifigreen bg-beige/85 text-black rounded-full w-1/2"
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
            <table className="border-collapse bg-beige/90 shadow-md rounded-lg overflow-hidden w-full">
              <thead>
                <tr className="bg-kilifigreen text-white">
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Price</th>

                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-kilifigreen/30 text-black"
                  >
                    <td className="py-3 px-4">{product.name}</td>
                    <td className="py-3 px-4">{product.price}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-kilifigreen font-bold hover:underline"
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

        {editingProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center mt-20 p-8">
            <div className="bg-beige/80 p-6 rounded-lg shadow-lg w-full text-black max-h-[80vh] overflow-y-auto">
              <h2 className="text-2xl font-bold text-center text-kilifi mb-4">
                Edit Product
              </h2>
              <form>
                <label className="block mb-2">
                  Name:
                  <input
                    type="text"
                    value={editingProduct.name}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        name: e.target.value,
                      })
                    }
                    className="block w-full bg-gray-200 text-black border rounded-md px-3 py-2 mt-1"
                  />
                </label>
                <label className="block mb-2">
                  Description:
                  <textarea
                    value={editingProduct.description}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        description: e.target.value,
                      })
                    }
                    className="block w-full bg-gray-200 text-black border rounded-md px-3 py-2 mt-1"
                  />
                </label>
                <label className="block mb-2">
                  Price:
                  <input
                    type="text"
                    value={editingProduct.price}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        price: e.target.value,
                      })
                    }
                    className="block w-full bg-gray-200 text-black border rounded-md px-3 py-2 mt-1"
                  />
                </label>
                <label className="block mb-2">
                  Category:
                  <select
                    value={editingProduct.category_id}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        category_id: e.target.value,
                      })
                    }
                    className="block w-full bg-gray-200 text-black border rounded-md px-3 py-2 mt-1"
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block mb-2">
                  Available Units:
                  <input
                    type="text"
                    value={editingProduct.unitsavailable}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        unitsavailable: e.target.value,
                      })
                    }
                    className="block w-full bg-gray-200 text-black border rounded-md px-3 py-2 mt-1"
                  />
                </label>
                <label className="block mb-2">
                  Images (comma-separated URLs):
                  <input
                    type="text"
                    value={editingProduct.images.join(", ")} // Join array to string
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        images: e.target.value
                          .split(",")
                          .map((url) => url.trim()),
                      })
                    } // Split string to array
                    className="block w-full bg-gray-200 text-black border rounded-md px-3 py-2 mt-1"
                  />
                </label>

                <label className="block mb-2">
                  Feature:
                  <input
                    type="text"
                    value={editingProduct.feature || ""}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        feature: e.target.value,
                      })
                    }
                    className="block w-full bg-gray-200 text-black border rounded-md px-3 py-2 mt-1"
                  />
                </label>
                <label className="block mb-2">
                  Available:
                  <input
                    type="checkbox"
                    checked={editingProduct.available || false}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        available: e.target.checked,
                      })
                    }
                    className="ml-2 accent-kilifi"
                  />
                </label>

                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
