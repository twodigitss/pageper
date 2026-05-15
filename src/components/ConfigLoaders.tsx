import { useRef, ChangeEvent } from 'react';
import { Camera, FileJson2 } from 'lucide-react';

interface LoadProps {
  label: string;
  is_pfp?: boolean;
}

const Load_profile_picture = ({label}: LoadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const set_img_to_ls = 'pageper_profile_img';

  const handleImageSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Image = e.target?.result as string;
        localStorage.setItem(set_img_to_ls, base64Image);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex justify-center items-center w-full" id={label}>
      <input 
        type="file" hidden
        ref={fileInputRef}
        accept="image/*"
        onChange={handleImageSelect}
      />
      <button onClick={triggerFileInput} className="all-unset flex justify-center items-center w-full text-text text-[1.8rem] p-1 bg-body rounded-lg cursor-pointer gap-2">
        <Camera size={15}/>
        {label}
      </button>
    </div>
  );
}


const Load_local_configs = ({label}: LoadProps) => {
  const external_json = useRef<HTMLInputElement>(null)

  //click handler for button
  const load_file_to_localstorage = () => {
    external_json.current?.click();
    
    external_json.current?.addEventListener('change', (event: Event) => {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];
      if (!file) return;

      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          localStorage.setItem("pageper_external_conf", content);
          console.log("Configuration loaded successfully! Reload the page to apply changes"); } 

        catch (error) {
          console.error("Error loading configuration:", error);}};
        
      fileReader.readAsText(file);  
      window.location.reload();
    });  
  }

  return(
    <div className='flex justify-center items-center w-full'>
      <input 
        hidden
        type="file" 
        ref={external_json} 
        className="hidden" 
      />

      <button onClick={load_file_to_localstorage} className='all-unset flex justify-center items-center w-full text-text text-[1.8rem] p-1 bg-body rounded-lg cursor-pointer gap-2'> 
        <FileJson2 size={15}/>
        <p>{label}</p>
      </button>

    </div>
  )
}

export default Load_local_configs;
export {Load_profile_picture};
