'use client';

import { useState, useEffect, useCallback } from 'react';

const CLIPS = [
  {
    id: 'P12',
    name: 'Helios Tandem Photovoltaics',
    icon: '☀️',
    desc: 'Advanced photovoltaic tandem cell architecture achieving record efficiency through novel materials integration.',
    voiceType: 'uk' as const,
    voiceLabel: 'British RP',
  },
  {
    id: 'P-AI',
    name: 'Lattice Forge — AI Materials Discovery',
    icon: '🔬',
    desc: 'AI-accelerated discovery of next-generation lattice materials for quantum computing applications.',
    voiceType: 'us' as const,
    voiceLabel: 'American Standard',
  },
  {
    id: 'P11',
    name: 'Carbon Sink Bioengineering',
    icon: '🌿',
    desc: 'Novel carbon capture methodology using bio-engineered microorganisms for industrial emissions reduction.',
    voiceType: 'us' as const,
    voiceLabel: 'American Natural',
  },
  {
    id: 'P3',
    name: 'Solid State Battery Labs',
    icon: '🔋',
    desc: 'Breakthrough in solid-state electrolyte conductivity enabling next-generation battery performance.',
    voiceType: 'us' as const,
    voiceLabel: 'American Standard',
  },
  {
    id: 'P5',
    name: 'Hydrogen Forge Production',
    icon: '💧',
    desc: 'Green hydrogen production via photocatalytic water splitting at industrial scale feasibility.',
    voiceType: 'uk' as const,
    voiceLabel: 'British RP',
  },
  {
    id: 'P9',
    name: 'TMD Logic Gates',
    icon: '💻',
    desc: 'Transition metal dichalcogenide logic gates for post-silicon computing architectures.',
    voiceType: 'uk' as const,
    voiceLabel: 'British RP',
  },
  {
    id: 'P-CMOS',
    name: 'Atomic Gate CMOS Systems',
    icon: '⚛️',
    desc: 'Sub-two-nanometer CMOS transistor design overcoming quantum tunneling limitations.',
    voiceType: 'us' as const,
    voiceLabel: 'American Standard',
  }
];

export default function VoicePlayerPage() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedUkVoice, setSelectedUkVoice] = useState('');
  const [selectedUsVoice, setSelectedUsVoice] = useState('');
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const loadVoices = () => {
      const v = speechSynthesis.getVoices();
      if (v.length > 0) {
        setVoices(v);
        const uk = v.find(voice => voice.lang.includes('GB'));
        const us = v.find(voice => voice.lang.includes('US'));
        if (uk) setSelectedUkVoice(uk.name);
        if (us) setSelectedUsVoice(us.name);
      }
    };
    loadVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const playClip = (index: number) => {
    if (index === currentIndex && isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    speechSynthesis.cancel();
    setCurrentIndex(index);
    
    const clip = CLIPS[index];
    const selectedName = clip.voiceType === 'uk' ? selectedUkVoice : selectedUsVoice;
    const voice = voices.find(v => v.name === selectedName);

    console.log(`Playing: ${clip.name} with voice: ${voice?.name || 'default'}`);

    const utterance = new SpeechSynthesisUtterance(clip.desc);
    if (voice) {
      utterance.voice = voice;
    }
    utterance.rate = 0.90;
    utterance.pitch = 0.92;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = (e) => {
      console.error('Speech error:', e);
      setIsSpeaking(false);
    };

    speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen bg-[#0a0a14] text-white p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center p-10 mb-8 rounded-3xl bg-gradient-to-br from-indigo-500/10 to-amber-500/5 border border-white/10">
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-indigo-400 bg-clip-text text-transparent">
            🎙️ SciCMP Portfolio Shorts
          </h1>
          <p className="text-gray-400 mb-6">
            Research clips with native male voice narrations
          </p>
          
          {/* Voice Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mt-6">
            <div className="text-left">
              <label className="block text-xs text-gray-500 mb-2">🇬🇧 British RP Voice</label>
              <select 
                value={selectedUkVoice}
                onChange={(e) => setSelectedUkVoice(e.target.value)}
                className="w-full p-3 bg-black/30 border border-white/10 rounded-xl text-white text-sm"
              >
                {voices.filter(v => v.lang.includes('GB') || v.lang.startsWith('en')).map((v, i) => (
                  <option key={i} value={v.name}>{v.name} ({v.lang})</option>
                ))}
              </select>
            </div>
            <div className="text-left">
              <label className="block text-xs text-gray-500 mb-2">🇺🇸 American Standard Voice</label>
              <select 
                value={selectedUsVoice}
                onChange={(e) => setSelectedUsVoice(e.target.value)}
                className="w-full p-3 bg-black/30 border border-white/10 rounded-xl text-white text-sm"
              >
                {voices.filter(v => v.lang.includes('US') || v.lang.startsWith('en')).map((v, i) => (
                  <option key={i} value={v.name}>{v.name} ({v.lang})</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Clips */}
        <div className="space-y-4">
          {CLIPS.map((clip, i) => (
            <div 
              key={i} 
              className={`p-6 rounded-2xl border transition-all ${
                currentIndex === i 
                  ? 'bg-emerald-500/10 border-emerald-500' 
                  : 'bg-white/[0.03] border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-4 mb-3">
                <span className="text-4xl">{clip.icon}</span>
                <div>
                  <h2 className="text-lg font-semibold">{clip.name}</h2>
                  <span className="text-xs text-gray-600 font-mono px-2 py-1 bg-white/5 rounded">
                    {clip.id}
                  </span>
                </div>
              </div>

              <p className="text-gray-400 text-sm mb-4 leading-relaxed">{clip.desc}</p>

              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold ${
                clip.voiceType === 'uk' 
                  ? 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/25' 
                  : 'bg-amber-500/15 text-amber-300 border border-amber-500/25'
              }`}>
                <span className={`w-2 h-2 rounded-full ${clip.voiceType === 'uk' ? 'bg-indigo-400' : 'bg-amber-400'} ${isSpeaking && currentIndex === i ? 'animate-pulse' : ''}`} />
                {clip.voiceType === 'uk' ? '🇬🇧' : '🇺🇸'} {clip.voiceLabel}
              </div>

              <div className="flex items-center gap-4 mt-4">
                <button
                  onClick={() => playClip(i)}
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                    isSpeaking && currentIndex === i
                      ? 'bg-red-500 hover:bg-red-600'
                      : 'bg-gradient-to-br from-emerald-400 to-emerald-500 hover:scale-105'
                  }`}
                >
                  {isSpeaking && currentIndex === i ? (
                    <svg viewBox="0 0 24 24" fill="#000" width="20" height="20">
                      <rect x="6" y="4" width="4" height="16" rx="1" />
                      <rect x="14" y="4" width="4" height="16" rx="1" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="#000" width="20" height="20" style={{ marginLeft: '2px' }}>
                      <polygon points="7,4 20,12 7,20" />
                    </svg>
                  )}
                </button>

                <div className="flex-1">
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all ${isSpeaking && currentIndex === i ? 'w-full bg-gradient-to-r from-emerald-400 to-emerald-300' : 'w-0'}`}
                    />
                  </div>
                </div>

                <span className={`text-xs px-3 py-1.5 rounded-lg min-w-[70px] text-center ${
                  isSpeaking && currentIndex === i 
                    ? 'bg-red-500/10 text-red-400 animate-pulse' 
                    : 'bg-emerald-500/10 text-emerald-400'
                }`}>
                  {isSpeaking && currentIndex === i ? 'Speaking' : 'Ready'}
                </span>
              </div>
            </div>
          ))}
        </div>

        <footer className="text-center mt-12 pt-8 border-t border-white/5 text-gray-600 text-sm">
          Web Speech API · Native system voices<br/>
          <span className="text-gray-700">Press F12 → Console to see active voice</span>
        </footer>
      </div>
    </div>
  );
}
