import React, { useState, useEffect } from 'react';
import { Lock, User, Terminal } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

const MatrixRain = () => {
  // A simplified visual representation of the code stream
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
      <div className="flex flex-row justify-between text-[10px] text-[#CC3333] font-mono leading-none h-full">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="flex flex-col animate-pulse" style={{ animationDuration: `${Math.random() * 2 + 1}s` }}>
             {Array.from({ length: 40 }).map((_, j) => (
               <span key={j} style={{ opacity: Math.random() }}>{Math.random() > 0.5 ? '1' : '0'}</span>
             ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('luoyuan881105');
  const [password, setPassword] = useState('123456');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate Network Delay (1.5s as requested)
    setTimeout(() => {
      if (username === 'luoyuan881105' && password === '123456') {
        onLogin();
      } else {
        setError('认证失败: 凭证无效 (Authentication Failed)');
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#151A21] overflow-hidden">
      <MatrixRain />
      
      <div className="relative z-10 w-full max-w-md p-8 m-4 bg-[#1E242C] bg-opacity-90 border border-[#333] rounded-lg shadow-2xl backdrop-blur-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="p-4 rounded-full bg-[#CC3333] bg-opacity-10 border border-[#CC3333] mb-4 shadow-[0_0_15px_rgba(204,51,51,0.3)]">
            <Terminal size={48} className="text-[#CC3333]" />
          </div>
          <h1 className="text-3xl font-bold text-[#E0E0E0] tracking-wider font-serif">MarxAI</h1>
          <p className="text-sm text-gray-500 mt-2 font-mono">DIGITAL HUMAN INTERFACE V1.0</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-500 h-5 w-5" />
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#0F1216] border border-[#333] text-[#E0E0E0] rounded pl-10 pr-4 py-3 focus:outline-none focus:border-[#CC3333] focus:ring-1 focus:ring-[#CC3333] transition-all font-mono"
                placeholder="Enter ID"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-500 h-5 w-5" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0F1216] border border-[#333] text-[#E0E0E0] rounded pl-10 pr-4 py-3 focus:outline-none focus:border-[#CC3333] focus:ring-1 focus:ring-[#CC3333] transition-all font-mono"
                placeholder="Enter Password"
              />
            </div>
          </div>

          {error && (
            <div className="text-[#CC3333] text-sm text-center font-bold bg-[#CC3333] bg-opacity-10 p-2 rounded border border-[#CC3333]">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-[#CC3333] hover:bg-[#A32929] text-white font-bold py-3 px-4 rounded transition-all duration-300 transform hover:scale-[1.02] shadow-[0_4px_14px_0_rgba(204,51,51,0.39)] disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                AUTHENTICATING...
              </span>
            ) : (
              'ENTER SYSTEM'
            )}
          </button>
        </form>
        
        <div className="mt-8 text-center">
             <p className="text-[10px] text-gray-600 font-mono">SECURE CONNECTION ESTABLISHED</p>
        </div>
      </div>
    </div>
  );
};
