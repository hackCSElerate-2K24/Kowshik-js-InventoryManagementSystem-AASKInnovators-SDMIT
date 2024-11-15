import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function WorkerDashboard() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedInventory = localStorage.getItem('inventory');
    
    if (storedInventory) {
      try {
        const parsedInventory = JSON.parse(storedInventory);

        if (typeof parsedInventory === 'object' && parsedInventory !== null) {

          const productArray = Object.values(parsedInventory);
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

  const handleScanItemsClick = () => {
    navigate('/worker-scanner');
  };

  return (
    <>
      <div className="flex justify-end p-4">
        <button
          onClick={handleScanItemsClick}
          className="bg-slate-400 text-white px-4 py-2 rounded hover:bg-slate-500"
        >
          Scan Items
        </button>
      </div>
      <div className="p-6 space-y-4">
        <h2 className="text-3xl font-semibold text-gray-900">Worker Dashboard</h2>
        <div className="mt-8">
          <h3 className="text-xl font-medium mb-2">Product List</h3>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 border-b">Name</th>
                <th className="py-2 border-b">Price (INR)</th>
                <th className="py-2 border-b">Stock</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product, index) => (
                  <tr key={index}>
                    <td className="py-2 border-b text-center">{product.name}</td>
                    <td className="py-2 border-b text-center">{product.price}</td>
                    <td className="py-2 border-b text-center">{product.stock}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="py-2 text-center text-gray-500">
                    No products found in inventory.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default WorkerDashboard;
