import { useState, useEffect } from 'react';

//use a hook to constantly checking localstorage changes.
//mainly used for reloading the images, but might work for other things.
const useLocalS = (key, default_value) => {
  const stored_key = localStorage.getItem(key);

  const [value, setValue] = useState(
    stored_key != null ? stored_key : default_value
  );
  
  useEffect(() => {
    const checkForUpdates = () => {
      const current_key = localStorage.getItem(key);
      if (current_key != value) setValue(current_key || default_value);
    }
    
    const interval = setInterval( checkForUpdates, 1000 );
    
    return () => clearInterval(interval);
  }, [value] );
  
  return value;
}

export default useLocalS;
