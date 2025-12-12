import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Award, Zap, BookOpen, TrendingUp } from 'lucide-react';

const MOCK_DATA = [
  { day: 'Mon', hours: 1.2 },
  { day: 'Tue', hours: 2.5 },
  { day: 'Wed', hours: 1.8 },
  { day: 'Thu', hours: 3.0 },
  { day: 'Fri', hours: 2.2 },
  { day: 'Sat', hours: 4.5 },
  { day: 'Sun', hours: 3.8 },
];

export const ProgressDashboard: React.FC = () => {
  return (
    <div className="h-full bg-[#151A21] p-6 overflow-y-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#E0E0E0] font-serif">Cadre Progress</h1>
          <p className="text-xs text-gray-500 font-mono mt-1">USER: LUOYUAN881105</p>
        </div>
        <div className="text-right">
             <span className="block text-2xl font-bold text-[#CC3333]">LV. 4</span>
             <span className="text-[10px] text-gray-400">THEORETICIAN</span>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
         <div className="bg-[#1E242C] p-4 rounded-lg border border-[#333]">
            <div className="flex items-center gap-2 mb-2">
                <Zap size={16} className="text-[#FFD700]" />
                <span className="text-xs text-gray-400 uppercase">Mastery</span>
            </div>
            <div className="text-2xl font-bold text-white">75%</div>
            <div className="w-full bg-gray-700 h-1 mt-2 rounded-full overflow-hidden">
                <div className="bg-[#FFD700] h-full" style={{width: '75%'}}></div>
            </div>
         </div>
         <div className="bg-[#1E242C] p-4 rounded-lg border border-[#333]">
            <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={16} className="text-[#CC3333]" />
                <span className="text-xs text-gray-400 uppercase">Streak</span>
            </div>
            <div className="text-2xl font-bold text-white">12 <span className="text-sm font-normal text-gray-500">DAYS</span></div>
         </div>
      </div>

      {/* Chart */}
      <div className="mb-8 bg-[#1E242C] p-4 rounded-lg border border-[#333]">
         <h3 className="text-sm font-bold text-gray-300 mb-4 font-mono">STUDY HOURS (WEEKLY)</h3>
         <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MOCK_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="day" stroke="#666" tick={{fontSize: 10}} axisLine={false} tickLine={false} />
                <YAxis stroke="#666" tick={{fontSize: 10}} axisLine={false} tickLine={false} />
                <Tooltip 
                    contentStyle={{backgroundColor: '#151A21', border: '1px solid #CC3333', borderRadius: '4px'}}
                    itemStyle={{color: '#E0E0E0'}}
                />
                <Line 
                    type="monotone" 
                    dataKey="hours" 
                    stroke="#CC3333" 
                    strokeWidth={2} 
                    dot={{fill: '#151A21', stroke: '#CC3333', strokeWidth: 2, r: 4}} 
                    activeDot={{r: 6, fill: '#FFD700'}}
                />
              </LineChart>
            </ResponsiveContainer>
         </div>
      </div>

      {/* Badges */}
      <h3 className="text-sm font-bold text-gray-300 mb-4 font-mono">ACHIEVEMENTS</h3>
      <div className="grid grid-cols-3 gap-3">
         {[
             { title: 'Capital Beginner', icon: BookOpen, active: true },
             { title: 'Dialectic Master', icon: Award, active: true },
             { title: 'Full Attendance', icon: Zap, active: false },
         ].map((badge, i) => (
             <div key={i} className={`aspect-square flex flex-col items-center justify-center p-2 rounded-lg border ${badge.active ? 'bg-[#CC3333] bg-opacity-10 border-[#CC3333]' : 'bg-[#1E242C] border-[#333] opacity-50'}`}>
                 <badge.icon className={`mb-2 ${badge.active ? 'text-[#FFD700]' : 'text-gray-500'}`} size={24} />
                 <span className="text-[10px] text-center leading-tight font-bold">{badge.title}</span>
             </div>
         ))}
      </div>
    </div>
  );
};
