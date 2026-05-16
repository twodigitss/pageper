import { useRef, useEffect, useState } from "react";

// import Load_local_configs, { Load_profile_picture } from "@components/ConfigLoaders";
import Theme_switcher from "@components/ThemePicker";
import BookmarkManager, { BookmarkManagerHandle } from './BookmarkManager';
import template from '../config/template.json';

interface AppSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'bookmarks' | 'keybinds' | 'colorscheme' | 'help';

function AppSettings({ isOpen, onClose }: AppSettingsProps){
  const [activeTab, setActiveTab] = useState<TabType>('bookmarks');

  const dialogRef = useRef<HTMLDialogElement>(null); //para referenciar al modal mismo
  const usernameRef = useRef<HTMLInputElement>(null);
  const bookmarkRef = useRef<BookmarkManagerHandle>(null);

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

    const colors_stored = {
      text:  col_text.current?.value,
      hover:  col_hover.current?.value,
      bg:  col_bg.current?.value,
      bg2:  col_bg2.current?.value,
    }
    
    localStorage.setItem('pageper_username', username_mod)
    localStorage.setItem('pageper_colors', JSON.stringify(colors_stored))
    
    // Trigger bookmark save
    bookmarkRef.current?.save();
    
    onClose();
  }

  const tabClass = (tab: TabType) => 
    `inline-flex items-center gap-2 px-4 py-3 rounded-base w-full transition-all cursor-pointer ${
      activeTab === tab 
        ? "bg-brand text-text-hover font-bold " 
        : "text-text hover:text-text-hover hover:bg-neutral-secondary-soft"
    }`;

  return(
    <dialog ref={dialogRef} onClose={onClose} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 gap-4 bg-bg-0 text-text rounded-lg w-[90%] max-w-7xl h-[80vh] overflow-hidden z-1000 backdrop:bg-black/50 open:flex flex-col">

    <div className="flex flex-1 min-h-0">
        <ul className="w-45 text-sm font-medium text-body md:me-4 mb-4 md:mb-0 flex flex-col gap-1 border-r border-body pr-4">
            <li>
                <button onClick={() => setActiveTab('bookmarks')} className={tabClass('bookmarks')}>
                  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-bookmark">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M18 7v14l-6 -4l-6 4v-14a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4" />
                  </svg>
                    Bookmarks
                </button>
            </li>
            <li>
                <button onClick={() => setActiveTab('keybinds')} className={tabClass('keybinds')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-square-f9">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14" />
                      <path d="M13 14.25c0 .414 .336 .75 .75 .75h1.5a.75 .75 0 0 0 .75 -.75v-4.5a.75 .75 0 0 0 -.75 -.75h-1.5a.75 .75 0 0 0 -.75 .75v1.5c0 .414 .336 .75 .75 .75h2.25" />
                      <path d="M8 12h2" />
                      <path d="M10 9h-2v6" />
                    </svg>
                    Keybinds
                </button>
            </li>
            <li>
                <button onClick={() => setActiveTab('colorscheme')} className={tabClass('colorscheme')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-palette"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M12 21a9 9 0 0 1 0 -18c4.97 0 9 3.582 9 8c0 1.06 -.474 2.078 -1.318 2.828c-.844 .75 -1.989 1.172 -3.182 1.172h-2.5a2 2 0 0 0 -1 3.75a1.3 1.3 0 0 1 -1 2.25" /> <path d="M7.5 10.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /> <path d="M11.5 7.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /> <path d="M15.5 10.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /> </svg>
                    Colorscheme
                </button>
            </li>
            <li>
                <button onClick={() => setActiveTab('help')} className={tabClass('help')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-help">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                      <path d="M12 17l0 .01" />
                      <path d="M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4" />
                    </svg>
                    Help
                </button>
            </li>
        </ul>

        <div className="flex-1 bg-neutral-secondary text-medium text-body overflow-y-auto px-4 min-h-0 flex flex-col">
            <section className={activeTab === 'bookmarks' ? "block animate-in fade-in duration-300" : "hidden"}>
              <BookmarkManager 
                 ref={bookmarkRef}
                 initialData={template.bookmarks} 
                 onSave={(newData) => console.log('Bookmark guardado:', newData)} 
              />
            </section>

            {activeTab === 'keybinds' && (
              <section className="flex-1 flex flex-col text-text items-center justify-center p-8 text-center animate-in fade-in duration-300">
                <div className="bg-body p-12 rounded-2xl border border-dashed border-text/20 max-w-lg">
                  <h3 className="text-2xl font-bold text-text-hover mb-4">Keyboard Navigation</h3>
                  <div className="flex flex-col gap-4 text-text/70 text-sm">
                    <p>PagePer supports quick navigation using number sequences:</p>
                    <div className="grid grid-cols-1 gap-3 text-left">
                      <div className="flex items-center gap-3">
                        <kbd className="bg-bg-0 px-2 py-1 rounded border border-text/10 text-brand min-w-8 text-center font-bold">1-9</kbd>
                        <span>First digit selects a bookmark category.</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <kbd className="bg-bg-0 px-2 py-1 rounded border border-text/10 text-brand min-w-8 text-center font-bold">1-9</kbd>
                        <span>Second digit opens the corresponding link.</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <kbd className="bg-bg-0 px-2 py-1 rounded border border-text/10 text-text/40 min-w-8 text-center font-bold text-[10px]">ESC</kbd>
                        <span>Resets selection or cancels navigation.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {activeTab === 'colorscheme' && (
              <section className="flex-1 flex flex-col items-center justify-center animate-in fade-in duration-300">
                <Theme_switcher/>
              </section>
            )}

            {activeTab === 'help' && (
              <section className="p-8 animate-in fade-in duration-300">
                <h3 className="text-xl font-bold text-text-hover mb-6">Documentation & Support</h3>

                <div className="grid gap-6">
                  <div className="bg-body p-6 text-text rounded-lg border border-transparent hover:border-brand/30 transition-all">
                    <h4 className="font-bold text-brand mb-2">How to use PagePer?</h4>
                    <p className="text-sm leading-relaxed">PagePer is your personal startpage. Customize your bookmarks, themes, and keybinds to make it your own.</p>
                  </div>
                  <div className="bg-body p-6 text-text rounded-lg border border-transparent hover:border-brand/30 transition-all">
                    <h4 className="font-bold text-brand mb-2">Need help?</h4>
                    <p className="text-sm leading-relaxed mb-4">Check the GitHub repository for documentation, issue reporting, and community updates.</p>
                    <a 
                      href="https://github.com/twodigitss/pageper" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-brand hover:text-text-hover transition-colors font-bold text-sm"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-github">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
                      </svg>
                      twodigitss/pageper
                    </a>
                  </div>
                </div>

              </section>
            )}
        </div>

    </div>

    <div className="flex justify-between items-center mt-6 pt-4 border-t border-body">
      <p className="text-[10px] opacity-30 italic">PagePer v0.4.2 - Experimental Build</p>
      <button className="all-unset flex items-center justify-center text-sm gap-2 py-2 px-6 bg-brand text-text hover:text-text-hover font-bold cursor-pointer hover:brightness-110 active:scale-95 transition-all rounded-lg " onClick={do_something}>
        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-device-floppy">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2" />
          <path d="M10 14a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
          <path d="M14 4l0 4l-6 0l0 -4" />
        </svg>
        Save Settings
      </button>
    </div>

    </dialog>

  )
}

export default AppSettings;
