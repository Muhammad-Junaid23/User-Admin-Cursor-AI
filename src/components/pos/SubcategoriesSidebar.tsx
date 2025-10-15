import React from 'react';
import { Phone } from 'lucide-react';

const SubcategoriesSidebar = ({ subCategories, selectedSubCategory, setSelectedSubCategory }: any) => {
  return (
    <div className='w-1/5 py-4 px-2 space-y-2 mt-1 bg-white shadow-lg'>
      <div className='flex items-center flex-col text-center gap-2 mb-5'>
        <p className='text-xs'>
          POWERED BY <strong>TRUST NEXUS</strong>
        </p>
        <p className='flex items-center gap-2 text-xs'>
          <Phone className='w-4 h-4' /> 0303-8184136
        </p>
      </div>

      <h3 className='text-center font-bold text-lg'>Select Category</h3>

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
