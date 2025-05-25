import "@styles/window.css"
import { useRef, useEffect } from "react";

import Load_local_configs from "@utils/load_preferences";
import Theme_switcher from "@components/theme_picker";
import {Load_profile_picture} from "@utils/load_preferences";

function AppSettings({ isOpen, onClose }){
  const username_ls = localStorage.getItem("pageper_username") || "Default";
  const external_conf = localStorage.getItem('pageper_external_conf') || localStorage.getItem('pageper_defaults');
  const colors_ls = JSON.parse(localStorage.getItem("pageper_colors")) || "";

  const dialogRef = useRef(); //para referenciar al modal mismo
  const usernameRef = useRef();
  const configRef = useRef();

  const col_text = useRef();
  const col_hover = useRef();
  const col_bg = useRef();
  const col_bg2 = useRef();

  useEffect(() => {
    if (isOpen && dialogRef.current) {
      dialogRef.current.showModal();
    } else if (!isOpen && dialogRef.current) {
      dialogRef.current.close();
    }
  }, [isOpen]);

  const do_something = () => {
    const username_mod = usernameRef.current.value;
    const config_mod = configRef.current.value;

    const colors_stored = {
      text:  col_text.current.value,
      hover:  col_hover.current.value,
      bg:  col_bg.current.value,
      bg2:  col_bg2.current.value,
    }
    
    localStorage.setItem('pageper_username', username_mod)
    localStorage.setItem('pageper_colors', JSON.stringify(colors_stored))
    localStorage.setItem('pageper_external_conf', config_mod)
    
    onClose();
  }

  return(
    <dialog ref={dialogRef} onClose={onClose}>
      {/*why when i do assign a className here just doesnt close*/}

      <form className="modal_form" method="dialog" onSubmit={do_something}>
        <div id="MODAL_LEFT">
          <h2 className="modal_title">Settings</h2>
          <div id="settings_side_up">
            <input type="text" id="username" ref={usernameRef} defaultValue={username_ls} />
            <span id="user">
              <Load_profile_picture label="Photo"/>
              <Load_local_configs label="Config"/>
            </span>
          </div>

          <span id="trololo">
            <h3 id="modal_colorscheme"> Colorscheme </h3>
            <Theme_switcher/>
          </span>

          <h3 id="custom_colorscheme"> Custom Colors (wip) </h3>
          <div id="ColorSelectionContainer">
            <span className="span">
              <input type="color" className="custom_colors_input" ref={col_text} defaultValue={colors_ls.text}/>
              <label htmlFor="favcolor"> Primary </label>
            </span>
            <span className="span">
              <input type="color" className="custom_colors_input" ref={col_hover} defaultValue={colors_ls.hover}/>
              <label htmlFor="favcolor"> Secondary </label>
            </span>
            <span className="span">
              <input type="color" className="custom_colors_input" ref={col_bg} defaultValue={colors_ls.bg}/>
              <label htmlFor="favcolor"> Background </label>
            </span>
            <span className="span">
              <input type="color" className="custom_colors_input" ref={col_bg2} defaultValue={colors_ls.bg2}/>
              <label htmlFor="favcolor"> Foreground </label>
            </span>
          </div>{/**/}
        </div>

        <div id="MODAL_RIGHT">
          <h2 className="modal_title"> Bookmarks </h2>
          <textarea 
            placeholder="Json thing here from LS" 
            defaultValue={external_conf}
            ref={configRef}/>
        </div>

      </form>

      <button id="modal_btn_submit" onClick={do_something}>Done</button>


    </dialog>

  )
}

export default AppSettings;
