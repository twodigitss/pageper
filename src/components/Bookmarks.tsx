import user_pref from "@services/preferences";

const Bookmarks = () => {
  //TODO: IDEA: hacer un map tipo: categorias [1,2,3,4] y dependiendo si 
  // se presiona en orden, digamos "Cloud" (2), de estas indexa cuantos 
  // link hay en esa categoria, digamos 7. si presiona 2-7, se abre el enlace
  // en la posicion 7
  return (
    <div className="flex flex-wrap flex-row justify-between w-full">
    {Object.entries(user_pref.bookmarks).map(([category, links]) => (

      <div className='flex flex-col mx-8 text-left font-normal' key={category}>
      <p className='text-xl text-text-hover font-bold mb-2'>{category}</p>

      {Object.entries(links).map(([name, url], index) => (
        <a className='italic-light text-sm hover:text-text-hover' href={url as string} key={name}>
        <p className=""> {index+1} - {name} </p>
        </a> 
      ))}

      </div>
    ))}
    </div>

  )
}

export default Bookmarks;
