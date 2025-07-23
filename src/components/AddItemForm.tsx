import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Plus, Package } from 'lucide-react';
import { Category } from '@/contexts/AppContext';

interface AddItemFormProps {
  category: Category;
  onBack: () => void;
  onAdd: (name: string, quantity: number, price: number) => void;
}

const AddItemForm: React.FC<AddItemFormProps> = ({
  category,
  onBack,
  onAdd
}) => {
  const [itemData, setItemData] = useState({
    name: '',
    quantity: 0,
    price: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (itemData.name.trim() && itemData.quantity > 0 && itemData.price > 0) {
      onAdd(itemData.name.trim(), itemData.quantity, itemData.price);
      setItemData({ name: '', quantity: 0, price: 0 });
    }
  };

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center space-x-2">
          <Package className="w-5 h-5" />
          <span>Add Item to {category.name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Button
            type="button"
            onClick={onBack}
            variant="outline"
            className="w-full"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Items
          </Button>

          <div>
            <Label htmlFor="itemName">Item Name</Label>
            <Input
              id="itemName"
              value={itemData.name}
              onChange={(e) => setItemData({ ...itemData, name: e.target.value })}
              placeholder="Enter item name"
              className="mt-1"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={itemData.quantity}
                onChange={(e) => setItemData({ ...itemData, quantity: parseInt(e.target.value) || 0 })}
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label htmlFor="price">Price (₹)</Label>
              <Input
                id="price"
                type="number"
                min="0.01"
                step="0.01"
                value={itemData.price}
                onChange={(e) => setItemData({ ...itemData, price: parseFloat(e.target.value) || 0 })}
                className="mt-1"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={!itemData.name.trim() || itemData.quantity <= 0 || itemData.price <= 0}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddItemForm;