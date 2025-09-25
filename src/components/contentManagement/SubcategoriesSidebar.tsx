import React from 'react';

const SubcategoriesSidebar = ({ subCategories, selectedSubCategory, setSelectedSubCategory }: any) => {
  return (
    <div className='w-1/5 py-4 px-2 space-y-2 mt-1 bg-white shadow-lg'>
      {subCategories.map((sub) => (
        <button
          key={sub}
          onClick={() => setSelectedSubCategory(sub)}
          className={`block w-full text-left px-3 py-2 rounded ${
            sub === selectedSubCategory ? 'bg-[#00BE38] text-white' : 'hover:bg-gray-100'
          }`}
        >
          {sub}
        </button>
      ))}
    </div>
  );
};

export default SubcategoriesSidebar;
