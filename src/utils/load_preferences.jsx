import { Fragment, useRef } from 'react';

//NOTE: might not work for imgs, so do a imagepicker next
//TODO: do something similar for the pfp in another file
const Load_profile_picture = () => {
  return null
}

const Load_local_configs = () => {
  const external_json = useRef(null)

  //click handler for button
  const load_file_to_localstorage = () => {
    external_json.current.click();
    
    external_json.current.addEventListener('change', (event) => {
      const fileReader = new FileReader();
      const file = event.target.files[0];

      fileReader.onload = (e) => {
        try {
          const content = e.target.result;
          localStorage.setItem("pageper_external_conf", content);
          console.log("Configuration loaded successfully! Reload the page to apply changes"); } 

        catch (error) {
          console.error("Error loading configuration:", error);}};
        
      fileReader.readAsText(file);  
      window.location.reload();});  }

  return(
    <div className='load_config_container'>
      <input 
        hidden
        type="file" 
        ref={external_json} 
        className="hidden" 
      />

      <button onClick={load_file_to_localstorage} className='upload_conf_button'> 
        {/*no funciona con doble link*/}
        <span className="material-symbols-outlined"> upload </span>
        <p>Settings</p>
      </button>

    </div>
  )
}



export default Load_local_configs;
export {Load_profile_picture};
