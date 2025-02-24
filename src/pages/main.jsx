import React, { Fragment } from "react";
import '../assets/styles/index.css';
import user_pref from '../../template.json';
import Bookmarks from "../components/containers/bookmarks";
import MinimalSearchBar from "../components/elements/search_bar";
import Theme_switcher from "../components/elements/theme_picker";
import Side_Menu from "./side_menu";
import CurrentDate, {CurrentTime} from "../components/elements/clock";

function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
}

const Main = () => {
  const username = user_pref.username 
  const username_cropped = truncateText(username, 20);
  
  return(
    <div className="main_frame">

      <div id="upper_section">
        <div className="the_date_and_time">
          <CurrentTime/>
          <CurrentDate/>
        </div>

        <div className="main_header">
          { username.length == 0 || username == false ?
              <p id="welcoming">Welcome!</p> :
              <p id="welcoming">Welcome <span id="users_name">{username_cropped}!</span></p>
          }
          { !user_pref.profile_pic ?
            <Fragment/> :
            <img id='profile_picture' src={user_pref.profile_pic}/> 
          }
        </div>
         
        <MinimalSearchBar/>     
      </div>

      <div id="middle_section">
        { user_pref.profile_gif ? 
            //render bookmark here as bookmark_container_hasimg 
            ( <Fragment>
                <img id='gif' src={user_pref.profile_gif}></img> 
                <Bookmarks has_img="bookmark_container_hasimg"/>
              </Fragment>
            )
            : //render bookmark here as bookmark_container_notimg 
            ( <Fragment>
                <Bookmarks has_img="bookmark_container_notimg"/>
              </Fragment>
            )
        } 
      </div>

      {/* <Theme_switcher/> */}
      {/* <Side_Menu/> */}

    </div>
  )
}

export default Main;
