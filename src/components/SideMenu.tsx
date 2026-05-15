import { useState } from "react";
import { Settings2 } from 'lucide-react';

interface SideMenuProps {
  openModal: () => void;
}

const Side_Menu = ({openModal}: SideMenuProps) => {
  const [isUp, setIsUp] = useState(false);

  const togglePosition = () => {
    setIsUp(!isUp);
    openModal();
  };

  return (
    <div className="flex flex-col items-center p-2 fixed top-0 right-0 bg-bg-0 rounded-bl-2xl max-[600px]:hidden" >
      <button className="all-unset flex justify-center items-center w-full p-[0.1rem] cursor-pointer" onClick={togglePosition}>
        <Settings2 size={16} className="text-text"/>
      </button>

    </div>
  )
}

export default Side_Menu;
