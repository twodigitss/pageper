import React from "react";
//import user_pref from '../../../user_conf.json';

const Theme_switcher = () => {
  
  // get local saved theme
  // either if is not found it will take light as default
  // who knows why...
  const saved_theme = localStorage.getItem("pageper_theme") || 'light' ;
  
  const save_handler = (e) => {
    localStorage.setItem('pageper_theme', e.target.id);
    //guarda atributo en el local storage
    document.documentElement.setAttribute('data-theme', e.target.id);
  };

  return (
    <div className="colorscheme_form">
    {/*<form >*/} 
        <input type="radio" name='theme' id="light"     
          onChange={save_handler} defaultChecked={saved_theme==='light'}/>

        <input type="radio" name='theme' id="dark"      
          onChange={save_handler} defaultChecked={saved_theme==='dark'}/>

        <input type="radio" name='theme' id="rosepine"  
          onChange={save_handler} defaultChecked={saved_theme==="rosepine"}/>

        <input type="radio" name='theme' id="biscuit"   
          onChange={save_handler} defaultChecked={saved_theme==='biscuit'}/> 

        <input type="radio" name='theme' id="gruvbox_light"   
          onChange={save_handler} defaultChecked={saved_theme==='gruvbox_light'}/>
        
        <input type="radio" name='theme' id="gruvbox"   
          onChange={save_handler} defaultChecked={saved_theme==='gruvbox'}/>
        
        <input type="radio" name='theme' id="catp_light"
          onChange={save_handler} defaultChecked={saved_theme==='catp_light'}/>

        <input type="radio" name='theme' id="catp_dark"
          onChange={save_handler} defaultChecked={saved_theme==='catp_dark'}/>
          
    {/*</form>*/} 

    </div>
  )
}

export default Theme_switcher;
