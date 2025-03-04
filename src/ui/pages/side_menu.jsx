import React from "react";
import '@styles/side_menu.css'
import { useState } from "react";

import Theme_switcher from "@components/theme_picker";
import Load_local_configs from "@utils/load_preferences";

const Side_Menu = () => {
  const [isUp, setIsUp] = useState(true);

  const togglePosition = () => {
    setIsUp(!isUp);
  };

  const css = {
    transform: isUp ? 'translateY(-11.8rem)' : 'translateY(0)'
  }

  return (
    <div className="side_menu_configs" style={css}>

      <Theme_switcher/>
      <Load_local_configs/>

      <button className="side_menu_button" onClick={togglePosition}>
        <span className="material-symbols-outlined"> settings </span>
      </button>

    </div>
  )
}

export default Side_Menu;
