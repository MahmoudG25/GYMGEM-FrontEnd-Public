import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('products');
    return savedProducts ? JSON.parse(savedProducts) : [
      { id: uuidv4(), name: "Whey Protein Isolate", quantity: 50, price: 89.99, category: "Supplements", dateAdded: new Date().toISOString(), description: "High quality whey protein for muscle recovery.", image: "https://via.placeholder.com/150", status: "Published" },
      { id: uuidv4(), name: "Yoga Mat Premium", quantity: 8, price: 29.99, category: "Equipment", dateAdded: new Date(Date.now() - 86400000).toISOString(), description: "Non-slip yoga mat for all levels.", image: "https://via.placeholder.com/150", status: "Published" },
      { id: uuidv4(), name: "Dumbbell Set (20kg)", quantity: 15, price: 149.99, category: "Equipment", dateAdded: new Date(Date.now() - 172800000).toISOString(), description: "Adjustable dumbbell set for home workouts.", image: "https://via.placeholder.com/150", status: "Draft" },
      { id: uuidv4(), name: "Running Shoes", quantity: 25, price: 120.00, category: "Apparel", dateAdded: new Date(Date.now() - 259200000).toISOString(), description: "Lightweight running shoes.", image: "https://via.placeholder.com/150", status: "Published" },
      { id: uuidv4(), name: "Resistance Bands", quantity: 100, price: 15.99, category: "Accessories", dateAdded: new Date(Date.now() - 345600000).toISOString(), description: "Set of 5 resistance bands.", image: "https://via.placeholder.com/150", status: "Published" },
    ];
  });

  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('orders');
    return savedOrders ? JSON.parse(savedOrders) : [
      { id: uuidv4(), productId: "1", productName: "Whey Protein Isolate", quantity: 1, customerName: "John Doe", status: "Completed", date: new Date().toISOString() },
      { id: uuidv4(), productId: "2", productName: "Yoga Mat Premium", quantity: 2, customerName: "Jane Smith", status: "Pending", date: new Date(Date.now() - 3600000).toISOString() },
      { id: uuidv4(), productId: "3", productName: "Dumbbell Set (20kg)", quantity: 1, customerName: "Mike Johnson", status: "Processing", date: new Date(Date.now() - 7200000).toISOString() },
    ];
  });

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  // Product Actions
  const addProduct = (product) => {
    const newProduct = { ...product, id: uuidv4(), dateAdded: new Date().toISOString() };
    setProducts([newProduct, ...products]);
  };

  const updateProduct = (id, updatedProduct) => {
    setProducts(products.map(p => p.id === id ? { ...p, ...updatedProduct } : p));
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  // Order Actions
  const addOrder = (order) => {
    const newOrder = { ...order, id: uuidv4(), date: new Date().toISOString(), status: "Pending" };
    setOrders([newOrder, ...orders]);
  };

  const updateOrderStatus = (id, status) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
  };

  const updateOrder = (id, updatedOrder) => {
    setOrders(orders.map(o => o.id === id ? { ...o, ...updatedOrder } : o));
  };

  const deleteOrder = (id) => {
    setOrders(orders.filter(o => o.id !== id));
  };

  return (
    <StoreContext.Provider value={{
      products,
      orders,
      addProduct,
      updateProduct,
      deleteProduct,
      addOrder,
      updateOrderStatus,
      updateOrder,
      deleteOrder
    }}>
      {children}
    </StoreContext.Provider>
  );
};
