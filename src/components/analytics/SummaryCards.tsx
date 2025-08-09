'use client';

export function SummaryCards() {
  const data = [
    { title: 'Total Sales', value: 'Rs 28,785', icon: '💰' },
    { title: 'Total Orders', value: '26', icon: '📦' },
    { title: 'Sales (Last 30 Days)', value: 'Rs 23,165', icon: '📈' },
    { title: 'Total Products Sold', value: '105', icon: '🛒' },
  ];

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 my-6'>
      {data.map((card, i) => (
        <div
          key={i}
          className='bg-white border border-gray-200 text-gray-900 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200'
        >
          <div className='text-4xl mb-3'>{card.icon}</div>
          <h3 className='text-base font-medium text-gray-600 mb-1'>{card.title}</h3>
          <p className='text-2xl font-bold text-gray-800'>{card.value}</p>
        </div>
      ))}
    </div>
  );
}
