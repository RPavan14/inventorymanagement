import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Package, ArrowLeft } from 'lucide-react';
import { Item, Category } from '@/contexts/AppContext';

interface ItemSelectorProps {
  items: Item[];
  category: Category;
  onItemSelect: (item: Item) => void;
  onAddItem: () => void;
  onBack: () => void;
}

const ItemSelector: React.FC<ItemSelectorProps> = ({
  items,
  category,
  onItemSelect,
  onAddItem,
  onBack
}) => {
  const categoryItems = items.filter(item => item.categoryId === category.id);

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center space-x-2">
          <Package className="w-5 h-5" />
          <span>{category.name} Items</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              onClick={onBack}
              variant="outline"
              className="flex-1"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Categories
            </Button>
            <Button
              onClick={onAddItem}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </div>
          
          {categoryItems.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No items in this category</p>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {categoryItems.map((item) => (
                <Button
                  key={item.id}
                  variant="outline"
                  onClick={() => onItemSelect(item)}
                  className="justify-between h-auto p-4 hover:bg-blue-50 hover:border-blue-300"
                >
                  <div className="flex items-center">
                    <Package className="w-4 h-4 mr-2" />
                    <span>{item.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">Qty: {item.quantity}</Badge>
                    <Badge variant="outline">₹{item.price}</Badge>
                  </div>
                </Button>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ItemSelector;