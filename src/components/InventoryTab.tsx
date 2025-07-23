import React, { useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { toast } from '@/components/ui/use-toast';
import CategorySelector from './CategorySelector';
import ItemSelector from './ItemSelector';
import ItemDetails from './ItemDetails';
import AddCategoryForm from './AddCategoryForm';
import AddItemForm from './AddItemForm';
import { Category, Item } from '@/contexts/AppContext';

type ViewState = 'categories' | 'items' | 'itemDetails' | 'addCategory' | 'addItem';

const InventoryTab: React.FC = () => {
  const { categories, items, addCategory, addItem, updateItem, addSale } = useAppContext();
  const [currentView, setCurrentView] = useState<ViewState>('categories');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setCurrentView('items');
  };

  const handleItemSelect = (item: Item) => {
    setSelectedItem(item);
    setCurrentView('itemDetails');
  };

  const handleAddCategory = (name: string) => {
    addCategory(name);
    setCurrentView('categories');
    toast({
      title: 'Category Added',
      description: `Category "${name}" has been created.`,
    });
  };

  const handleAddItem = (name: string, quantity: number, price: number) => {
    if (selectedCategory) {
      addItem(name, quantity, price, selectedCategory.id);
      setCurrentView('items');
      toast({
        title: 'Item Added',
        description: `Item "${name}" has been added to inventory.`,
      });
    }
  };

  const handleSale = (quantity: number) => {
    if (selectedItem) {
      const newQuantity = selectedItem.quantity - quantity;
      updateItem(selectedItem.id, { quantity: newQuantity });
      addSale({
        itemId: selectedItem.id,
        itemName: selectedItem.name,
        quantity,
        price: selectedItem.price,
        total: quantity * selectedItem.price,
        date: new Date().toISOString(),
        type: 'direct'
      });
      setCurrentView('items');
      toast({
        title: 'Sale Completed',
        description: `Sold ${quantity} units of ${selectedItem.name}`,
      });
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'categories':
        return (
          <CategorySelector
            categories={categories}
            onCategorySelect={handleCategorySelect}
            onAddCategory={() => setCurrentView('addCategory')}
            title="Inventory Categories"
          />
        );
      case 'items':
        return selectedCategory ? (
          <ItemSelector
            items={items}
            category={selectedCategory}
            onItemSelect={handleItemSelect}
            onAddItem={() => setCurrentView('addItem')}
            onBack={() => setCurrentView('categories')}
          />
        ) : null;
      case 'itemDetails':
        return selectedItem ? (
          <ItemDetails
            item={selectedItem}
            onBack={() => setCurrentView('items')}
            onSale={handleSale}
          />
        ) : null;
      case 'addCategory':
        return (
          <AddCategoryForm
            onBack={() => setCurrentView('categories')}
            onAdd={handleAddCategory}
          />
        );
      case 'addItem':
        return selectedCategory ? (
          <AddItemForm
            category={selectedCategory}
            onBack={() => setCurrentView('items')}
            onAdd={handleAddItem}
          />
        ) : null;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {renderCurrentView()}
    </div>
  );
};

export default InventoryTab;