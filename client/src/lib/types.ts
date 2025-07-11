export interface User {
    id: string;
    email: string;
    name: string;
    role: 'admin' | 'manager' | 'employee';
    createdAt: Date;
    isActive: boolean;
  }
  
  export interface Product {
    id: string;
    name: string;
    sku: string;
    category: string;
    description: string;
    unitPrice: number;
    costPrice: number;
    currentStock: number;
    minStock: number;
    maxStock: number;
    unit: string;
    supplier: string;
    location: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface Category {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
  }
  
  export interface Supplier {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    contactPerson: string;
    paymentTerms: string;
    createdAt: Date;
  }
  
  export interface PurchaseOrder {
    id: string;
    orderNumber: string;
    supplierId: string;
    supplierName: string;
    items: PurchaseOrderItem[];
    totalAmount: number;
    status: 'pending' | 'approved' | 'received' | 'cancelled';
    orderDate: Date;
    expectedDate: Date;
    receivedDate?: Date;
    createdBy: string;
  }
  
  export interface PurchaseOrderItem {
    id: string;
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    receivedQuantity: number;
  }
  
  export interface SalesOrder {
    id: string;
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    items: SalesOrderItem[];
    totalAmount: number;
    status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
    orderDate: Date;
    deliveryDate?: Date;
    createdBy: string;
  }
  
  export interface SalesOrderItem {
    id: string;
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }
  
  export interface StockTransaction {
    id: string;
    productId: string;
    productName: string;
    type: 'in' | 'out' | 'adjustment';
    quantity: number;
    unitPrice: number;
    totalValue: number;
    reference: string;
    reason: string;
    date: Date;
    createdBy: string;
  }
  
  export interface InventoryReport {
    totalProducts: number;
    totalValue: number;
    lowStockItems: number;
    reorderRequired: number;
    topSellingProducts: Array<{
      productName: string;
      quantity: number;
      revenue: number;
    }>;
    stockMovement: Array<{
      date: string;
      incoming: number;
      outgoing: number;
    }>;
  }