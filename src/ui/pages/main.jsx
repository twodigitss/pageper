import React, { Fragment } from "react";
import '@styles/index.css';

//ALL COMPONENT IMPORTS
import Bookmarks from "@containers/bookmarks";
import CurrentDate, {CurrentTime} from "@components/clock";
import useLocalS from "@hooks/useLocalSt";

function truncateText(text, maxLength) {
  if (text.length > maxLength) return text.substring(0, maxLength) + '...';
  return text;
}

const Main = () => {
  const profile_pic = useLocalS('pageper_profile_img', './images/user.png');
  const username = localStorage.getItem('pageper_username') || "Default"
  const username_cropped = truncateText(username, 20);

  return(
    <div className="main_frame">

      <div id="upper_section">

        <div className="main_header">
          { !profile_pic ?
            <Fragment/> : <img id='profile_picture' src={profile_pic}/> 
          }
          { username.length == 0 || username == false ?
              <p id="welcoming">Welcome!</p> :
              <p id="welcoming">Welcome <span id="users_name">{username_cropped}!</span>
              </p>
          }
        </div>

        <div className="the_date_and_time">
          <CurrentTime/>
          <CurrentDate/>
        </div>
         
      </div>

      <div id="middle_section">
        <h2 id="middle_section_title">Bookmarks</h2>
        <Bookmarks />
      </div>

    </div>
  )
}

export default Main;
