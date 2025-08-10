'use client';

import React from 'react';

export type GenericColumn<T> = {
  header: string;
  accessor: (row: T, index: number) => React.ReactNode;
  className?: string;
  headerClassName?: string;
};

export default function GenericTable<T>({
  data,
  columns,
  emptyMessage = 'No records found.',
}: {
  data: T[];
  columns: Array<GenericColumn<T>>;
  emptyMessage?: string;
}) {
  return (
    <div className='overflow-x-auto bg-white rounded-lg shadow'>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead className='bg-gray-100'>
          <tr>
            {columns.map((col, idx) => (
              <th
                key={idx}
                className={`px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider ${col.headerClassName ?? ''}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-200'>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className='px-4 py-8 text-center text-sm text-gray-500'>
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className='hover:bg-gray-50'>
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className={`px-4 py-3 text-sm text-gray-700 ${col.className ?? ''}`}>
                    {col.accessor(row, rowIndex)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
