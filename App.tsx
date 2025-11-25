import React, { useState } from 'react';
import ChatWindow from './components/ChatWindow';
import { AgentIcon } from './components/Icons';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen relative flex flex-col font-sans overflow-hidden">
      
      {/* Background with Subtle Moroccan Pattern */}
      <div className="absolute inset-0 bg-morocco-sand -z-20"></div>
      <div 
        className="absolute inset-0 opacity-[0.07] bg-repeat -z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C1272D' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      ></div>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-2xl mx-auto z-10">
        <div className="animate-fade-in-down flex flex-col items-center">
          
          {/* Circular Flag/Logo Container */}
          <div className="relative mb-8 group cursor-default">
             <div className="absolute inset-0 bg-morocco-green rounded-full blur opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
             <div className="relative w-32 h-32 bg-white rounded-full shadow-xl flex items-center justify-center border-4 border-morocco-gold/20 overflow-hidden">
                <img 
                  src="https://flagcdn.com/w160/ma.png" 
                  alt="Morocco Flag" 
                  className="w-full h-full object-cover opacity-90 hover:scale-110 transition-transform duration-700" 
                />
             </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-morocco-green mb-6 tracking-tight drop-shadow-sm">
            Marhaba <span className="text-morocco-red">2025</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-lg mx-auto font-medium">
            Nous sommes honorés de vous accueillir lors de la Coupe d’Afrique des Nations 2025.
          </p>
          
          <div className="mt-8 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50 shadow-sm max-w-sm">
            <p className="text-sm text-morocco-terracotta font-semibold uppercase tracking-wider mb-2">Besoin d’assistance ?</p>
            <p className="text-slate-500 text-sm">
              Appuyez sur l’icône de l’agent ci-dessous pour discuter avec votre guide personnel et obtenir des conseils sur vos déplacements et des astuces locales.
            </p>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center">
        <p className="text-slate-400 text-xs tracking-widest uppercase">Compagnon AFCON pour les supportrices — Maroc 2025 | Made by CANectors</p>
      </footer>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        {!isChatOpen && (
          <button 
            onClick={() => setIsChatOpen(true)}
            className="group relative flex items-center justify-center w-16 h-16 bg-morocco-red text-white rounded-full shadow-2xl hover:scale-110 hover:bg-red-700 transition-all duration-300 ring-4 ring-white hover:ring-red-100"
          >
            {/* Tooltip */}
            <span className="absolute right-full mr-4 bg-slate-800 text-white text-xs font-semibold py-2 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
              Start Chat
            </span>
            
            <AgentIcon className="w-8 h-8" />
            
            {/* Notification Pulse */}
            <span className="absolute top-0 right-0 flex h-4 w-4 -mt-1 -mr-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-morocco-gold opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-morocco-gold border-2 border-white"></span>
            </span>
          </button>
        )}
      </div>

      {/* Chat Interface */}
      <ChatWindow isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}

export default App;