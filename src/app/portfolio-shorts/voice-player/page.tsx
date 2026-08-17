'use client';

import { useState, useEffect } from 'react';

const CLIPS = [
  { id: 'P12', name: 'Helios Tandem Photovoltaics', icon: '☀️', desc: 'Advanced photovoltaic tandem cell architecture achieving record efficiency through novel materials integration.', voiceType: 'uk' as const, voiceLabel: 'British RP' },
  { id: 'P-AI', name: 'Lattice Forge — AI Materials Discovery', icon: '🔬', desc: 'AI-accelerated discovery of next-generation lattice materials for quantum computing applications.', voiceType: 'us' as const, voiceLabel: 'American Standard' },
  { id: 'P11', name: 'Carbon Sink Bioengineering', icon: '🌿', desc: 'Novel carbon capture methodology using bio-engineered microorganisms for industrial emissions reduction.', voiceType: 'us' as const, voiceLabel: 'American Natural' },
  { id: 'P3', name: 'Solid State Battery Labs', icon: '🔋', desc: 'Breakthrough in solid-state electrolyte conductivity enabling next-generation battery performance.', voiceType: 'us' as const, voiceLabel: 'American Standard' },
  { id: 'P5', name: 'Hydrogen Forge Production', icon: '💧', desc: 'Green hydrogen production via photocatalytic water splitting at industrial scale feasibility.', voiceType: 'uk' as const, voiceLabel: 'British RP' },
  { id: 'P9', name: 'TMD Logic Gates', icon: '💻', desc: 'Transition metal dichalcogenide logic gates for post-silicon computing architectures.', voiceType: 'uk' as const, voiceLabel: 'British RP' },
  { id: 'P-CMOS', name: 'Atomic Gate CMOS Systems', icon: '⚛️', desc: 'Sub-two-nanometer CMOS transistor design overcoming quantum tunneling limitations.', voiceType: 'us' as const, voiceLabel: 'American Standard' }
];

// Known male voice names for better selection
const MALE_NAMES = ['daniel', 'david', 'oliver', 'james', 'alex', 'ryan', 'chris', 'michael', 'george', 'harry', 'thomas', 'jack', 'guy'];

export default function VoicePlayerPage() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedUk, setSelectedUk] = useState('');
  const [selectedUs, setSelectedUs] = useState('');
  const [current, setCurrent] = useState(-1);
  const [speaking, setSpeaking] = useState(false);
  const [activeVoice, setActiveVoice] = useState('');

  useEffect(() => {
    const init = () => {
      const allVoices = speechSynthesis.getVoices();
      if (allVoices.length === 0) return;
      
      setVoices(allVoices);
      
      // Log ALL available voices for debugging
      console.log('🎤 ALL AVAILABLE VOICES (' + allVoices.length + '):');
      allVoices.forEach((v, i) => {
        const isMale = MALE_NAMES.some(n => v.name.toLowerCase().includes(n));
        console.log(`   [${i}] "${v.name}" (${v.lang}) ${isMale ? '♂ MALE' : ''}`);
      });
      
      // Find best UK male voice
      const ukVoices = allVoices.filter(v => 
        v.lang.includes('GB') || v.lang.toLowerCase().includes('british')
      );
      const ukMale = ukVoices.find(v => 
        MALE_NAMES.some(n => v.name.toLowerCase().includes(n))
      ) || ukVoices[0];
      
      // Find best US male voice  
      const usVoices = allVoices.filter(v =>
        v.lang.includes('US') || v.lang.toLowerCase().includes('american')
      );
      const usMale = usVoices.find(v =>
        MALE_NAMES.some(n => v.name.toLowerCase().includes(n))
      ) || usVoices[0];
      
      if (ukMale) {
        setSelectedUk(ukMale.name);
        console.log('✅ UK VOICE SELECTED: "' + ukMale.name + '" (' + ukMale.lang + ')');
      }
      if (usMale) {
        setSelectedUs(usMale.name);
        console.log('✅ US VOICE SELECTED: "' + usMale.name + '" (' + usMale.lang + ')');
      }
    };

    init();
    
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = init;
    }
  }, []);

  const playClip = (idx: number) => {
    // Toggle off if clicking same playing clip
    if (idx === current && speaking) {
      speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    // Stop any current speech
    speechSynthesis.cancel();
    setCurrent(idx);
    
    const clip = CLIPS[idx];
    const selName = clip.voiceType === 'uk' ? selectedUk : selectedUs;
    
    // Find the actual voice object
    let voice = voices.find(v => v.name === selName);
    
    // Fallback: find ANY voice with matching language
    if (!voice) {
      const lang = clip.voiceType === 'uk' ? 'en-GB' : 'en-US';
      voice = voices.find(v => v.lang === lang || v.lang.startsWith(clip.voiceType === 'uk' ? 'en-GB' : 'en-US'));
      console.log('⚠️ Using fallback voice:', voice?.name);
    }
    
    // CRITICAL LOGGING - show exactly what's being used
    console.log('\n═══════════════════════════════════════');
    console.log('▶️ PLAYING: ' + clip.name);
    console.log('   Type: ' + (clip.voiceType === 'uk' ? '🇬🇧 BRITISH RP' : '🇺🇸 AMERICAN STANDARD'));
    console.log('   Voice Name: "' + (voice?.name || 'SYSTEM DEFAULT') + '"');
    console.log('   Voice Lang: ' + (voice?.lang || 'N/A'));
    console.log('   Voice Service: ' + ((voice as any)?.service || 'Native/System'));
    console.log('═══════════════════════════════════════\n');
    
    setActiveVoice(voice?.name || 'Default');

    // Create utterance with EXPLICIT voice
    const utterance = new SpeechSynthesisUtterance(clip.desc);
    
    // CRITICAL: Set voice BEFORE any other properties
    if (voice) {
      utterance.voice = voice;
    }
    
    // Force language to match voice
    utterance.lang = voice?.lang || (clip.voiceType === 'uk' ? 'en-GB' : 'en-US');
    
    // Male voice optimization - MORE DISTINCTIVE SETTINGS
    utterance.rate = 0.85;     // Slower = more authoritative male
    utterance.pitch = 0.80;     // Lower = clearly male
    utterance.volume = 1.0;

    utterance.onstart = () => {
      setSpeaking(true);
      console.log('✅ SPEECH STARTED - Voice: "' + utterance.voice?.name + '"');
    };
    
    utterance.onend = () => {
      setSpeaking(false);
      console.log('✅ SPEECH ENDED\n');
    };
    
    utterance.onerror = (e) => {
      console.error('❌ SPEECH ERROR:', e.error);
      setSpeaking(false);
    };

    speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen bg-[#0a0a14] text-white p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center p-10 mb-8 rounded-3xl bg-gradient-to-br from-indigo-500/10 to-emerald-500/5 border border-white/10">
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
            🎙️ SciCMP Portfolio Shorts
          </h1>
          <p className="text-gray-400 mb-2 text-lg">Native Male Voice Narrations</p>
          <p className="text-gray-500 text-sm mb-6">
            British RP · American Standard<br/>
            <span className="text-emerald-400 font-semibold">{activeVoice ? `Active: "${activeVoice}"` : 'Select voices below → Press PLAY'}</span>
          </p>
          
          {/* Voice Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mt-8">
            <div className="text-left bg-black/20 p-4 rounded-xl border border-indigo-500/20">
              <label className="block text-sm font-semibold text-indigo-300 mb-2">🇬🇧 British RP — Male Voice</label>
              <select 
                value={selectedUk}
                onChange={(e) => {
                  setSelectedUk(e.target.value);
                  console.log('🇬🇧 UK changed to:', e.target.value);
                }}
                className="w-full p-3 bg-black/40 border border-indigo-500/30 rounded-lg text-white text-sm focus:border-indigo-400 outline-none"
              >
                {voices
                  .filter(v => v.lang.includes('GB') || v.lang.startsWith('en'))
                  .map((v, i) => (
                    <option key={i} value={v.name}>
                      {v.name} ({v.lang}) {MALE_NAMES.some(n => v.name.toLowerCase().includes(n)) ? '♂' : ''}
                    </option>
                  ))
                }
              </select>
            </div>
            
            <div className="text-left bg-black/20 p-4 rounded-xl border border-amber-500/20">
              <label className="block text-sm font-semibold text-amber-300 mb-2">🇺🇸 American Standard — Male Voice</label>
              <select 
                value={selectedUs}
                onChange={(e) => {
                  setSelectedUs(e.target.value);
                  console.log('🇺🇸 US changed to:', e.target.value);
                }}
                className="w-full p-3 bg-black/40 border border-amber-500/30 rounded-lg text-white text-sm focus:border-amber-400 outline-none"
              >
                {voices
                  .filter(v => v.lang.includes('US') || v.lang.startsWith('en'))
                  .map((v, i) => (
                    <option key={i} value={v.name}>
                      {v.name} ({v.lang}) {MALE_NAMES.some(n => v.name.toLowerCase().includes(n)) ? '♂' : ''}
                    </option>
                  ))
                }
              </select>
            </div>
          </div>
        </div>

        {/* Clips Grid */}
        <div className="space-y-4">
          {CLIPS.map((clip, i) => (
            <div 
              key={i} 
              className={`p-6 rounded-2xl border transition-all duration-300 ${
                current === i && speaking
                  ? 'bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border-emerald-400 shadow-lg shadow-emerald-500/10' 
                  : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.04] hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-4 mb-3">
                <span className="text-4xl">{clip.icon}</span>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-white">{clip.name}</h2>
                  <span className="text-xs text-gray-600 font-mono px-2 py-1 bg-white/5 rounded">
                    {clip.id}
                  </span>
                </div>
                
                {/* Voice type badge */}
                <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                  clip.voiceType === 'uk' 
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' 
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}>
                  {clip.voiceType === 'uk' ? '🇬🇧 UK' : '🇺🇸 US'}
                </span>
              </div>

              <p className="text-gray-400 text-sm mb-4 leading-relaxed">{clip.desc}</p>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => playClip(i)}
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 ${
                    current === i && speaking
                      ? 'bg-red-500 hover:bg-red-600 scale-95' 
                      : 'bg-gradient-to-br from-emerald-400 to-cyan-400 hover:scale-110 hover:shadow-lg hover:shadow-emerald-500/30'
                  }`}
                >
                  {current === i && speaking ? (
                    <svg viewBox="0 0 24 24" fill="#000" width="22" height="22">
                      <rect x="6" y="4" width="4" height="16" rx="1" />
                      <rect x="14" y="4" width="4" height="16" rx="1" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="#000" width="22" height="22" style={{ marginLeft: '2px' }}>
                      <polygon points="7,4 20,12 7,20" />
                    </svg>
                  )}
                </button>

                <div className="flex-1">
                  <div className={`h-2 rounded-full overflow-hidden ${current === i && speaking ? 'bg-white/10' : 'bg-white/5'}`}>
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${
                        current === i && speaking 
                          ? 'w-full bg-gradient-to-r from-emerald-400 to-cyan-400 animate-pulse' 
                          : 'w-0'
                      }`}
                    />
                  </div>
                </div>

                <span className={`text-xs px-4 py-2 rounded-lg min-w-[80px] text-center font-medium ${
                  current === i && speaking 
                    ? 'bg-red-500/20 text-red-400 animate-pulse' 
                    : 'bg-emerald-500/10 text-emerald-400'
                }`}>
                  {current === i && speaking ? '● Speaking' : 'Ready'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 pt-8 border-t border-white/5 text-gray-600 text-sm space-y-2">
          <p>Web Speech API · System Native Voices · No Framework Overhead</p>
          <p className="text-xs text-gray-700">
            Open <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-gray-500">F12</kbd> → Console to see voice details
          </p>
          <p className="text-xs text-emerald-600/60 mt-4">
            ♂ = Known male voice · Select different voices from dropdowns to change accent
          </p>
        </footer>
      </div>
    </div>
  );
}
