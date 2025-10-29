import React from 'react';
import { Package } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
            <Package className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Micro Inventory Tracker</h1>
            <p className="text-blue-100 text-sm md:text-base">Pencatat Stok Produk UMKM</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
