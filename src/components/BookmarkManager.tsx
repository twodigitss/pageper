import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Plus, Trash2, Edit2, ChevronUp, ChevronDown, Download, Upload } from 'lucide-react';
import { AppConfig } from '../types/config';
import useLocalS from '../hooks/useLocalStorage';

export interface BookmarkManagerHandle {
  save: () => void;
}

interface BookmarkManagerProps {
  initialData?: AppConfig['bookmarks'];
  onSave?: (data: AppConfig['bookmarks']) => void;
}

const BookmarkManager = forwardRef<BookmarkManagerHandle, BookmarkManagerProps>(({ initialData = {}, onSave }, ref) => {
  // Use useLocalS to track changes in localStorage for 'pageper_external_conf'
  const storedConfigRaw = useLocalS('pageper_external_conf', JSON.stringify({ bookmarks: initialData, showFavicons: true }));
  
  // Helper to parse config from the raw string
  const getConfigFromRaw = (raw: string): { bookmarks: AppConfig['bookmarks'], showFavicons: boolean } => {
    try {
      const parsed = JSON.parse(raw);
      return {
        bookmarks: parsed.bookmarks || initialData,
        showFavicons: parsed.showFavicons !== undefined ? parsed.showFavicons : true
      };
    } catch (e) {
      console.error("Error parsing config from localStorage:", e);
      return { bookmarks: initialData, showFavicons: true };
    }
  };

  const initialConfig = getConfigFromRaw(storedConfigRaw);
  const [bookmarks, setBookmarks] = useState<AppConfig['bookmarks']>(initialConfig.bookmarks);
  const [showFavicons, setShowFavicons] = useState<boolean>(initialConfig.showFavicons);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');

  // Sync state if localStorage changes externally (monitored by useLocalS)
  useEffect(() => {
    const externalConfig = getConfigFromRaw(storedConfigRaw);
    if (JSON.stringify(externalConfig.bookmarks) !== JSON.stringify(bookmarks)) {
      setBookmarks(externalConfig.bookmarks);
    }
    if (externalConfig.showFavicons !== showFavicons) {
      setShowFavicons(externalConfig.showFavicons);
    }
  }, [storedConfigRaw]);

  const handleSave = () => {
    const currentRaw = localStorage.getItem('pageper_external_conf');
    let currentConfig: Partial<AppConfig> = {};
    try {
      currentConfig = currentRaw ? JSON.parse(currentRaw) : {};
    } catch (e) {
      currentConfig = {};
    }
    
    const newConfig = { ...currentConfig, bookmarks, showFavicons };
    localStorage.setItem('pageper_external_conf', JSON.stringify(newConfig));
    
    if (onSave) onSave(bookmarks);
  };

  const handleExport = () => {
    const dataStr = JSON.stringify({ bookmarks, showFavicons }, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'pageper_bookmarks.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsed = JSON.parse(content);
        if (parsed.bookmarks) {
          setBookmarks(parsed.bookmarks);
          if (parsed.showFavicons !== undefined) setShowFavicons(parsed.showFavicons);
        } else {
          setBookmarks(parsed);
        }
      } catch (err) {
        console.error("Error importing JSON:", err);
        alert("Invalid JSON file structure");
      }
    };
    reader.readAsText(file);
    event.target.value = ''; // Reset input
  };

  // Expose handleSave to parent components
  useImperativeHandle(ref, () => ({
    save: handleSave
  }));

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

  const handleMoveCategory = (category: string, direction: 'up' | 'down') => {
    const entries = Object.entries(bookmarks);
    const index = entries.findIndex(([cat]) => cat === category);
    if (index === -1) return;

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= entries.length) return;

    const newEntries = [...entries];
    const [removed] = newEntries.splice(index, 1);
    newEntries.splice(newIndex, 0, removed);

    setBookmarks(Object.fromEntries(newEntries));
  };

  const handleAddItem = (category: string) => {
    setBookmarks({
      ...bookmarks,
      [category]: {
        ...bookmarks[category],
        ['New Link ' + Date.now()]: 'https://'
      }
    });
  };

  const handleUpdateItem = (category: string, oldName: string, newName: string, newUrl: string) => {
    const newCategoryEntries = Object.entries(bookmarks[category]);
    const updatedEntries = newCategoryEntries.map(([name, url]) => {
      if (name === oldName) return [newName, newUrl];
      return [name, url];
    });
    
    setBookmarks({
      ...bookmarks,
      [category]: Object.fromEntries(updatedEntries)
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

  const handleMoveItem = (category: string, itemName: string, direction: 'up' | 'down') => {
    const entries = Object.entries(bookmarks[category]);
    const index = entries.findIndex(([name]) => name === itemName);
    if (index === -1) return;

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= entries.length) return;

    const newEntries = [...entries];
    const [removed] = newEntries.splice(index, 1);
    newEntries.splice(newIndex, 0, removed);

    setBookmarks({
      ...bookmarks,
      [category]: Object.fromEntries(newEntries)
    });
  };

  const bookmarkEntries = Object.entries(bookmarks);

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

        <div className="flex gap-2 items-center">
          <label className="flex items-center gap-2 cursor-pointer group mr-4">
            <input 
              type="checkbox" 
              checked={showFavicons}
              onChange={(e) => setShowFavicons(e.target.checked)}
              className="hidden"
            />
            <div className={`w-8 h-4 rounded-full transition-colors relative ${showFavicons ? 'bg-brand' : 'bg-body'}`}>
              <div className={`absolute top-1 w-2 h-2 rounded-full bg-text-hover transition-all ${showFavicons ? 'left-5' : 'left-1'}`} />
            </div>
            <span className="text-[10px] font-bold uppercase opacity-50 group-hover:opacity-100 transition-opacity">
              Favicons
            </span>
          </label>

          <input
            type="file"
            id="import-bookmarks"
            className="hidden"
            accept=".json"
            onChange={handleImport}
          />
          <label
            htmlFor="import-bookmarks"
            className="p-2 bg-body hover:text-text-hover rounded-md transition-colors cursor-pointer flex items-center justify-center"
            title="Import JSON"
          >
            <Upload size={18} />
          </label>
          <button
            onClick={handleExport}
            className="p-2 bg-body hover:text-text-hover rounded-md transition-colors flex items-center justify-center"
            title="Export JSON"
          >
            <Download size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bookmarkEntries.map(([category, items], catIndex) => (
          <div key={category} className="flex flex-col gap-3 p-4 bg-body rounded-lg border border-transparent hover:border-text-hover/20 transition-all">
            <div className="flex justify-between items-center group">
              <div className="flex items-center gap-1">
                <div className="flex flex-col opacity-0 group-hover:opacity-100 transition-all">
                  <button 
                    disabled={catIndex === 0}
                    onClick={() => handleMoveCategory(category, 'up')}
                    className="p-0.5 hover:text-text-hover disabled:text-text/20"
                  >
                    <ChevronUp size={14} />
                  </button>
                  <button 
                    disabled={catIndex === bookmarkEntries.length - 1}
                    onClick={() => handleMoveCategory(category, 'down')}
                    className="p-0.5 hover:text-text-hover disabled:text-text/20"
                  >
                    <ChevronDown size={14} />
                  </button>
                </div>
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
              </div>
              <button
                onClick={() => handleRemoveCategory(category)}
                className="text-text/50 hover:text-red-500 transition-colors"
                title="Delete Category"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {Object.entries(items).map(([name, url], itemIndex, itemEntries) => (
                <div key={name} className="flex flex-col gap-1 p-2 bg-bg-0 rounded-md group/item">
                  <div className="flex gap-2 items-center">
                    <div className="flex flex-col opacity-0 group-hover/item:opacity-100 transition-all">
                      <button 
                        disabled={itemIndex === 0}
                        onClick={() => handleMoveItem(category, name, 'up')}
                        className="p-0.5 hover:text-text-hover disabled:text-text/20"
                      >
                        <ChevronUp size={12} />
                      </button>
                      <button 
                        disabled={itemIndex === itemEntries.length - 1}
                        onClick={() => handleMoveItem(category, name, 'down')}
                        className="p-0.5 hover:text-text-hover disabled:text-text/20"
                      >
                        <ChevronDown size={12} />
                      </button>
                    </div>
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

    </div>
  );
});

export default BookmarkManager;
