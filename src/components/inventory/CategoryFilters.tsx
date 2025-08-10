'use client';

interface CategoryFiltersProps {
  selectedCategory: string;
  selectedSubCategory: string;
  categories: string[];
  subCategories: string[];
  onCategoryChange: (category: string) => void;
  onSubCategoryChange: (subCategory: string) => void;
}

export default function CategoryFilters({
  selectedCategory,
  selectedSubCategory,
  categories,
  subCategories,
  onCategoryChange,
  onSubCategoryChange,
}: CategoryFiltersProps) {
  return (
    <div className='flex flex-col sm:flex-row gap-3 mb-6'>
      <div className='flex-1 sm:flex-none'>
        <label className='block text-xs font-medium text-gray-600 mb-1'>Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className='w-full sm:w-64 px-2 py-2 border border-gray-300 rounded-md bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className='flex-1 sm:flex-none'>
        <label className='block text-xs font-medium text-gray-600 mb-1'>Sub-category</label>
        <select
          value={selectedSubCategory}
          onChange={(e) => onSubCategoryChange(e.target.value)}
          className='w-full sm:w-64 px-2 py-2 border border-gray-300 rounded-md bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
        >
          {subCategories.map((sub) => (
            <option key={sub} value={sub}>
              {sub}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
