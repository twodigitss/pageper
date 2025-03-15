import React, { Fragment, useEffect, useState } from "react";
import '@styles/index.css';

//i had the idea of replace this line instead the actual (idk what i was thinking)
//config uloaded with this because if it runs for first time 
//it gives an error because no user_pref is generated properly
//before the page loads itself. my apologies
import user_pref from "@utils/get_preferences";

//ALL COMPONENT IMPORTS
import Bookmarks from "@containers/bookmarks";
import MinimalSearchBar from "@components/search_bar";
import CurrentDate, {CurrentTime} from "@components/clock";
import useLocalS from "@hooks/useLocalSt";

function truncateText(text, maxLength) {
  if (text.length > maxLength) return text.substring(0, maxLength) + '...';
  return text;
}

const Main = () => {
  //custom hooks to update images
  //takes a key and a default value
  const profile_pic = useLocalS('pageper_profile_img', './images/user.png');
  const banner_pic = useLocalS('pageper_banner_img', './images/pageper_promo.jpg');

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
