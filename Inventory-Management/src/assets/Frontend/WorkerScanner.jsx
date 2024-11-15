// src/pages/WorkerDashboard.js
import React, { useState, useEffect } from 'react';
import Quagga from 'quagga';

function WorkerScanner() {
  const [productDetails, setProductDetails] = useState(null);
  const [barcode, setBarcode] = useState('');
  const [quantity, setQuantity] = useState('');
  const [totalPrice, setTotalPrice] = useState(null);
  const [scannerActive, setScannerActive] = useState(false);

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
      setProductDetails(null);
    }
  };

  // Handle quantity input and calculate total price
  const handleQuantityChange = (e) => {
    const newQuantity = e.target.value;
    setQuantity(newQuantity);

    if (productDetails && newQuantity) {
      setTotalPrice(newQuantity * productDetails.price);
    } else {
      setTotalPrice(null);
    }
  };

  // Decrement stock quantity in localStorage
  const handleDecrementQuantity = () => {
    const inventory = JSON.parse(localStorage.getItem('inventory')) || {};

    if (inventory[barcode]) {
      inventory[barcode].stock = Math.max(0, inventory[barcode].stock - parseInt(quantity, 10));
      localStorage.setItem('inventory', JSON.stringify(inventory));
      setProductDetails(inventory[barcode]);
      setQuantity('');
      setTotalPrice(null);
    } else {
      console.error("Product not found in inventory.");
    }
  };

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
          <p className="text-gray-700">Price per unit: ${productDetails.price}</p>
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
              onClick={handleDecrementQuantity}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Decrement Stock
            </button>
          </div>

          {totalPrice !== null && (
            <p className="text-lg mt-4 font-medium text-gray-800">
              Total Price for {quantity} units: ${totalPrice}
            </p>
          )}
        </div>
      ) : (
        <p className="text-red-500 mt-4">Product not found. Please scan a valid barcode.</p>
      )}
    </div>
  );
}

export default WorkerScanner;
