import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import Navbar from './Navbar';
import Body from './Body';

function AdminDashboard() {
  const initialProducts = [
    { id: 1, name: 'Product 1', price: 100, stock: 50, barcode: '123456789' },
    { id: 2, name: 'Product 2', price: 200, stock: 30, barcode: '987654321' },
    { id: 3, name: 'Product 3', price: 150, stock: 40, barcode: '456789123' },
    { id: 4, name: 'Product 4', price: 250, stock: 20, barcode: '654321987' },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '', barcode: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProductId, setEditingProductId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});
  
  const navigate = useNavigate(); // Hook to navigate to other routes

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddProduct = () => {
    if (
      newProduct.name &&
      newProduct.price &&
      newProduct.stock &&
      newProduct.barcode
    ) {
      const price = parseFloat(newProduct.price);
      const stock = parseInt(newProduct.stock);

      // Validate if price or stock is negative
      if (price < 0 || stock < 0) {
        alert('Price and Stock values cannot be negative.');
        setNewProduct({ name: '', price: '', stock: '', barcode: '' });
        return;
      }

      const newId = products.length + 1;
      const addedProduct = {
        id: newId,
        name: newProduct.name,
        price: price,
        stock: stock,
        barcode: newProduct.barcode,
      };
      setProducts((prevState) => [...prevState, addedProduct]);
      setNewProduct({ name: '', price: '', stock: '', barcode: '' });
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEditClick = (product) => {
    setEditingProductId(product.id);
    setEditedProduct(product);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveEdit = (id) => {
    setProducts(products.map((prod) => (prod.id === id ? editedProduct : prod)));
    setEditingProductId(null);
  };

  const handleLogout = () => {
    // Here, handle the logout functionality, such as clearing session or token
    // For now, we are redirecting the user to the admin login page
    navigate('/');
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to navigate to the scanner page
  const navigateToScanner = () => {
    navigate('/Scanner-login');
  };

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        {/* Product Scanner Button */}
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={navigateToScanner} // Navigate to scanner
        >
          Product Scanner
        </button>

        {/* Admin Dashboard Title */}
        <h1 className="text-3xl font-extrabold text-center">Admin Dashboard</h1>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search products"
          value={searchTerm}
          onChange={handleSearchChange}
          className="border-2 border-gray-300 rounded-full p-2 max-w-xs w-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Add Product Form */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            placeholder="Product Name"
            className="border border-gray-300 p-2 rounded"
          />
          <input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
            placeholder="Price (INR)"
            className="border border-gray-300 p-2 rounded"
          />
          <input
            type="number"
            name="stock"
            value={newProduct.stock}
            onChange={handleInputChange}
            placeholder="Stock"
            className="border border-gray-300 p-2 rounded"
          />
          <input
            type="text"
            name="barcode"
            value={newProduct.barcode}
            onChange={handleInputChange}
            placeholder="Barcode ID"
            className="border border-gray-300 p-2 rounded"
          />
          <button
            onClick={handleAddProduct}
            className="bg-blue-500 text-white p-2 rounded-lg col-span-1 sm:col-span-2 lg:col-span-1 hover:bg-blue-600"
          >
            Add Product
          </button>
        </div>
      </div>

      {/* Products List */}
      <h2 className="text-2xl font-semibold mb-4">Product List</h2>
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full table-auto text-center border-collapse border border-gray-300">
          <thead className="bg-gray-100 text-gray-800">
            <tr>
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Price (INR)</th>
              <th className="border border-gray-300 px-4 py-2">Stock</th>
              <th className="border border-gray-300 px-4 py-2">Barcode ID</th>
              <th className="border border-gray-300 px-4 py-2 w-20">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-100">
                {editingProductId === product.id ? (
                  <>
                    <td className="border border-gray-300 px-4 py-2">{product.id}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        name="name"
                        value={editedProduct.name}
                        onChange={handleEditInputChange}
                        className="border border-gray-300 p-1 rounded"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="number"
                        name="price"
                        value={editedProduct.price}
                        onChange={handleEditInputChange}
                        className="border border-gray-300 p-1 rounded"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="number"
                        name="stock"
                        value={editedProduct.stock}
                        onChange={handleEditInputChange}
                        className="border border-gray-300 p-1 rounded"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        name="barcode"
                        value={editedProduct.barcode}
                        onChange={handleEditInputChange}
                        className="border border-gray-300 p-1 rounded"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        onClick={() => handleSaveEdit(product.id)}
                        className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600"
                      >
                        Save
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="border border-gray-300 px-4 py-2">{product.id}</td>
                    <td className="border border-gray-300 px-4 py-2">{product.name}</td>
                    <td className="border border-gray-300 px-4 py-2">{product.price}</td>
                    <td className="border border-gray-300 px-4 py-2">{product.stock}</td>
                    <td className="border border-gray-300 px-4 py-2">{product.barcode}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        onClick={() => handleEditClick(product)}
                        className="bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;
