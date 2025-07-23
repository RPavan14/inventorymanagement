import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ArrowLeft, Plus, Calendar as CalendarIcon, Package } from 'lucide-react';
import { Employee, Item } from '@/contexts/AppContext';
import { format } from 'date-fns';

interface EmployeeDetailsProps {
  Employee: Employee;
  items: Item[];
  onBack: () => void;
  onAssignItem: () => void;
  onDateFilter: (date: Date | undefined) => void;
  selectedDate?: Date;
}

const EmployeeDetails: React.FC<EmployeeDetailsProps> = ({
  Employee,
  items,
  onBack,
  onAssignItem,
  onDateFilter,
  selectedDate
}) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const getItemName = (itemId: string) => {
    const item = items.find(i => i.id === itemId);
    return item ? item.name : 'Unknown Item';
  };

  const filteredAssignments = selectedDate
    ? Employee.items.filter(assignment => {
        const assignmentDate = new Date(assignment.date || Date.now());
        return assignmentDate.toDateString() === selectedDate.toDateString();
      })
    : Employee.items;

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center space-x-2">
          <Package className="w-5 h-5" />
          <span>{Employee.name} - Items</span>
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
              Back to Employee
            </Button>
            <Button
              onClick={onAssignItem}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Assign Item
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  {selectedDate ? format(selectedDate, 'PPP') : 'Filter by date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    onDateFilter(date);
                    setIsCalendarOpen(false);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {selectedDate && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDateFilter(undefined)}
              >
                Clear
              </Button>
            )}
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-3">{Employee.name}</h3>
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">
                Total Items: {Employee.items.length}
              </Badge>
              {selectedDate && (
                <Badge variant="outline">
                  Filtered: {filteredAssignments.length}
                </Badge>
              )}
            </div>
          </div>

          {filteredAssignments.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              {selectedDate ? 'No items assigned on this date' : 'No items assigned to this Employee'}
            </p>
          ) : (
            <div className="space-y-3">
              {filteredAssignments.map((assignment, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm border">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-800">
                        {getItemName(assignment.itemId)}
                      </h4>
                      <p className="text-sm text-gray-600">
                        Quantity: {assignment.quantity}
                      </p>
                    </div>
                    <Badge variant="outline">
                      {assignment.date ? format(new Date(assignment.date), 'MMM dd, yyyy') : 'No date'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployeeDetails;