'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { getCurrentUser, logout } from '@/lib/auth';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  TruckIcon,
  BarChart3,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Building2,
  History,
  AlertTriangle,
  Tags,
} from 'lucide-react';
import type { User } from '@/lib/types';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Products', href: '/products', icon: Package },
  { name: 'Categories', href: '/categories', icon: Tags },
  { name: 'Suppliers', href: '/suppliers', icon: Building2 },
  { name: 'Purchase Orders', href: '/purchase-orders', icon: ShoppingCart },
  { name: 'Sales Orders', href: '/sales-orders', icon: TruckIcon },
  { name: 'Stock Transactions', href: '/stock-transactions', icon: History },
  { name: 'Reports', href: '/reports', icon: BarChart3 },
  { name: 'Low Stock Alerts', href: '/alerts', icon: AlertTriangle },
];

const adminNavigation = [
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'System Settings', href: '/admin/settings', icon: Settings },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    getCurrentUser().then(setUser);
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!user) return null;

  return (
    <div className={cn('flex h-screen flex-col bg-gray-50 dark:bg-gray-900', className)}>
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center space-x-2">
          <Package className="h-6 w-6 text-blue-600" />
          {!collapsed && <span className="text-lg font-semibold">Inventory Pro</span>}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <ScrollArea className="flex-1 px-3">
        <div className="space-y-2 py-4">
          {navigation.map((item) => (
            <Button
              key={item.name}
              variant={pathname === item.href ? 'secondary' : 'ghost'}
              className={cn(
                'w-full justify-start',
                collapsed && 'justify-center px-0'
              )}
              onClick={() => router.push(item.href)}
            >
              <item.icon className="h-4 w-4" />
              {!collapsed && <span className="ml-3">{item.name}</span>}
            </Button>
          ))}
        </div>

        {user?.role === 'admin' && (
          <>
            <Separator className="my-4" />
            <div className="space-y-2">
              <div className="px-3 py-2">
                {!collapsed && (
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Administration
                  </h3>
                )}
              </div>
              {adminNavigation.map((item) => (
                <Button
                  key={item.name}
                  variant={pathname === item.href ? 'secondary' : 'ghost'}
                  className={cn(
                    'w-full justify-start',
                    collapsed && 'justify-center px-0'
                  )}
                  onClick={() => router.push(item.href)}
                >
                  <item.icon className="h-4 w-4" />
                  {!collapsed && <span className="ml-3">{item.name}</span>}
                </Button>
              ))}
            </div>
          </>
        )}
      </ScrollArea>

      <div className="border-t p-4">
        <div className="flex items-center space-x-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          {!collapsed && (
            <div className="flex-1">
              <p className="text-sm font-medium">{user?.name}</p>
              <Badge variant="secondary" className="text-xs">
                {user?.role}
              </Badge>
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className={cn(
            'mt-3 w-full justify-start text-red-600 hover:text-red-700',
            collapsed && 'justify-center px-0'
          )}
        >
          <LogOut className="h-4 w-4" />
          {!collapsed && <span className="ml-3">Logout</span>}
        </Button>
      </div>
    </div>
  );
}