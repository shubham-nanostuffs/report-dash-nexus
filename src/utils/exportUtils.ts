import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { AnalyticsData } from '@/types/analytics';

export const exportToCSV = (data: AnalyticsData[], filename: string) => {
  const csvContent = [
    // Header row
    Object.keys(data[0] || {}).join(','),
    // Data rows
    ...data.map(row => 
      Object.values(row).map(value => 
        typeof value === 'string' && value.includes(',') 
          ? `"${value}"` 
          : value
      ).join(',')
    )
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const exportToExcel = (data: AnalyticsData[], filename: string) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  
  // Set column widths
  const colWidths = [
    { wch: 8 },   // ID
    { wch: 15 },  // State
    { wch: 15 },  // District
    { wch: 12 },  // AMISP
    { wch: 15 },  // Revenue
    { wch: 10 },  // Users
    { wch: 10 },  // Growth
    { wch: 10 },  // Status
    { wch: 15 },  // Category
    { wch: 12 },  // Date
    { wch: 12 },  // Performance
  ];
  worksheet['!cols'] = colWidths;

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Analytics Data');
  XLSX.writeFile(workbook, `${filename}.xlsx`);
};

export const exportToPDF = (data: AnalyticsData[], title: string, filename: string) => {
  const pdf = new jsPDF();
  
  // Add title
  pdf.setFontSize(16);
  pdf.text(title, 20, 20);
  
  // Add date
  pdf.setFontSize(10);
  pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30);

  // Prepare table data
  const headers = [
    'ID', 'State', 'District', 'AMISP', 'Revenue', 'Users', 
    'Growth%', 'Status', 'Category', 'Date', 'Performance%'
  ];
  
  const tableData = data.map(row => [
    row.id,
    row.state,
    row.district,
    row.amisp,
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(row.revenue),
    row.users.toLocaleString(),
    `${row.growth}%`,
    row.status,
    row.category,
    new Date(row.date).toLocaleDateString(),
    `${row.performance}%`
  ]);

  // Add table
  autoTable(pdf, {
    head: [headers],
    body: tableData,
    startY: 40,
    styles: {
      fontSize: 8,
      cellPadding: 2,
    },
    headStyles: {
      fillColor: [54, 162, 235],
      textColor: 255,
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
    columnStyles: {
      0: { halign: 'center' }, // ID
      4: { halign: 'right' },  // Revenue
      5: { halign: 'right' },  // Users
      6: { halign: 'right' },  // Growth
      10: { halign: 'right' }, // Performance
    },
  });

  pdf.save(`${filename}.pdf`);
};