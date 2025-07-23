import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart3, TrendingUp, DollarSign, Package } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';

const AnalyticsTab: React.FC = () => {
  const { sales, items, categories } = useAppContext();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<string>('all');

  const getItemName = (itemId: string) => {
    const item = items.find(i => i.id === itemId);
    return item ? item.name : 'Unknown Item';
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : 'Unknown Category';
  };

  const getItemCategory = (itemId: string) => {
    const item = items.find(i => i.id === itemId);
    return item ? item.categoryId : '';
  };

  // Filter sales based on selected category and item
  const filteredSales = sales.filter(sale => {
    const itemCategory = getItemCategory(sale.itemId);
    const categoryMatch = selectedCategory === 'all' || itemCategory === selectedCategory;
    const itemMatch = selectedItem === 'all' || sale.itemId === selectedItem;
    return categoryMatch && itemMatch;
  });

  // Calculate monthly revenue
  const monthlyRevenue = filteredSales.reduce((acc, sale) => {
    const date = new Date(sale.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const revenue = sale.quantity * sale.price;
    acc[monthKey] = (acc[monthKey] || 0) + revenue;
    return acc;
  }, {} as Record<string, number>);

  // Calculate total revenue
  const totalRevenue = filteredSales.reduce((sum, sale) => sum + (sale.quantity * sale.price), 0);

  // Calculate total items sold
  const totalItemsSold = filteredSales.reduce((sum, sale) => sum + sale.quantity, 0);

  // Get top selling items
  const itemSales = filteredSales.reduce((acc, sale) => {
    acc[sale.itemId] = (acc[sale.itemId] || 0) + sale.quantity;
    return acc;
  }, {} as Record<string, number>);

  const topItems = Object.entries(itemSales)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const categoryItems = selectedCategory === 'all' ? items : items.filter(item => item.categoryId === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-lg">
          <CardTitle>Analytics Filters</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Filter by Category</label>
              <Select value={selectedCategory} onValueChange={(value) => {
                setSelectedCategory(value);
                setSelectedItem('all');
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Filter by Item</label>
              <Select value={selectedItem} onValueChange={setSelectedItem}>
                <SelectTrigger>
                  <SelectValue placeholder="Select item" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Items</SelectItem>
                  {categoryItems.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-lg border-0 bg-gradient-to-br from-green-500 to-emerald-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Total Revenue</p>
                <p className="text-2xl font-bold">₹{totalRevenue.toLocaleString('en-IN')}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Items Sold</p>
                <p className="text-2xl font-bold">{totalItemsSold}</p>
              </div>
              <Package className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-gradient-to-br from-orange-500 to-red-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Total Transactions</p>
                <p className="text-2xl font-bold">{filteredSales.length}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>Monthly Revenue</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {Object.keys(monthlyRevenue).length === 0 ? (
              <p className="text-gray-500 text-center py-8">No sales data available</p>
            ) : (
              <div className="space-y-3">
                {Object.entries(monthlyRevenue)
                  .sort(([a], [b]) => b.localeCompare(a))
                  .map(([month, revenue]) => (
                    <div key={month} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">{new Date(month + '-01').toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</span>
                      <span className="text-green-600 font-bold">₹{revenue.toLocaleString('en-IN')}</span>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Top Selling Items */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Top Selling Items</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {topItems.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No sales data available</p>
            ) : (
              <div className="space-y-3">
                {topItems.map(([itemId, quantity], index) => (
                  <div key={itemId} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded-full">
                        #{index + 1}
                      </span>
                      <span className="font-medium">{getItemName(itemId)}</span>
                    </div>
                    <span className="text-purple-600 font-bold">{quantity} sold</span>
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

export default AnalyticsTab;