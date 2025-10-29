import React from 'react';
import { ArrowDownCircle, ArrowUpCircle, Calendar } from 'lucide-react';
import { Transaction } from '../types';

interface TransactionHistoryProps {
  transactions: Transaction[];
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
  const sortedTransactions = [...transactions].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 md:p-6 border-b">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Riwayat Transaksi
        </h2>
      </div>

      {sortedTransactions.length === 0 ? (
        <div className="p-12 text-center">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Belum ada riwayat transaksi</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
          {sortedTransactions.map((transaction) => (
            <div key={transaction.id} className="p-4 md:p-6 hover:bg-gray-50">
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${transaction.type === 'in' ? 'bg-green-100' : 'bg-red-100'}`}>
                  {transaction.type === 'in' ? (
                    <ArrowDownCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <ArrowUpCircle className="w-5 h-5 text-red-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-gray-900">{transaction.productName}</p>
                      <p className="text-sm text-gray-500 mt-1">{formatDate(transaction.date)}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${transaction.type === 'in' ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.type === 'in' ? '+' : '-'}{transaction.quantity}
                      </p>
                    </div>
                  </div>
                  {transaction.note && (
                    <p className="text-sm text-gray-600 mt-2 italic">"{transaction.note}"</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
