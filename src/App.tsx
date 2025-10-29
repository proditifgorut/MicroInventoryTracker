import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import StockAdjustmentModal from './components/StockAdjustmentModal';
import TransactionHistory from './components/TransactionHistory';
import { Product, Transaction } from './types';
import { getProducts, saveProducts, getTransactions, saveTransactions } from './utils/storage';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const [adjustingStock, setAdjustingStock] = useState<Product | undefined>();
  const [activeTab, setActiveTab] = useState<'products' | 'history'>('products');

  useEffect(() => {
    setProducts(getProducts());
    setTransactions(getTransactions());
  }, []);

  const handleAddProduct = (productData: Omit<Product, 'id' | 'createdAt'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    saveProducts(updatedProducts);
  };

  const handleEditProduct = (productData: Omit<Product, 'id' | 'createdAt'>) => {
    if (!editingProduct) return;
    const updatedProducts = products.map(p =>
      p.id === editingProduct.id ? { ...p, ...productData } : p
    );
    setProducts(updatedProducts);
    saveProducts(updatedProducts);
    setEditingProduct(undefined);
  };

  const handleDeleteProduct = (id: string) => {
    const updatedProducts = products.filter(p => p.id !== id);
    setProducts(updatedProducts);
    saveProducts(updatedProducts);
  };

  const handleStockAdjustment = (productId: string, quantity: number, type: 'in' | 'out', note: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const newStock = type === 'in' ? product.stock + quantity : product.stock - quantity;
    
    const updatedProducts = products.map(p =>
      p.id === productId ? { ...p, stock: newStock } : p
    );
    setProducts(updatedProducts);
    saveProducts(updatedProducts);

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      productId,
      productName: product.name,
      type,
      quantity,
      note,
      date: new Date().toISOString(),
    };

    const updatedTransactions = [...transactions, newTransaction];
    setTransactions(updatedTransactions);
    saveTransactions(updatedTransactions);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-6 md:py-8">
        <Dashboard products={products} />

        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('products')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'products'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                }`}
              >
                Daftar Produk
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'history'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                }`}
              >
                Riwayat
              </button>
            </div>

            {activeTab === 'products' && (
              <button
                onClick={() => {
                  setEditingProduct(undefined);
                  setShowProductForm(true);
                }}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-md"
              >
                <Plus className="w-5 h-5" />
                Tambah Produk
              </button>
            )}
          </div>
        </div>

        {activeTab === 'products' ? (
          <ProductList
            products={products}
            onEdit={(product) => {
              setEditingProduct(product);
              setShowProductForm(true);
            }}
            onDelete={handleDeleteProduct}
            onAdjustStock={setAdjustingStock}
          />
        ) : (
          <TransactionHistory transactions={transactions} />
        )}
      </main>

      {showProductForm && (
        <ProductForm
          onClose={() => {
            setShowProductForm(false);
            setEditingProduct(undefined);
          }}
          onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
          editProduct={editingProduct}
        />
      )}

      {adjustingStock && (
        <StockAdjustmentModal
          product={adjustingStock}
          onClose={() => setAdjustingStock(undefined)}
          onSubmit={handleStockAdjustment}
        />
      )}
    </div>
  );
}

export default App;
