import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingCart, DollarSign, Calendar } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';
import { toast } from '@/components/ui/use-toast';

const SalesTab: React.FC = () => {
  const { categories, items, sales, addSale } = useAppContext();
  const [sale, setSale] = useState({
    categoryId: '',
    itemId: '',
    quantity: 0,
    price: 0
  });

  const categoryItems = items.filter(item => item.categoryId === sale.categoryId);
  const selectedItem = items.find(item => item.id === sale.itemId);

  const handleSell = () => {
    if (sale.itemId && sale.quantity > 0 && sale.price > 0) {
      if (selectedItem && sale.quantity <= selectedItem.quantity) {
        addSale(sale.itemId, sale.quantity, sale.price);
        setSale({ categoryId: '', itemId: '', quantity: 0, price: 0 });
        toast({
          title: 'Sale Recorded',
          description: 'Sale has been recorded successfully.',
        });
      } else {
        toast({
          title: 'Insufficient Stock',
          description: 'Not enough items in inventory.',
          variant: 'destructive',
        });
      }
    }
  };

  const getItemName = (itemId: string) => {
    const item = items.find(i => i.id === itemId);
    return item ? item.name : 'Unknown Item';
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : 'Unknown Category';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Record Sale */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center space-x-2">
              <ShoppingCart className="w-5 h-5" />
              <span>Record Sale</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="saleCategory">Category</Label>
                <Select value={sale.categoryId} onValueChange={(value) => setSale({ ...sale, categoryId: value, itemId: '' })}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="saleItem">Item</Label>
                <Select value={sale.itemId} onValueChange={(value) => setSale({ ...sale, itemId: value })} disabled={!sale.categoryId}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select item" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryItems.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name} (Stock: {item.quantity})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="saleQuantity">Quantity</Label>
                  <Input
                    id="saleQuantity"
                    type="number"
                    value={sale.quantity}
                    onChange={(e) => setSale({ ...sale, quantity: parseInt(e.target.value) || 0 })}
                    className="mt-1"
                    max={selectedItem?.quantity || 0}
                  />
                </div>
                <div>
                  <Label htmlFor="salePrice">Price (₹)</Label>
                  <Input
                    id="salePrice"
                    type="number"
                    value={sale.price}
                    onChange={(e) => setSale({ ...sale, price: parseFloat(e.target.value) || 0 })}
                    className="mt-1"
                  />
                </div>
              </div>
              {selectedItem && (
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Available Stock:</strong> {selectedItem.quantity} units
                  </p>
                  <p className="text-sm text-blue-800">
                    <strong>Suggested Price:</strong> ₹{selectedItem.price}
                  </p>
                </div>
              )}
              <Button 
                onClick={handleSell}
                className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700"
                disabled={!sale.itemId || sale.quantity <= 0 || sale.price <= 0}
              >
                <DollarSign className="w-4 h-4 mr-2" />
                Record Sale
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Sales */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Recent Sales</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {sales.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No sales recorded yet.</p>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {sales.slice().reverse().slice(0, 10).map((saleRecord) => (
                  <div key={saleRecord.id} className="bg-gradient-to-r from-gray-50 to-gray-100 p-3 rounded-lg border">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-800">{getItemName(saleRecord.itemId)}</h4>
                        <p className="text-sm text-gray-600">Qty: {saleRecord.quantity}</p>
                        <p className="text-sm text-green-600 font-medium">₹{saleRecord.price}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">{formatDate(saleRecord.date)}</p>
                        <p className="text-sm font-medium text-green-600">₹{saleRecord.quantity * saleRecord.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SalesTab;