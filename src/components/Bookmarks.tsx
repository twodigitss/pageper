import { useState, useEffect } from 'react';
import user_pref from "@services/preferences";
import useLocalS from '../hooks/useLocalStorage';

const getFaviconUrl = (url: string) => {
  try {
    const urlObj = new URL(url);
    // Using Google's favicon service which is reliable
    return `https://s2.googleusercontent.com/s2/favicons?domain=${urlObj.hostname}&sz=32`;
  } catch (e) {
    return ''; // Return empty string or a default fallback icon if URL parsing fails
  }
};

const Bookmarks = () => {
  const storedConfigRaw = useLocalS('pageper_external_conf', JSON.stringify(user_pref));
  const [currentBookmarks, setCurrentBookmarks] = useState(user_pref.bookmarks);
  const [showFavicons, setShowFavicons] = useState(user_pref.showFavicons !== undefined ? user_pref.showFavicons : true);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number | null>(null);

  useEffect(() => {
    try {
      const parsed = JSON.parse(storedConfigRaw);
      if (parsed.bookmarks) {
        setCurrentBookmarks(parsed.bookmarks);
      }
      setShowFavicons(parsed.showFavicons !== undefined ? parsed.showFavicons : true);
    } catch (e) {
      console.error("Failed to parse updated config for bookmarks");
    }
  }, [storedConfigRaw]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input or modal is open
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (document.querySelector('dialog[open]')) return;

      const key = e.key;
      const num = parseInt(key);
      const categories = Object.entries(currentBookmarks);

      if (key === 'Escape') {
        setActiveCategoryIndex(null);
        return;
      }

      if (isNaN(num) || num < 1 || num > 9) return;

      if (activeCategoryIndex === null) {
        // Selecting category
        if (num <= categories.length) {
          setActiveCategoryIndex(num - 1);
          // Auto-reset after 3 seconds of inactivity
          timeout = setTimeout(() => setActiveCategoryIndex(null), 3000);
        }
      } else {
        // Selecting link within active category
        const categoryLinks = Object.entries(categories[activeCategoryIndex][1]);
        if (num <= categoryLinks.length) {
          const url = categoryLinks[num - 1][1] as string;
          window.open(url, '_blank');
          setActiveCategoryIndex(null);
        } else if (num <= categories.length) {
          // If the number corresponds to another category, switch to it
          setActiveCategoryIndex(num - 1);
          clearTimeout(timeout);
          timeout = setTimeout(() => setActiveCategoryIndex(null), 3000);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (timeout) clearTimeout(timeout);
    };
  }, [currentBookmarks, activeCategoryIndex]);

  return (
    <div className="flex flex-wrap flex-row justify-between w-full relative">
      {Object.entries(currentBookmarks).map(([category, links], catIdx) => {
        const isActive = activeCategoryIndex === catIdx;
        
        return (
          <div 
            className={`flex flex-col mx-8 text-left font-normal transition-all duration-300 ${
              activeCategoryIndex !== null && !isActive ? 'opacity-20 scale-95 grayscale' : 'opacity-100'
            }`} 
            key={category}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border transition-colors ${
                isActive ? 'bg-brand text-text-hover border-brand' : 'text-text/20 border-text/10'
              }`}>
                {catIdx + 1}
              </span>
              <p className={`text-xl font-bold transition-colors ${isActive ? 'text-brand' : 'text-text-hover'}`}>
                {category}
              </p>
            </div>

            {Object.entries(links).map(([name, url], index) => {
              const favicon = getFaviconUrl(url as string);
              return (
                <a 
                  className={`flex items-center gap-3 italic-light text-sm hover:text-text-hover mb-3 group transition-all ${
                    isActive ? 'translate-x-1' : ''
                  }`} 
                  href={url as string} 
                  key={name}
                >
                  <span className={`text-xs w-4 text-right transition-colors ${
                    isActive ? 'text-brand font-bold' : 'text-text/30 group-hover:text-brand'
                  }`}>
                    {index + 1}
                  </span>
                  {showFavicons && favicon && (
                    <img 
                      src={favicon} 
                      alt="" 
                      className={`w-4 h-4 rounded-sm transition-all group-hover:scale-110 ${
                        isActive ? 'scale-110 shadow-sm' : ''
                      }`}
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  )}
                  <p className={`truncate ${isActive ? 'font-medium' : ''}`}> {name} </p>
                </a> 
              );
            })}
          </div>
        );
      })}
      
      {activeCategoryIndex !== null && (
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 animate-bounce text-[10px] font-bold uppercase tracking-widest text-brand bg-brand/10 px-4 py-1 rounded-full border border-brand/20">
          Waiting for link number...
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
