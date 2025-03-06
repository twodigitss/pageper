import React, { Fragment, useEffect, useState } from "react";
import '@styles/index.css';

import user_pref from '@user_conf';

//ALL COMPONENT IMPORTS
import Bookmarks from "@containers/bookmarks";
import MinimalSearchBar from "@components/search_bar";
import CurrentDate, {CurrentTime} from "@components/clock";

function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
}

const Main = () => {
  const username = user_pref.username 
  const username_cropped = truncateText(username, 20);
  const [profile_pic, setProfilePic] = useState("./images/user.png");
  const [banner_pic, setBannerPic] = useState("./images/bg.png");

  useEffect(()=>{
    const loaded_image = localStorage.getItem('pageper_profile_img');
    const loaded_banner = localStorage.getItem('pageper_banner_img');
    if (loaded_image) setProfilePic(loaded_image);
    if (loaded_banner) setBannerPic(loaded_banner);
  },[])

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
              <p id="welcoming">Welcome <span id="users_name">{username_cropped}!</span>
              </p>
          }
          { !profile_pic ?
            <Fragment/> : <img id='profile_picture' src={profile_pic}/> 
          }
        </div>
         
        <MinimalSearchBar/>     
      </div>

      <div id="middle_section">
        { banner_pic ? 
            //render bookmark here as bookmark_container_hasimg 
            ( <Fragment>
                <img id='gif' src={banner_pic}></img> 
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

    </div>
  )
}

export default Main;
