import React, { createContext, useContext, useState } from 'react';

export interface Item {
  id: string;
  name: string;
  quantity: number;
  price: number;
  categoryId: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Employee {
  id: string;
  name: string;
  items: { itemId: string; quantity: number; date?: string }[];
}

export interface Sale {
  id: string;
  itemId: string;
  itemName: string;
  quantity: number;
  price: number;
  total: number;
  date: string;
  type: 'direct' | 'Employee';
}

interface AppContextType {
  isLoggedIn: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  categories: Category[];
  items: Item[];
  Employee: Employee[];
  sales: Sale[];
  addCategory: (name: string) => void;
  addItem: (name: string, quantity: number, price: number, categoryId: string) => void;
  updateItem: (id: string, updates: Partial<Item>) => void;
  addEmployee: (name: string) => void;
  addSale: (sale: Omit<Sale, 'id'>) => void;
  assignItemToEmployee: (EmployeeId: string, itemId: string, quantity: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [Employee, setEmployee] = useState<Employee[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);

  const login = (email: string, password: string) => {
    if (email === 'inventory@gmail.com' && password === 'inventory') {
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => setIsLoggedIn(false);

  const addCategory = (name: string) => {
    const newCategory: Category = {
      id: Date.now().toString(),
      name
    };
    setCategories(prev => [...prev, newCategory]);
  };

  const addItem = (name: string, quantity: number, price: number, categoryId: string) => {
    const newItem: Item = {
      id: Date.now().toString(),
      name,
      quantity,
      price,
      categoryId
    };
    setItems(prev => [...prev, newItem]);
  };

  const updateItem = (id: string, updates: Partial<Item>) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const addEmployee = (name: string) => {
    const newEmployee: Employee = {
      id: Date.now().toString(),
      name,
      items: []
    };
    setEmployee(prev => [...prev, newEmployee]);
  };

  const addSale = (sale: Omit<Sale, 'id'>) => {
    const newSale: Sale = {
      ...sale,
      id: Date.now().toString()
    };
    setSales(prev => [...prev, newSale]);
  };

  const assignItemToEmployee = (EmployeeId: string, itemId: string, quantity: number) => {
    setEmployee(prev => prev.map(Employee => 
      Employee.id === EmployeeId 
        ? { ...Employee, items: [...Employee.items, { itemId, quantity, date: new Date().toISOString() }] }
        : Employee
    ));
  };

  return (
    <AppContext.Provider value={{
      isLoggedIn,
      login,
      logout,
      categories,
      items,
      Employee,
      sales,
      addCategory,
      addItem,
      updateItem,
      addEmployee,
      addSale,
      assignItemToEmployee
    }}>
      {children}
    </AppContext.Provider>
  );
};