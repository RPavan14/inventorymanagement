import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { LogOut, Package, Users, ShoppingCart, BarChart3 } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';
import InventoryTab from './InventoryTab';
import StaffTab from './StaffTab';
import SalesTab from './SalesTab';
import AnalyticsTab from './AnalyticsTab';

const Dashboard: React.FC = () => {
  const { logout } = useAppContext();
  const [activeTab, setActiveTab] = useState('inventory');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">LM</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Inventory Manager
              </h1>
            </div>
            <Button 
              onClick={logout}
              variant="outline"
              className="flex items-center space-x-2 hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-white shadow-md rounded-xl p-1">
            <TabsTrigger 
              value="inventory" 
              className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg transition-all duration-200"
            >
              <Package className="w-4 h-4" />
              <span>Inventory</span>
            </TabsTrigger>
            <TabsTrigger 
              value="Staff"
              className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg transition-all duration-200"
            >
              <Users className="w-4 h-4" />
              <span>Staff</span>
            </TabsTrigger>
            <TabsTrigger 
              value="sales"
              className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg transition-all duration-200"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Sales</span>
            </TabsTrigger>
            <TabsTrigger 
              value="analytics"
              className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg transition-all duration-200"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Analytics</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="inventory" className="mt-0">
            <InventoryTab />
          </TabsContent>
          <TabsContent value="Staff" className="mt-0">
            <StaffTab />
          </TabsContent>
          <TabsContent value="sales" className="mt-0">
            <SalesTab />
          </TabsContent>
          <TabsContent value="analytics" className="mt-0">
            <AnalyticsTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;