#!/usr/bin/env node

/**
 * SciMSPT Portfolio Shorts - UK/US Native Voice Generator
 * Uses z-ai CLI for TTS generation
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'audio', 'portfolio-shorts');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Portfolio shorts content with UK/US voice assignments
const PORTFOLIO_SHORTS = [
  {
    id: 'P12',
    name: 'Helios Tandem',
    voice: 'jam', // British RP
    speed: 0.95,
    text: `Welcome to Portfolio Short P12: Helios Tandem.

Helios Tandem represents the cutting edge of solar photovoltaic technology. They've achieved something remarkable: perovskite-on-silicon tandem cells with over thirty percent module efficiency.

Let me break down why this matters. Traditional silicon solar panels max out around twenty-two percent efficiency. Helios Tandem's technology pushes this to thirty percent and beyond, all while maintaining cost parity with conventional mono-crystalline silicon.

Their total addressable market? Thirty-two billion dollars. This isn't incremental improvement. This is a paradigm shift in renewable energy generation.

The science is elegant. By layering perovskite crystals atop standard silicon wafers, they capture different wavelengths of light. The silicon handles infrared, while the perovskite layer absorbs visible spectrum photons that would otherwise be wasted.

Four peer-reviewed papers validate their approach. Tier-one venture backing. Manufacturing partnerships in place.

Helios Tandem isn't just building better solar panels. They're redefining what's possible in photovoltaic efficiency at scale.`
  },
  {
    id: 'P-ai-materials',
    name: 'Lattice Forge',
    voice: 'kazi', // American Standard
    speed: 1.0,
    text: `Portfolio Short P-ai-materials: Lattice Forge.

Think of Lattice Forge as the AlphaFold for materials discovery. While DeepMind's AlphaFold revolutionized protein structure prediction, Lattice Forge applies similar machine learning techniques to crystalline materials.

Here's their value proposition. Battery manufacturers need new electrode materials. Catalyst designers seek novel compounds. Semiconductor companies require next-generation substrates. Traditional discovery methods take years. Lattice Forge does it in weeks.

Their AI models screen millions of crystal structures, predicting stability, electronic properties, and synthesis pathways. They don't just predict; they validate. Vertical-integrated wet labs confirm computational predictions.

The business model sells screened candidate structures to battery OEMs, catalyst companies, and semiconductor foundries. Each customer gets proprietary material designs tailored to their specific performance requirements.

Four foundational papers establish their methodology. Tier-one status in our scoring matrix.

Lattice Forge transforms materials science from trial-and-error to predictive engineering.`
  },
  {
    id: 'P3',
    name: 'Solid State Labs',
    voice: 'douji', // American Natural
    speed: 1.05,
    text: `P3: Solid State Labs. The future of electric vehicle batteries.

Solid-state batteries represent the holy grail of energy storage. Higher energy density. Faster charging. Improved safety. No fire risk from liquid electrolytes.

Solid State Labs has cracked the code on sulfide-based solid electrolytes. Their cells achieve four hundred fifty watt-hours per kilogram at the cell level. That's nearly double current lithium-ion performance.

But here's what makes them special. Their batteries drop into existing EV form factors. No retooling required. Automakers can upgrade without redesigning vehicle platforms.

Their roadmap shows pilot line operation by month eighteen. First OEM qualification by month twenty-four. This isn't lab-scale research. It's commercialization timeline.

Five papers detail their sulfide electrolyte synthesis and cell architecture. Tier-one classification.

Solid State Labs will power the next generation of electric transportation.`
  },
  {
    id: 'P5',
    name: 'Hydrogen Forge',
    voice: 'jam', // British RP
    speed: 0.95,
    text: `Portfolio Short P5: Hydrogen Forge. Green hydrogen at unprecedented efficiency.

Decarbonizing heavy industry requires more than electrification. Steel production, chemical manufacturing, high-temperature processes—these need hydrogen. And not just any hydrogen. Green hydrogen, produced without carbon emissions.

Hydrogen Forge delivers solid-oxide electrolysis cells achieving eighty-five percent system efficiency. That's significantly above conventional alkaline or PEM electrolyzers.

Their turnkey green-hydrogen plants serve two primary markets. Industrial heat applications requiring temperatures beyond electricity's reach. Ammonia production for fertilizer and shipping fuel.

The levelized cost of hydrogen matters immensely. Hydrogen Forge achieves the lowest LCOH in the industry through thermal integration and stack durability innovations.

Four papers document their cell architecture and system optimization. Tier-two status, but only because market adoption lags technology readiness.

Hydrogen Forge enables deep decarbonization of sectors electrification cannot reach.`
  },
  {
    id: 'P9',
    name: 'TMD Logic',
    voice: 'kazi', // American Standard
    speed: 1.0,
    text: `P9: TMD Logic. Enabling the post-silicon era of semiconductors.

Transition-metal dichalcogenides, or TMDs, represent the most promising beyond-silicon material system. Molybdenum disulfide, tungsten diselenide—these atomically thin layers exhibit extraordinary electronic properties.

TMD Logic synthesizes wafer-scale TMD films ready for semiconductor manufacturing. Not research samples. Production-quality wafers that foundries can actually use.

Their customers include leading-edge chipmakers exploring two-nanometer CMOS alternatives. Research institutions pushing quantum computing boundaries. Sensor companies needing ultra-thin active layers.

The challenge has always scalability. Lab demonstrations are easy. Wafer-scale uniformity at commercial throughput is extraordinarily difficult. TMD Logic appears to have solved this.

Four papers characterize their deposition process and material quality metrics. Tier-two enabler status.

TMD Logic provides the essential substrate for next-generation electronics.`
  },
  {
    id: 'P-cmos-2nm',
    name: 'Atomic Gate Systems',
    voice: 'jam', // British RP
    speed: 0.92,
    text: `Portfolio Short P-cmos-2nm: Atomic Gate Systems. Two-nanometer transistor technology.

Moore's Law continues, but the physics grow increasingly challenging. At two nanometers, quantum effects dominate. Traditional transistor designs fail. New architectures emerge.

Atomic Gate Systems develops gate-all-around transistor structures using vertically-stacked nanosheets. This architecture provides superior electrostatic control compared to FinFET predecessors, enabling continued scaling.

Their business model: intellectual property licensing to tier-one foundries. Capital-light. Royalty-heavy. They design; partners manufacture.

The total addressable market spans every advanced chip produced globally. Mobile processors. Data center accelerators. Artificial intelligence hardware. All require the transistors Atomic Gate Systems is inventing.

Four papers describe their nanosheet fabrication and device characterization. Tier-one scale-play classification.

Atomic Gate Systems defines how humanity computes at the atomic frontier.`
  },
  {
    id: 'P11',
    name: 'Carbon Sink',
    voice: 'douji', // American Natural
    speed: 1.05,
    text: `P11: Carbon Sink. Orbital data centers powered by space-based solar.

Artificial intelligence demands enormous computation. Training large language models consumes gigawatt-hours of electricity. Data centers emit megatons of carbon. The environmental footprint grows exponentially.

Carbon Sink proposes an audacious solution. Move data centers to low Earth orbit. Power them with solar arrays operating twenty-four seven, unobscured by atmosphere or night. Cool them with the infinite heat sink of space. Transmit results via optical downlink to ground stations.

Their liquid-cooled GPU pods achieve unprecedented density by leveraging microgravity cooling advantages. No fans required. No chillers. Just efficient thermal transfer in vacuum.

The result: one hundred percent elimination of grid-side carbon emissions from large-model training. Clean artificial intelligence, literally out of this world.

Four papers analyze orbital mechanics, power systems, and communication latency. Tier-one status with transformative potential.

Carbon Sink makes sustainable AI not just possible, but inevitable.`
  }
];

// Generate audio using z-ai CLI
async function generateAudio(short) {
  const filename = `${short.id}_${short.voice}.mp3`;
  const outputPath = path.join(OUTPUT_DIR, filename);
  
  console.log(`\n🎙️  Generating: ${short.name} (${short.id})`);
  console.log(`   Voice: ${short.voice}`);
  console.log(`   Speed: ${short.speed}x`);
  
  try {
    // Use z-ai CLI for TTS
    const cmd = `z-ai tts -i "${short.text.replace(/"/g, '\\"')}" -o "${outputPath}" -v ${short.voice} -s ${short.speed} -f mp3`;
    
    execSync(cmd, { stdio: 'inherit', timeout: 60000 });
    
    if (fs.existsSync(outputPath)) {
      const stats = fs.statSync(outputPath);
      const sizeKB = (stats.size / 1024).toFixed(1);
      console.log(`   ✅ Generated: ${sizeKB} KB`);
      return { success: true, file: filename, size: stats.size };
    } else {
      throw new Error('Output file not created');
    }
  } catch (error) {
    console.error(`   ❌ Error:`, error.message);
    return { success: false, error: error.message };
  }
}

// Main execution
async function main() {
  console.log('╔══════════════════════════════════════════════════════╗');
  console.log('║  SciMSPT Portfolio Shorts - UK/US Voice Generator     ║');
  console.log('║  Native English Voices Only                           ║');
  console.log('╚══════════════════════════════════════════════════════╝');
  console.log(`\n📁 Output Directory: ${OUTPUT_DIR}`);
  console.log(`📝 Total Shorts: ${PORTFOLIO_SHORTS.length}\n`);
  
  const results = [];
  
  for (const short of PORTFOLIO_SHORTS) {
    const result = await generateAudio(short);
    results.push({ ...short, ...result });
    
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  // Summary
  console.log('\n═══════════════════════════════════════════════════════');
  console.log('📊 Generation Summary:');
  console.log('═══════════════════════════════════════════════════════');
  
  const successful = results.filter(r => r.success).length;
  console.log(`✅ Successful: ${successful}/${results.length}`);
  console.log(`❌ Failed: ${results.length - successful}/${results.length}\n`);
  
  results.forEach(r => {
    const icon = r.success ? '✅' : '❌';
    console.log(`${icon} ${r.id}: ${r.name} (${r.voice})${r.success ? ` → ${r.file}` : ''}`);
  });
  
  // Generate manifest
  const manifest = {
    generatedAt: new Date().toISOString(),
    voicePolicy: 'UK/US NATIVE ONLY',
    voices: {
      'jam': 'British RP (Received Pronunciation)',
      'kazi': 'American Standard English', 
      'douji': 'American Natural Flow'
    },
    shorts: results.map(r => ({
      id: r.id,
      name: r.name,
      voice: r.voice,
      file: r.file || null,
      success: r.success,
      duration: '~60 seconds'
    }))
  };
  
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'manifest.json'),
    JSON.stringify(manifest, null, 2)
  );
  
  console.log('\n📄 Manifest saved: manifest.json');
  console.log('\n🎉 Voice generation complete!');
}

main().catch(console.error);
