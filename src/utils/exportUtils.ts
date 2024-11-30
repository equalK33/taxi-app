import * as XLSX from 'xlsx';
import { DailyHistory } from '../types/income';

export const exportToExcel = (dailyData: DailyHistory) => {
  const workbook = XLSX.utils.book_new();
  
  // Prepare VISA entries
  const visaData = dailyData.visa.map(entry => ({
    Fecha: entry.date,
    Descripción: entry.description,
    Importe: entry.amount,
  }));

  // Prepare Cash entries
  const cashData = dailyData.cash.map(entry => ({
    Fecha: entry.date,
    Descripción: entry.description,
    Importe: entry.amount,
  }));

  // Prepare summary data
  const summaryData = [{
    Concepto: 'Total VISA',
    Importe: dailyData.visaTotal,
  }, {
    Concepto: 'Total Efectivo',
    Importe: dailyData.cashTotal,
  }, {
    Concepto: 'Ingresos Totales',
    Importe: dailyData.totalIncome,
  }, {
    Concepto: 'Beneficio Neto (42%)',
    Importe: dailyData.netBenefit,
  }, {
    Concepto: dailyData.difference >= 0 ? 'A Cobrar' : 'A Pagar',
    Importe: Math.abs(dailyData.difference),
  }];

  // Create worksheets
  const visaSheet = XLSX.utils.json_to_sheet(visaData);
  const cashSheet = XLSX.utils.json_to_sheet(cashData);
  const summarySheet = XLSX.utils.json_to_sheet(summaryData);

  // Add worksheets to workbook
  XLSX.utils.book_append_sheet(workbook, visaSheet, 'Ingresos VISA');
  XLSX.utils.book_append_sheet(workbook, cashSheet, 'Ingresos Efectivo');
  XLSX.utils.book_append_sheet(workbook, summarySheet, 'Resumen');

  // Save the file
  XLSX.writeFile(workbook, `ingresos-${dailyData.date}.xlsx`);
};