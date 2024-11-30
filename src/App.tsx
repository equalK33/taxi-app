import React from 'react';
import { IncomeColumn } from './components/IncomeColumn';
import { Summary } from './components/Summary';
import { History } from './components/History';
import { IncomeEntry, IncomeState, DailyHistory } from './types/income';
import { RotateCcw, Save } from 'lucide-react';

function App() {
  const [incomes, setIncomes] = React.useState<IncomeState>({
    visa: [],
    cash: []
  });
  
  const [history, setHistory] = React.useState<DailyHistory[]>([]);

  const addIncome = (type: 'visa' | 'cash', amount: number, description: string) => {
    const newEntry: IncomeEntry = {
      id: Date.now().toString(),
      amount,
      description,
      date: new Date().toLocaleDateString()
    };

    setIncomes(prev => ({
      ...prev,
      [type]: [...prev[type], newEntry]
    }));
  };

  const deleteIncome = (type: 'visa' | 'cash', id: string) => {
    setIncomes(prev => ({
      ...prev,
      [type]: prev[type].filter(entry => entry.id !== id)
    }));
  };

  const resetDaily = () => {
    // Save current data to history
    if (incomes.visa.length > 0 || incomes.cash.length > 0) {
      const visaTotal = incomes.visa.reduce((sum, entry) => sum + entry.amount, 0);
      const cashTotal = incomes.cash.reduce((sum, entry) => sum + entry.amount, 0);
      const totalIncome = visaTotal + cashTotal;
      const netBenefit = totalIncome * 0.42;
      const difference = netBenefit - cashTotal;

      const dailyData: DailyHistory = {
        date: new Date().toLocaleDateString(),
        visa: [...incomes.visa],
        cash: [...incomes.cash],
        visaTotal,
        cashTotal,
        totalIncome,
        netBenefit,
        difference
      };

      setHistory(prev => [dailyData, ...prev]);
    }

    // Reset current data
    setIncomes({
      visa: [],
      cash: []
    });
  };

  const visaTotal = incomes.visa.reduce((sum, entry) => sum + entry.amount, 0);
  const cashTotal = incomes.cash.reduce((sum, entry) => sum + entry.amount, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Control de Ingresos
          </h1>
          <div className="flex gap-4">
            <button
              onClick={resetDaily}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              <Save className="w-4 h-4" />
              Guardar y Resetear
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <IncomeColumn
            title="Ingresos VISA"
            entries={incomes.visa}
            onAdd={(amount, description) => addIncome('visa', amount, description)}
            onDelete={(id) => deleteIncome('visa', id)}
            type="visa"
          />
          <IncomeColumn
            title="Ingresos Efectivo"
            entries={incomes.cash}
            onAdd={(amount, description) => addIncome('cash', amount, description)}
            onDelete={(id) => deleteIncome('cash', id)}
            type="cash"
          />
        </div>

        <Summary visaTotal={visaTotal} cashTotal={cashTotal} />

        {history.length > 0 && <History history={history} />}
      </div>
    </div>
  );
}

export default App;