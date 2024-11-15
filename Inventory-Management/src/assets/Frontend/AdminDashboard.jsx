import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import Navbar from './Navbar';
import Body from './Body';

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '', barcode: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProductId, setEditingProductId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});
  
  const navigate = useNavigate(); 

  useEffect(() => {
    const storedInventory = localStorage.getItem('inventory');
    
    if (storedInventory) {
      try {
        const parsedInventory = JSON.parse(storedInventory);

        if (typeof parsedInventory === 'object' && parsedInventory !== null) {
          const productArray = Object.keys(parsedInventory).map((key, index) => ({
            id: index + 1, 
            barcode: key,   
            ...parsedInventory[key]
          }));
          setProducts(productArray);
        } else {
          console.error('Invalid inventory data in localStorage');
          setProducts([]);
        }
      } catch (error) {
        console.error('Error parsing inventory data from localStorage:', error);
        setProducts([]);
      }
    } else {
      console.log('No inventory found in localStorage');
      setProducts([]);
    }
  }, []);

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

      if (price < 0 || stock < 0) {
        alert('Price and Stock values cannot be negative.');
        setNewProduct({ name: '', price: '', stock: '', barcode: '' });
        return;
      }

      const addedProduct = {
        name: newProduct.name,
        price: price,
        stock: stock,
      };

      const updatedProducts = {
        ...JSON.parse(localStorage.getItem('inventory') || '{}'),
        [newProduct.barcode]: addedProduct
      };

      setProducts(Object.keys(updatedProducts).map((key, index) => ({
        id: index + 1,  
        barcode: key,   
        ...updatedProducts[key]
      })));

      localStorage.setItem('inventory', JSON.stringify(updatedProducts));
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
    const updatedProducts = products.map((prod) =>
      prod.id === id ? editedProduct : prod
    );
    setProducts(updatedProducts);
    const updatedProductsObj = updatedProducts.reduce((obj, prod) => {
      obj[prod.barcode] = { name: prod.name, price: prod.price, stock: prod.stock };
      return obj;
    }, {});
    localStorage.setItem('inventory', JSON.stringify(updatedProductsObj));
    setEditingProductId(null);
  };

  const handleLogout = () => {
    navigate('/');
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const navigateToScanner = () => {
    navigate('/Scanner-login');
  };

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={navigateToScanner} // Navigate to scanner
        >
          Product Scanner
        </button>
        <h1 className="text-3xl font-extrabold text-center">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search products"
          value={searchTerm}
          onChange={handleSearchChange}
          className="border-2 border-gray-300 rounded-full p-2 max-w-xs w-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

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
              <tr key={product.barcode} className={product.stock < 10 ? 'bg-yellow-100' : ''}>
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
                      {product.stock < 10 && (
                        <span className="text-red-500 font-bold">Low Stock</span>
                      )}
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
