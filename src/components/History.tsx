import React from 'react';
import { DailyHistory } from '../types/income';
import { Download } from 'lucide-react';
import { exportToExcel } from '../utils/exportUtils';

interface HistoryProps {
  history: DailyHistory[];
}

export function History({ history }: HistoryProps) {
  return (
    <div className="w-full space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Historial Diario</h2>
      <div className="space-y-4">
        {history.map((day) => (
          <div key={day.date} className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">{day.date}</h3>
              <button
                onClick={() => exportToExcel(day)}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                <Download className="w-4 h-4" />
                Exportar Excel
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="font-medium text-gray-600">Total VISA</h4>
                <p className="text-lg font-bold text-blue-600">{day.visaTotal.toFixed(2)} €</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-600">Total Efectivo</h4>
                <p className="text-lg font-bold text-green-600">{day.cashTotal.toFixed(2)} €</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <h4 className="font-medium text-gray-600">Ingresos Totales</h4>
                <p className="text-lg font-bold text-purple-600">{day.totalIncome.toFixed(2)} €</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-600">Beneficio Neto</h4>
                <p className="text-lg font-bold text-indigo-600">{day.netBenefit.toFixed(2)} €</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-600">{day.difference >= 0 ? 'A Cobrar' : 'A Pagar'}</h4>
                <p className={`text-lg font-bold ${day.difference >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                  {Math.abs(day.difference).toFixed(2)} €
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}