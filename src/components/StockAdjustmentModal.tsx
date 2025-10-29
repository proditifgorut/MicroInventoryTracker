import React, { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { Product } from '../types';

interface StockAdjustmentModalProps {
  product: Product;
  onClose: () => void;
  onSubmit: (productId: string, quantity: number, type: 'in' | 'out', note: string) => void;
}

const StockAdjustmentModal: React.FC<StockAdjustmentModalProps> = ({ product, onClose, onSubmit }) => {
  const [type, setType] = useState<'in' | 'out'>('in');
  const [quantity, setQuantity] = useState<number>(1);
  const [note, setNote] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(product.id, quantity, type, note);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">Kelola Stok</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Produk</p>
            <p className="font-semibold text-gray-800">{product.name}</p>
            <p className="text-sm text-gray-600 mt-1">Stok Saat Ini: <span className="font-semibold">{product.stock} {product.unit}</span></p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Jenis Transaksi <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setType('in')}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 font-medium transition-colors ${
                  type === 'in'
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
              >
                <Plus className="w-5 h-5" />
                Stok Masuk
              </button>
              <button
                type="button"
                onClick={() => setType('out')}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 font-medium transition-colors ${
                  type === 'out'
                    ? 'border-red-500 bg-red-50 text-red-700'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
              >
                <Minus className="w-5 h-5" />
                Stok Keluar
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jumlah ({product.unit}) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              required
              min="1"
              max={type === 'out' ? product.stock : undefined}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {type === 'out' && quantity > product.stock && (
              <p className="text-red-500 text-sm mt-1">Jumlah melebihi stok yang tersedia</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Catatan
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Tambahkan catatan (opsional)"
            />
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Stok Setelah Transaksi:</p>
            <p className="text-2xl font-bold text-blue-600">
              {type === 'in' ? product.stock + quantity : product.stock - quantity} {product.unit}
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={type === 'out' && quantity > product.stock}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StockAdjustmentModal;
