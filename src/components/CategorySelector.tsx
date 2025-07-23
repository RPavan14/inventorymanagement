import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Tag } from 'lucide-react';
import { Category } from '@/contexts/AppContext';

interface CategorySelectorProps {
  categories: Category[];
  onCategorySelect: (category: Category) => void;
  onAddCategory: () => void;
  title?: string;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  onCategorySelect,
  onAddCategory,
  title = 'Select Category'
}) => {
  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center space-x-2">
          <Tag className="w-5 h-5" />
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-3">
          <Button
            onClick={onAddCategory}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Category
          </Button>
          
          {categories.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No categories available</p>
          ) : (
            <div className="grid grid-cols-1 gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant="outline"
                  onClick={() => onCategorySelect(category)}
                  className="justify-start h-auto p-4 hover:bg-green-50 hover:border-green-300"
                >
                  <Tag className="w-4 h-4 mr-2" />
                  {category.name}
                </Button>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CategorySelector;