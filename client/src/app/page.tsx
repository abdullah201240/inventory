"use client"
import React, { useState } from 'react';
import { Eye, EyeOff, Package, Mail, Lock, User, Phone, ArrowRight } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useRouter } from 'next/navigation';

// Types for form data and props

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  phone: string;
};

type SignupFormProps = {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  showConfirmPassword: boolean;
  setShowConfirmPassword: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: () => void;
  error: string | null;
  loading: boolean;
};

type LoginFormProps = {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: () => void;
  error: string | null;
  loading: boolean;
};

function SignupForm({
  formData,
  handleInputChange,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  handleSubmit,
  error,
  loading,
}: SignupFormProps) {
  return (
    <div className="space-y-6">
      {error && <div className="text-red-400 text-sm text-center">{error}</div>}
      <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
        <div className="flex gap-4">
          <div className="relative group w-1/2">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-purple-400 transition-colors duration-200" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Full Name"
              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:bg-white/20"
              required
            />
          </div>
          <div className="relative group w-1/2">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-purple-400 transition-colors duration-200" />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone Number"
              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:bg-white/20"
              required
            />
          </div>
        </div>
      </div>
      <div className="relative group">
        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-purple-400 transition-colors duration-200" />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email Address"
          className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:bg-white/20"
          required
        />
      </div>
      <div className="relative group">
        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-purple-400 transition-colors duration-200" />
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Password"
          className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:bg-white/20"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-400 transition-colors duration-200"
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>
      <div className="relative group animate-in slide-in-from-top-2 duration-300">
        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-purple-400 transition-colors duration-200" />
        <input
          type={showConfirmPassword ? 'text' : 'password'}
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          placeholder="Confirm Password"
          className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:bg-white/20"
          required
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-400 transition-colors duration-200"
        >
          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>
      <button
        type="button"
        onClick={handleSubmit}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent group"
        disabled={loading}
      >
        <span className="flex items-center justify-center">
          {loading ? 'Creating...' : 'Create Account'}
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
        </span>
      </button>
    </div>
  );
}

function LoginForm({
  formData,
  handleInputChange,
  showPassword,
  setShowPassword,
  handleSubmit,
  error,
  loading,
}: LoginFormProps) {
  return (
    <div className="space-y-6">
      {error && <div className="text-red-400 text-sm text-center">{error}</div>}
      <div className="relative group">
        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-purple-400 transition-colors duration-200" />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email Address"
          className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:bg-white/20"
          required
        />
      </div>
      <div className="relative group">
        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-purple-400 transition-colors duration-200" />
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Password"
          className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:bg-white/20"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-400 transition-colors duration-200"
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>
      <div className="text-right">
        <a href="#" className="text-sm text-purple-400 hover:text-purple-300 transition-colors duration-200">
          Forgot Password?
        </a>
      </div>
      <button
        type="button"
        onClick={handleSubmit}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent group"
        disabled={loading}
      >
        <span className="flex items-center justify-center">
          {loading ? 'Signing In...' : 'Sign In'}
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
        </span>
      </button>
    </div>
  );
}

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });
  const [localError, setLocalError] = useState<string | null>(null);

  const MySwal = withReactContent(Swal);

  // LOGIN mutation
  const loginMutation = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Login failed');
      localStorage.setItem('token', result.token);
      return result;
    },
    onSuccess: () => {
      MySwal.fire({
        icon: 'success',
        title: 'Login successful!',
        showConfirmButton: false,
        timer: 1500
      });
      router.push('/dashboard');
    }
  });

  // SIGNUP mutation
  const signupMutation = useMutation({
    mutationFn: async (data: { name: string; email: string; password: string; phone: string }) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || Object.values(result)[0] || 'Signup failed');
      return result;
    },
    onSuccess: () => {
      MySwal.fire({
        icon: 'success',
        title: 'Signup successful!',
        text: 'Please login.',
        showConfirmButton: false,
        timer: 1800
      });
      setIsLogin(true);
      setFormData({ name: '', email: '', password: '', confirmPassword: '', phone: '' });
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (isLogin) {
      setLocalError(null);
      loginMutation.mutate({ email: formData.email, password: formData.password });
    } else {
      if (formData.password !== formData.confirmPassword) {
        setLocalError('Passwords do not match');
        return;
      }
      setLocalError(null);
      signupMutation.mutate({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone
      });
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', email: '', password: '', confirmPassword: '', phone: '' });
    setLocalError(null);
    loginMutation.reset();
    signupMutation.reset();
  };

  const error = localError || (isLogin ? loginMutation.error : signupMutation.error);
  const loading = isLogin
    ? loginMutation.status === 'pending'
    : signupMutation.status === 'pending';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Main card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20 transform transition-all duration-500 hover:scale-105">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4 transform transition-transform duration-300 hover:rotate-12">
              <Package className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-gray-300">
              {isLogin ? 'Sign in to your inventory system' : 'Join our inventory management platform'}
            </p>
          </div>

          {/* Form */}
          {isLogin ? (
            <LoginForm
              formData={formData}
              handleInputChange={handleInputChange}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              handleSubmit={handleSubmit}
              error={error ? (typeof error === 'string' ? error : error instanceof Error ? error.message : 'An unknown error occurred') : null}
              loading={loading}
            />
          ) : (
            <SignupForm
              formData={formData}
              handleInputChange={handleInputChange}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              showConfirmPassword={showConfirmPassword}
              setShowConfirmPassword={setShowConfirmPassword}
              handleSubmit={handleSubmit}
              error={error ? (typeof error === 'string' ? error : error instanceof Error ? error.message : 'An unknown error occurred') : null}
              loading={loading}
            />
          )}

          {/* Toggle between login and signup */}
          <div className="mt-8 text-center">
            <p className="text-gray-400">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                type="button"
                onClick={toggleMode}
                className="ml-1 text-purple-400 hover:text-purple-300 font-semibold transition-colors duration-200"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>© 2024 Inventory Management System. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <a href="#" className="hover:text-purple-400 transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="hover:text-purple-400 transition-colors duration-200">Terms of Service</a>
            <a href="#" className="hover:text-purple-400 transition-colors duration-200">Support</a>
          </div>
        </div>
      </div>
    </div>
  );
}