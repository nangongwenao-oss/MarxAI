import React, { useState } from 'react';
import { MOCK_BOOKS } from '../constants';
import { Book as BookIcon, ChevronRight, FileText } from 'lucide-react';
import { Book } from '../types';

export const TheoryStudy: React.FC = () => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  if (selectedBook) {
    return (
      <div className="flex flex-col h-full bg-[#151A21]">
        <div className="p-4 border-b border-[#333] flex items-center gap-3 bg-[#1E242C]">
          <button 
            onClick={() => setSelectedBook(null)}
            className="text-gray-400 hover:text-white"
          >
            &larr; Back
          </button>
          <h2 className="text-lg font-bold text-[#E0E0E0] truncate">{selectedBook.title}</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
           <div className="mb-6 p-4 bg-[#CC3333] bg-opacity-5 rounded border-l-4 border-[#CC3333]">
              <h3 className="font-bold text-[#CC3333] mb-1">Synopsis</h3>
              <p className="text-sm text-gray-400">Published in {selectedBook.year}. A seminal work analyzing the political economy.</p>
           </div>
           
           <div className="space-y-3">
             {selectedBook.chapters.map((chapter, idx) => (
               <div key={idx} className="p-4 bg-[#1E242C] rounded border border-[#333] hover:border-[#CC3333] transition-colors cursor-pointer group">
                  <div className="flex justify-between items-center">
                    <span className="text-[#E0E0E0] font-serif group-hover:text-[#CC3333] transition-colors">{chapter}</span>
                    <FileText size={16} className="text-gray-600 group-hover:text-[#CC3333]" />
                  </div>
               </div>
             ))}
           </div>
        </div>
        {/* Floating AI Helper */}
        <button className="absolute bottom-24 right-6 w-12 h-12 bg-[#CC3333] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(204,51,51,0.6)] hover:scale-110 transition-transform z-20">
             <span className="text-white text-xs font-bold">AI</span>
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 h-full bg-[#151A21] overflow-y-auto">
      <h1 className="text-2xl font-bold text-[#E0E0E0] mb-6 font-serif flex items-center gap-2">
        <BookIcon className="text-[#CC3333]" /> 
        Marxist Library
      </h1>
      
      <div className="grid gap-6">
        {MOCK_BOOKS.map((book) => (
          <div 
            key={book.id} 
            onClick={() => setSelectedBook(book)}
            className="relative bg-[#1E242C] rounded-lg p-5 border border-[#333] hover:border-[#CC3333] transition-all cursor-pointer shadow-lg group"
          >
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                <BookIcon size={64} />
            </div>
            
            <h3 className="text-xl font-bold text-[#E0E0E0] font-serif mb-1 group-hover:text-[#CC3333] transition-colors">{book.title}</h3>
            <p className="text-sm text-[#FFD700] mb-4 font-mono">{book.author} | {book.year}</p>
            
            <div className="flex items-center text-xs text-gray-500 font-mono">
               <span>{book.chapters.length} CHAPTERS</span>
               <ChevronRight size={14} className="ml-auto text-[#CC3333]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
