import React from 'react';

interface SummaryProps {
  visaTotal: number;
  cashTotal: number;
}

export function Summary({ visaTotal, cashTotal }: SummaryProps) {
  const totalIncome = visaTotal + cashTotal;
  const netBenefit = totalIncome * 0.42;
  const difference = netBenefit - cashTotal;

  return (
    <div className="w-full space-y-4 p-6 bg-white rounded-lg shadow-lg">
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-blue-50 rounded">
          <h3 className="text-sm font-medium text-blue-800">Total VISA</h3>
          <p className="text-2xl font-bold text-blue-600">{visaTotal.toFixed(2)} €</p>
        </div>
        <div className="p-4 bg-green-50 rounded">
          <h3 className="text-sm font-medium text-green-800">Total Efectivo</h3>
          <p className="text-2xl font-bold text-green-600">{cashTotal.toFixed(2)} €</p>
        </div>
      </div>

      <div className="p-4 bg-purple-50 rounded">
        <h3 className="text-sm font-medium text-purple-800">Ingresos Totales</h3>
        <p className="text-2xl font-bold text-purple-600">{totalIncome.toFixed(2)} €</p>
      </div>

      <div className="p-4 bg-indigo-50 rounded">
        <h3 className="text-sm font-medium text-indigo-800">Beneficio Neto (42%)</h3>
        <p className="text-2xl font-bold text-indigo-600">{netBenefit.toFixed(2)} €</p>
      </div>

      <div className={`p-4 rounded ${difference >= 0 ? 'bg-emerald-50' : 'bg-red-50'}`}>
        <h3 className={`text-sm font-medium ${difference >= 0 ? 'text-emerald-800' : 'text-red-800'}`}>
          {difference >= 0 ? 'A Cobrar' : 'A Pagar'}
        </h3>
        <p className={`text-2xl font-bold ${difference >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
          {Math.abs(difference).toFixed(2)} €
        </p>
      </div>
    </div>
  );
}