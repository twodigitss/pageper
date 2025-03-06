import React from "react";
import '@styles/side_menu.css'
import { useState } from "react";
import { Settings2 } from 'lucide-react';

import Theme_switcher from "@components/theme_picker";
import Load_local_configs from "@utils/load_preferences";
import {Load_profile_picture} from "@utils/load_preferences";

const Side_Menu = () => {
  const [isUp, setIsUp] = useState(true);

  const togglePosition = () => {
    setIsUp(!isUp);
  };

  const css = {
    transform: isUp ? 'translateY(-19.5rem)' : 'translateY(0)'
  }

  return (
    <div className="side_menu_configs" style={css}>

      <Theme_switcher/>
      <Load_local_configs/>

      {/*TODO: figure out why the parameter always take them as true*/}
      <Load_profile_picture is_pfp={true} label={"Profile"}/>
      <Load_profile_picture is_pfp={false} label={"Banner"}/>

      <button className="side_menu_button" onClick={togglePosition}>
        <Settings2 size={20} id="setting"/>
      </button>

    </div>
  )
}

export default Side_Menu;
