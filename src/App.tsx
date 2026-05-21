/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Cat, 
  Lock, 
  Phone, 
  ArrowLeft, 
  Save, 
  Check, 
  LogOut, 
  Heart, 
  Utensils, 
  Moon, 
  Zap, 
  ShieldAlert,
  Send,
  Sparkles,
  PhoneCall,
  UserCheck,
  CheckCircle2,
  X
} from 'lucide-react';
import { ViewState } from './types';

export default function App() {
  // Routing State
  const [currentView, setCurrentView] = useState<ViewState>('home');
  // Transitioning State to match screen changes with beautiful fading
  const [activeTab, setActiveTab] = useState<'telefone' | 'sobre'>('telefone');
  
  // App Config & Settings State
  const [telefone, setTelefone] = useState(() => {
    return localStorage.getItem('adote_telefone') || '(11) 98765-4321';
  });
  
  // Login Form States
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLogginIn, setIsLoggingIn] = useState(false);
  
  // Admin Edit Form States
  const [editTelefone, setEditTelefone] = useState(telefone);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  // Adoption Modal / Visual State
  const [showAdoptModal, setShowAdoptModal] = useState(false);
  const [userAdoptName, setUserAdoptName] = useState('');
  const [userAdoptMsg, setUserAdoptMsg] = useState('');
  const [modalSuccess, setModalSuccess] = useState(false);

  // Sync edit field with current telephone value
  useEffect(() => {
    setEditTelefone(telefone);
  }, [telefone]);

  // Clean login errors on input change
  useEffect(() => {
    if (loginError) setLoginError('');
  }, [username, password]);

  // Custom phone formatter for BR format (XX) XXXXX-XXXX
  const formatPhoneAndSet = (val: string) => {
    const digits = val.replace(/\D/g, '');
    let formatted = '';
    
    if (digits.length === 0) {
      formatted = '';
    } else if (digits.length <= 2) {
      formatted = `(${digits}`;
    } else if (digits.length <= 6) {
      formatted = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    } else if (digits.length <= 10) {
      formatted = `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    } else {
      formatted = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
    }
    
    setEditTelefone(formatted);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    
    setTimeout(() => {
      if (username === 'admin' && password === '123456') {
        setCurrentView('admin');
        setLoginError('');
      } else {
        setLoginError('Credenciais inválidas! Tente novamente ou use o atalho abaixo.');
      }
      setIsLoggingIn(false);
    }, 450);
  };

  const applyShortcut = () => {
    setUsername('admin');
    setPassword('123456');
    setLoginError('');
  };

  const handleSaveTelefone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTelefone.trim() || editTelefone.length < 10) {
      alert('Por favor, insira um número de telefone válido.');
      return;
    }
    localStorage.setItem('adote_telefone', editTelefone);
    setTelefone(editTelefone);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleAdoptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setModalSuccess(true);
    setTimeout(() => {
      setShowAdoptModal(false);
      setModalSuccess(false);
      setUserAdoptName('');
      setUserAdoptMsg('');
    }, 2800);
  };

  return (
    <div className="min-h-screen text-[#1A1A1A] font-sans antialiased flex flex-col justify-between selection:bg-[#FF6B2B]/30 select-none pb-8">
      
      {/* HEADER FIXO - Available everywhere with dynamic logic */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/15 border-b border-white/20 transition-all duration-300 shadow-sm px-4 py-3 md:py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div 
            onClick={() => setCurrentView('home')} 
            className="flex items-center space-x-2.5 cursor-pointer group"
            id="header-logo"
          >
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md transform transition-transform group-hover:scale-110 group-hover:rotate-12 duration-300 text-xl">
              🐾
            </div>
            <span className="font-display font-bold text-white text-xl md:text-2xl tracking-tight group-hover:text-amber-100 transition-colors duration-200">
              Adote meu Gato
            </span>
          </div>

          {/* Dynamic Action Button/Status in Header */}
          <div id="header-action-container">
            {currentView === 'home' && (
              <button 
                onClick={() => setCurrentView('login')}
                className="btn-pill font-display font-semibold hover:scale-105 active:scale-95 text-xs md:text-sm px-6 md:px-8 py-2.5 bg-white text-[#FF6B2B] rounded-full glass-panel shadow-md cursor-pointer transition-all"
                id="btn-admin-area"
              >
                <span className="flex items-center space-x-2">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Área Admin</span>
                </span>
              </button>
            )}

            {currentView === 'login' && (
              <button 
                onClick={() => setCurrentView('home')}
                className="btn-pill inline-flex items-center space-x-2 bg-white text-[#FF6B2B] font-semibold px-5 py-2 rounded-full hover:bg-white/90 transition-all duration-200 text-sm cursor-pointer shadow-md"
                id="btn-login-back"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Voltar</span>
              </button>
            )}

            {currentView === 'admin' && (
              <div className="flex items-center space-x-4">
                <span className="hidden md:inline-flex items-center text-sm font-semibold text-white bg-white/20 px-4 py-2 rounded-full border border-white/30 backdrop-blur-sm">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400 mr-2 animate-pulse"></span>
                  Olá, Admin 👋
                </span>
                <button 
                  onClick={() => {
                    setCurrentView('home');
                    setUsername('');
                    setPassword('');
                  }}
                  className="btn-pill inline-flex items-center space-x-2 bg-white text-[#FF6B2B] font-semibold px-5 py-2 rounded-full hover:bg-white/90 transition-all duration-200 text-sm cursor-pointer shadow-md"
                  id="btn-admin-logout"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sair</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* DETECT CURRENT SCREEN VIEW & RENDER MAIN CONTENT */}
      <main className="flex-grow flex items-center justify-center px-4 py-8 md:py-16">
        
        {/* VIEW 1: LANDING PAGE (HOME) */}
        {currentView === 'home' && (
          <div className="w-full max-w-5xl mx-auto flex flex-col items-center space-y-16 animate-fade-in" id="view-home">
            
            {/* HERO SECTION */}
            <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
              
              {/* Left Column: Garfield Illustration/Avatar Box */}
              <div className="w-full lg:w-[45%] flex items-center justify-center relative">
                {/* Avatar Radial Glow Background */}
                <div className="avatar-glow absolute w-72 h-72 md:w-96 md:h-96 rounded-full blur-xl"></div>

                {/* Main avatar outline */}
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full glass-panel relative flex items-center justify-center group transform transition-all duration-500 hover:scale-105 hover:rotate-2 relative z-10 border-4 border-white/50 shadow-2xl">
                  <div className="w-full h-full bg-orange-100/30 rounded-full overflow-hidden flex items-center justify-center relative shadow-inner">
                    {/* Background decorative stripes/pattern */}
                    <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#FF6B2B_1px,transparent_1px)] [background-size:16px_16px]"></div>
                    
                    {/* SVG/EMOJI Mascot Artwork */}
                    <svg viewBox="0 0 100 100" className="w-[85%] h-[85%] transform group-hover:scale-110 transition-transform duration-500">
                      {/* Ears */}
                      <path d="M 18,32 Q 10,10 32,22 Z" fill="#FF8343" stroke="#D34D12" strokeWidth="2.5" />
                      <path d="M 22,29 Q 15,16 29,23 Z" fill="#FFE0D1" />
                      
                      <path d="M 82,32 Q 90,10 68,22 Z" fill="#FF8343" stroke="#D34D12" strokeWidth="2.5" />
                      <path d="M 78,29 Q 85,16 71,23 Z" fill="#FFE0D1" />
                      
                      {/* Tail */}
                      <path d="M 75,75 Q 88,60 88,44 Q 88,38 82,40 Q 82,46 76,64 Z" fill="#FF8343" stroke="#D34D12" strokeWidth="2" />
                      {/* Stripes on tail */}
                      <path d="M 81,50 Q 85,48 83,44" fill="none" stroke="#D34D12" strokeWidth="2" />
                      <path d="M 79,58 Q 84,55 81,51" fill="none" stroke="#D34D12" strokeWidth="2" />

                      {/* Mascot Body */}
                      <ellipse cx="50" cy="68" rx="34" ry="24" fill="#FF8343" stroke="#D34D12" strokeWidth="2.5" />
                      {/* Belly fat patch */}
                      <ellipse cx="50" cy="71" rx="22" ry="15" fill="#FFE0D1" />
                      
                      {/* Head */}
                      <ellipse cx="50" cy="45" rx="32" ry="25" fill="#FF9E64" stroke="#D34D12" strokeWidth="2.5" />
                      
                      {/* Orange stripes on forehead */}
                      <path d="M 44,22 L 50,30 L 56,22" fill="none" stroke="#D34D12" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M 40,24 L 46,31" fill="none" stroke="#D34D12" strokeWidth="2" strokeLinecap="round" />
                      <path d="M 60,24 L 54,31" fill="none" stroke="#D34D12" strokeWidth="2" strokeLinecap="round" />
                      
                      {/* Eyes - Heavy Sleepy Garfield style lids */}
                      {/* Eye whites */}
                      <ellipse cx="38" cy="42" rx="10" ry="10" fill="#FFFFEE" stroke="#D34D12" strokeWidth="2" />
                      <ellipse cx="62" cy="42" rx="10" ry="10" fill="#FFFFEE" stroke="#D34D12" strokeWidth="2" />
                      {/* Eye pupils */}
                      <ellipse cx="39" cy="43" rx="3" ry="5" fill="#1A1A1A" />
                      <ellipse cx="61" cy="43" rx="3" ry="5" fill="#1A1A1A" />
                      {/* Heavy half-closed eyelids */}
                      <path d="M 28,38 H 48 Q 44,48 28,38 Z" fill="#FF9D5C" stroke="#D34D12" strokeWidth="1.5" />
                      <path d="M 52,38 H 72 Q 56,48 52,38 Z" fill="#FF9D5C" stroke="#D34D12" strokeWidth="1.5" />

                      {/* Cute pink snout / nose */}
                      <polygon points="46,49 54,49 50,54" fill="#FF7B7B" stroke="#D34D12" strokeWidth="2" />

                      {/* Cheeks / Mustache pads */}
                      <ellipse cx="44" cy="54" rx="7" ry="5" fill="#FFE0D1" stroke="#D34D12" strokeWidth="1.5" />
                      <ellipse cx="56" cy="54" rx="7" ry="5" fill="#FFE0D1" stroke="#D34D12" strokeWidth="1.5" />
                      {/* Mouth curved under the pads */}
                      <path d="M 44,55 Q 50,60 56,55" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />

                      {/* Elegant Whiskers */}
                      <line x1="26" y1="52" x2="12" y2="50" stroke="#8D350A" strokeWidth="1.5" strokeLinecap="round" />
                      <line x1="26" y1="55" x2="10" y2="56" stroke="#8D350A" strokeWidth="1.5" strokeLinecap="round" />
                      <line x1="74" y1="52" x2="88" y2="50" stroke="#8D350A" strokeWidth="1.5" strokeLinecap="round" />
                      <line x1="74" y1="55" x2="90" y2="56" stroke="#8D350A" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>

                    {/* Fun Badge */}
                    <div className="absolute bottom-3 bg-red-500 text-white font-black text-xs px-2.5 py-1 rounded-full uppercase tracking-wider transform shadow-md">
                      Mascote Oficial
                    </div>
                  </div>
                </div>

                {/* Floating glass badges identical to requested design layout */}
                <div className="absolute -top-3 right-0 glass-panel px-4 py-2 rounded-full text-xs font-bold text-white poppins flex items-center space-x-1.5 shadow-lg z-20">
                  <span>🍝</span>
                  <span>Macarrão Fan</span>
                </div>
                <div className="absolute -bottom-3 left-0 glass-panel px-4 py-2 rounded-full text-xs font-bold text-white poppins flex items-center space-x-1.5 shadow-lg z-20">
                  <span>😴</span>
                  <span>Mestre Soneca</span>
                </div>
              </div>

              {/* Right Column: Title, Intro & Instant Phone CTA Card */}
              <div className="w-full lg:w-[52%] flex flex-col space-y-6 text-center lg:text-left items-center lg:items-start animate-fade-in" id="hero-info">
                <div className="inline-block px-4 py-1.5 glass-panel text-white text-xs font-semibold uppercase tracking-widest rounded-full w-fit">
                  Disponível para adoção
                </div>
                
                <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-white leading-tight drop-shadow-md">
                  Encontre um lar para o Garfield <span className="text-3xl md:text-4xl">🐱</span>
                </h1>
                
                <p className="text-lg text-white/90 font-medium leading-relaxed max-w-md">
                  Ele adora macarrão, sonecas longas e muito amor. Será que você é a pessoa certa para esse mestre do descanso?
                </p>

                {/* TELEFONE DE CONTATO CARD (GLASS MORPHISM VIBRANT) */}
                <div className="w-full max-w-md glass-panel p-6 mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-[32px] transform hover:translate-y-[-2px] transition-transform duration-200" id="contact-phone-card">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#FF6B2B] rounded-full flex items-center justify-center text-xl text-white shrink-0 shadow-sm border border-white/20">
                      📞
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] uppercase font-bold text-white/60 tracking-wider mb-0.5">Contato Direto</p>
                      <p className="text-xl font-display font-extrabold text-white tracking-tight" id="lbl-phone-number">
                        {telefone}
                      </p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setShowAdoptModal(true)}
                    className="btn-pill w-full sm:w-auto bg-[#FF6B2B] hover:bg-[#E05318] hover:shadow-lg hover:scale-105 active:scale-95 text-white poppins font-bold px-6 py-3.5 rounded-full shadow-md flex items-center justify-center space-x-2 transition-all duration-200 cursor-pointer text-sm uppercase tracking-wide shrink-0"
                    id="btn-headline-cta"
                  >
                    <Heart className="w-4.5 h-4.5 fill-current" />
                    <span>Quero Adotar!</span>
                  </button>
                </div>
              </div>
            </div>

            {/* SEÇÃO "SOBRE O GARFIELD" - 3 CARDS IN GRID */}
            <div className="w-full space-y-8" id="about-section">
              <div className="text-center space-y-2">
                <h2 className="font-display font-extrabold text-2xl md:text-3xl lg:text-4xl text-white drop-shadow-sm">
                  Por que adotar o Garfield?
                </h2>
                <div className="w-16 h-1 bg-white mx-auto rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                {/* CARD 1 - LASANHA */}
                <div className="glass-panel p-6 flex flex-col gap-3 justify-center items-center text-center shadow-lg hover:translate-y-[-4px] transition-all duration-300 rounded-[24px]">
                  <span className="text-4xl">🍝</span>
                  <h3 className="font-display font-bold text-white text-xl">Adora Macarrão</h3>
                  <p className="text-white/80 text-sm px-4 leading-relaxed">O maior entusiasta de massas que você já conheceu.</p>
                </div>

                {/* CARD 2 - SONECAS */}
                <div className="glass-panel p-6 flex flex-col gap-3 justify-center items-center text-center shadow-lg hover:translate-y-[-4px] transition-all duration-300 rounded-[24px]">
                  <span className="text-4xl">😴</span>
                  <h3 className="font-display font-bold text-white text-xl">Mestre das Sonecas</h3>
                  <p className="text-white/80 text-sm px-4 leading-relaxed">Sempre pronto para uma soneca de 18 horas seguidas.</p>
                </div>

                {/* CARD 3 - AMOR */}
                <div className="glass-panel p-6 flex flex-col gap-3 justify-center items-center text-center shadow-lg hover:translate-y-[-4px] transition-all duration-300 rounded-[24px]">
                  <span className="text-4xl">🧡</span>
                  <h3 className="font-display font-bold text-white text-xl">Cheio de Amor</h3>
                  <p className="text-white/80 text-sm px-4 leading-relaxed">Pode parecer ranzinza, mas tem o coração gigante.</p>
                </div>
              </div>
            </div>

            {/* ADOPT MODAL */}
            {showAdoptModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-sm animate-fade-in" id="modal-adote-me">
                <div className="w-full max-w-md bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-2xl relative animate-scale-up">
                  {/* Modal Header */}
                  <div className="bg-[#FF6B2B] text-white p-6 relative">
                    <button 
                      onClick={() => setShowAdoptModal(false)}
                      className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/35 flex items-center justify-center transition-colors cursor-pointer"
                      id="btn-close-modal"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl">
                        🐈
                      </div>
                      <div>
                        <h3 className="font-display font-extrabold text-xl text-white">Quero Adotar o Garfield!</h3>
                        <p className="text-white/80 text-xs font-medium">Preencha e entraremos em contato</p>
                      </div>
                    </div>
                  </div>

                  {/* Modal Body / Form */}
                  <div className="p-6">
                    {modalSuccess ? (
                      <div className="text-center py-8 space-y-4 animate-scale-up" id="modal-success-screen">
                        <div className="w-16 h-16 rounded-full bg-green-100 border border-green-200 mx-auto flex items-center justify-center text-green-500">
                          <CheckCircle2 className="w-10 h-10" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-display font-bold text-lg text-gray-900">Mensagem Enviada!</h4>
                          <p className="text-gray-600 text-sm max-w-xs mx-auto">
                            Obrigado por querer dar um lar ao Garfield! Retornaremos no telefone <strong className="text-gray-800">{telefone}</strong> muito em breve. 🧡
                          </p>
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handleAdoptSubmit} className="space-y-4" id="form-adote">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Seu Nome Completo</label>
                          <input 
                            type="text" 
                            required
                            placeholder="Ex: João da Silva"
                            value={userAdoptName}
                            onChange={(e) => setUserAdoptName(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-[#FF6B2B] focus:bg-white transition-colors text-sm"
                            id="input-adopt-name"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Por que você quer adotar o Garfield?</label>
                          <textarea 
                            required
                            rows={3}
                            placeholder="Conte um pouco sobre sua casa e se você sabe fazer macarrão..."
                            value={userAdoptMsg}
                            onChange={(e) => setUserAdoptMsg(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-[#FF6B2B] focus:bg-white transition-colors text-sm resize-none"
                            id="input-adopt-message"
                          />
                        </div>

                        <div className="bg-orange-50 border border-orange-100 rounded-xl p-3.5 flex items-start space-x-3 text-xs text-orange-950 font-medium">
                          <PhoneCall className="w-4 h-4 text-[#FF6B2B] shrink-0 mt-0.5" />
                          <span>
                            Ao enviar, salvaremos seu interesse em nossa lista. Você também pode falar conosco imediatamente ligando para <strong className="text-[#FF6B2B]">{telefone}</strong>.
                          </span>
                        </div>

                        <button 
                          type="submit"
                          className="w-full bg-[#FF6B2B] hover:bg-[#E05318] active:scale-95 text-white font-bold py-3.5 rounded-xl uppercase tracking-wider text-xs shadow-md shadow-orange-500/10 flex items-center justify-center space-x-2 transition-all duration-200 cursor-pointer"
                          id="btn-adopt-submit"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Enviar Proposta de Adoção</span>
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* VIEW 2: TELA DE LOGIN */}
        {currentView === 'login' && (
          <div className="w-full max-w-md mx-auto flex flex-col space-y-6 animate-fade-in" id="view-login">
            
            {/* LOGIN CONTEXT CARD */}
            <div className="glass border border-white/50 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden flex flex-col">
              
              {/* Internal Accent Blob */}
              <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-[#FF6B2B]/20 blur-xl"></div>
              
              {/* Form Header */}
              <div className="text-center space-y-2 mb-8 relative">
                <div className="w-14 h-14 rounded-2xl bg-[#FF6B2B] mx-auto flex items-center justify-center shadow-md shadow-orange-500/20 text-2xl text-white">
                  🐾
                </div>
                <h2 className="font-display font-black text-2xl text-gray-900 tracking-tight">
                  Área Administrativa
                </h2>
                <p className="text-xs text-gray-600">
                  Gerencie as informações de contato do Garfield
                </p>
              </div>

              {/* Error Message banner with smooth check */}
              {loginError && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-2xl p-4 mb-6 flex items-start space-x-3 animate-err-shake" id="login-error-alert">
                  <ShieldAlert className="w-4.5 h-4.5 shrink-0 text-red-500 mt-0.5" />
                  <span>{loginError}</span>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleLoginSubmit} className="space-y-5" id="form-login">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Usuário</label>
                  <input 
                    type="text"
                    required
                    placeholder="admin"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-white/60 border border-white/50 rounded-2xl px-4 py-3.5 text-sm text-gray-900 outline-none focus:bg-white focus:border-[#FF6B2B] focus:shadow-md transition-all placeholder:text-gray-400"
                    id="input-login-user"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Senha</label>
                  <input 
                    type="password"
                    required
                    placeholder="••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/60 border border-white/50 rounded-2xl px-4 py-3.5 text-sm text-gray-900 outline-none focus:bg-white focus:border-[#FF6B2B] focus:shadow-md transition-all placeholder:text-gray-400"
                    id="input-login-pass"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={isLogginIn}
                  className="w-full bg-[#FF6B2B] hover:bg-[#E05318] active:scale-95 text-white font-bold py-4 rounded-full uppercase tracking-wider text-xs shadow-lg shadow-orange-500/25 flex items-center justify-center space-x-2 transition-all duration-200 cursor-pointer disabled:opacity-50"
                  id="btn-login-submit"
                >
                  {isLogginIn ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <UserCheck className="w-4 h-4" />
                      <span>Entrar</span>
                    </>
                  )}
                </button>
              </form>

              {/* Back to Home Link */}
              <button 
                onClick={() => setCurrentView('home')}
                className="mt-6 text-center text-sm font-semibold text-gray-700 hover:text-[#FF6B2B] flex items-center justify-center space-x-1.5 cursor-pointer self-center"
                id="link-back-landing"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Voltar para o início</span>
              </button>
            </div>

            {/* QUICK PREFILL / ATALHOS CARD */}
            <div className="glass border border-white/40 rounded-3xl p-5 backdrop-blur-md shadow-lg" id="card-快捷方式-shortcuts">
              <div className="flex items-center space-x-2 text-orange-950 font-bold text-sm mb-3.5">
                <Zap className="w-4 h-4 text-orange-600 fill-[#FF6B2B]/20" />
                <h4>Atalhos de acesso rápido</h4>
              </div>

              {/* Admin Chip Tooltip Button */}
              <button 
                onClick={applyShortcut}
                className="w-full flex items-center justify-between p-3.5 bg-white/70 border-2 border-orange-200/50 hover:border-[#FF6B2B] rounded-2xl transition-all duration-200 group text-left cursor-pointer hover:bg-white"
                id="btn-shortcut-admin"
              >
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#FFF3ED] text-[#FF6B2B] flex items-center justify-center font-bold text-xs shadow-inner">
                    AD
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-gray-800 uppercase tracking-tight">Acesso Admin</p>
                    <p className="text-[10px] text-gray-500 font-medium">Preencher dados automaticamente</p>
                  </div>
                </div>
                <div className="flex bg-[#FFF3ED] border border-[#FF6B2B]/20 text-[#FF6B2B] font-mono text-[10px] font-bold px-2 py-0.5 rounded-md group-hover:bg-[#FF6B2B] group-hover:text-white transition-colors">
                  admin / 123456
                </div>
              </button>
            </div>

          </div>
        )}

        {/* VIEW 3: PAINEL ADMINISTRATIVO */}
        {currentView === 'admin' && (
          <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row gap-6 lg:gap-8 items-stretch animate-fade-in" id="view-admin">
            
            {/* SIDEBAR FOR DESKTOP / TOP BANNER FOR MOBILE */}
            <aside className="w-full md:w-64 bg-white/35 backdrop-blur-md border border-white/40 rounded-3xl p-6 flex flex-col justify-between shadow-lg shrink-0" id="admin-sidebar">
              <div className="space-y-6">
                <div className="text-left">
                  <p className="text-xs font-bold text-[#FF6B2B] uppercase tracking-wider">Painel Administrativo</p>
                  <h3 className="font-display font-extrabold text-xl text-gray-900">Configurações</h3>
                </div>

                {/* Navigation Items */}
                <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0" id="admin-nav-menu">
                  <button 
                    onClick={() => setActiveTab('telefone')}
                    className={`w-full text-left flex items-center space-x-3 px-4 py-3 rounded-2xl font-bold text-sm transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                      activeTab === 'telefone' 
                        ? 'bg-[#FF6B2B] text-white shadow-md' 
                        : 'bg-white/45 text-gray-700 hover:bg-white/80 border border-white/20'
                    }`}
                    id="nav-tab-phone"
                  >
                    <Phone className="w-4 h-4 shrink-0" />
                    <span>Telefone de Contato</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('sobre')}
                    className={`w-full text-left flex items-center space-x-3 px-4 py-3 rounded-2xl font-bold text-sm transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                      activeTab === 'sobre' 
                        ? 'bg-[#FF6B2B] text-white shadow-md' 
                        : 'bg-white/45 text-gray-700 hover:bg-white/80 border border-white/20'
                    }`}
                    id="nav-tab-info"
                  >
                    <Cat className="w-4 h-4 shrink-0" />
                    <span>Cadastrar Gato</span>
                  </button>
                </nav>
              </div>

              {/* Sidebar decorative details (Desktop only) */}
              <div className="hidden md:block bg-[#FFF3ED] border border-orange-100 rounded-2xl p-4 text-xs text-orange-950 font-medium">
                <span className="block font-bold text-orange-600 mb-1">Dica de Suporte:</span>
                O telefone configurado aqui será atualizado em tempo real na Landing Page e no modal de adoções.
              </div>
            </aside>

            {/* TAB CONTAINER: DETECT CURRENT ACTIVE SIDEBAR TAB */}
            <div className="flex-grow flex flex-col" id="admin-content-container">
              
              {/* ACTIVE TAB: TELEFONE */}
              {activeTab === 'telefone' && (
                <div className="glass border border-white/50 rounded-3xl p-6 md:p-8 flex flex-col space-y-6 md:space-y-8 animate-fade-in h-full justify-between" id="tab-content-phone">
                  <div className="space-y-5">
                    <div className="border-b border-orange-200/40 pb-4">
                      <h3 className="font-display font-black text-2xl text-gray-900 tracking-tight flex items-center">
                        <Phone className="w-6 h-6 mr-2.5 text-[#FF6B2B]" />
                        Gerenciar Telefone
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        Atualize as informações de contato telefônico exibidas na landing page.
                      </p>
                    </div>

                    {/* PHONE PREVIEW (DADOS ATUAIS) */}
                    <div className="bg-[#FFF3ED]/60 border border-orange-100 rounded-3xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="text-left">
                        <p className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">Atualmente Ativo</p>
                        <p className="text-2xl font-display font-black text-gray-900 mt-1" id="lbl-admin-phone-preview">
                          {telefone}
                        </p>
                      </div>
                      <span className="inline-flex self-start sm:self-center bg-green-100 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full border border-green-200">
                        <Check className="w-3.5 h-3.5 mr-1" />
                        Online
                      </span>
                    </div>

                    {/* EDIT FORM */}
                    <form onSubmit={handleSaveTelefone} className="space-y-4" id="form-edit-tele">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Novo Telefone de Contato</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                            📞
                          </div>
                          <input 
                            type="text"
                            required
                            maxLength={15}
                            placeholder="(11) 98765-4321"
                            value={editTelefone}
                            onChange={(e) => formatPhoneAndSet(e.target.value)}
                            className="w-full bg-white/70 border border-white/60 rounded-2xl pl-11 pr-4 py-3.5 text-base text-gray-900 outline-none focus:bg-white focus:border-[#FF6B2B] focus:shadow-md transition-all font-mono"
                            id="input-admin-phone"
                          />
                        </div>
                        <p className="text-[10px] text-gray-500">Formatted format: <strong className="font-mono bg-gray-100/50 px-1.5 py-0.5 rounded">(99) 99999-9999</strong></p>
                      </div>

                      {/* Success confirmation alert inside parent */}
                      {saveSuccess && (
                        <div className="bg-green-50 border border-green-200 text-green-700 text-sm font-semibold rounded-2xl p-4 animate-scale-up flex items-center space-x-3" id="save-success-alert">
                          <span className="text-xl">✅</span>
                          <span>Telefone de contato atualizado e sincronizado com sucesso!</span>
                        </div>
                      )}

                      <button 
                        type="submit"
                        className="bg-[#FF6B2B] hover:bg-[#E05318] active:scale-95 text-white font-bold px-6 py-4 rounded-xl uppercase tracking-wider text-xs shadow-md shadow-orange-500/10 flex items-center justify-center space-x-2 transition-all duration-250 cursor-pointer w-full sm:w-auto"
                        id="btn-admin-save-phone"
                      >
                        <Save className="w-4 h-4" />
                        <span>Salvar alterações</span>
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* ACTIVE TAB: SOBRE / OUTROS CADASTROS (Rich details to satisfy premium requirements) */}
              {activeTab === 'sobre' && (
                <div className="glass border border-white/50 rounded-3xl p-6 md:p-8 flex flex-col space-y-6 md:space-y-12 animate-fade-in" id="tab-content-info">
                  <div className="space-y-4">
                    <div className="border-b border-orange-200/40 pb-4">
                      <h3 className="font-display font-black text-2xl text-gray-900 tracking-tight flex items-center">
                        <Cat className="w-6 h-6 mr-2.5 text-[#FF6B2B]" />
                        Cadastrar Novo Felino
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        Área de rascunhos para registrar novos mascotes ao site no futuro.
                      </p>
                    </div>

                    <div className="border-2 border-dashed border-orange-300/40 bg-orange-50/20 rounded-3xl p-8 text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-500 mx-auto flex items-center justify-center text-3xl">
                        🔒
                      </div>
                      <div className="space-y-1.5 max-w-sm mx-auto">
                        <h4 className="font-display font-bold text-lg text-gray-900">Área Exclusiva (Plano Premium)</h4>
                        <p className="text-gray-500 text-sm">
                          Atualmente a plataforma "Adote meu Gato" é focada de forma exclusiva no Garfield de acordo com as regras de negócio vigentes do abrigo.
                        </p>
                      </div>
                      <button 
                        onClick={() => alert("O Garfield é o mascote oficial e único sob esta campanha! Não há mais felinos cadastrados.")}
                        className="bg-[#FF6B2B]/10 hover:bg-[#FF6B2B]/20 text-[#FF6B2B] text-xs font-bold px-4 py-2 rounded-full cursor-pointer transition-colors"
                        id="btn-drafts-info"
                      >
                        Entender restrição
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="w-full text-center py-4 border-t border-white/10 mt-8" id="footer-landing">
        <p className="text-xs md:text-sm text-amber-950/70 font-medium">
          © 2026 Adote meu Gato — Feito com 🧡 para o Garfield
        </p>
      </footer>

      {/* Keyframe embedded styles for custom animation tags (e.g. err-shake, spin-slow, fade-in, scale-up) */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes errShake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-6px); }
          40%, 80% { transform: translateX(6px); }
        }
        .animate-fade-in {
          animation: fadeIn 320ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-scale-up {
          animation: scaleUp 280ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .animate-err-shake {
          animation: errShake 450ms ease-in-out;
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
