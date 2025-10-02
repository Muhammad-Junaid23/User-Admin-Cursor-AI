'use client';

import { useState, useMemo } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format, subDays, isWithinInterval } from 'date-fns';
import { Download, DollarSign, Package, ShoppingCart } from 'lucide-react';

// Dummy products
const PRODUCTS = [
  { name: 'Paracetamol 500mg', category: 'Pharmacy', price: 25 },
  { name: 'Ibuprofen 200mg', category: 'Pharmacy', price: 18 },
  { name: 'Orange Juice 1L', category: 'Grocery', price: 21 },
  { name: 'Rice 5kg', category: 'Grocery', price: 150 },
  { name: 'iPhone 15 Pro', category: 'Electronics', price: 89999 },
  { name: 'Samsung TV 42inch', category: 'Electronics', price: 55999 },
  { name: 'T-Shirt XL', category: 'Clothing', price: 1200 },
  { name: 'Jeans 32', category: 'Clothing', price: 2500 },
];

// Generate dummy sales
const generateSales = (count = 100) => {
  const sales = [];
  for (let i = 0; i < count; i++) {
    const product = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
    const quantity = Math.floor(Math.random() * 10) + 1;
    const daysAgo = Math.floor(Math.random() * 60);
    const date = subDays(new Date(), daysAgo);

    sales.push({
      id: i + 1,
      productName: product.name,
      category: product.category,
      price: product.price,
      quantity,
      subtotal: product.price * quantity,
      date,
    });
  }
  return sales;
};

const SALES_DATA = generateSales(120);

export default function ReportsPage() {
  const [filter, setFilter] = useState('weekly');
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');

  // Filter sales
  const filteredData = useMemo(() => {
    const today = new Date(selectedDate);
    let startDate: Date;
    let endDate: Date;

    if (filter === 'daily') {
      startDate = subDays(today, 1);
      endDate = today;
    } else if (filter === 'weekly') {
      startDate = subDays(today, 6);
      endDate = today;
    } else if (filter === 'monthly') {
      startDate = subDays(today, 29);
      endDate = today;
    } else if (filter === 'custom' && customStart && customEnd) {
      startDate = new Date(customStart);
      endDate = new Date(customEnd);
    } else {
      return [];
    }

    return SALES_DATA.filter((sale) => isWithinInterval(sale.date, { start: startDate, end: endDate }));
  }, [filter, selectedDate, customStart, customEnd]);

  // Summary
  const totalRevenue = filteredData.reduce((acc, item) => acc + item.subtotal, 0);
  const totalProducts = filteredData.reduce((acc, item) => acc + item.quantity, 0);
  const totalTransactions = filteredData.length;

  // PDF export
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('POS Sales Report', 14, 15);
    doc.setFontSize(12);
    doc.text(`Filter: ${filter.toUpperCase()}`, 14, 25);
    doc.text(`Date: ${selectedDate}`, 14, 32);

    doc.text(`Total Revenue: Rs ${totalRevenue.toLocaleString()}`, 14, 42);
    doc.text(`Total Products Sold: ${totalProducts}`, 14, 49);
    doc.text(`Total Transactions: ${totalTransactions}`, 14, 56);

    const tableData = filteredData.map((item) => [
      item.productName,
      item.category,
      item.quantity,
      `Rs ${item.price}`,
      `Rs ${item.subtotal}`,
      format(item.date, 'yyyy-MM-dd'),
    ]);

    autoTable(doc, {
      head: [['Product', 'Category', 'Qty', 'Unit Price', 'Subtotal', 'Date']],
      body: tableData,
      startY: 65,
    });

    doc.save('sales_report.pdf');
  };

  return (
    <div className='p-6 space-y-6'>
      <h1 className='text-2xl font-bold mb-4'>Reports</h1>

      {/* Summary cards */}
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
        <div className='flex items-center gap-3 p-4 rounded-lg shadow bg-white'>
          <div className='p-2 rounded-full bg-green-100 text-green-600'>
            <DollarSign className='w-5 h-5' />
          </div>
          <div>
            <p className='text-xs font-medium text-gray-600'>Total Revenue</p>
            <p className='text-lg font-bold text-gray-900'>Rs {totalRevenue.toLocaleString()}</p>
          </div>
        </div>

        <div className='flex items-center gap-3 p-4 rounded-lg shadow bg-white'>
          <div className='p-2 rounded-full bg-blue-100 text-blue-600'>
            <Package className='w-5 h-5' />
          </div>
          <div>
            <p className='text-xs font-medium text-gray-600'>Products Sold</p>
            <p className='text-lg font-bold text-gray-900'>{totalProducts}</p>
          </div>
        </div>

        <div className='flex items-center gap-3 p-4 rounded-lg shadow bg-white'>
          <div className='p-2 rounded-full bg-purple-100 text-purple-600'>
            <ShoppingCart className='w-5 h-5' />
          </div>
          <div>
            <p className='text-xs font-medium text-gray-600'>Transactions</p>
            <p className='text-lg font-bold text-gray-900'>{totalTransactions}</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className='flex flex-wrap items-end gap-4 p-4 bg-white rounded-lg shadow'>
        <div>
          <label className='block text-xs font-medium text-gray-600 mb-1'>Report Type</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className='w-48 px-2 py-2 border border-gray-300 rounded-md bg-white text-gray-800 shadow-sm focus:ring-2 focus:ring-blue-500'
          >
            <option value='daily'>Daily</option>
            <option value='weekly'>Weekly</option>
            <option value='monthly'>Monthly</option>
            <option value='custom'>Custom Range</option>
          </select>
        </div>

        {filter !== 'custom' && (
          <div>
            <label className='block text-xs font-medium text-gray-600 mb-1'>Select Date</label>
            <input
              type='date'
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className='px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500'
            />
          </div>
        )}

        {filter === 'custom' && (
          <div className='flex gap-2'>
            <div>
              <label className='block text-xs font-medium text-gray-600 mb-1'>Start</label>
              <input
                type='date'
                value={customStart}
                onChange={(e) => setCustomStart(e.target.value)}
                className='px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500'
              />
            </div>
            <div>
              <label className='block text-xs font-medium text-gray-600 mb-1'>End</label>
              <input
                type='date'
                value={customEnd}
                onChange={(e) => setCustomEnd(e.target.value)}
                className='px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500'
              />
            </div>
          </div>
        )}

        <button
          onClick={downloadPDF}
          className='cursor-pointer ml-auto inline-flex items-center gap-2 px-4 py-2 rounded-md border bg-blue-600 text-white shadow hover:bg-blue-700'
        >
          <Download className='w-4 h-4' /> Download PDF
        </button>
      </div>

      {/* Table */}
      <div className='overflow-x-auto bg-white rounded-lg shadow'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider'>Product</th>
              <th className='px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider'>Category</th>
              <th className='px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider'>Quantity</th>
              <th className='px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider'>Unit Price</th>
              <th className='px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider'>Subtotal</th>
              <th className='px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider'>Date</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {filteredData.map((item) => (
              <tr key={item.id} className='hover:bg-gray-50'>
                <td className='px-4 py-3 text-sm text-gray-900 font-medium'>{item.productName}</td>
                <td className='px-4 py-3 text-sm text-gray-700'>{item.category}</td>
                <td className='px-4 py-3 text-sm text-gray-700 text-right'>{item.quantity}</td>
                <td className='px-4 py-3 text-sm text-gray-700 text-right'>Rs {item.price}</td>
                <td className='px-4 py-3 text-sm text-gray-700 text-right'>Rs {item.subtotal}</td>
                <td className='px-4 py-3 text-sm text-gray-700'>{format(item.date, 'yyyy-MM-dd')}</td>
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan={6} className='px-4 py-8 text-center text-sm text-gray-500'>
                  No sales data for this period.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
