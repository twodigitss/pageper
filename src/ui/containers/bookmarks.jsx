// import user_pref from '@user_conf';
// import user_prefs from "@utils/get_preferences";
// import template from "@template";
import user_pref from "@utils/get_preferences";

const Bookmarks = (props) => {
  // if user_pref is empty use template
  // const user_pref = user_prefs ? user_prefs : template;

  return (
    <div className="bookmarks_container" id={props.has_img}>
      {Object.entries(user_pref.bookmarks).map(([category, links]) => (
        /*so, category serves as the upper title of the category
        while links are the key:value(value is another nest{} and should be
        nested by other object.entries) of the child */

        <div className='bookmarks_each' key={category}>
          <p className='bookmarks_title'>{category}</p>

            {Object.entries(links).map(([name, url]) => (
              //&bull; 
              <a className='bookmarks_links' href={url} key={name}>
                   <p> {name} </p>
              </a> 
            ))}
        
        </div>
      ))}
    </div>
    
  )
}

export default Bookmarks;
