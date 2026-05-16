import { Fragment, useState } from 'react'
import user_pref from '@services/preferences'
import Home from '@pages/Home';
import Side_Menu from "@components/SideMenu";
import AppSettings from "@components/SettingsModal";
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


    </Fragment>
  )
}

export default App
