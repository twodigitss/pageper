import "@styles/window.css"
import { useRef, useEffect } from "react";

import Load_local_configs from "@utils/load_preferences";
import Theme_switcher from "@components/theme_picker";
import {Load_profile_picture} from "@utils/load_preferences";
import JsonEditor from "@components/jsonEditor";

//TODO: manejar con un boton el estado de apertura
//NOTE: si voy a hacer esto, averiguar como reestablecer la config defalult
//CUANDO SE ABRA QUE CARGUE EL NOMBRE Y LOS CAMPOS CARGADOS POR EL LS


function AppSettings({ isOpen, onClose }){
  const dialogRef = useRef(); //para referenciar al modal mismo
  const col_text = useRef();
  const col_hover = useRef();
  const col_bg = useRef();
  const col_bg2 = useRef();
  const col_sep = useRef();

  useEffect(() => {
    if (isOpen && dialogRef.current) {
      dialogRef.current.showModal();
    } else if (!isOpen && dialogRef.current) {
      dialogRef.current.close();
    }
  }, [isOpen]);

  const do_something = (e) => {
    const text = col_text.current.value;
    const hover = col_hover.current.value;
    const bg = col_bg.current.value;
    const bg2 = col_bg2.current.value;
    const sep = col_sep.current.value;

    //NOTE: subir al LS, talvez usar hook para recargar
    const colors_stored = {
      text: text,
      hover: hover,
      bg: bg,
      bg2: bg2,
      sep: sep
    }

    console.log(colors_stored);
    
    onClose();
  }

  return(
    <dialog ref={dialogRef} onClose={onClose}>
      <h2 className="modal_title">Settings</h2>
      <form className="modal_form" method="dialog" onSubmit={do_something}>

        <span id="user">
          <Load_profile_picture is_pfp={true}/>
          <input type="text" id="username" ref={col_text} placeholder="Username"/>
        </span>
        <Load_local_configs/>

        <h3 className="modal_title"> Colorscheme </h3>

        <div id="ColorSelectionContainer">
        <Theme_switcher/>
          <span className="span">
            <input type="color" ref={col_text}/>
            <label htmlFor="favcolor"> Text </label>
          </span>
          <span className="span">
            <input type="color" ref={col_hover}/>
            <label htmlFor="favcolor"> Hover </label>
          </span>
          <span className="span">
            <input type="color" ref={col_bg}/>
            <label htmlFor="favcolor"> Bg </label>
          </span>
          <span className="span">
            <input type="color" ref={col_bg2}/>
            <label htmlFor="favcolor"> Bg2 </label>
          </span>
          <span className="span">
            <input type="color" ref={col_sep}/>
            <label htmlFor="favcolor"> Separator </label>
          </span>
        </div>
        <button type="submit">Done</button>

      </form>

      <JsonEditor/>

    </dialog>

  )
}

export default AppSettings;
