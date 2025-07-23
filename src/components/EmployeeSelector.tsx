import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Users, UserPlus } from 'lucide-react';
import { Employee } from '@/contexts/AppContext';

interface EmployeeSelectorProps {
  Employee: Employee[];
  onEmployeeSelect: (Employee: Employee) => void;
  onAddEmployee: () => void;
}

const EmployeeSelector: React.FC<EmployeeSelectorProps> = ({
  Employee,
  onEmployeeSelect,
  onAddEmployee
}) => {
  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center space-x-2">
          <Users className="w-5 h-5" />
          <span>Select Employee</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-3">
          <Button
            onClick={onAddEmployee}
            className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Employee
          </Button>
          
          {Employee.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No Employee available</p>
          ) : (
            <div className="grid grid-cols-1 gap-2">
              {Employee.map((Employee) => (
                <Button
                  key={Employee.id}
                  variant="outline"
                  onClick={() => onEmployeeSelect(Employee)}
                  className="justify-between h-auto p-4 hover:bg-orange-50 hover:border-orange-300"
                >
                  <div className="flex items-center">
                    <UserPlus className="w-4 h-4 mr-2" />
                    <span>{Employee.name}</span>
                  </div>
                  <Badge variant="secondary">
                    {Employee.items.length} items
                  </Badge>
                </Button>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployeeSelector;