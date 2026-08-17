#!/usr/bin/env node

/**
 * SciCMP TTS Voice Configuration Generator
 * 
 * Generates audio with NATIVE UK/US voices ONLY
 * For use in videos, tutorials, and announcements
 * 
 * Voice Selection Policy:
 * ✅ ALLOWED: Native United Kingdom (British) accents
 * ✅ ALLOWED: Native United States (American) accents  
 * ❌ BLOCKED: Asian-sounding voices
 * ❌ BLOCKED: African-sounding voices
 * ❌ BLOCKED: Non-UK European accents
 */

import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

// ============================================================
// VOICE CONFIGURATION - UK/US NATIVE ONLY
// ============================================================

/**
 * Approved Voices for SciCMP Content
 * 
 * Each voice is categorized by region and use case
 */
const APPROVED_VOICES = {
  // British English (UK) - Native
  uk: {
    jam: {
      name: 'jam',
      description: 'British English Gentleman',
      accent: 'Received Pronunciation (RP)',
      region: 'United Kingdom',
      characteristics: [
        'Sophisticated RP accent',
        'Clear articulation',
        'Professional tone',
        'Suitable for formal content'
      ],
      bestFor: ['Tutorials', 'Documentation', 'Professional announcements'],
      speed: 1.0,
      pitch: 1.0
    }
  },
  
  // American English (US) - Native
  us: {
    kazi: {
      name: 'kazi',
      description: 'American Standard English',
      accent: 'General American (GenAm)',
      region: 'United States',
      characteristics: [
        'Neutral American accent',
        'Clear and approachable',
        'Modern professional tone',
        'Suitable for general content'
      ],
      bestFor: ['Marketing', 'Tutorials', 'User guides'],
      speed: 1.0,
      pitch: 1.0
    },
    douji: {
      name: 'douji',
      description: 'American Natural Flow',
      accent: 'Contemporary American',
      region: 'United States',
      characteristics: [
        'Natural conversational tone',
        'Engaging and friendly',
        'Modern delivery style',
        'Suitable for casual content'
      ],
      bestFor: ['Product demos', 'Feature highlights', 'Social media'],
      speed: 1.0,
      pitch: 1.0
    }
  }
};

// Default voice for SciCMP content
const DEFAULT_VOICE = 'jam'; // British RP - sophisticated scientific tone
const FALLBACK_VOICE = 'kazi'; // American standard

// ============================================================
// TTS GENERATOR CLASS
// ============================================================

class ScicmpTTSGenerator {
  constructor() {
    this.zai = null;
    this.outputDir = path.join(process.cwd(), 'public', 'audio');
    this.ensureOutputDir();
  }

  async initialize() {
    if (!this.zai) {
      this.zai = await ZAI.create();
      console.log('✅ TTS SDK initialized');
    }
  }

  ensureOutputDir() {
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
      console.log(`📁 Created output directory: ${this.outputDir}`);
    }
  }

  /**
   * Get voice configuration by ID
   */
  getVoiceConfig(voiceId) {
    // Search in UK voices
    if (APPROVED_VOICES.uk[voiceId]) {
      return { ...APPROVED_VOICES.uk[voiceId], region: 'uk' };
    }
    
    // Search in US voices
    if (APPROVED_VOICES.us[voiceId]) {
      return { ...APPROVED_VOICES.us[voiceId], region: 'us' };
    }
    
    // Return default
    console.warn(`⚠️  Voice '${voiceId}' not found, using default: ${DEFAULT_VOICE}`);
    return { ...APPROVED_VOICES.uk[DEFAULT_VOICE], region: 'uk' };
  }

  /**
   * Validate text for TTS
   */
  validateText(text) {
    const maxLength = 1024;
    
    if (!text || text.trim().length === 0) {
      throw new Error('Text cannot be empty');
    }
    
    if (text.length > maxLength) {
      throw new Error(`Text exceeds maximum length of ${maxLength} characters`);
    }
    
    // Clean up text
    return text
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Generate audio file with specified voice
   */
  async generate(text, options = {}) {
    await this.initialize();
    
    const {
      voice = DEFAULT_VOICE,
      speed = 1.0,
      filename = null,
      format = 'mp3'
    } = options;

    // Validate inputs
    const cleanText = this.validateText(text);
    const voiceConfig = this.getVoiceConfig(voice);
    
    // Generate filename if not provided
    const outputFile = filename || `scicmp_${voice}_${Date.now()}.${format}`;
    const outputPath = path.join(this.outputDir, outputFile);

    console.log(`\n🎙️  Generating Audio:`);
    console.log(`   Voice: ${voiceConfig.description} (${voiceConfig.region.toUpperCase()})`);
    console.log(`   Text: "${cleanText.substring(0, 50)}..."`);
    console.log(`   Speed: ${speed}x`);
    console.log(`   Output: ${outputFile}`);

    try {
      const response = await this.zai.audio.tts.create({
        input: cleanText,
        voice: voice,
        speed: Math.max(0.5, Math.min(2.0, speed)), // Clamp to valid range
        response_format: format,
        stream: false
      });

      // Convert response to buffer
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(new Uint8Array(arrayBuffer));

      // Save to file
      fs.writeFileSync(outputPath, buffer);

      const fileSizeKB = (buffer.length / 1024).toFixed(1);
      console.log(`   ✅ Generated: ${fileSizeKB} KB`);

      return {
        success: true,
        file: outputFile,
        path: outputPath,
        size: buffer.length,
        voice: voiceConfig,
        duration: this.estimateDuration(cleanText, speed)
      };
    } catch (error) {
      console.error(`   ❌ Generation failed:`, error.message);
      
      // Try fallback voice
      if (voice !== FALLBACK_VOICE) {
        console.log(`   🔄 Trying fallback voice: ${FALLBACK_VOICE}`);
        return this.generate(text, { ...options, voice: FALLBACK_VOICE });
      }
      
      throw error;
    }
  }

  /**
   * Estimate audio duration based on text length and speed
   */
  estimateDuration(text, speed) {
    // Average reading speed: ~150 words per minute
    const words = text.split(/\s+/).length;
    const minutes = words / 150 / speed;
    return {
      seconds: Math.round(minutes * 60),
      formatted: `${Math.round(minutes)}:${String(Math.round((minutes % 1) * 60)).padStart(2, '0')}`
    };
  }

  /**
   * Batch generate multiple audio files
   */
  async generateBatch(items) {
    const results = [];
    
    console.log(`\n📦 Starting batch generation: ${items.length} items`);
    
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      try {
        const result = await this.generate(item.text, item.options);
        results.push({ index: i, ...result, success: true });
      } catch (error) {
        results.push({ index: i, success: false, error: error.message });
      }
    }
    
    // Summary
    const successful = results.filter(r => r.success).length;
    console.log(`\n✅ Batch complete: ${successful}/${results.length} successful`);
    
    return results;
  }
}

// ============================================================
// PRE-DEFINED CONTENT TEMPLATES
// ============================================================

const SCICMP_CONTENT_TEMPLATES = {
  welcome: {
    text: "Welcome to SciCMP, your premier platform for scientific computing and mathematical precision. Where innovation meets discovery.",
    voice: 'jam',
    options: { speed: 0.95, filename: 'welcome_uk_rp.mp3' }
  },
  
  featureHighlight: {
    text: "Experience seamless integration of advanced computational tools with our intuitive interface. Designed by scientists, for scientists.",
    voice: 'kazi',
    options: { speed: 1.05, filename: 'feature_highlight_us.mp3' }
  },
  
  githubAuth: {
    text: "Sign in securely with your GitHub account. One click access with enterprise-grade PKCE encryption protecting your data.",
    voice: 'douji',
    options: { speed: 1.1, filename: 'github_auth_us.mp3' }
  },
  
  tutorialIntro: {
    text: "In this comprehensive tutorial, we'll explore the powerful features that make SciCMP the preferred choice for researchers worldwide.",
    voice: 'jam',
    options: { speed: 0.9, filename: 'tutorial_intro_uk.mp3' }
  },
  
  callToAction: {
    text: "Join thousands of scientists already using SciCMP. Start your free trial today and accelerate your research.",
    voice: 'kazi',
    options: { speed: 1.0, filename: 'cta_us.mp3' }
  }
};

// ============================================================
// CLI INTERFACE
// ============================================================

async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'help';

  const generator = new ScicmpTTSGenerator();

  switch (command) {
    case 'generate':
      // Usage: node tts-config.js generate "Your text here" [voice]
      const text = args[1];
      const voice = args[2] || DEFAULT_VOICE;
      
      if (!text) {
        console.error('❌ Please provide text to convert');
        process.exit(1);
      }
      
      await generator.generate(text, { voice });
      break;

    case 'batch':
      // Generate all template content
      await generator.generateBatch(
        Object.entries(SCICMP_CONTENT_TEMPLATES).map(([key, item]) => ({
          text: item.text,
          options: { voice: item.voice, ...item.options }
        }))
      );
      break;

    case 'voices':
      // List available voices
      console.log('\n🎤 Available Voices (UK/US Native Only):\n');
      console.log('🇬🇧 BRITISH ENGLISH:');
      Object.entries(APPROVED_VOICES.uk).forEach(([id, config]) => {
        console.log(`   • ${id}: ${config.description}`);
        console.log(`     Accent: ${config.accent}`);
        console.log(`     Best for: ${config.bestFor.join(', ')}`);
        console.log('');
      });
      
      console.log('🇺🇸 AMERICAN ENGLISH:');
      Object.entries(APPROVED_VOICES.us).forEach(([id, config]) => {
        console.log(`   • ${id}: ${config.description}`);
        console.log(`     Accent: ${config.accent}`);
        console.log(`     Best for: ${config.bestFor.join(', ')}`);
        console.log('');
      });
      break;

    case 'test':
      // Quick test with sample text
      console.log('\n🧪 Testing TTS Configuration...\n');
      
      // Test UK voice
      console.log('Testing British voice (jam):');
      await generator.generate("Hello! This is a test of the British English voice configuration.", {
        voice: 'jam',
        filename: 'test_british.mp3'
      });
      
      // Test US voice
      console.log('\nTesting American voice (kazi):');
      await generator.generate("Hi there! This is a test of the American English voice configuration.", {
        voice: 'kazi',
        filename: 'test_american.mp3'
      });
      
      console.log('\n✅ Test complete! Check public/audio/ directory.');
      break;

    default:
      console.log(`
🎤 SciCMP TTS Voice Configuration Generator

Usage: node tts-config.js [command] [options]

Commands:
  generate "<text>" [voice]  Generate audio with specified voice
  batch                      Generate all template content
  voices                     List available UK/US native voices
  test                       Run voice configuration test
  help                       Show this help message

Available Voices (Native UK/US Only):
  🇬🇧 British:  jam (RP/Gentleman)
  🇺🇸 American: kazi (Standard), douji (Natural)

Examples:
  node tts-config.js generate "Welcome to SciCMP" jam
  node tts-config.js batch
  node tts-config.js voices
  node tts-config.js test

Voice Policy:
  ✅ Native United Kingdom (British) accents
  ✅ Native United States (American) accents
  ❌ All other regional accents blocked
      `);
      break;
  }
}

// Run CLI
main().catch(console.error);

export default ScicmpTTSGenerator;
export { APPROVED_VOICES, DEFAULT_VOICE, SCICMP_CONTENT_TEMPLATES };
