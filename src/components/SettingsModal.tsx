import { useRef, useEffect } from "react";

import Load_local_configs, { Load_profile_picture } from "@components/ConfigLoaders";
import Theme_switcher from "@components/ThemePicker";

interface AppSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

function AppSettings({ isOpen, onClose }: AppSettingsProps){
  const username_ls = localStorage.getItem("pageper_username") || "Default";
  const external_conf = localStorage.getItem('pageper_external_conf') || localStorage.getItem('pageper_defaults') || "";
  const colors_ls = JSON.parse(localStorage.getItem("pageper_colors") || "{}") || {};

  const dialogRef = useRef<HTMLDialogElement>(null); //para referenciar al modal mismo
  const usernameRef = useRef<HTMLInputElement>(null);
  const configRef = useRef<HTMLTextAreaElement>(null);

  const col_text = useRef<HTMLInputElement>(null);
  const col_hover = useRef<HTMLInputElement>(null);
  const col_bg = useRef<HTMLInputElement>(null);
  const col_bg2 = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && dialogRef.current) {
      dialogRef.current.showModal();
    } else if (!isOpen && dialogRef.current) {
      dialogRef.current.close();
    }
  }, [isOpen]);

  const do_something = () => {
    const username_mod = usernameRef.current?.value || "";
    const config_mod = configRef.current?.value || "";

    const colors_stored = {
      text:  col_text.current?.value,
      hover:  col_hover.current?.value,
      bg:  col_bg.current?.value,
      bg2:  col_bg2.current?.value,
    }
    
    localStorage.setItem('pageper_username', username_mod)
    localStorage.setItem('pageper_colors', JSON.stringify(colors_stored))
    localStorage.setItem('pageper_external_conf', config_mod)
    
    onClose();
  }

  // <dialog ref={dialogRef} onClose={onClose} className="flex p-12 gap-4 bg-bg-0 text-text rounded-lg max-w-[80%] max-h-[80vh] overflow-y-auto z-1000 backdrop:bg-black/50 open:block ">
  return(
    <dialog ref={dialogRef} onClose={onClose} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-12 gap-4 bg-bg-0 text-text rounded-lg max-w-[80%] max-h-[80vh] overflow-y-auto z-1000 backdrop:bg-black/50 open:block ">

      <form className="flex gap-8 h-240" method="dialog" onSubmit={do_something}>
        <div className="grid align-content-start">
          <h2 className="m-0 mb-8 text-text-hover">Settings</h2>
          <div className="grid gap-4">
            <input type="text" id="username" ref={usernameRef} defaultValue={username_ls} className="all-unset bg-body rounded-lg p-4" />
            <div className="flex w-full gap-4">
              <Load_profile_picture label="Photo"/>
              <Load_local_configs label="Config"/>
            </div>
          </div>

          <div className="grid gap-4">
            <h3 className="m-0 mt-8 text-text-hover"> Colorscheme </h3>
            <Theme_switcher/>
          </div>

          <h3 className="m-0 mt-6 mb-6"> Custom Colors (wip) </h3>
          <div className="grid bg-body p-6 rounded-lg gap-6 h-[calc(100%+9.8rem)] align-content-start">
            <div className="flex gap-4 items-center">
              <input type="color" className="all-unset appearance-none cursor-pointer h-[1.9rem] w-[1.9rem] rounded-lg bg-transparent" ref={col_text} defaultValue={colors_ls.text}/>
              <label htmlFor="favcolor"> Primary </label>
            </div>
            <div className="flex gap-4 items-center">
              <input type="color" className="all-unset appearance-none cursor-pointer h-[1.9rem] w-[1.9rem] rounded-lg bg-transparent" ref={col_hover} defaultValue={colors_ls.hover}/>
              <label htmlFor="favcolor"> Secondary </label>
            </div>
            <div className="flex gap-4 items-center">
              <input type="color" className="all-unset appearance-none cursor-pointer h-[1.9rem] w-[1.9rem] rounded-lg bg-transparent" ref={col_bg} defaultValue={colors_ls.bg}/>
              <label htmlFor="favcolor"> Background </label>
            </div>
            <div className="flex gap-4 items-center">
              <input type="color" className="all-unset appearance-none cursor-pointer h-[1.9rem] w-[1.9rem] rounded-lg bg-transparent" ref={col_bg2} defaultValue={colors_ls.bg2}/>
              <label htmlFor="favcolor"> Foreground </label>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-400">
          <h2 className="m-0 mb-8 text-text-hover"> Bookmarks </h2>
          <textarea 
            placeholder="Json thing here from LS" 
            defaultValue={external_conf}
            ref={configRef}
            className="all-unset h-[calc(100%-4.8rem*2)] w-[calc(100%-2rem*2)] block whitespace-pre-wrap leading-[1.4] resize-none bg-body rounded-lg text-text p-8"
          />
        </div>

      </form>


      <button className="all-unset mt-8 w-[calc(100%-3rem)] p-6 bg-body text-text cursor-pointer text-center rounded-lg" onClick={do_something}>Done</button>


    </dialog>

  )
}

export default AppSettings;
