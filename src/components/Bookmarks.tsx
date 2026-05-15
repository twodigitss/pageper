import user_pref from "@services/preferences";

const Bookmarks = () => {
  return (
    <div className="flex flex-wrap flex-row justify-between w-full gap-12">
    {Object.entries(user_pref.bookmarks).map(([category, links]) => (
      <div className='flex flex-col m-4 p-4 gap-[0.2rem] text-left font-normal' key={category}>
      <p className='text-lg font-bold mb-2'>{category}</p>

      {Object.entries(links).map(([name, url]) => (
        <a className='italic-normal text-lg hover:text-text-hover' href={url as string} key={name}>
        <p> {name} </p>
        </a> 
      ))}

      </div>
    ))}
    </div>

  )
}

export default Bookmarks;
