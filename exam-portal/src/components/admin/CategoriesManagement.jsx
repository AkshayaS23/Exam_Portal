import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';

function CategoriesManagement({ categories, setCategories, showNotification }) {
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleAddCategory = () => {
    if(newCategoryName.trim()) {
      setCategories([...categories, newCategoryName.trim()]); 
      setNewCategoryName('');
      showNotification('Category added successfully!', 'success');
    } else {
      showNotification('Please enter a category name', 'error');
    }
  };

  const handleDeleteCategory = (cat) => {
    setCategories(categories.filter(c => c !== cat));
    showNotification('Category deleted', 'success');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Manage Categories</h2>
      <div className="flex gap-2 mb-6">
        <input 
          type="text" 
          value={newCategoryName} 
          onChange={(e) => setNewCategoryName(e.target.value)} 
          placeholder="Enter new category name"
          className="flex-1 p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none" 
        />
        <button 
          onClick={handleAddCategory} 
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 rounded-lg font-semibold">
          Add Category
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {categories.map(cat => (
          <div key={cat} className="border-2 border-gray-200 p-4 rounded-lg flex justify-between items-center hover:border-indigo-300 transition">
            <span className="font-semibold text-gray-700">{cat}</span>
            <button 
              onClick={() => handleDeleteCategory(cat)} 
              className="text-red-600 hover:text-red-700">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoriesManagement;