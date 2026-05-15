import { Fragment } from "react";
import '@styles/index.css';
import Bookmarks from "@components/Bookmarks";
import CurrentDate, {CurrentTime} from "@components/Clock";
import useLocalS from "@hooks/useLocalStorage";

function truncateText(text: string, maxLength: number) {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text; 
}

const Home = () => {
  const profile_pic = useLocalS('pageper_profile_img', './images/user.png');
  const username = localStorage.getItem('pageper_username') || "Default"
  const username_cropped = truncateText(username, 20);

  return(
    <div className="grid p-28 gap-12">

      <div className="grid">

        <div className="flex flex-row items-center gap-8 text-center max-[700px]:grid max-[700px]:grid-flow-row max-[700px]:justify-items-center">
          { !profile_pic ?
            <Fragment/> : <img className="w-12 h-12 rounded-[25%]" src={profile_pic as string}/> 
          }
          { username.length == 0 ?
              <p className="flex items-center text-xl font-semibold">Welcome!</p> :
              <p className="flex items-center text-xl font-semibold">Welcome  <span className="text-text-hover">{username_cropped}!</span>
              </p>
          }
        </div>

        <div className="grid mt-8 max-[700px]:grid-flow-row max-[700px]:justify-items-center">
          <CurrentTime/>
          <CurrentDate/>
        </div>

      </div>

      <div className="grid min-h-120 w-[calc(100%-20dvw)] place-content-center fixed top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 max-[700px]:relative max-[700px]:top-[60%]">
        <h2 className="all-unset text-lg font-bold text-text-hover max-[700px]:text-center">Bookmarks</h2>
        <Bookmarks />
      </div>

    </div>
  )
  }

export default Home;
