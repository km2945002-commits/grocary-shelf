/**
 * GROCARY SHELF — Full-Stack Express Server with Persistent Database & Vite Integration
 */

import express, { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { PRODUCTS } from './src/data/products.ts';
import { Product } from './src/types/index.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Body parsers with generous limits for image data URLs
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Directories
const DATA_DIR = path.resolve(__dirname, 'data');
const PRODUCTS_FILE = path.resolve(DATA_DIR, 'products.json');
const UPLOADS_DIR = path.resolve(__dirname, 'public/uploads');

// Ensure directories exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Serve uploaded files statically
app.use('/uploads', express.static(UPLOADS_DIR));

// Seed or load persistent products
function initializeProducts(): Product[] {
  try {
    if (fs.existsSync(PRODUCTS_FILE)) {
      const data = fs.readFileSync(PRODUCTS_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (error) {
    console.error('Error reading products.json, falling back to seed:', error);
  }

  // Seed with the initial curated catalog
  try {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(PRODUCTS, null, 2), 'utf-8');
    console.log(`Seeded ${PRODUCTS.length} products to ${PRODUCTS_FILE}`);
  } catch (err) {
    console.error('Failed to write seed products:', err);
  }
  return PRODUCTS;
}

// Load products from disk
function getProducts(): Product[] {
  try {
    if (fs.existsSync(PRODUCTS_FILE)) {
      const data = fs.readFileSync(PRODUCTS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Failed to read products:', err);
  }
  return initializeProducts();
}

// Save products to disk
function saveProducts(products: Product[]): boolean {
  try {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Failed to save products:', err);
    return false;
  }
}

// Initialize on startup
initializeProducts();

// --- AUTHENTICATION CONFIG & UTILS ---
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'Murtaza Khan';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'km2945002@gmail.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'V9!qR4#tL8@zK2$mW7^pN5&x';
const JWT_SECRET = process.env.ADMIN_JWT_SECRET || '8f2c9a71d4e6b305c7f0182a9d63e4b1f5a8c0d7e2b64913a6f9c4d8e1b5072a';

interface TokenPayload {
  username: string;
  email: string;
  role: 'admin';
  exp: number;
}

function createToken(username: string, email: string): string {
  const payload: TokenPayload = {
    username,
    email,
    role: 'admin',
    exp: Date.now() + 1000 * 60 * 60 * 24 * 7 // 7 days validity
  };
  const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(payloadBase64)
    .digest('base64url');
  return `${payloadBase64}.${signature}`;
}

function verifyToken(token: string): TokenPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return null;
    const [payloadBase64, signature] = parts;
    const expectedSig = crypto
      .createHmac('sha256', JWT_SECRET)
      .update(payloadBase64)
      .digest('base64url');

    if (signature !== expectedSig) return null;

    const payload: TokenPayload = JSON.parse(Buffer.from(payloadBase64, 'base64url').toString('utf-8'));
    if (Date.now() > payload.exp) return null;

    return payload;
  } catch {
    return null;
  }
}

// Middleware to protect admin routes
function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ success: false, message: 'Authentication required. No token provided.' });
    return;
  }

  const token = authHeader.substring(7).trim();
  const payload = verifyToken(token);

  if (!payload) {
    res.status(403).json({ success: false, message: 'Invalid or expired admin session. Please log in again.' });
    return;
  }

  (req as any).adminUser = payload;
  next();
}

// --- API ROUTES ---

// 1. Admin Login
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ success: false, message: 'Username/Email and password are required.' });
    return;
  }

  const normalizedUser = String(username).trim().toLowerCase();
  const isValidUser =
    normalizedUser === ADMIN_USERNAME.toLowerCase() ||
    normalizedUser === ADMIN_EMAIL.toLowerCase() ||
    normalizedUser === 'murtaza' ||
    normalizedUser === 'admin';

  if (!isValidUser || String(password).trim() !== ADMIN_PASSWORD) {
    res.status(401).json({ success: false, message: 'Invalid username/email or password.' });
    return;
  }

  const token = createToken(ADMIN_USERNAME, ADMIN_EMAIL);
  res.json({
    success: true,
    token,
    user: {
      id: 'admin-1',
      username: ADMIN_USERNAME,
      email: ADMIN_EMAIL,
      role: 'admin'
    }
  });
});

// 2. Verify Session
app.get('/api/auth/verify', requireAdmin, (req: Request, res: Response) => {
  const admin = (req as any).adminUser;
  res.json({
    success: true,
    user: {
      id: 'admin-1',
      username: admin.username,
      email: admin.email,
      role: admin.role
    }
  });
});

// 3. Get All Products (Public)
app.get('/api/products', (_req: Request, res: Response) => {
  const products = getProducts();
  res.json({
    success: true,
    count: products.length,
    products
  });
});

// 4. Create New Product (Protected)
app.post('/api/products', requireAdmin, (req: Request, res: Response) => {
  try {
    const data = req.body;

    if (!data.name || typeof data.name !== 'string' || !data.name.trim()) {
      res.status(400).json({ success: false, message: 'Product name is required.' });
      return;
    }

    const price = Number(data.price);
    if (isNaN(price) || price <= 0) {
      res.status(400).json({ success: false, message: 'Valid positive price in PKR is required.' });
      return;
    }

    const regularPrice = Number(data.regularPrice) || price;
    const category = data.category || 'men';
    const subcategory = data.subcategory || 'shirts';
    const categoryLabel = data.categoryLabel || (category === 'peshawari' ? 'Peshawari Chappal' : category);

    // Format slug
    const cleanSlug = data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const id = `prod-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const newProduct: Product = {
      id,
      name: data.name.trim(),
      slug: cleanSlug,
      category,
      subcategory,
      categoryLabel,
      price,
      regularPrice,
      onSale: regularPrice > price,
      isNew: Boolean(data.isNew ?? true),
      isFeatured: Boolean(data.isFeatured ?? false),
      isBestSeller: Boolean(data.isBestSeller ?? false),
      rating: Number(data.rating) || 5.0,
      reviewCount: Number(data.reviewCount) || 1,
      images: Array.isArray(data.images) && data.images.length > 0 
        ? data.images 
        : ['https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80'],
      description: data.description || 'Premium quality garment crafted for style and enduring comfort.',
      shortDescription: data.shortDescription || data.description?.slice(0, 100) || '',
      fabric: data.fabric || '100% Premium Cotton / Pure Leather',
      fit: data.fit || 'Modern Regular Fit',
      careInstructions: data.careInstructions || 'Hand wash cold or gentle machine cycle.',
      sizes: Array.isArray(data.sizes) && data.sizes.length > 0 ? data.sizes : ['M', 'L', 'XL'],
      colors: Array.isArray(data.colors) && data.colors.length > 0 
        ? data.colors 
        : [{ name: 'Forest Green', hex: '#075C3B' }],
      sku: data.sku || `GS-${Date.now().toString().slice(-6)}`,
      inStock: Boolean(data.inStock ?? true),
      stockCount: Number(data.stockCount) ?? 15,
      origin: data.origin || 'Pakistan'
    };

    const current = getProducts();
    const updated = [newProduct, ...current];
    saveProducts(updated);

    res.status(201).json({
      success: true,
      message: 'Product added successfully!',
      product: newProduct
    });
  } catch (error: any) {
    console.error('Error creating product:', error);
    res.status(500).json({ success: false, message: error.message || 'Internal server error' });
  }
});

// 5. Update Existing Product (Protected)
app.put('/api/products/:id', requireAdmin, (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const current = getProducts();
    const index = current.findIndex((p) => p.id === id);

    if (index === -1) {
      res.status(404).json({ success: false, message: `Product with ID ${id} not found.` });
      return;
    }

    const existing = current[index];
    const data = req.body;

    const price = data.price !== undefined ? Number(data.price) : existing.price;
    const regularPrice = data.regularPrice !== undefined ? Number(data.regularPrice) : existing.regularPrice;

    const updatedProduct: Product = {
      ...existing,
      ...data,
      id: existing.id, // preserve ID
      price,
      regularPrice,
      onSale: regularPrice > price,
      isFeatured: data.isFeatured !== undefined ? Boolean(data.isFeatured) : existing.isFeatured,
      isBestSeller: data.isBestSeller !== undefined ? Boolean(data.isBestSeller) : existing.isBestSeller,
      isNew: data.isNew !== undefined ? Boolean(data.isNew) : existing.isNew,
      inStock: data.inStock !== undefined ? Boolean(data.inStock) : existing.inStock,
      stockCount: data.stockCount !== undefined ? Number(data.stockCount) : existing.stockCount
    };

    current[index] = updatedProduct;
    saveProducts(current);

    res.json({
      success: true,
      message: 'Product updated successfully!',
      product: updatedProduct
    });
  } catch (error: any) {
    console.error('Error updating product:', error);
    res.status(500).json({ success: false, message: error.message || 'Internal server error' });
  }
});

// 6. Delete Product (Protected)
app.delete('/api/products/:id', requireAdmin, (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const current = getProducts();
    const filtered = current.filter((p) => p.id !== id);

    if (filtered.length === current.length) {
      res.status(404).json({ success: false, message: `Product with ID ${id} not found.` });
      return;
    }

    saveProducts(filtered);
    res.json({
      success: true,
      message: 'Product deleted successfully!',
      id
    });
  } catch (error: any) {
    console.error('Error deleting product:', error);
    res.status(500).json({ success: false, message: error.message || 'Internal server error' });
  }
});

// 7. Image Upload (Protected)
app.post('/api/upload', requireAdmin, (req: Request, res: Response) => {
  try {
    const { dataUrl, filename } = req.body;

    if (!dataUrl || typeof dataUrl !== 'string') {
      res.status(400).json({ success: false, message: 'Image data URL is required.' });
      return;
    }

    // Parse base64
    const matches = dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      // If it's already an HTTP URL, just return it
      if (dataUrl.startsWith('http://') || dataUrl.startsWith('https://')) {
        res.json({ success: true, url: dataUrl });
        return;
      }
      res.status(400).json({ success: false, message: 'Invalid data URL format.' });
      return;
    }

    const mimeType = matches[1];
    const base64Data = matches[2];
    const extension = mimeType.split('/')[1] || 'jpeg';

    const safeFilename = `upload-${Date.now()}-${Math.floor(Math.random() * 10000)}.${extension}`;
    const filePath = path.join(UPLOADS_DIR, safeFilename);

    fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));

    res.json({
      success: true,
      url: `/uploads/${safeFilename}`
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    res.status(500).json({ success: false, message: error.message || 'Failed to save image' });
  }
});

// --- VITE DEV SERVER OR STATIC PRODUCTION ---
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`GROCARY SHELF full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
