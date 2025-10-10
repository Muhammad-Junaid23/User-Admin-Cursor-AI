import React from 'react';

const Header = ({ selectedCategory, setSelectedCategory, categories, setSelectedSubCategory, INITIAL_DATA }: any) => {
  return (
    <div className='flex justify-between items-center p-4 shadow-sm hover:shadow-md bg-white rounded'>
      <button className='px-4 py-2 bg-[#00BE38] text-white rounded'>QR Scanner</button>
      <select
        className='px-4 py-2 shadow-sm hover:shadow-md bg-white rounded focus:outline-0'
        value={selectedCategory}
        onChange={(e) => {
          const newCat = e.target.value as Category;
          setSelectedCategory(newCat);
          setSelectedSubCategory(Object.keys(INITIAL_DATA[newCat])[0]);
        }}
      >
        {categories.map((cat) => (
          <option key={cat}>{cat}</option>
        ))}
      </select>
    </div>
  );
};

export default Header;
