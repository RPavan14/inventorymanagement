import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Plus, UserPlus } from 'lucide-react';

interface AddEmployeeFormProps {
  onBack: () => void;
  onAdd: (name: string) => void;
}

const AddEmployeeForm: React.FC<AddEmployeeFormProps> = ({
  onBack,
  onAdd
}) => {
  const [EmployeeName, setEmployeeName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (EmployeeName.trim()) {
      onAdd(EmployeeName.trim());
      setEmployeeName('');
    }
  };

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center space-x-2">
          <UserPlus className="w-5 h-5" />
          <span>Add New Employee</span>
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
            Back to Employee
          </Button>

          <div>
            <Label htmlFor="EmployeeName">Employee Name</Label>
            <Input
              id="EmployeeName"
              value={EmployeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              placeholder="Enter Employee name"
              className="mt-1"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={!EmployeeName.trim()}
            className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Employee
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddEmployeeForm;