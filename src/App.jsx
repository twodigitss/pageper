import { Fragment, useState } from 'react'
import user_pref from '@template'
import Main from '@pages/main';
import Side_Menu from "@pages/side_menu";
import AppSettings from "@ui/windows/settings";
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
      {/* <AppSettings on_off={false} /> */}

      {/* El componente de configuración */}
      <AppSettings 
        isOpen={isSettingsOpen} 
        onClose={closeSettings} 
      />

      <Main/>
      {/* Botón para abrir el modal */}
      {/* <button onClick={openSettings}>Open Settings</button> */}
      <Side_Menu openModal={openSettings}/>

      <div className='inverted_corners'>
        <span className='corners_common' id="the_corner1"></span>
        <span className='corners_common' id="the_corner2"></span>
        <span className='corners_common' id="the_corner3"></span>
      </div>

      {/*its strange, but i use a <a> tag to 
        display hoverable help text xD*/}
    
      <a title='Where/How to start? click here!'
        href='https://github.com/twodigitss/pageper'>
        <CircleHelp size={20} id="help" />
      </a>

    </Fragment>
  )
}

export default App
