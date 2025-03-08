import { Fragment } from 'react'
import user_pref from '@template'
import Main from '@pages/main';
import Side_Menu from "@pages/side_menu";

//save defaults
//WARNING: realmente necesito subir esta cosa?
//talvez porque si alguien lo mueve de lugar daria error

const default_data = JSON.stringify(user_pref);
localStorage.setItem("pageper_defaults", default_data);

function App() {
  return (
    <Fragment>
      <Main></Main>
      <Side_Menu/>
    </Fragment>
  )
}

export default App
