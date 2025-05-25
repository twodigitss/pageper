import React from "react";
import { useState } from "react";
import { Settings2 } from 'lucide-react';
import '@styles/side_menu.css'

const Side_Menu = ({openModal}) => {
  const [isUp, setIsUp] = useState(false);

  const togglePosition = () => {
    setIsUp(!isUp);
    openModal();
  };

  return (
    <div className="side_menu_configs" >
      <button className="side_menu_button" onClick={togglePosition}>
        <Settings2 size={20} id="setting"/>
      </button>

    </div>
  )
}

export default Side_Menu;
