import React, { useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { toast } from '@/components/ui/use-toast';
import EmployeeSelector from './employeeSelector';
import EmployeeDetails from './employeeDetails';
import AddEmployeeForm from './AddemployeeForm';
import { Employee } from '@/contexts/AppContext';

type ViewState = 'Employee' | 'EmployeeDetails' | 'addEmployee';

const StaffTab: React.FC = () => {
  const { Employee, items, addEmployee, assignItemToEmployee } = useAppContext();
  const [currentView, setCurrentView] = useState<ViewState>('Employee');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const handleEmployeeSelect = (Employee: Employee) => {
    setSelectedEmployee(Employee);
    setCurrentView('EmployeeDetails');
  };

  const handleAddEmployee = (name: string) => {
    addEmployee(name);
    setCurrentView('Employee');
    toast({
      title: 'Employee Added',
      description: `Employee "${name}" has been added.`,
    });
  };

  const handleAssignItem = () => {
    // Simple assignment - just assign first available item for demo
    if (selectedEmployee && items.length > 0) {
      const firstItem = items[0];
      assignItemToEmployee(selectedEmployee.id, firstItem.id, 1);
      toast({
        title: 'Item Assigned',
        description: `${firstItem.name} assigned to ${selectedEmployee.name}`,
      });
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'Employee':
        return (
          <EmployeeSelector
            Employee={Employee}
            onEmployeeSelect={handleEmployeeSelect}
            onAddEmployee={() => setCurrentView('addEmployee')}
          />
        );
      case 'EmployeeDetails':
        return selectedEmployee ? (
          <EmployeeDetails
            Employee={selectedEmployee}
            items={items}
            onBack={() => setCurrentView('Employee')}
            onAssignItem={handleAssignItem}
            onDateFilter={setSelectedDate}
            selectedDate={selectedDate}
          />
        ) : null;
      case 'addEmployee':
        return (
          <AddEmployeeForm
            onBack={() => setCurrentView('Employee')}
            onAdd={handleAddEmployee}
          />
        );
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

export default StaffTab;