
import React, { useState, useEffect } from 'react';
import Quagga from 'quagga';

function Scanner() {
  const [productDetails, setProductDetails] = useState(null);
  const [barcode, setBarcode] = useState('');
  const [quantity, setQuantity] = useState('');
  const [newItem, setNewItem] = useState({ name: '', price: '', stock: '' });

  useEffect(() => {
    const videoElement = document.getElementById('video');

    if (!videoElement) {
      console.error('Video element not found.');
      return;
    }

    Quagga.init(
      {
        inputStream: {
          type: 'LiveStream',
          target: videoElement,
          constraints: { facingMode: 'environment' },
        },
        decoder: {
          readers: ['code_128_reader', 'ean_reader', 'ean_8_reader', 'upc_reader'],
        },
      },
      (err) => {
        if (err) {
          console.error('Error initializing Quagga: ', err);
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
  }, []);


  const fetchProductInfo = (barcode) => {
    try {
      const inventory = JSON.parse(localStorage.getItem('inventory')) || {};
      const product = inventory[barcode];
      if (product) {
        setProductDetails(product);
      } else {
        setProductDetails(null);
      }
    } catch (error) {
      console.error('Error fetching product info:', error);
    }
  };


  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };


  const handleUpdateQuantity = () => {
    if (isNaN(quantity) || quantity <= 0) {
      console.error('Invalid quantity.');
      return;
    }
    const inventory = JSON.parse(localStorage.getItem('inventory')) || {};
    if (inventory[barcode]) {
      inventory[barcode].stock += parseInt(quantity, 10);
      localStorage.setItem('inventory', JSON.stringify(inventory));
      setProductDetails(inventory[barcode]);
      setQuantity('');
    } else {
      console.error('Product not found in inventory.');
    }
  };


  const handleAddItemChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };


  const handleAddItemSubmit = (e) => {
    e.preventDefault();
    if (!barcode) {
      console.error('Barcode not available.');
      return;
    }

    try {
      const inventory = JSON.parse(localStorage.getItem('inventory')) || {};
      inventory[barcode] = { ...newItem, stock: parseInt(newItem.stock, 10) };
      localStorage.setItem('inventory', JSON.stringify(inventory));
      setProductDetails(inventory[barcode]);
      setNewItem({ name: '', price: '', stock: '' });
    } catch (error) {
      console.error('Error adding new item:', error);
    }
  };

  return (
    <div>
      <h2>Barcode Scanner</h2>
      <video id="video" style={{ width: '100%', height: 'auto' }} />
      <p id="barcode-result">Scanning...</p>

      {barcode && <p>Scanned Barcode: {barcode}</p>}

      {productDetails ? (
        <div>
          <h3>Product Found</h3>
          <p>Name: {productDetails.name}</p>
          <p>Price: ${productDetails.price}</p>
          <p>Stock: {productDetails.stock}</p>
          {productDetails.stock < 5 && <p style={{ color: 'red' }}>Low stock alert!</p>}

          <input
            type="number"
            placeholder="Enter Quantity"
            value={quantity}
            onChange={handleQuantityChange}
          />
          <button onClick={handleUpdateQuantity}>Update Quantity</button>
        </div>
      ) : (
        <div>
          <p>Product not found. Add Item:</p>
          <form onSubmit={handleAddItemSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Item Name"
              value={newItem.name}
              onChange={handleAddItemChange}
              required
            />
            <input
              type="text"
              name="price"
              placeholder="Price"
              value={newItem.price}
              onChange={handleAddItemChange}
              required
            />
            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={newItem.stock}
              onChange={handleAddItemChange}
              required
            />
            <button type="submit">Add Item</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Scanner;
