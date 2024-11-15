import React, { useState, useEffect } from 'react';
import Quagga from 'quagga';

function WorkerScanner() {
  const [scannedItems, setScannedItems] = useState([]); // Array to store scanned items
  const [barcode, setBarcode] = useState('');
  const [quantity, setQuantity] = useState('');
  const [totalPrice, setTotalPrice] = useState(0); // Total price for all scanned items
  const [scannerActive, setScannerActive] = useState(false);
  const [productDetails, setProductDetails] = useState(null); // Make sure this is initialized to null

  useEffect(() => {
    if (scannerActive) {
      const videoElement = document.getElementById("video");

      Quagga.init(
        {
          inputStream: {
            type: "LiveStream",
            target: videoElement,
            constraints: { facingMode: "environment" },
          },
          decoder: {
            readers: ["code_128_reader", "ean_reader", "ean_8_reader", "upc_reader"],
          },
        },
        (err) => {
          if (err) {
            console.error("Error initializing Quagga: ", err);
            return;
          }
          Quagga.start();
        }
      );

      Quagga.onDetected((result) => {
        const detectedBarcode = result.codeResult.code;
        setBarcode(detectedBarcode);
        fetchProductInfo(detectedBarcode);
      });

      return () => Quagga.stop();
    }
  }, [scannerActive]);

  // Fetch product details from localStorage based on barcode
  const fetchProductInfo = (barcode) => {
    const inventory = JSON.parse(localStorage.getItem('inventory')) || {};
    const product = inventory[barcode];
    if (product) {
      setProductDetails(product);
    } else {
      setProductDetails(null); // Clear product details if not found
    }
  };

  // Handle quantity input and calculate total price
  const handleQuantityChange = (e) => {
    const newQuantity = e.target.value;
    setQuantity(newQuantity);
  };

  // Add or update scanned product in the list
  const handleScanProduct = () => {
    if (!productDetails) {
      alert('No product found. Please scan a valid product.');
      return;
    }

    if (quantity > 0) {
      const newItem = {
        barcode,
        name: productDetails.name,
        price: productDetails.price,
        quantity: parseInt(quantity, 10),
      };

      const existingItemIndex = scannedItems.findIndex(item => item.barcode === barcode);
      if (existingItemIndex > -1) {
        // Update quantity for the existing item
        const updatedItems = [...scannedItems];
        updatedItems[existingItemIndex].quantity += parseInt(quantity, 10);
        setScannedItems(updatedItems);
      } else {
        // Add new item to the scanned items list
        setScannedItems([...scannedItems, newItem]);
      }

      setQuantity('');
      setBarcode('');
    } else {
      alert('Invalid quantity.');
    }
  };

  // Decrement stock quantity in localStorage and stop the scanner
  const handleDecrementQuantity = () => {
    const inventory = JSON.parse(localStorage.getItem('inventory')) || {};

    // Decrement stock for each scanned item
    scannedItems.forEach(item => {
      if (inventory[item.barcode]) {
        inventory[item.barcode].stock = Math.max(0, inventory[item.barcode].stock - item.quantity);
      }
    });

    localStorage.setItem('inventory', JSON.stringify(inventory));

    // Stop the scanner and reset states
    setScannerActive(false);
    setScannedItems([]);
    setTotalPrice(0);
  };

  // Calculate total price for all scanned items
  useEffect(() => {
    const total = scannedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(total);
  }, [scannedItems]);

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Worker Dashboard - Barcode Scanner</h2>
      <div className="flex flex-col items-center mb-4">
        {!scannerActive ? (
          <button
            onClick={() => setScannerActive(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 mb-4"
          >
            Start Scanner
          </button>
        ) : (
          <video id="video" className="w-full max-h-64 rounded-md shadow-md mb-4" />
        )}
        <p className="text-gray-600" id="barcode-result">{scannerActive ? "Scanning..." : "Scanner is off"}</p>
      </div>

      {barcode && <p className="text-lg font-semibold text-gray-800">Scanned Barcode: {barcode}</p>}

      {productDetails ? (
        <div className="mt-4">
          <h3 className="text-xl font-semibold text-gray-700">Product Found</h3>
          <p className="text-gray-700">Name: {productDetails.name}</p>
          <p className="text-gray-700">Price per unit: ₹ {productDetails.price}</p>
          <p className="text-gray-700">Current Stock: {productDetails.stock}</p>
          {productDetails.stock < 5 && <p className="text-red-600 font-bold">Low stock alert!</p>}

          <div className="flex flex-col mt-4">
            <input
              type="number"
              placeholder="Enter Quantity"
              value={quantity}
              onChange={handleQuantityChange}
              className="border border-gray-300 p-2 rounded-md mb-2"
            />
            <button
              onClick={handleScanProduct}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 mb-4"
            >
              Add to List
            </button>
          </div>
        </div>
      ) : (
        <p className="text-red-500 mt-4">No product found.</p>
      )}

      <div className="mt-4">
        <h3 className="text-xl font-semibold text-gray-700">Scanned Items</h3>
        <ul>
          {scannedItems.map((item, index) => (
            <li key={index} className="flex justify-between">
              <span>{item.name} (x{item.quantity})</span>
              <span>₹ {item.price * item.quantity}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <h3 className="text-xl font-semibold text-gray-700">Total Price: ₹ {totalPrice}</h3>
      </div>

      <button
        onClick={handleDecrementQuantity}
        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 mt-4"
      >
        Generate Bill
      </button>
    </div>
  );
}

export default WorkerScanner;
