import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ShoppingCart, Package } from 'lucide-react';
import { Item } from '@/contexts/AppContext';

interface ItemDetailsProps {
  item: Item;
  onBack: () => void;
  onSale: (quantity: number) => void;
}

const ItemDetails: React.FC<ItemDetailsProps> = ({
  item,
  onBack,
  onSale
}) => {
  const [saleQuantity, setSaleQuantity] = useState(1);

  const handleSale = () => {
    if (saleQuantity > 0 && saleQuantity <= item.quantity) {
      onSale(saleQuantity);
      setSaleQuantity(1);
    }
  };

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center space-x-2">
          <Package className="w-5 h-5" />
          <span>{item.name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          <Button
            onClick={onBack}
            variant="outline"
            className="w-full"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Items
          </Button>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-3">{item.name}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-gray-600">Available Quantity</Label>
                <Badge variant="secondary" className="mt-1 text-lg">
                  {item.quantity} units
                </Badge>
              </div>
              <div>
                <Label className="text-sm text-gray-600">Price per Unit</Label>
                <Badge variant="outline" className="mt-1 text-lg">
                  ₹{item.price}
                </Badge>
              </div>
            </div>
          </div>

          {item.quantity > 0 ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="saleQuantity">Sale Quantity</Label>
                <Input
                  id="saleQuantity"
                  type="number"
                  min="1"
                  max={item.quantity}
                  value={saleQuantity}
                  onChange={(e) => setSaleQuantity(parseInt(e.target.value) || 1)}
                  className="mt-1"
                />
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="text-xl font-bold text-blue-600">
                  ₹{(saleQuantity * item.price).toFixed(2)}
                </p>
              </div>
              <Button
                onClick={handleSale}
                disabled={saleQuantity <= 0 || saleQuantity > item.quantity}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Complete Sale
              </Button>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-red-500 font-medium">Out of Stock</p>
              <p className="text-gray-500 text-sm">This item is currently unavailable</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ItemDetails;