import '@styles/index.css';
import Bookmarks from "@components/Bookmarks";
import CurrentDate, {CurrentTime} from "@components/Clock";
// import useLocalS from "@hooks/useLocalStorage";

// function truncateText(text: string, maxLength: number) {
//   return text.length > maxLength ? text.substring(0, maxLength) + '...' : text; 
// }

const Home = () => {
  // const profile_pic = useLocalS('pageper_profile_img', './images/user.png');
  // const username = localStorage.getItem('pageper_username') || "Default"
  // const username_cropped = truncateText(username, 20);

  return(
    <div className="grid px-8 py-4 gap-12">

      <div className="flex content-center justify-start gap-8">

        <div className="flex flex-col gap-3 my-4 max-[700px]:grid-flow-row max-[700px]:justify-items-center">
            <CurrentDate/>
            <CurrentTime/>
        </div>

        {/* <div className="flex flex-row items-center gap-6 text-center max-[700px]:grid max-[700px]:grid-flow-row max-[700px]:justify-items-center">
            { !profile_pic ?
              <Fragment/> : <img className="w-12 h-12 rounded-2xl" src={profile_pic as string}/> 
            }
            { username.length == 0 ?
                <p className="flex items-center text-4xl font-semibold">Welcome!</p> :
                <p className="flex items-center text-4xl">
                  <strong>Welcome ‎  </strong> <span className=" text-text-hover ">{username_cropped}!</span>
                </p>
            }
          </div> 
        */}

      </div>

      <div className="grid min-h-120 w-[calc(100%-20dvw)] place-content-center fixed top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 max-[700px]:relative max-[700px]:top-[60%]">
        <Bookmarks />
      </div>

    </div>
  )
  }

export default Home;
