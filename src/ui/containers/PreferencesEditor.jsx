import React, { useState, useEffect } from 'react';
import { Save, RotateCcw, Plus, X, ExternalLink, User, ChevronDown, ChevronRight } from 'lucide-react';
import "@styles/PreferencesEditor.css"

const BookmarkEditor = ({ initialData = {} }) => {
  const [data, setData] = useState({});
  const [expandedSections, setExpandedSections] = useState(new Set());
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    setData(JSON.parse(JSON.stringify(initialData)));
    if (initialData.bookmarks) {
      setExpandedSections(new Set(Object.keys(initialData.bookmarks)));
    }
  }, [initialData]);

  const handleUsernameChange = (value) => {
    setData(prev => ({ ...prev, username: value }));
    setIsDirty(true);
  };

  const handleBookmarkChange = (categoryKey, bookmarkKey, field, value) => {
    setData(prev => {
      const newData = { ...prev };
      
      if (field === 'name' && value !== bookmarkKey) {
        const url = newData.bookmarks[categoryKey][bookmarkKey];
        delete newData.bookmarks[categoryKey][bookmarkKey];
        newData.bookmarks[categoryKey][value] = url;
      } else if (field === 'url') {
        newData.bookmarks[categoryKey][bookmarkKey] = value;
      }
      
      return newData;
    });
    setIsDirty(true);
  };

  const addBookmark = (categoryKey) => {
    setData(prev => ({
      ...prev,
      bookmarks: {
        ...prev.bookmarks,
        [categoryKey]: {
          ...prev.bookmarks[categoryKey],
          'New Bookmark': 'https://'
        }
      }
    }));
    setIsDirty(true);
  };

  const removeBookmark = (categoryKey, bookmarkKey) => {
    setData(prev => {
      const newBookmarks = { ...prev.bookmarks[categoryKey] };
      delete newBookmarks[bookmarkKey];
      return {
        ...prev,
        bookmarks: {
          ...prev.bookmarks,
          [categoryKey]: newBookmarks
        }
      };
    });
    setIsDirty(true);
  };

  const addCategory = () => {
    const newCategoryName = 'New Category.';
    setData(prev => ({
      ...prev,
      bookmarks: {
        ...prev.bookmarks,
        [newCategoryName]: {}
      }
    }));
    setExpandedSections(prev => new Set([...prev, newCategoryName]));
    setIsDirty(true);
  };

  const removeCategory = (categoryKey) => {
    setData(prev => {
      const newBookmarks = { ...prev.bookmarks };
      delete newBookmarks[categoryKey];
      return { ...prev, bookmarks: newBookmarks };
    });
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      newSet.delete(categoryKey);
      return newSet;
    });
    setIsDirty(true);
  };

  const renameCategory = (oldKey, newKey) => {
    if (oldKey === newKey) return;
    
    setData(prev => {
      const newBookmarks = { ...prev.bookmarks };
      newBookmarks[newKey] = newBookmarks[oldKey];
      delete newBookmarks[oldKey];
      return { ...prev, bookmarks: newBookmarks };
    });
    
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(oldKey)) {
        newSet.delete(oldKey);
        newSet.add(newKey);
      }
      return newSet;
    });
    setIsDirty(true);
  };

  const handleSave = () => {
    localStorage.setItem('bookmarkData', JSON.stringify(data));
    setIsDirty(false);
    console.log('Data saved to localStorage');
  };

  const handleReset = () => {
    setData(JSON.parse(JSON.stringify(initialData)));
    setIsDirty(false);
  };

  const toggleSection = (sectionKey) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionKey)) {
        newSet.delete(sectionKey);
      } else {
        newSet.add(sectionKey);
      }
      return newSet;
    });
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="bookmark-editor">
      {/* Header */}
      <div className="header">
        <h2 className="title">Bookmark Editor</h2>
        <div className="actions">
          <button 
            onClick={handleReset} 
            disabled={!isDirty}
            className="btn btn-reset"
          >
            <RotateCcw />
            Reset
          </button>
          <button 
            onClick={handleSave} 
            disabled={!isDirty}
            className="btn btn-save"
          >
            <Save />
            Save
          </button>
        </div>
      </div>

      {isDirty && <div className="unsaved-warning">You have unsaved changes</div>}

      <div className="content">
        {/* Username Section */}
        <div className="user-section">
          <div className="section-header">
            <User />
            <h3>User Information</h3>
          </div>
          <div className="field-group">
            <label className="field-label">Username</label>
            <input
              type="text"
              value={data.username || ''}
              onChange={(e) => handleUsernameChange(e.target.value)}
              className="input"
              placeholder="Enter username"
            />
          </div>
        </div>

        {/* Bookmarks Section */}
        <div className="bookmarks-section">
          <div className="section-header">
            <h3>Bookmark Categories</h3>
            <button onClick={addCategory} className="btn btn-add-category">
              <Plus />
              Add Category
            </button>
          </div>

          {data.bookmarks && Object.entries(data.bookmarks).map(([categoryKey, bookmarks]) => {
            const isExpanded = expandedSections.has(categoryKey);
            const bookmarkCount = Object.keys(bookmarks).length;
            
            return (
              <div key={categoryKey} className="category">
                <div className="category-header">
                  <div className="category-info">
                    <button 
                      onClick={() => toggleSection(categoryKey)}
                      className="expand-btn"
                    >
                      {isExpanded ? <ChevronDown /> : <ChevronRight />}
                    </button>
                    <input
                      type="text"
                      value={categoryKey}
                      onChange={(e) => renameCategory(categoryKey, e.target.value)}
                      className="category-name-input"
                    />
                    <span className="bookmark-count">({bookmarkCount})</span>
                  </div>
                  <div className="category-actions">
                    <button 
                      onClick={() => addBookmark(categoryKey)}
                      className="btn btn-add-bookmark"
                    >
                      <Plus />
                      Add
                    </button>
                    <button 
                      onClick={() => removeCategory(categoryKey)}
                      className="btn btn-remove"
                    >
                      <X />
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="category-content">
                    {Object.keys(bookmarks).length === 0 ? (
                      <div className="empty-message">No bookmarks in this category</div>
                    ) : (
                      Object.entries(bookmarks).map(([bookmarkKey, url]) => (
                        <div key={bookmarkKey} className="bookmark-item">
                          <div className="bookmark-fields">
                            <div className="field-group">
                              <label className="field-label">Name</label>
                              <input
                                type="text"
                                value={bookmarkKey}
                                onChange={(e) => handleBookmarkChange(categoryKey, bookmarkKey, 'name', e.target.value)}
                                className="input bookmark-name"
                              />
                            </div>
                            <div className="field-group">
                              <label className="field-label">URL</label>
                              <div className="url-input-group">
                                <input
                                  type="url"
                                  value={url}
                                  onChange={(e) => handleBookmarkChange(categoryKey, bookmarkKey, 'url', e.target.value)}
                                  className={`input bookmark-url ${isValidUrl(url) ? 'valid' : 'invalid'}`}
                                  placeholder="https://example.com"
                                />
                                {isValidUrl(url) && (
                                  <a
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="external-link"
                                  >
                                    <ExternalLink />
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => removeBookmark(categoryKey, bookmarkKey)}
                            className="btn btn-remove bookmark-remove"
                          >
                            <X />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Example usage
// const App = () => {
//   const sampleData = {
//     "username": "Gwyne",
//     "bookmarks": {
//       "Social.": {
//         "YouTube": "https://www.youtube.com/",
//         "Discord": "https://discord.com/channels/@me",
//         "GitHub": "https://github.com/twodigitss",
//         "Reddit": "https://www.reddit.com/",
//         "Whatsapp": "https://web.whatsapp.com/"
//       },
//       "Univer.": {
//         "Classroom": "https://classroom.google.com/u/1/",
//         "GMail": "https://mail.google.com/",
//         "GDocs": "https://docs.google.com/document/u/1/",
//         "GDrive": "https://drive.google.com/drive/u/1/",
//         "GColab": "https://colab.research.google.com/"
//       }
//     }
//   };
//
//   return <BookmarkEditor initialData={sampleData} />;
// };

export default BookmarkEditor;
