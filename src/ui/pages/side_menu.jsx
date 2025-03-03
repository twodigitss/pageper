import React from "react";
import '@styles/side_menu.css'

import Theme_switcher from "@components/theme_picker";
import Load_local_configs from "@utils/load_preferences";

const Side_Menu = () => {
  return (
    <div className="side_menu_configs">

      <Theme_switcher/>
      <Load_local_configs/>

      <button className="side_menu_button">
        <span className="material-symbols-outlined"> settings </span>
      </button>

    </div>
  )
}

export default Side_Menu;
