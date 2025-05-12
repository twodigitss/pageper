import React from "react";
import '@styles/side_menu.css'
import { useState, useEffect } from "react";
import { Settings2 } from 'lucide-react';

const Side_Menu = ({openModal}) => {
  const [isUp, setIsUp] = useState(false);

  const togglePosition = () => {
    setIsUp(!isUp);
    console.log(isUp);
    openModal();
  };

  const css = {
    transform: isUp ? 'translateY(-0rem)' : 'translateY(0)'
  }

  return (
    <div className="side_menu_configs" style={css}>

      {/*<Load_local_configs/>
      <Load_profile_picture is_pfp={true} label={"Profile"}/>
      {/*<Load_profile_picture is_pfp={false} label={"Banner"}/>*/} 

      <button className="side_menu_button" onClick={togglePosition}>
        <Settings2 size={20} id="setting"/>
      </button>

    </div>
  )
}

export default Side_Menu;
