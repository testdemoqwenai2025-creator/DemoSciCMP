#!/usr/bin/env node

/**
 * SciMSPT Portfolio Shorts - UK/US Native Voice Generator v2
 * Fixed: Text under 1024 chars, using WAV format
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'audio', 'portfolio-shorts');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Portfolio shorts - SHORTENED text under 1024 chars with UK/US voices
const PORTFOLIO_SHORTS = [
  {
    id: 'P12',
    name: 'Helios Tandem',
    voice: 'jam',
    speed: 0.95,
    text: `Portfolio P12: Helios Tandem. Perovskite-silicon solar cells achieving over thirty percent efficiency. Traditional panels max out at twenty-two percent. Their technology captures more light by layering perovskite crystals on silicon wafers. Thirty-two billion dollar total addressable market. Four peer-reviewed papers validate their approach. Helios Tandem redefines photovoltaic efficiency at scale.`
  },
  {
    id: 'P-ai-materials',
    name: 'Lattice Forge',
    voice: 'kazi',
    speed: 1.0,
    text: `Portfolio P-ai-materials: Lattice Forge. The AlphaFold for materials discovery. AI models screen millions of crystal structures, predicting stability and electronic properties. They sell screened candidates to battery OEMs and semiconductor foundries. Vertical-integrated wet labs confirm predictions. Four foundational papers establish their methodology. Lattice Forge transforms materials science from trial-and-error to predictive engineering.`
  },
  {
    id: 'P3',
    name: 'Solid State Labs',
    voice: 'douji',
    speed: 1.05,
    text: `Portfolio P3: Solid State Labs. Solid-state batteries with sulfide electrolytes achieving four hundred fifty watt-hours per kilogram. Nearly double current lithium-ion performance. Batteries drop into existing EV form factors. Pilot line operational by month eighteen. Five papers detail their architecture. Solid State Labs powers the next generation of electric transportation.`
  },
  {
    id: 'P5',
    name: 'Hydrogen Forge',
    voice: 'jam',
    speed: 0.95,
    text: `Portfolio P5: Hydrogen Forge. Green hydrogen at eighty-five percent system efficiency via solid-oxide electrolysis. Turnkey plants serve industrial heat and ammonia production markets. Achieves lowest levelized cost of hydrogen in the industry. Four papers document their cell architecture. Hydrogen Forge enables deep decarbonization beyond electrification reach.`
  },
  {
    id: 'P9',
    name: 'TMD Logic',
    voice: 'kazi',
    speed: 1.0,
    text: `Portfolio P9: TMD Logic. Wafer-scale synthesis of transition-metal dichalcogenides for post-silicon semiconductors. Production-quality wafers for chipmakers exploring two-nanometer alternatives. Solved the scalability challenge that blocked commercialization. Four papers characterize their deposition process. TMD Logic provides essential substrate for next-generation electronics.`
  },
  {
    id: 'P-cmos-2nm',
    name: 'Atomic Gate Systems',
    voice: 'jam',
    speed: 0.92,
    text: `Portfolio P-cmos-2nm: Atomic Gate Systems. Two-nanometer gate-all-around transistors using vertically-stacked nanosheets. IP licensing model to tier-one foundries. Capital-light, royalty-heavy. Total addressable market spans all advanced chips globally. Four papers describe nanosheet fabrication. Atomic Gate Systems defines computing at the atomic frontier.`
  },
  {
    id: 'P11',
    name: 'Carbon Sink',
    voice: 'douji',
    speed: 1.05,
    text: `Portfolio P11: Carbon Sink. Orbital data centers powered by space-based solar. GPU pods in low Earth orbit with optical downlink. Eliminates one hundred percent of grid-side carbon from AI training. Liquid-cooled systems leverage microgravity advantages. Four papers analyze orbital mechanics and power systems. Carbon Sink makes sustainable AI inevitable.`
  }
];

// Generate audio using z-ai CLI
function generateAudio(short) {
  const filename = `${short.id}_${short.voice}.wav`;
  const outputPath = path.join(OUTPUT_DIR, filename);
  
  console.log(`\n🎙️  ${short.name} (${short.id})`);
  console.log(`   Voice: ${short.voice} | Speed: ${short.speed}x | Chars: ${short.text.length}`);
  
  try {
    // Use z-ai CLI for TTS - WAV format
    const cmd = `z-ai tts -i "${short.text.replace(/"/g, '\\"')}" -o "${outputPath}" -v ${short.voice} -s ${short.speed}`;
    
    execSync(cmd, { stdio: 'pipe', timeout: 60000 });
    
    if (fs.existsSync(outputPath)) {
      const stats = fs.statSync(outputPath);
      const sizeKB = (stats.size / 1024).toFixed(1);
      console.log(`   ✅ ${sizeKB} KB`);
      return { success: true, file: filename, size: stats.size };
    }
    throw new Error('File not created');
  } catch (error) {
    console.error(`   ❌ ${error.message.slice(0, 80)}`);
    return { success: false, error: error.message };
  }
}

// Main
console.log('╔══════════════════════════════════════════╗');
console.log('║  SciMSPT Shorts - UK/US Voice Generator  ║');
console.log('╚══════════════════════════════════════════╝\n');

const results = PORTFOLIO_SHORTS.map(short => {
  const result = generateAudio(short);
  return { ...short, ...result };
});

// Summary
console.log('\n═══════════════════════════════════════════');
const success = results.filter(r => r.success).length;
console.log(`Result: ${success}/${results.length} successful\n`);

results.forEach(r => {
  console.log(`${r.success ? '✅' : '❌'} ${r.id}: ${r.name} (${r.voice})`);
});

// Manifest
fs.writeFileSync(
  path.join(OUTPUT_DIR, 'manifest.json'),
  JSON.stringify({
    generatedAt: new Date().toISOString(),
    policy: 'UK/US NATIVE VOICES ONLY',
    voices: { jam: 'British RP', kazi: 'American Standard', douji: 'American Natural' },
    shorts: results.map(r => ({ id: r.id, name: r.name, voice: r.voice, file: r.file || null, ok: r.success }))
  }, null, 2)
);

console.log('\n📄 manifest.json saved');
