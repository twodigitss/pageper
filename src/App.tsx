import { Fragment, useState } from 'react'
import user_pref from '@services/preferences'
import Home from '@pages/Home';
import Side_Menu from "@components/SideMenu";
import AppSettings from "@components/SettingsModal";
import { CircleHelp } from 'lucide-react';
import '@styles/index.css'

//save defaults
const default_data = JSON.stringify(user_pref);
localStorage.setItem("pageper_defaults", default_data);

function App() {
const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  const openSettings = () => {
    setIsSettingsOpen(true);
  };
  
  const closeSettings = () => {
    setIsSettingsOpen(false);
  };  
  
  return (
    <Fragment>

      <AppSettings 
        isOpen={isSettingsOpen} 
        onClose={closeSettings} 
      />

      <Home/>
      <Side_Menu openModal={openSettings}/>

      <div className='fixed bottom-0 left-0 flex items-end pointer-events-none'>
        {/* Simplified inverted corners or keep them if needed, but let's try to use Tailwind for the help icon first */}
      </div>

      <a title='Where/How to start? click here!'
        href='https://github.com/twodigitss/pageper'
        className="fixed bottom-0 -left-px p-4 text-text bg-bg-0 rounded-tr-2xl z-50">
        <CircleHelp size={20} />
      </a>

    </Fragment>
  )
}

export default App
