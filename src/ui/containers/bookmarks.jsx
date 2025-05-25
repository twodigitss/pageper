import user_pref from "@utils/get_preferences";

const Bookmarks = () => {
  return (
    <div className="bookmarks_container">
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
