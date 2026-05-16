import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Check } from 'lucide-react';
import { AppConfig } from '../types/config';

interface BookmarkManagerProps {
  initialData?: AppConfig['bookmarks'];
  onSave?: (data: AppConfig['bookmarks']) => void;
}

const BookmarkManager: React.FC<BookmarkManagerProps> = ({ initialData = {}, onSave }) => {
  const [bookmarks, setBookmarks] = useState<AppConfig['bookmarks']>(initialData);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleAddCategory = () => {
    if (newCategoryName && !bookmarks[newCategoryName]) {
      setBookmarks({
        ...bookmarks,
        [newCategoryName]: {}
      });
      setNewCategoryName('');
    }
  };

  const handleRemoveCategory = (category: string) => {
    const newBookmarks = { ...bookmarks };
    delete newBookmarks[category];
    setBookmarks(newBookmarks);
  };

  const handleRenameCategory = (oldName: string, newName: string) => {
    if (newName && oldName !== newName && !bookmarks[newName]) {
      const newBookmarks = { ...bookmarks };
      newBookmarks[newName] = newBookmarks[oldName];
      delete newBookmarks[oldName];
      setBookmarks(newBookmarks);
      setEditingCategory(null);
    }
  };

  const handleAddItem = (category: string) => {
    setBookmarks({
      ...bookmarks,
      [category]: {
        ...bookmarks[category],
        'New Link': 'https://'
      }
    });
  };

  const handleUpdateItem = (category: string, oldName: string, newName: string, newUrl: string) => {
    const newCategory = { ...bookmarks[category] };
    if (oldName !== newName) {
      delete newCategory[oldName];
    }
    newCategory[newName] = newUrl;
    setBookmarks({
      ...bookmarks,
      [category]: newCategory
    });
  };

  const handleRemoveItem = (category: string, itemName: string) => {
    const newCategory = { ...bookmarks[category] };
    delete newCategory[itemName];
    setBookmarks({
      ...bookmarks,
      [category]: newCategory
    });
  };

  return (
    <div className="flex flex-col gap-6 p-4 bg-bg-0 text-text rounded-lg w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center border-b border-body pb-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="New Category..."
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            className="bg-body p-2 rounded-md outline-none text-sm"
          />
          <button
            onClick={handleAddCategory}
            className="p-2 bg-body hover:text-text-hover rounded-md transition-colors"
            title="Add Category"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(bookmarks).map(([category, items]) => (
          <div key={category} className="flex flex-col gap-3 p-4 bg-body rounded-lg border border-transparent hover:border-text-hover/20 transition-all">
            <div className="flex justify-between items-center group">
              {editingCategory === category ? (
                <div className="flex items-center gap-2 w-full">
                  <input
                    autoFocus
                    className="bg-bg-0 p-1 rounded outline-none text-text-hover font-bold w-full"
                    defaultValue={category}
                    onBlur={(e) => handleRenameCategory(category, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleRenameCategory(category, e.currentTarget.value);
                      if (e.key === 'Escape') setEditingCategory(null);
                    }}
                  />
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-text-hover">{category}</h3>
                  <button 
                    onClick={() => setEditingCategory(category)}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:text-text-hover transition-all"
                  >
                    <Edit2 size={14} />
                  </button>
                </div>
              )}
              <button
                onClick={() => handleRemoveCategory(category)}
                className="text-text/50 hover:text-red-500 transition-colors"
                title="Delete Category"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {Object.entries(items).map(([name, url]) => (
                <div key={name} className="flex flex-col gap-1 p-2 bg-bg-0 rounded-md group/item">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      defaultValue={name}
                      onBlur={(e) => handleUpdateItem(category, name, e.target.value, url as string)}
                      className="bg-transparent border-b border-transparent focus:border-text-hover outline-none text-sm font-medium w-1/3"
                      placeholder="Name"
                    />
                    <input
                      type="text"
                      defaultValue={url as string}
                      onBlur={(e) => handleUpdateItem(category, name, name, e.target.value)}
                      className="bg-transparent border-b border-transparent focus:border-text-hover outline-none text-xs text-text/70 w-full"
                      placeholder="URL"
                    />
                    <button
                      onClick={() => handleRemoveItem(category, name)}
                      className="opacity-0 group-hover/item:opacity-100 text-text/50 hover:text-red-500 transition-all"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={() => handleAddItem(category)}
                className="mt-2 flex items-center justify-center gap-2 p-2 border border-dashed border-text/20 rounded-md hover:border-text-hover hover:text-text-hover transition-all text-xs"
              >
                <Plus size={14} /> Add Item
              </button>
            </div>
          </div>
        ))}
      </div>

      {onSave && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => onSave(bookmarks)}
            className="flex items-center gap-2 w-full justify-center py-2 px-6 bg-body text-text font-bold rounded-lg hover:text-text-hover transition-all border border-transparent hover:border-text-hover"
          >
            <Check size={18} />
            Save Bookmarks
          </button>
        </div>
      )}
    </div>
  );
};

export default BookmarkManager;
