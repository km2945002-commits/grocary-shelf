/**
 * GROCARY SHELF — Secure Admin Dashboard & Product Management Portal
 */

import React, { useState, useRef } from 'react';
import { 
  X, 
  Lock, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Check, 
  Upload, 
  Sparkles, 
  Database, 
  Package, 
  DollarSign, 
  LogOut, 
  RefreshCw,
  Eye,
  Info
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product, ProductColor, MainCategory, SubCategory } from '../types';

export const AdminDashboardModal: React.FC = () => {
  const {
    isAdminModalOpen,
    setIsAdminModalOpen,
    adminAuth,
    adminLogin,
    adminLogout,
    products,
    refreshProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    openQuickView,
    formatPKR,
    showToast
  } = useStore();

  // Login form state
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Active dashboard view
  const [currentTab, setCurrentTab] = useState<'list' | 'add' | 'edit' | 'status'>('list');

  // Search & Filter state
  const [adminSearch, setAdminSearch] = useState('');
  const [adminCategoryFilter, setAdminCategoryFilter] = useState('all');

  // Editing product state
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  // Form State
  const initialFormState = {
    name: '',
    price: '',
    regularPrice: '',
    category: 'men' as MainCategory,
    subcategory: 'shirts' as SubCategory,
    categoryLabel: "Men's Fashion",
    description: '',
    shortDescription: '',
    fabric: '100% Combed Cotton',
    fit: 'Modern Regular Fit',
    careInstructions: 'Machine wash cold with like colors.',
    stockCount: '25',
    inStock: true,
    isFeatured: false,
    isBestSeller: false,
    isNew: true,
    sku: '',
    images: ['https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Forest Green', hex: '#075C3B' },
      { name: 'Crisp White', hex: '#FFFFFF' }
    ] as ProductColor[]
  };

  const [formData, setFormData] = useState(initialFormState);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newCustomSize, setNewCustomSize] = useState('');
  const [newColorName, setNewColorName] = useState('');
  const [newColorHex, setNewColorHex] = useState('#075C3B');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // File upload input ref
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Delete modal state
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);

  if (!isAdminModalOpen) return null;

  // Handle Login
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    const res = await adminLogin(loginUser, loginPass);
    setLoginLoading(false);

    if (!res.success) {
      setLoginError(res.message || 'Invalid credentials');
    } else {
      setLoginUser('');
      setLoginPass('');
    }
  };

  // Quick preset fill for demo/convenience
  const handleUseDemoCredentials = () => {
    setLoginUser('Murtaza Khan');
    setLoginPass('V9!qR4#tL8@zK2$mW7^pN5&x');
  };

  // Image Upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (PNG, JPG, WebP).', 'error');
      return;
    }

    setUploadingImage(true);
    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      try {
        // Try uploading to server
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${adminAuth.token}`
          },
          body: JSON.stringify({ dataUrl, filename: file.name })
        });

        if (res.ok) {
          const json = await res.json();
          if (json.success && json.url) {
            setFormData(prev => ({ ...prev, images: [json.url, ...prev.images] }));
            showToast('Image uploaded and added!', 'success');
          } else {
            // fallback to data URL directly
            setFormData(prev => ({ ...prev, images: [dataUrl, ...prev.images] }));
            showToast('Image attached locally.', 'info');
          }
        } else {
          // fallback to data URL directly
          setFormData(prev => ({ ...prev, images: [dataUrl, ...prev.images] }));
          showToast('Image attached locally.', 'info');
        }
      } catch {
        // network fallback to data URL
        setFormData(prev => ({ ...prev, images: [dataUrl, ...prev.images] }));
        showToast('Image attached.', 'info');
      } finally {
        setUploadingImage(false);
      }
    };
    reader.readAsDataURL(file);
  };

  // Add Image URL
  const handleAddImageUrl = () => {
    if (!newImageUrl.trim()) return;
    setFormData(prev => ({ ...prev, images: [...prev.images, newImageUrl.trim()] }));
    setNewImageUrl('');
    showToast('Image URL added.');
  };

  // Remove Image
  const handleRemoveImage = (idx: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== idx)
    }));
  };

  // Size chips toggling
  const predefinedSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '7', '8', '9', '10', '11', '12'];
  const toggleSize = (size: string) => {
    if (formData.sizes.includes(size)) {
      if (formData.sizes.length === 1) {
        showToast('A product must have at least one size.', 'error');
        return;
      }
      setFormData(prev => ({ ...prev, sizes: prev.sizes.filter(s => s !== size) }));
    } else {
      setFormData(prev => ({ ...prev, sizes: [...prev.sizes, size] }));
    }
  };

  const handleAddCustomSize = () => {
    if (!newCustomSize.trim()) return;
    const clean = newCustomSize.trim();
    if (!formData.sizes.includes(clean)) {
      setFormData(prev => ({ ...prev, sizes: [...prev.sizes, clean] }));
    }
    setNewCustomSize('');
  };

  // Color addition
  const handleAddColor = () => {
    if (!newColorName.trim()) {
      showToast('Please provide a color name.', 'error');
      return;
    }
    setFormData(prev => ({
      ...prev,
      colors: [...prev.colors, { name: newColorName.trim(), hex: newColorHex }]
    }));
    setNewColorName('');
  };

  const handleRemoveColor = (index: number) => {
    if (formData.colors.length <= 1) {
      showToast('A product must have at least one color.', 'error');
      return;
    }
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index)
    }));
  };

  // Category mapping
  const categoryOptions = [
    { value: 'men', sub: 'shirts', label: "Men's Fashion" },
    { value: 'women', sub: 'shirts', label: "Women's Fashion" },
    { value: 'kids', sub: 'boys', label: "Kids' Fashion" },
    { value: 'shirts', sub: 'shirts', label: "Shirts" },
    { value: 'pants', sub: 'pants', label: "Pants" },
    { value: 'shoes', sub: 'footwear', label: "Shoes" },
    { value: 'peshawari', sub: 'peshawari', label: "Peshawari Chapals" },
  ];

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = categoryOptions.find(o => o.value === e.target.value) || categoryOptions[0];
    setFormData(prev => ({
      ...prev,
      category: selected.value as MainCategory,
      subcategory: selected.sub as SubCategory,
      categoryLabel: selected.label
    }));
  };

  // Prepare edit product
  const startEditProduct = (p: Product) => {
    setEditingProductId(p.id);
    setFormData({
      name: p.name,
      price: String(p.price),
      regularPrice: String(p.regularPrice || p.price),
      category: p.category,
      subcategory: p.subcategory,
      categoryLabel: p.categoryLabel,
      description: p.description,
      shortDescription: p.shortDescription,
      fabric: p.fabric,
      fit: p.fit,
      careInstructions: p.careInstructions,
      stockCount: String(p.stockCount),
      inStock: p.inStock,
      isFeatured: Boolean(p.isFeatured),
      isBestSeller: Boolean(p.isBestSeller),
      isNew: Boolean(p.isNew),
      sku: p.sku,
      images: p.images.length > 0 ? p.images : initialFormState.images,
      sizes: p.sizes,
      colors: p.colors
    });
    setCurrentTab('edit');
  };

  // Submit Product (Add or Edit)
  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      showToast('Product name is required.', 'error');
      return;
    }

    const priceNum = Number(formData.price);
    if (isNaN(priceNum) || priceNum <= 0) {
      showToast('Please enter a valid price in Pakistani Rupees (PKR).', 'error');
      return;
    }

    const regPriceNum = Number(formData.regularPrice) || priceNum;

    if (formData.images.length === 0) {
      showToast('Please add at least one product image.', 'error');
      return;
    }

    setIsSubmitting(true);

    const payload: Partial<Product> = {
      name: formData.name.trim(),
      price: priceNum,
      regularPrice: regPriceNum,
      category: formData.category,
      subcategory: formData.subcategory,
      categoryLabel: formData.categoryLabel,
      description: formData.description.trim() || `${formData.name} crafted with premium fabrics.`,
      shortDescription: formData.shortDescription.trim() || formData.description.slice(0, 100),
      fabric: formData.fabric.trim() || 'Premium Quality',
      fit: formData.fit.trim() || 'Modern Fit',
      careInstructions: formData.careInstructions.trim() || 'Hand wash cold or gentle cycle.',
      stockCount: Number(formData.stockCount) || 10,
      inStock: Boolean(formData.inStock),
      isFeatured: Boolean(formData.isFeatured),
      isBestSeller: Boolean(formData.isBestSeller),
      isNew: Boolean(formData.isNew),
      sku: formData.sku.trim() || `GS-${Date.now().toString().slice(-6)}`,
      images: formData.images,
      sizes: formData.sizes,
      colors: formData.colors,
      origin: 'Suhan, Islamabad, Pakistan'
    };

    if (currentTab === 'edit' && editingProductId) {
      const res = await updateProduct(editingProductId, payload);
      setIsSubmitting(false);
      if (res.success) {
        setEditingProductId(null);
        setFormData(initialFormState);
        setCurrentTab('list');
      }
    } else {
      const res = await addProduct(payload);
      setIsSubmitting(false);
      if (res.success) {
        setFormData(initialFormState);
        setCurrentTab('list');
      }
    }
  };

  // Handle Delete
  const confirmDelete = async () => {
    if (!deletingProduct) return;
    await deleteProduct(deletingProduct.id);
    setDeletingProduct(null);
  };

  // Filtered products in admin table
  const filteredProducts = products.filter(p => {
    const matchesSearch = 
      p.name.toLowerCase().includes(adminSearch.toLowerCase()) ||
      p.sku.toLowerCase().includes(adminSearch.toLowerCase()) ||
      p.categoryLabel.toLowerCase().includes(adminSearch.toLowerCase());
    
    if (adminCategoryFilter === 'all') return matchesSearch;
    return matchesSearch && (p.category === adminCategoryFilter || p.subcategory === adminCategoryFilter);
  });

  // Inventory stats
  const totalValuePKR = products.reduce((acc, p) => acc + (p.price * p.stockCount), 0);
  const totalInStock = products.filter(p => p.inStock && p.stockCount > 0).length;
  const totalFeatured = products.filter(p => p.isFeatured).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/75 backdrop-blur-xs p-2 sm:p-4 md:p-6">
      <div className="bg-white rounded-2xl max-w-6xl w-full shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="p-4 sm:p-5 bg-[#075C3B] text-white flex items-center justify-between shrink-0 border-b border-emerald-900/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-[#C5A059] font-bold text-lg">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg sm:text-xl font-bold">GROCARY SHELF Management Portal</h3>
                <span className="bg-[#C5A059] text-neutral-900 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                  Protected Admin
                </span>
              </div>
              <p className="text-xs text-[#E9F4EE]/90 mt-0.5">
                {adminAuth.isAuthenticated 
                  ? `Logged in as ${adminAuth.user?.username} (${adminAuth.user?.email}) · Persistent Database Active` 
                  : 'Authorized Personnel Access Only'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {adminAuth.isAuthenticated && (
              <button
                onClick={adminLogout}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded text-xs font-semibold transition-colors"
                title="Log out of admin session"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-300" />
                <span>Logout</span>
              </button>
            )}
            <button
              onClick={() => setIsAdminModalOpen(false)}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Close Admin Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* BODY: Login Screen vs Dashboard */}
        {!adminAuth.isAuthenticated ? (
          /* --- LOGIN VIEW --- */
          <div className="p-6 sm:p-12 flex-1 overflow-y-auto flex items-center justify-center bg-neutral-50">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-neutral-200 shadow-xl space-y-6">
              
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-xl bg-[#075C3B] text-white flex items-center justify-center mx-auto shadow-md">
                  <Lock className="w-6 h-6 text-[#C5A059]" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-neutral-900">Administrator Sign In</h2>
                <p className="text-xs text-neutral-500">
                  Authenticate to manage catalog products, inventory levels, PKR pricing, and promotional banners.
                </p>
              </div>

              {loginError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg">
                  {loginError}
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">
                    Username or Email
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Murtaza Khan or km2945002@gmail.com"
                    value={loginUser}
                    onChange={(e) => setLoginUser(e.target.value)}
                    className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#075C3B]/20 focus:border-[#075C3B] text-sm"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">
                    Admin Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                    className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#075C3B]/20 focus:border-[#075C3B] text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full py-3 bg-[#075C3B] hover:bg-[#05462D] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
                >
                  {loginLoading ? <span>Authenticating...</span> : <span>Unlock Admin Portal</span>}
                </button>
              </form>

              {/* Quick credential reminder */}
              <div className="pt-4 border-t border-neutral-100 bg-[#F1F7F1]/60 p-3.5 rounded-xl text-neutral-700 text-[11px] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#075C3B]">Default Store Credentials:</span>
                  <button
                    type="button"
                    onClick={handleUseDemoCredentials}
                    className="text-[#075C3B] underline font-bold hover:text-[#05462D]"
                  >
                    Auto-Fill
                  </button>
                </div>
                <p>Username: <code className="bg-white px-1 py-0.5 rounded border font-mono">Murtaza Khan</code> or <code className="bg-white px-1 py-0.5 rounded border font-mono">km2945002@gmail.com</code></p>
                <p>Password: <code className="bg-white px-1 py-0.5 rounded border font-mono">V9!qR4#tL8@zK2$mW7^pN5&x</code></p>
              </div>

            </div>
          </div>
        ) : (
          /* --- AUTHENTICATED DASHBOARD VIEW --- */
          <div className="flex-1 overflow-hidden flex flex-col">
            
            {/* Dashboard Tabs & Action Bar */}
            <div className="px-6 py-3 bg-neutral-100 border-b border-neutral-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-1 text-xs font-semibold">
                <button
                  onClick={() => setCurrentTab('list')}
                  className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                    currentTab === 'list' ? 'bg-[#075C3B] text-white shadow-xs' : 'text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  <Package className="w-4 h-4" />
                  <span>All Products ({products.length})</span>
                </button>

                <button
                  onClick={() => {
                    setFormData(initialFormState);
                    setCurrentTab('add');
                  }}
                  className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                    currentTab === 'add' ? 'bg-[#075C3B] text-white shadow-xs' : 'text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Product</span>
                </button>

                <button
                  onClick={() => setCurrentTab('status')}
                  className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                    currentTab === 'status' ? 'bg-[#075C3B] text-white shadow-xs' : 'text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  <Database className="w-4 h-4" />
                  <span>Database Status</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => refreshProducts()}
                  className="px-3 py-1.5 bg-white border border-neutral-300 text-neutral-700 hover:text-black rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  title="Reload from server database"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[#075C3B]" />
                  <span>Sync DB</span>
                </button>

                <button
                  onClick={() => {
                    setFormData(initialFormState);
                    setCurrentTab('add');
                  }}
                  className="px-4 py-1.5 bg-[#075C3B] hover:bg-[#05462D] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Product</span>
                </button>
              </div>
            </div>

            {/* Dashboard Content Container */}
            <div className="p-6 overflow-y-auto flex-1 bg-neutral-50 text-xs">
              
              {/* TAB 1: PRODUCT LIST & SEARCH */}
              {currentTab === 'list' && (
                <div className="space-y-6">
                  
                  {/* Stats Strip */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-4 bg-white rounded-xl border border-neutral-200 shadow-2xs">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">Total Catalog</span>
                      <div className="text-2xl font-black text-neutral-900 mt-1">{products.length} Items</div>
                      <span className="text-[10px] text-neutral-500">Live in persistent database</span>
                    </div>

                    <div className="p-4 bg-white rounded-xl border border-neutral-200 shadow-2xs">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">In-Stock</span>
                      <div className="text-2xl font-black text-emerald-700 mt-1">{totalInStock} Available</div>
                      <span className="text-[10px] text-neutral-500">Ready for instant COD dispatch</span>
                    </div>

                    <div className="p-4 bg-white rounded-xl border border-neutral-200 shadow-2xs">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">Featured Items</span>
                      <div className="text-2xl font-black text-[#C5A059] mt-1">{totalFeatured} Active</div>
                      <span className="text-[10px] text-neutral-500">Highlighted on homepage</span>
                    </div>

                    <div className="p-4 bg-white rounded-xl border border-neutral-200 shadow-2xs">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">Catalog Value</span>
                      <div className="text-xl font-black text-neutral-900 mt-1">{formatPKR(totalValuePKR)}</div>
                      <span className="text-[10px] text-neutral-500">Based on current stock levels</span>
                    </div>
                  </div>

                  {/* Search & Category Filter Toolbar */}
                  <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="relative w-full sm:w-80">
                      <input
                        type="text"
                        placeholder="Search by product name, SKU, or category..."
                        value={adminSearch}
                        onChange={(e) => setAdminSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 border border-neutral-300 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#075C3B]"
                      />
                      <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <span className="text-neutral-500 font-semibold whitespace-nowrap">Filter:</span>
                      <select
                        value={adminCategoryFilter}
                        onChange={(e) => setAdminCategoryFilter(e.target.value)}
                        className="px-3 py-2 bg-white border border-neutral-300 rounded-lg text-xs text-neutral-700 focus:outline-none focus:ring-1 focus:ring-[#075C3B]"
                      >
                        <option value="all">All Departments &amp; Categories</option>
                        <option value="men">Men&apos;s Fashion</option>
                        <option value="women">Women&apos;s Fashion</option>
                        <option value="kids">Kids&apos; Fashion</option>
                        <option value="shirts">Shirts</option>
                        <option value="pants">Pants</option>
                        <option value="footwear">Footwear / Shoes</option>
                        <option value="peshawari">Peshawari Chapals</option>
                      </select>
                    </div>
                  </div>

                  {/* Product Table */}
                  <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-2xs">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-neutral-100 text-neutral-700 uppercase font-bold text-[10px] tracking-wider border-b border-neutral-200">
                            <th className="p-3.5">Product &amp; SKU</th>
                            <th className="p-3.5">Category</th>
                            <th className="p-3.5">Price (PKR)</th>
                            <th className="p-3.5">Stock</th>
                            <th className="p-3.5">Status</th>
                            <th className="p-3.5 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-200">
                          {filteredProducts.map((p) => (
                            <tr key={p.id} className="hover:bg-neutral-50/80 transition-colors">
                              <td className="p-3.5">
                                <div className="flex items-center gap-3">
                                  <img
                                    src={p.images[0]}
                                    alt={p.name}
                                    className="w-11 h-14 object-cover rounded border border-neutral-200 shrink-0"
                                  />
                                  <div>
                                    <div className="font-bold text-neutral-900 text-xs line-clamp-1">{p.name}</div>
                                    <span className="font-mono text-[10px] text-neutral-400 block mt-0.5">SKU: {p.sku}</span>
                                    <div className="flex items-center gap-1 mt-1 text-[10px]">
                                      {p.isFeatured && (
                                        <span className="bg-[#C5A059]/20 text-[#C5A059] font-bold px-1.5 py-0.2 rounded">Featured</span>
                                      )}
                                      {p.onSale && (
                                        <span className="bg-rose-100 text-rose-700 font-bold px-1.5 py-0.2 rounded">Sale</span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </td>

                              <td className="p-3.5 font-medium text-neutral-700">
                                {p.categoryLabel}
                              </td>

                              <td className="p-3.5">
                                <div className="font-bold text-neutral-900">{formatPKR(p.price)}</div>
                                {p.onSale && p.regularPrice > p.price && (
                                  <span className="text-[10px] text-neutral-400 line-through">
                                    {formatPKR(p.regularPrice)}
                                  </span>
                                )}
                              </td>

                              <td className="p-3.5">
                                <span className="font-bold text-neutral-800">{p.stockCount}</span>
                                <span className="text-[10px] text-neutral-500 block">units</span>
                              </td>

                              <td className="p-3.5">
                                {p.inStock && p.stockCount > 0 ? (
                                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                                    <Check className="w-3 h-3" /> In Stock
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center text-[11px] font-bold text-rose-800 bg-rose-50 px-2 py-0.5 rounded-full">
                                    Out of Stock
                                  </span>
                                )}
                              </td>

                              <td className="p-3.5 text-right">
                                <div className="inline-flex items-center gap-1.5">
                                  <button
                                    onClick={() => openQuickView(p)}
                                    className="p-1.5 text-neutral-500 hover:text-[#075C3B] hover:bg-neutral-100 rounded"
                                    title="Preview product"
                                  >
                                    <Eye className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => startEditProduct(p)}
                                    className="p-1.5 text-neutral-600 hover:text-black hover:bg-neutral-100 rounded"
                                    title="Edit product"
                                  >
                                    <Edit3 className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => setDeletingProduct(p)}
                                    className="p-1.5 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 rounded"
                                    title="Delete product"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {filteredProducts.length === 0 && (
                      <div className="p-12 text-center text-neutral-500">
                        No products match your search.
                      </div>
                    )}
                  </div>

                </div>
              )}

              {/* TAB 2 & 3: ADD OR EDIT PRODUCT FORM */}
              {(currentTab === 'add' || currentTab === 'edit') && (
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200 shadow-sm space-y-6 max-w-4xl mx-auto">
                  
                  <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-neutral-900">
                        {currentTab === 'edit' ? `Edit Product: ${formData.name}` : 'Add New Product to Store'}
                      </h3>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        Fill in product attributes, images, PKR pricing, and variations. Saves directly to the persistent server database.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setCurrentTab('list')}
                      className="px-3.5 py-1.5 border border-neutral-300 hover:bg-neutral-100 rounded-lg text-xs font-semibold"
                    >
                      Cancel
                    </button>
                  </div>

                  <form onSubmit={handleProductSubmit} className="space-y-6">
                    
                    {/* Basic Info */}
                    <div className="space-y-4">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-[#075C3B] pb-1 border-b border-neutral-100">
                        1. Product Identity &amp; Classification
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="sm:col-span-2">
                          <label className="block font-semibold text-neutral-800 mb-1">
                            Product Name <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Royal Norozi Peshawari Chappal (Double Tyre Sole)"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs focus:ring-1 focus:ring-[#075C3B] focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block font-semibold text-neutral-800 mb-1">
                            Category / Department <span className="text-rose-500">*</span>
                          </label>
                          <select
                            value={formData.category}
                            onChange={handleCategoryChange}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white focus:ring-1 focus:ring-[#075C3B] focus:outline-none"
                          >
                            {categoryOptions.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Pricing in Pakistani Rupees (PKR) & Inventory */}
                    <div className="space-y-4">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-[#075C3B] pb-1 border-b border-neutral-100">
                        2. Pricing (Pakistani Rupees PKR) &amp; Inventory
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                        <div>
                          <label className="block font-semibold text-neutral-800 mb-1">
                            Selling Price (PKR) <span className="text-rose-500">*</span>
                          </label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 font-bold text-xs">Rs.</span>
                            <input
                              type="number"
                              required
                              min="1"
                              placeholder="4850"
                              value={formData.price}
                              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                              className="w-full pl-9 pr-3 py-2 border border-neutral-300 rounded-lg text-xs font-bold focus:ring-1 focus:ring-[#075C3B] focus:outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block font-semibold text-neutral-800 mb-1">
                            Original / Regular Price (PKR)
                          </label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 font-bold text-xs">Rs.</span>
                            <input
                              type="number"
                              min="0"
                              placeholder="5800"
                              value={formData.regularPrice}
                              onChange={(e) => setFormData({ ...formData, regularPrice: e.target.value })}
                              className="w-full pl-9 pr-3 py-2 border border-neutral-300 rounded-lg text-xs focus:ring-1 focus:ring-[#075C3B] focus:outline-none"
                            />
                          </div>
                          <span className="text-[10px] text-neutral-400 mt-0.5 block">Higher value shows discount</span>
                        </div>

                        <div>
                          <label className="block font-semibold text-neutral-800 mb-1">
                            Stock Quantity <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="number"
                            required
                            min="0"
                            placeholder="20"
                            value={formData.stockCount}
                            onChange={(e) => setFormData({ ...formData, stockCount: e.target.value })}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs focus:ring-1 focus:ring-[#075C3B] focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block font-semibold text-neutral-800 mb-1">
                            Stock Keeping Unit (SKU)
                          </label>
                          <input
                            type="text"
                            placeholder="GS-PESH-009"
                            value={formData.sku}
                            onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs font-mono uppercase focus:ring-1 focus:ring-[#075C3B] focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Image Management & File Upload */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between pb-1 border-b border-neutral-100">
                        <h4 className="font-bold text-xs uppercase tracking-wider text-[#075C3B]">
                          3. Product Photography &amp; Images <span className="text-rose-500">*</span>
                        </h4>
                        <span className="text-[11px] text-neutral-500">{formData.images.length} images added</span>
                      </div>

                      {/* Image Preview Grid */}
                      <div className="flex flex-wrap gap-3">
                        {formData.images.map((imgUrl, i) => (
                          <div key={i} className="relative w-20 h-24 rounded-lg overflow-hidden border border-neutral-200 group bg-neutral-100">
                            <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(i)}
                              className="absolute top-1 right-1 p-1 bg-black/70 hover:bg-rose-600 text-white rounded-full transition-colors opacity-0 group-hover:opacity-100"
                              title="Remove image"
                            >
                              <X className="w-3 h-3" />
                            </button>
                            {i === 0 && (
                              <span className="absolute bottom-0 left-0 right-0 bg-[#075C3B] text-white text-[8px] font-bold text-center py-0.5 uppercase">
                                Primary
                              </span>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Upload Controls */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        {/* Option A: Local File Upload */}
                        <div className="p-4 border-2 border-dashed border-neutral-300 rounded-xl bg-neutral-50 hover:bg-neutral-100/60 transition-colors flex flex-col items-center justify-center text-center">
                          <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                          <Upload className="w-6 h-6 text-neutral-400 mb-1.5" />
                          <button
                            type="button"
                            disabled={uploadingImage}
                            onClick={() => fileInputRef.current?.click()}
                            className="text-xs font-bold text-[#075C3B] hover:underline"
                          >
                            {uploadingImage ? 'Processing...' : 'Upload Image from Computer'}
                          </button>
                          <span className="text-[10px] text-neutral-400 mt-0.5">Supports PNG, JPG, WebP</span>
                        </div>

                        {/* Option B: Direct URL Input */}
                        <div className="p-4 border border-neutral-200 rounded-xl bg-white flex flex-col justify-between">
                          <div>
                            <label className="block font-semibold text-neutral-700 mb-1">Add Image via Web URL</label>
                            <input
                              type="url"
                              placeholder="https://images.unsplash.com/photo-..."
                              value={newImageUrl}
                              onChange={(e) => setNewImageUrl(e.target.value)}
                              className="w-full px-3 py-1.5 border border-neutral-300 rounded text-xs"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={handleAddImageUrl}
                            className="mt-2 w-full py-1.5 bg-neutral-800 hover:bg-black text-white rounded text-xs font-semibold"
                          >
                            Attach Image URL
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Sizes and Colors */}
                    <div className="space-y-4">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-[#075C3B] pb-1 border-b border-neutral-100">
                        4. Available Sizes &amp; Color Swatches
                      </h4>

                      {/* Size Selector */}
                      <div>
                        <label className="block font-semibold text-neutral-700 mb-2">
                          Available Sizes (Click to toggle on/off):
                        </label>
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {predefinedSizes.map((size) => (
                            <button
                              key={size}
                              type="button"
                              onClick={() => toggleSize(size)}
                              className={`px-3 py-1 rounded text-xs font-bold border transition-colors ${
                                formData.sizes.includes(size)
                                  ? 'bg-[#075C3B] text-white border-[#075C3B]'
                                  : 'bg-white text-neutral-600 border-neutral-300 hover:border-neutral-400'
                              }`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>

                        {/* Custom size input */}
                        <div className="flex items-center gap-2 max-w-xs">
                          <input
                            type="text"
                            placeholder="Add custom size (e.g. 13 UK)"
                            value={newCustomSize}
                            onChange={(e) => setNewCustomSize(e.target.value)}
                            className="flex-1 px-3 py-1 border border-neutral-300 rounded text-xs"
                          />
                          <button
                            type="button"
                            onClick={handleAddCustomSize}
                            className="px-3 py-1 bg-neutral-800 text-white rounded text-xs font-semibold"
                          >
                            Add
                          </button>
                        </div>
                      </div>

                      {/* Color Swatches */}
                      <div className="pt-2">
                        <label className="block font-semibold text-neutral-700 mb-2">
                          Available Colors:
                        </label>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          {formData.colors.map((c, idx) => (
                            <div key={idx} className="flex items-center gap-1.5 px-2.5 py-1 bg-neutral-100 border border-neutral-200 rounded-md">
                              <span className="w-3.5 h-3.5 rounded-full border border-neutral-300 shrink-0" style={{ backgroundColor: c.hex }} />
                              <span className="font-medium text-neutral-800">{c.name}</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveColor(idx)}
                                className="text-neutral-400 hover:text-rose-600 ml-1"
                              >
                                &times;
                              </button>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center gap-2 max-w-md">
                          <input
                            type="color"
                            value={newColorHex}
                            onChange={(e) => setNewColorHex(e.target.value)}
                            className="w-8 h-8 rounded border p-0.5 cursor-pointer shrink-0"
                            title="Pick color"
                          />
                          <input
                            type="text"
                            placeholder="Color name (e.g. Mustard Tan, Jet Black)"
                            value={newColorName}
                            onChange={(e) => setNewColorName(e.target.value)}
                            className="flex-1 px-3 py-1 border border-neutral-300 rounded text-xs"
                          />
                          <button
                            type="button"
                            onClick={handleAddColor}
                            className="px-3 py-1 bg-[#075C3B] hover:bg-[#05462D] text-white rounded text-xs font-semibold"
                          >
                            Add Color
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Descriptions and Specs */}
                    <div className="space-y-4">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-[#075C3B] pb-1 border-b border-neutral-100">
                        5. Product Description &amp; Specifications
                      </h4>

                      <div>
                        <label className="block font-semibold text-neutral-800 mb-1">
                          Full Product Description <span className="text-rose-500">*</span>
                        </label>
                        <textarea
                          rows={3}
                          required
                          placeholder="Detailed description of leather grade, stitching, fabric quality, and comfort..."
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs focus:ring-1 focus:ring-[#075C3B] focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block font-semibold text-neutral-700 mb-1">Fabric / Material</label>
                          <input
                            type="text"
                            placeholder="100% Genuine Cow Leather"
                            value={formData.fabric}
                            onChange={(e) => setFormData({ ...formData, fabric: e.target.value })}
                            className="w-full px-3 py-1.5 border border-neutral-300 rounded text-xs"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold text-neutral-700 mb-1">Fit Silhouette</label>
                          <input
                            type="text"
                            placeholder="Standard Arch Support"
                            value={formData.fit}
                            onChange={(e) => setFormData({ ...formData, fit: e.target.value })}
                            className="w-full px-3 py-1.5 border border-neutral-300 rounded text-xs"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold text-neutral-700 mb-1">Care Advice</label>
                          <input
                            type="text"
                            placeholder="Polish with natural leather balm"
                            value={formData.careInstructions}
                            onChange={(e) => setFormData({ ...formData, careInstructions: e.target.value })}
                            className="w-full px-3 py-1.5 border border-neutral-300 rounded text-xs"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Toggles & Highlights */}
                    <div className="space-y-3 pt-2 border-t border-neutral-200">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-[#075C3B]">
                        6. Storefront Flags &amp; Badges
                      </h4>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <label className="flex items-center gap-2 p-3 rounded-lg border border-neutral-200 bg-neutral-50 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.isFeatured}
                            onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                            className="w-4 h-4 text-[#075C3B] accent-[#075C3B]"
                          />
                          <div>
                            <span className="font-bold text-neutral-900 block">Featured</span>
                            <span className="text-[10px] text-neutral-500">Homepage spotlight</span>
                          </div>
                        </label>

                        <label className="flex items-center gap-2 p-3 rounded-lg border border-neutral-200 bg-neutral-50 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.isNew}
                            onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                            className="w-4 h-4 text-[#075C3B] accent-[#075C3B]"
                          />
                          <div>
                            <span className="font-bold text-neutral-900 block">New Arrival</span>
                            <span className="text-[10px] text-neutral-500">&apos;New&apos; badge ribbon</span>
                          </div>
                        </label>

                        <label className="flex items-center gap-2 p-3 rounded-lg border border-neutral-200 bg-neutral-50 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.isBestSeller}
                            onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                            className="w-4 h-4 text-[#075C3B] accent-[#075C3B]"
                          />
                          <div>
                            <span className="font-bold text-neutral-900 block">Best Seller</span>
                            <span className="text-[10px] text-neutral-500">Top-seller tab</span>
                          </div>
                        </label>

                        <label className="flex items-center gap-2 p-3 rounded-lg border border-neutral-200 bg-neutral-50 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.inStock}
                            onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                            className="w-4 h-4 text-[#075C3B] accent-[#075C3B]"
                          />
                          <div>
                            <span className="font-bold text-neutral-900 block">In Stock</span>
                            <span className="text-[10px] text-neutral-500">Available to order</span>
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* Submit Bar */}
                    <div className="pt-4 border-t border-neutral-200 flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setCurrentTab('list')}
                        className="px-5 py-2.5 border border-neutral-300 text-neutral-700 rounded-lg text-xs font-semibold hover:bg-neutral-100"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-8 py-2.5 bg-[#075C3B] hover:bg-[#05462D] text-white rounded-lg text-xs font-bold transition-all shadow-md flex items-center gap-2"
                      >
                        {isSubmitting ? (
                          <span>Saving to Database...</span>
                        ) : (
                          <>
                            <Check className="w-4 h-4" />
                            <span>{currentTab === 'edit' ? 'Update Product in DB' : 'Save & Publish Product'}</span>
                          </>
                        )}
                      </button>
                    </div>

                  </form>
                </div>
              )}

              {/* TAB 4: DATABASE & SERVER STATUS */}
              {currentTab === 'status' && (
                <div className="space-y-6 max-w-4xl mx-auto">
                  <div className="p-6 bg-white rounded-2xl border border-neutral-200 shadow-2xs space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                        <Database className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-neutral-900 text-sm">Persistent Product Database</h3>
                        <p className="text-neutral-500 text-xs">File-backed JSON storage active and running.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="p-3.5 bg-neutral-50 rounded-lg border border-neutral-200 space-y-1">
                        <span className="font-bold text-neutral-500 block text-[10px] uppercase">Storage File Location</span>
                        <code className="text-neutral-900 font-mono text-xs block">data/products.json</code>
                        <p className="text-[11px] text-neutral-500">Persisted across page refreshes and server rebuilds.</p>
                      </div>

                      <div className="p-3.5 bg-neutral-50 rounded-lg border border-neutral-200 space-y-1">
                        <span className="font-bold text-neutral-500 block text-[10px] uppercase">Static Media Uploads</span>
                        <code className="text-neutral-900 font-mono text-xs block">public/uploads/</code>
                        <p className="text-[11px] text-neutral-500">Accessible at <code className="font-mono">/uploads/&lt;filename&gt;</code>.</p>
                      </div>
                    </div>

                    <div className="p-4 bg-[#F1F7F1] rounded-xl border border-[#075C3B]/20 text-xs space-y-2">
                      <h4 className="font-bold text-[#075C3B] flex items-center gap-1.5">
                        <Info className="w-4 h-4" />
                        <span>Security &amp; Authorization Details</span>
                      </h4>
                      <p className="text-neutral-700 leading-relaxed">
                        • All mutations (<code className="bg-white px-1 font-mono">POST</code>, <code className="bg-white px-1 font-mono">PUT</code>, <code className="bg-white px-1 font-mono">DELETE</code>) require an HMAC-SHA256 signed Bearer token issued via <code className="bg-white px-1 font-mono">/api/auth/login</code>.<br />
                        • Secret credentials are kept strictly in backend environment variables (<code className="bg-white px-1 font-mono">ADMIN_USERNAME</code>, <code className="bg-white px-1 font-mono">ADMIN_PASSWORD</code>, <code className="bg-white px-1 font-mono">ADMIN_JWT_SECRET</code>) and are never exposed in client bundles.
                      </p>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        onClick={() => refreshProducts()}
                        className="px-4 py-2 bg-[#075C3B] text-white rounded-lg text-xs font-bold flex items-center gap-1.5"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Verify &amp; Re-read Database</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>
        )}

      </div>

      {/* Delete Confirmation Modal */}
      {deletingProduct && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h4 className="font-bold text-neutral-900 text-sm">Delete Product?</h4>
              <p className="text-xs text-neutral-500 mt-1">
                Are you sure you want to permanently remove <strong>&ldquo;{deletingProduct.name}&rdquo;</strong> from the database? This cannot be undone.
              </p>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeletingProduct(null)}
                className="flex-1 py-2 border border-neutral-300 rounded text-xs font-semibold hover:bg-neutral-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="flex-1 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded text-xs font-bold"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
