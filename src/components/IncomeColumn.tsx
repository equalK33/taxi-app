import React from 'react';
import { IncomeEntry } from '../types/income';
import { CreditCard, Banknote, Trash2 } from 'lucide-react';

interface IncomeColumnProps {
  title: string;
  entries: IncomeEntry[];
  onAdd: (amount: number, description: string) => void;
  onDelete: (id: string) => void;
  type: 'visa' | 'cash';
}

export function IncomeColumn({ title, entries, onAdd, onDelete, type }: IncomeColumnProps) {
  const [amount, setAmount] = React.useState('');
  const [description, setDescription] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount && description) {
      onAdd(Number(amount), description);
      setAmount('');
      setDescription('');
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center gap-2 mb-4">
        {type === 'visa' ? (
          <CreditCard className="w-6 h-6 text-blue-600" />
        ) : (
          <Banknote className="w-6 h-6 text-green-600" />
        )}
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="mb-4 space-y-2">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Importe"
          className="w-full p-2 border rounded"
          step="0.01"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full p-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Añadir
        </button>
      </form>

      <div className="flex flex-col gap-2">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="p-3 bg-white rounded shadow flex justify-between items-center"
          >
            <div>
              <div className="font-bold">{entry.amount.toFixed(2)} €</div>
              <div className="text-sm text-gray-600">{entry.description}</div>
              <div className="text-xs text-gray-400">{entry.date}</div>
            </div>
            <button
              onClick={() => onDelete(entry.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}