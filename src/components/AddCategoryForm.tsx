import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Plus, Tag } from 'lucide-react';

interface AddCategoryFormProps {
  onBack: () => void;
  onAdd: (name: string) => void;
}

const AddCategoryForm: React.FC<AddCategoryFormProps> = ({
  onBack,
  onAdd
}) => {
  const [categoryName, setCategoryName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (categoryName.trim()) {
      onAdd(categoryName.trim());
      setCategoryName('');
    }
  };

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center space-x-2">
          <Tag className="w-5 h-5" />
          <span>Add New Category</span>
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
            Back to Categories
          </Button>

          <div>
            <Label htmlFor="categoryName">Category Name</Label>
            <Input
              id="categoryName"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="e.g., Jerseys, Equipment, Balls"
              className="mt-1"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={!categoryName.trim()}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Category
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddCategoryForm;