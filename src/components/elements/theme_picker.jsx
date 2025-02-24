import React from "react";

const Theme_switcher = () => {
  return (
    <div>
      <form className="colorscheme_form">
        {/*<label htmlFor="theme">light themes</label>*/}
        <input type="radio" name='theme' id="light" defaultChecked/>
        <input type="radio" name='theme' id="dark" />
        <input type="radio" name='theme' id="rosepine" />
        <input type="radio" name='theme' id="gruvbox" />
      </form>
    </div>
  )
}

export default Theme_switcher;
