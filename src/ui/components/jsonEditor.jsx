import { useState } from 'react';

const JsonEditor = () => {
  // Datos estáticos como placeholder
  const initialData = {
    "bookmarks": {
      "Social.": {
        "YouTube": "https://www.youtube.com/",
        "Discord": "https://discord.com/channels/@me",
        "GitHub": "https://github.com/twodigitss",
        "Reddit": "https://www.reddit.com/",
        "Whatsapp": "https://web.whatsapp.com/"
      },
      "Univer.": {
        "Classroom": "https://classroom.google.com/u/1/",
        "GMail": "https://mail.google.com/",
        "GDocs": "https://docs.google.com/document/u/1/",
        "GDrive": "https://drive.google.com/drive/u/1/",
        "GColab": "https://colab.research.google.com/"
      },
      "Tools.": {
        "Translate": "https://translate.google.com/",
        "Ilovepdf": "https://www.ilovepdf.com/",
        "Figma": "https://www.figma.com/",
        "Canva": "https://www.canva.com/",
        "TinyWow": "https://tinywow.com/"
      },
      "Misc.": {
        "Mangadex": "https://www.mangadex.org/",
        "Proton": "https://account.proton.me/apps",
        "Spotify": "https://www.spotify.com/",
        "Binance": "https://www.binance.com/en/markets/overview",
        "Emojis": "https://twodigitss.github.io/emoji-pocket/"
      },
      "Dev.": {
        "ClaudeAI": "https://claude.ai",
        "Chatgpt": "https://www.chatgpt.com/",
        "Mongodb": "https://cloud.mongodb.com/v2/66fee5a46a9f00274761b48a#/metrics/replicaSet/679519926f26ec5e375bb87d/explorer/PruebaReact/items/find",
        "Tailwind": "https://flowbite.com/tools/tailwind-cheat-sheet/",
        "Render": "https://dashboard.render.com/"
      }
    }
  };

  //NOTE: meter el localstorage como usestate
  const [editableData, setEditableData] = useState(initialData);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('visual'); // 'visual' o 'raw'
  const [editingName, setEditingName] = useState(null);
  const [tempName, setTempName] = useState('');

  //NOTE: aqui guardar el localstorage
  // Función para guardar (simulada sin localStorage)
  const handleSave = () => {
    try {
      setMessage('Cambios guardados (simulado)');
      // En una app real aquí iría: localStorage.setItem('pageper_external_conf', JSON.stringify(editableData));
      console.log('Datos a guardar:', JSON.stringify(editableData));
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError('Error al guardar: ' + err.message);
    }
  };

  // Función para editar JSON en modo raw
  const handleRawEdit = (e) => {
    try {
      const newData = JSON.parse(e.target.value);
      setEditableData(newData);
      setError('');
    } catch (err) {
      setError('JSON inválido');
    }
  };

  // Función para agregar nueva categoría
  const addCategory = () => {
    const newCategoryName = prompt('Nombre de la nueva categoría:');
    if (newCategoryName) {
      setEditableData(prev => ({
        ...prev,
        bookmarks: {
          ...prev.bookmarks,
          [newCategoryName]: {}
        }
      }));
    }
  };

  // Función para agregar nuevo enlace a una categoría
  const addBookmark = (category) => {
    const name = prompt('Nombre del enlace:');
    const url = prompt('URL:');
    
    if (name && url) {
      setEditableData(prev => ({
        ...prev,
        bookmarks: {
          ...prev.bookmarks,
          [category]: {
            ...prev.bookmarks[category],
            [name]: url
          }
        }
      }));
    }
  };

  // Función para eliminar un enlace
  const deleteBookmark = (category, bookmark) => {
    if (confirm(`¿Eliminar "${bookmark}" de "${category}"?`)) {
      setEditableData(prev => {
        const newData = {...prev};
        const newCategory = {...newData.bookmarks[category]};
        delete newCategory[bookmark];
        newData.bookmarks[category] = newCategory;
        return newData;
      });
    }
  };

  // Función para eliminar una categoría
  const deleteCategory = (category) => {
    if (confirm(`¿Eliminar la categoría "${category}" y todos sus enlaces?`)) {
      setEditableData(prev => {
        const newData = {...prev};
        const newBookmarks = {...newData.bookmarks};
        delete newBookmarks[category];
        newData.bookmarks = newBookmarks;
        return newData;
      });
    }
  };

  // Editor visual amigable
  const visualEditor = () => (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <h3>Categorías y enlaces</h3>
        <button onClick={addCategory}>+ Categoría</button>
      </div>
      
      {Object.entries(editableData.bookmarks).map(([category, bookmarks]) => (
        <div key={category} style={{ marginBottom: '20px', border: '1px solid #ddd', padding: '10px', borderRadius: '4px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <h4 style={{ margin: '0' }}>{category}</h4>
            <div>
              <button onClick={() => addBookmark(category)} style={{ marginRight: '5px' }}>+ Enlace</button>
              <button onClick={() => deleteCategory(category)}>× Eliminar</button>
            </div>
          </div>
          
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '5px' }}>Nombre</th>
                <th style={{ textAlign: 'left', padding: '5px' }}>URL</th>
                <th style={{ width: '70px', textAlign: 'center' }}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(bookmarks).map(([name, url]) => (
                <tr key={`tr-${category}-${name}`}>
                  <td style={{ padding: '5px' }}>
                    <input 
                      value={editingName === `${category}-${name}` ? tempName : name}
                      onFocus={() => {
                        setEditingName(`${category}-${name}`);
                        setTempName(name);
                      }}
                      onChange={(e) => {
                        setTempName(e.target.value);
                      }}
                      onBlur={() => {
                        if (tempName && tempName !== name) {
                          setEditableData(prev => {
                            const newData = {...prev};
                            const newCategory = {...newData.bookmarks[category]};
                            newCategory[tempName] = newCategory[name];
                            delete newCategory[name];
                            newData.bookmarks[category] = newCategory;
                            return newData;
                          });
                        }
                        setEditingName(null);
                      }}
                      style={{ width: '100%', boxSizing: 'border-box' }}
                    />
                  </td>
                  <td style={{ padding: '5px' }}>
                    <input 
                      key={`url-${category}-${name}`}
                      value={url} 
                      onChange={(e) => {
                        setEditableData(prev => {
                          const newData = {...prev};
                          newData.bookmarks[category][name] = e.target.value;
                          return newData;
                        });
                      }}
                      style={{ width: '100%', boxSizing: 'border-box' }}
                    />
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button onClick={() => deleteBookmark(category, name)}>×</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ padding: '10px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h2 style={{ margin: '0' }}>Editor de Configuración</h2>
        <div>
          <button 
            onClick={() => setActiveTab('visual')} 
            style={{ 
              marginRight: '5px', 
              fontWeight: activeTab === 'visual' ? 'bold' : 'normal',
              background: activeTab === 'visual' ? '#e0e0e0' : 'transparent'
            }}
          >
            Modo Visual
          </button>
          <button 
            onClick={() => setActiveTab('raw')} 
            style={{ 
              marginRight: '10px',
              fontWeight: activeTab === 'raw' ? 'bold' : 'normal',
              background: activeTab === 'raw' ? '#e0e0e0' : 'transparent'
            }}
          >
            Modo JSON
          </button>
          <button onClick={handleSave}>Guardar Cambios</button>
        </div>
      </div>
      
      {error && <div style={{ color: 'red', padding: '10px', background: '#ffeeee', borderRadius: '4px', marginBottom: '15px' }}>{error}</div>}
      {message && <div style={{ color: 'green', padding: '10px', background: '#eeffee', borderRadius: '4px', marginBottom: '15px' }}>{message}</div>}
      
      {activeTab === 'visual' ? (
        visualEditor()
      ) : (
        <div>
          <h3>Editor JSON</h3>
          <textarea 
            value={JSON.stringify(editableData, null, 2)} 
            onChange={handleRawEdit}
            style={{ width: '100%', height: '400px', fontFamily: 'monospace', padding: '10px', boxSizing: 'border-box' }}
          />
        </div>
      )}
    </div>
  );
};

export default JsonEditor;