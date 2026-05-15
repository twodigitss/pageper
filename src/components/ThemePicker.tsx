import { ChangeEvent } from "react";
//import user_pref from '../../../user_conf.json';

const Theme_switcher = () => {
  const saved_theme = localStorage.getItem("pageper_theme") || 'light' ;
  
  const save_handler = (e: ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem('pageper_theme', e.target.id);
    //guarda atributo en el local storage
    document.documentElement.setAttribute('data-theme', e.target.id);
  };

  return (
    <div className="flex w-full self-center items-center justify-center bg-body py-[0.7rem] rounded-lg">
    {/*<form >*/} 
        <input type="radio" name='theme' id="light"     
          onChange={save_handler} className="appearance-none cursor-pointer w-[1.9rem] h-[1.9rem] m-2 checked:border checked:border-solid checked:border-text bg-day rounded-sm" defaultChecked={saved_theme==='light'}/>

        <input type="radio" name='theme' id="dark"      
          onChange={save_handler} className="appearance-none cursor-pointer w-[1.9rem] h-[1.9rem] m-2 checked:border checked:border-solid checked:border-text bg-night rounded-sm" defaultChecked={saved_theme==='dark'}/>

        <input type="radio" name='theme' id="rosepine"  
          onChange={save_handler} className="appearance-none cursor-pointer w-[1.9rem] h-[1.9rem] m-2 checked:border checked:border-solid checked:border-text bg-rose rounded-sm" defaultChecked={saved_theme==="rosepine"}/>

        <input type="radio" name='theme' id="biscuit"   
          onChange={save_handler} className="appearance-none cursor-pointer w-[1.9rem] h-[1.9rem] m-2 checked:border checked:border-solid checked:border-text bg-biscuit rounded-sm" defaultChecked={saved_theme==='biscuit'}/> 

        <input type="radio" name='theme' id="gruvbox_light"   
          onChange={save_handler} className="appearance-none cursor-pointer w-[1.9rem] h-[1.9rem] m-2 checked:border checked:border-solid checked:border-text bg-gruv rounded-sm" defaultChecked={saved_theme==='gruvbox_light'}/>
        
        <input type="radio" name='theme' id="gruvbox"   
          onChange={save_handler} className="appearance-none cursor-pointer w-[1.9rem] h-[1.9rem] m-2 checked:border checked:border-solid checked:border-text bg-gruv rounded-sm" defaultChecked={saved_theme==='gruvbox'}/>
        
        <input type="radio" name='theme' id="catp_light"
          onChange={save_handler} className="appearance-none cursor-pointer w-[1.9rem] h-[1.9rem] m-2 checked:border checked:border-solid checked:border-text bg-catp-light rounded-sm" defaultChecked={saved_theme==='catp_light'}/>

        <input type="radio" name='theme' id="catp_dark"
          onChange={save_handler} className="appearance-none cursor-pointer w-[1.9rem] h-[1.9rem] m-2 checked:border checked:border-solid checked:border-text bg-catp-dark rounded-sm" defaultChecked={saved_theme==='catp_dark'}/>
          
    {/*</form>*/} 

    </div>
  )
}

export default Theme_switcher;
