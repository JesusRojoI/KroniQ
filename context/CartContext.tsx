'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface CartItem {
  id: string;
  name: string;
  nameKey?: string;
  price: number;
  quantity: number;
  image: string;
  isCustom?: boolean;
  quoteId?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  tax: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'kroniq_cart';

// Función para cargar el carrito desde localStorage
function loadCartFromStorage(): CartItem[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const savedCart = window.localStorage.getItem(STORAGE_KEY);
    if (savedCart) {
      const parsed = JSON.parse(savedCart);
      if (Array.isArray(parsed)) {
        console.log('Carrito cargado desde localStorage:', parsed);
        return parsed;
      }
    }
  } catch (error) {
    console.error('Error al cargar el carrito desde localStorage:', error);
  }
  
  return [];
}

// Función para guardar el carrito en localStorage
function saveCartToStorage(items: CartItem[]) {
  if (typeof window === 'undefined') return;
  
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    console.log('Carrito guardado en localStorage:', items);
  } catch (error) {
    console.error('Error al guardar el carrito en localStorage:', error);
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  // Inicializar el estado con los datos de localStorage
  const [items, setItems] = useState<CartItem[]>(() => {
    return loadCartFromStorage();
  });

  // Guardar en localStorage cada vez que cambie el carrito
  useEffect(() => {
    saveCartToStorage(items);
  }, [items]);

  // También escuchar cambios en localStorage desde otras pestañas
  useEffect(() => {
    function handleStorageChange(event: StorageEvent) {
      if (event.key === STORAGE_KEY) {
        console.log('Cambio detectado en localStorage desde otra pestaña');
        const newItems = loadCartFromStorage();
        setItems(newItems);
      }
    }

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const addItem = useCallback((item: CartItem) => {
    setItems(prev => {
      let newItems: CartItem[];
      
      if (item.isCustom) {
        // Los productos personalizados se agregan como items separados
        newItems = [...prev, { ...item, id: `${item.id}-${Date.now()}` }];
      } else {
        // Buscar si el producto ya existe en el carrito
        const existingIndex = prev.findIndex(i => i.id === item.id && !i.isCustom);
        
        if (existingIndex >= 0) {
          // Si existe, incrementar la cantidad
          newItems = prev.map((i, index) => 
            index === existingIndex ? { ...i, quantity: i.quantity + 1 } : i
          );
        } else {
          // Si no existe, agregarlo
          newItems = [...prev, item];
        }
      }
      
      console.log('Carrito actualizado:', newItems);
      return newItems;
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems(prev => {
      const newItems = prev.filter(i => i.id !== id);
      console.log('Item eliminado:', id, 'Nuevo carrito:', newItems);
      return newItems;
    });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setItems(prev => {
      if (quantity <= 0) {
        const newItems = prev.filter(i => i.id !== id);
        console.log('Item eliminado por cantidad 0:', id);
        return newItems;
      }
      
      const newItems = prev.map(i => 
        i.id === id ? { ...i, quantity } : i
      );
      console.log('Cantidad actualizada:', id, quantity);
      return newItems;
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    console.log('Carrito vaciado');
  }, []);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.16;
  const total = subtotal + tax;

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        subtotal,
        tax,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}