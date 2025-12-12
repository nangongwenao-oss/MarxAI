import React from 'react';
import { MessageSquare, Book, GraduationCap, PieChart } from 'lucide-react';
import { TabView } from '../types';

interface LayoutProps {
  currentTab: TabView;
  onTabChange: (tab: TabView) => void;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ currentTab, onTabChange, children }) => {
  const navItems = [
    { id: TabView.CHAT, icon: MessageSquare, label: 'Digital Marx' },
    { id: TabView.THEORY, icon: Book, label: 'Theory' },
    { id: TabView.QUIZ, icon: GraduationCap, label: 'Quiz' },
    { id: TabView.PROGRESS, icon: PieChart, label: 'Progress' },
  ];

  return (
    <div className="flex flex-col h-screen max-w-lg mx-auto bg-[#151A21] shadow-2xl relative overflow-hidden">
        {/* Main Content Area */}
        <main className="flex-1 overflow-hidden relative z-10">
            {children}
        </main>

        {/* Bottom Navigation */}
        <nav className="h-16 bg-[#1E242C] border-t border-[#333] flex items-center justify-around z-20">
            {navItems.map((item) => (
                <button
                    key={item.id}
                    onClick={() => onTabChange(item.id)}
                    className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
                        currentTab === item.id ? 'text-[#CC3333]' : 'text-gray-500 hover:text-gray-300'
                    }`}
                >
                    <item.icon size={20} strokeWidth={currentTab === item.id ? 2.5 : 2} />
                    <span className="text-[10px] mt-1 font-medium">{item.label}</span>
                    {currentTab === item.id && (
                        <div className="absolute bottom-0 w-8 h-1 bg-[#CC3333] rounded-t-full shadow-[0_-2px_6px_rgba(204,51,51,0.5)]" />
                    )}
                </button>
            ))}
        </nav>
    </div>
  );
};
