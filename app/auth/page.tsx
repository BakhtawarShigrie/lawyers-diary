'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Scale, 
  Mail, 
  Lock, 
  ArrowRight, 
  ShieldCheck, 
  UserPlus, 
  LogIn 
} from 'lucide-react';

type AuthView = 'login' | 'signup' | 'otp';

export default function AuthPage() {
  const router = useRouter();
  const [view, setView] = useState<AuthView>('login');
  
  // Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);

  // Handlers
  const handleGoogleSignIn = () => {
    setIsLoading(true);
    signIn('google', { callbackUrl: '/dashboard' });
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !name) return;
    setIsLoading(true);
    // Simulate API call to send OTP
    setTimeout(() => {
      setIsLoading(false);
      setView('otp');
    }, 1500);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setIsLoading(true);
    
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res?.ok) {
      router.push(email === 'Shigrie@gmail.com' ? '/admin/revenue' : '/dashboard');
    } else {
      alert("Invalid credentials. Please try again.");
      setIsLoading(false);
    }
  };

  const handleOtpVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate OTP verification & Login
    setTimeout(async () => {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password: 'dummy-password-post-otp', // In production, backend handles secure session
      });
      if (res?.ok) router.push('/dashboard');
    }, 1500);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  // Animation Variants
  const variants = {
    enter: { opacity: 0, x: 20 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 relative overflow-hidden">
      
      {/* Background Ornaments */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>

      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden relative z-10 p-8">
        
        {/* Logo Header */}
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="bg-blue-600 p-3 rounded-2xl mb-4 shadow-lg shadow-blue-500/30">
            <Scale className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Lawyer&apos;s Diary</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Smart Legal Practice Management</p>
        </div>

        <AnimatePresence mode="wait">
          {/* LOGIN VIEW */}
          {view === 'login' && (
            <motion.div
              key="login"
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email Address" 
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      type="password" 
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password" 
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end">
                  <a href="#" className="text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400">Forgot Password?</a>
                </div>

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><LogIn className="w-5 h-5" /> Sign In</>}
                </button>
              </form>

              <div className="my-6 flex items-center gap-3">
                <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800"></div>
                <span className="text-xs font-semibold text-slate-400 uppercase">Or continue with</span>
                <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800"></div>
              </div>

              <button 
                onClick={handleGoogleSignIn}
                type="button" 
                className="w-full py-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-200 font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-3"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </button>

              <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-8">
                Don&apos;t have an account? <button onClick={() => setView('signup')} className="font-bold text-blue-600 dark:text-blue-400 hover:underline">Sign up</button>
              </p>
            </motion.div>
          )}

          {/* SIGNUP VIEW */}
          {view === 'signup' && (
            <motion.div
              key="signup"
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <form onSubmit={handleSignupSubmit} className="space-y-4">
                <div className="space-y-4">
                  <div className="relative">
                    <UserPlus className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full Name / Firm Name" 
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email Address" 
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      type="password" 
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create Password" 
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full py-3 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Continue <ArrowRight className="w-5 h-5" /></>}
                </button>
              </form>

              <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-8">
                Already have an account? <button onClick={() => setView('login')} className="font-bold text-blue-600 dark:text-blue-400 hover:underline">Sign in</button>
              </p>
            </motion.div>
          )}

          {/* OTP VERIFICATION VIEW */}
          {view === 'otp' && (
            <motion.div
              key="otp"
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h2 className="text-xl font-bold mb-2">Verify your email</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
                We&apos;ve sent a 6-digit secure code to <br/><span className="font-bold text-slate-900 dark:text-white">{email}</span>
              </p>

              <form onSubmit={handleOtpVerify}>
                <div className="flex justify-center gap-2 mb-8">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      className="w-12 h-14 text-center text-xl font-bold bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                    />
                  ))}
                </div>
                
                <button 
                  type="submit" 
                  disabled={isLoading || otp.some(d => d === '')}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Verify & Access Dashboard'}
                </button>
              </form>

              <p className="text-sm text-slate-500 mt-6">
                Didn&apos;t receive the code? <button className="font-bold text-emerald-600 hover:underline">Resend</button>
              </p>
              <button onClick={() => setView('signup')} className="text-xs text-slate-400 hover:text-slate-600 mt-4 underline">
                Change email address
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Small Admin Login Link */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
          <button 
            onClick={() => {
              setEmail('Shigrie@gmail.com');
              setPassword('Shigrie123@');
              setView('login');
            }}
            className="text-[10px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors font-mono"
          >
            Admin Login (Shigrie@gmail.com / Shigrie123@)
          </button>
        </div>

      </div>
    </div>
  );
}