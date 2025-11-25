import React, { useState, useEffect, useRef } from 'react';
import { Message, Language } from '../types';
import { PRESET_DATA } from '../data/faqData';
import { generateAIResponse } from '../services/geminiService';
import { AgentIcon, CloseIcon, SendIcon } from './Icons';

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [language, setLanguage] = useState<Language | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAiInput, setShowAiInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, showAiInput]);

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    const welcomeText = lang === 'fr' 
      ? "Marhaba ! Je suis votre assistante pour la CAN 2025. Choisissez une question ci-dessous." 
      : lang === 'ar'
      ? "مرحباً! أنا مساعدتك في كأس الأمم الأفريقية 2025. اختر سؤالاً أدناه."
      : "Marhaba! I'm your AFCON 2025 assistant. Please choose a topic below.";
    
    setMessages([
      {
        id: 'init-1',
        text: welcomeText,
        sender: 'ai',
        source: 'AI',
        timestamp: new Date()
      }
    ]);
  };

  const handleReset = () => {
    setLanguage(null);
    setMessages([]);
    setShowAiInput(false);
  };

  const handleQuestionClick = (question: string, answer: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      text: question,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: answer,
        sender: 'ai',
        source: 'FAQ',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsLoading(false);
    }, 600);
  };

  const handleAiQuestion = async (text: string) => {
    if (!text.trim() || !language) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: text,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await generateAIResponse(text, language);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'ai',
        source: 'AI',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsLoading(false);
      setShowAiInput(false); // Return to menu mode after AI turn
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed bottom-0 right-0 z-50 w-full sm:w-[400px] h-[85vh] sm:h-[650px] bg-white sm:rounded-tl-2xl sm:rounded-tr-2xl shadow-2xl flex flex-col transition-transform duration-300 ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
      
      {/* Header */}
      <div className="bg-morocco-green p-4 rounded-tl-2xl rounded-tr-2xl flex items-center justify-between text-white shadow-md">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <AgentIcon className="w-10 h-10" />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-morocco-green rounded-full"></span>
          </div>
          <div>
            <h3 className="font-bold text-lg leading-tight">FanWelcome</h3>
            <p className="text-xs text-green-100 opacity-90">Morocco 2025 Assistant</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <CloseIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden relative flex flex-col">
        
        {/* Language Selection Overlay */}
        {!language && (
          <div className="absolute inset-0 bg-white z-20 p-6 flex flex-col items-center justify-center animate-fadeIn">
            <AgentIcon className="w-20 h-20 mb-6 drop-shadow-md" />
            <h2 className="text-xl font-bold text-morocco-green mb-1">Choisir la langue
</h2>
            <p className="text-slate-500 text-sm mb-8 text-center">Veuillez sélectionner votre langue préférée pour commencer.</p>
            
            <div className="w-full space-y-3">
              <button onClick={() => handleLanguageSelect('en')} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-morocco-terracotta hover:bg-morocco-sand/30 transition-all font-semibold text-slate-700 flex items-center justify-between group">
                <span>English</span>
                <span className="text-2xl group-hover:scale-110 transition-transform">en</span>
              </button>
              <button onClick={() => handleLanguageSelect('fr')} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-morocco-terracotta hover:bg-morocco-sand/30 transition-all font-semibold text-slate-700 flex items-center justify-between group">
                <span>Français</span>
                <span className="text-2xl group-hover:scale-110 transition-transform">fr</span>
              </button>
              <button onClick={() => handleLanguageSelect('ar')} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-morocco-terracotta hover:bg-morocco-sand/30 transition-all font-serif font-bold text-slate-700 flex items-center justify-between group">
                <span className="order-2">العربية</span>
                <span className="text-2xl group-hover:scale-110 transition-transform order-1">ar</span>
              </button>
            </div>
          </div>
        )}

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 scrollbar-hide">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl p-3.5 shadow-sm ${
                msg.sender === 'user' 
                  ? 'bg-morocco-terracotta text-white rounded-br-none' 
                  : 'bg-white text-slate-800 border border-slate-100 rounded-bl-none'
              }`}>
                {msg.sender === 'ai' && (
                  <span className={`block text-[10px] font-bold mb-1 ${msg.source === 'AI' ? 'text-purple-500' : 'text-morocco-gold'}`}>
                    {msg.source === 'AI' ? 'AI ASSISTANT' : 'FAQ'}
                  </span>
                )}
                <p className={`text-sm ${language === 'ar' ? 'font-serif text-right text-base' : ''} whitespace-pre-wrap leading-relaxed`}>
                  {msg.text}
                </p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm border border-slate-100">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-morocco-teal rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-morocco-teal rounded-full animate-bounce delay-75"></div>
                  <div className="w-2 h-2 bg-morocco-teal rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Action Area (Menu or Input) */}
        {language && (
          <div className="bg-white border-t border-slate-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            
            {!showAiInput ? (
              // MENU MODE
              <div className="p-3 overflow-x-auto whitespace-nowrap scrollbar-hide flex flex-col gap-2 max-h-[40vh]">
                <p className="text-xs text-center text-slate-400 mb-1">
                  {language === 'ar' ? 'اختر سؤالاً' : language === 'fr' ? 'Choisissez une question' : 'Choose a question'}
                </p>
                <div className="grid grid-cols-1 gap-2 pb-2 px-1">
                  {PRESET_DATA[language].map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuestionClick(item.question, item.answer)}
                      className="w-full text-left p-3 rounded-xl border border-slate-200 bg-white hover:bg-morocco-sand/20 hover:border-morocco-green/30 transition-all text-sm text-slate-700 shadow-sm active:scale-[0.99] flex items-center justify-between group"
                    >
                      <span className={language === 'ar' ? 'font-serif text-right w-full' : ''}>{item.question}</span>
                      <span className="text-morocco-green opacity-0 group-hover:opacity-100 transition-opacity">
                        {language === 'ar' ? '←' : '→'}
                      </span>
                    </button>
                  ))}
                  
                  {/* System Actions */}
                  <div className="flex gap-2 mt-2 pt-2 border-t border-slate-100">
                    <button 
                      onClick={handleReset}
                      className="flex-1 py-3 px-2 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-200 transition-colors uppercase tracking-wide"
                    >
                      {language === 'ar' ? 'تغيير اللغة' : language === 'fr' ? 'Changer la langue' : 'Change Language'}
                    </button>
                    <button 
                      onClick={() => setShowAiInput(true)}
                      className="flex-1 py-3 px-2 bg-morocco-green/10 text-morocco-green rounded-lg text-xs font-bold hover:bg-morocco-green/20 transition-colors uppercase tracking-wide"
                    >
                      {language === 'ar' ? 'سؤال آخر (ذكاء اصطناعي)' : language === 'fr' ? 'Autre question (IA)' : 'Ask Custom (AI)'}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // AI INPUT MODE
              <div className="p-3">
                 <div className="flex justify-between items-center mb-2 px-1">
                    <span className="text-xs font-bold text-purple-600">
                      {language === 'ar' ? 'الذكاء الاصطناعي' : 'AI Assistant'}
                    </span>
                    <button onClick={() => setShowAiInput(false)} className="text-xs text-slate-400 hover:text-slate-600 underline">
                      {language === 'ar' ? 'عودة للقائمة' : language === 'fr' ? 'Retour' : 'Back to menu'}
                    </button>
                 </div>
                 <form 
                  onSubmit={(e) => { e.preventDefault(); handleAiQuestion(inputValue); }}
                  className="flex items-center space-x-2"
                >
                  <input
                    type="text"
                    autoFocus
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={language === 'ar' ? "أكتب سؤالك هنا..." : language === 'fr' ? "Posez votre question..." : "Type your question here..."}
                    className={`flex-1 bg-slate-100 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all text-sm outline-none ${language === 'ar' ? 'text-right' : ''}`}
                  />
                  <button 
                    type="submit" 
                    disabled={!inputValue.trim() || isLoading}
                    className="p-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 disabled:opacity-50 transition-all shadow-md"
                  >
                    <SendIcon className="w-5 h-5" />
                  </button>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatWindow;