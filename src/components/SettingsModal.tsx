import { useRef, useEffect } from "react";

// import Load_local_configs, { Load_profile_picture } from "@components/ConfigLoaders";
import Theme_switcher from "@components/ThemePicker";
import BookmarkManager from './BookmarkManager';
import template from '../config/template.json';

interface AppSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

function AppSettings({ isOpen, onClose }: AppSettingsProps){
  // const username_ls = localStorage.getItem("pageper_username") || "Default";
  // const external_conf = localStorage.getItem('pageper_external_conf') || localStorage.getItem('pageper_defaults') || "";
  // const colors_ls = JSON.parse(localStorage.getItem("pageper_colors") || "{}") || {};

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

  return(
    <dialog ref={dialogRef} onClose={onClose} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 gap-4 bg-bg-0 text-text rounded-lg max-w-[80%] max-h-[80vh] overflow-y-auto z-1000 backdrop:bg-black/50 open:block ">

    <div className="md:flex flex min-w-280">
        <ul className=" w-fit text-sm font-medium text-body md:me-4 mb-4 md:mb-0">
            <li>
                <a href="#" className="inline-flex items-center gap-2 px-4 py-3 rounded-base text-text hover:text-text-hover w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-bookmark">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M18 7v14l-6 -4l-6 4v-14a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4" />
                  </svg>
                    Bookmarks
                </a>
            </li>
            <li>
                <a href="#" className="inline-flex items-center px-4 py-3 gap-2 rounded-base text-text hover:text-text-hover hover:bg-neutral-secondary-soft w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-square-f9">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14" />
                      <path d="M13 14.25c0 .414 .336 .75 .75 .75h1.5a.75 .75 0 0 0 .75 -.75v-4.5a.75 .75 0 0 0 -.75 -.75h-1.5a.75 .75 0 0 0 -.75 .75v1.5c0 .414 .336 .75 .75 .75h2.25" />
                      <path d="M8 12h2" />
                      <path d="M10 9h-2v6" />
                    </svg>
                    Keybinds
                </a>
            </li>
            <li>
                <a href="#" className="gap-2 inline-flex items-center px-4 py-2.5 bg-brand rounded-base text-text hover:text-text-hover active w-full" aria-current="page">
                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-palette"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M12 21a9 9 0 0 1 0 -18c4.97 0 9 3.582 9 8c0 1.06 -.474 2.078 -1.318 2.828c-.844 .75 -1.989 1.172 -3.182 1.172h-2.5a2 2 0 0 0 -1 3.75a1.3 1.3 0 0 1 -1 2.25" /> <path d="M7.5 10.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /> <path d="M11.5 7.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /> <path d="M15.5 10.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /> </svg>
                    Colorscheme
                </a>
            </li>
            <li>
                <a href="#" className="inline-flex items-center px-4 py-3 gap-2 rounded-base text-text hover:text-text-hover  hover:bg-neutral-secondary-soft w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-help">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                      <path d="M12 17l0 .01" />
                      <path d="M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4" />
                    </svg>
                    Help
                </a>
            </li>
        </ul>

        <div className=" bg-neutral-secondary text-medium text-body w-full">
            <section>
              <BookmarkManager 
                 initialData={template.bookmarks} 
                 onSave={(newData) => console.log('Guardar:', newData)} 
              />
            </section>
            <section className="max-w-4xl mx-auto p-4">
              <h3 className="text-text-hover"> Colorscheme </h3>
              <Theme_switcher/>
            </section>
        </div>

    </div>


      {/*
      <Nameform className="flex gap-8 h-240" method="dialog" onSubmit={do_something}>
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

        */}

      <button className="all-unset mt-8 w-fit flex items-center justify-center text-sm gap-2 py-2 px-4 bg-body text-text cursor-pointer hover:text-text-hover text-center rounded-lg" onClick={do_something}>
        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-device-floppy">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2" />
          <path d="M10 14a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
          <path d="M14 4l0 4l-6 0l0 -4" />
        </svg>
        Save
      </button>


    </dialog>

  )
}

export default AppSettings;
