import React, { useState } from 'react';
import '../../assets/styles/searchbar.css'

const MinimalSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchEngine, setSearchEngine] = useState('https://www.google.com/search');

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href =`${searchEngine}?q=${encodeURIComponent(searchTerm)}`, '_blank';
  };

  return (
  <div className='that_search_bar'>
    <form onSubmit={handleSubmit} >
      
      <select className='select_engine' value={searchEngine} onChange={e => setSearchEngine(e.target.value)}>
        <option className='option_engine' value="https://www.google.com/search">Google</option>
        <option className='option_engine' value="https://www.bing.com/search">Bing</option>
        <option className='option_engine' value="https://search.yahoo.com/search">Yahoo</option>
        <option className='option_engine' value="https://duckduckgo.com/">DuckGo</option>
      </select>
      
      <span id='separator'></span>  

      {/* value={searchTerm} */}
      <input className='search_input' type="text" placeholder="Search..." onChange={e => setSearchTerm(e.target.value)}/>
      
      <button className='btn_subm' type="submit">Q</button>

    </form>
  </div>
  );
};

export default MinimalSearchBar;
