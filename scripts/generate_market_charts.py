#!/usr/bin/env python3
"""
SciCMP Market Assessment Visualizations
Generates professional PNG charts for strategic documents
"""

import matplotlib.pyplot as plt
import matplotlib.font_manager as fm
import numpy as np
from pathlib import Path

# Configure fonts for proper rendering
plt.rcParams['font.sans-serif'] = ['DejaVu Sans', 'Liberation Sans', 'FreeSans']
plt.rcParams['axes.unicode_minus'] = False
plt.rcParams['figure.dpi'] = 150
plt.rcParams['savefig.dpi'] = 150
plt.rcParams['figure.facecolor'] = 'white'

# Color palette - Scientific Premium design system
COLORS = {
    'primary': '#00D4AA',      # Cyan/Teal accent
    'secondary': '#6366F1',     # Indigo/Purple
    'accent': '#F59E0B',       # Amber/Gold
    'danger': '#EF4444',       # Red
    'success': '#10B981',      # Green
    'dark': '#1E293B',         # Slate dark
    'light': '#F8FAFC',        # Slate light
    'gradient_start': '#00D4AA',
    'gradient_end': '#6366F1',
}

OUTPUT_DIR = Path('/home/z/my-project/market-assessment')
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)


def create_market_size_projection():
    """Chart 1: Market Size Projections 2025-2035"""
    
    fig, ax = plt.subplots(figsize=(12, 7), constrained_layout=True)
    
    years = [2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035]
    
    # Market data (in billions USD)
    hpc_market = [58, 64, 71, 78, 86, 95, 102, 110, 120, 128, 138]
    ai_scientific = [4.1, 5.0, 6.2, 7.8, 9.8, 12.2, 15.0, 18.5, 22.8, 28.0, 35.0]
    quantum = [1.9, 2.4, 3.0, 3.8, 4.8, 6.0, 7.2, 8.6, 10.2, 12.0, 14.0]
    data_science = [16.7, 20.5, 25.2, 31.0, 38.0, 47.0, 56.0, 67.0, 80.0, 95.0, 112.0]
    
    # Plot area charts for stacked effect
    ax.fill_between(years, hpc_market, alpha=0.15, color=COLORS['primary'], label='HPC Market')
    ax.plot(years, hpc_market, color=COLORS['primary'], linewidth=3, marker='o', markersize=6)
    
    ax.fill_between(years, ai_scientific, alpha=0.15, color=COLORS['secondary'])
    ax.plot(years, ai_scientific, color=COLORS['secondary'], linewidth=3, marker='s', markersize=6, label='AI Scientific Computing')
    
    ax.fill_between(years, quantum, alpha=0.15, color=COLORS['accent'])
    ax.plot(years, quantum, color=COLORS['accent'], linewidth=3, marker='^', markersize=6, label='Quantum Computing')
    
    ax.fill_between(years, data_science, alpha=0.15, color=COLORS['success'])
    ax.plot(years, data_science, color=COLORS['success'], linewidth=3, marker='D', markersize=6, label='Data Science Platforms')
    
    # Styling
    ax.set_xlabel('Year', fontsize=12, fontweight='bold', color=COLORS['dark'])
    ax.set_ylabel('Market Size (USD Billions)', fontsize=12, fontweight='bold', color=COLORS['dark'])
    ax.set_title('Scientific Computing Market Size Projections\n2025-2035', 
                 fontsize=16, fontweight='bold', color=COLORS['dark'], pad=20)
    
    ax.legend(loc='upper left', framealpha=0.95, fontsize=10)
    ax.grid(True, alpha=0.3, linestyle='--')
    ax.set_xlim(2024.5, 2035.5)
    ax.set_ylim(0, 150)
    
    # Add annotation for combined market
    total_2035 = hpc_market[-1] + ai_scientific[-1] + quantum[-1] + data_science[-1]
    ax.annotate(f'Combined TAM: ${total_2035:.0f}B', 
                xy=(2035, total_2035), xytext=(2033, total_2035 + 20),
                fontsize=11, fontweight='bold', color=COLORS['dark'],
                arrowprops=dict(arrowstyle='->', color=COLORS['dark']),
                bbox=dict(boxstyle='round,pad=0.3', facecolor='white', edgecolor=COLORS['primary']))
    
    # Add CAGR annotations
    ax.text(2026.5, 130, f'HPC CAGR: ~8.5%\nAI Sci CAGR: ~23%\nQuantum CAGR: ~19%', 
            fontsize=9, color=COLORS['dark'], 
            bbox=dict(boxstyle='round,pad=0.3', facecolor=COLORS['light'], edgecolor=COLORS['secondary']))
    
    plt.savefig(OUTPUT_DIR / 'chart_01_market_size_projections.png', 
                bbox_inches='tight', facecolor='white', edgecolor='none')
    plt.close()
    print("✓ Created: chart_01_market_size_projections.png")


def create_tam_framework():
    """Chart 2: TAM/SAM/SOM Framework Visualization"""
    
    fig, ax = plt.subplots(figsize=(11, 8), constrained_layout=True)
    
    # Create nested circles for TAM/SAM/SOM
    tam_size = 100  # $200B+ by 2030
    sam_size = 45   # $45B addressable
    som_size = 10   # $2-5B obtainable
    
    # Draw circles
    circle_tam = plt.Circle((0.5, 0.5), tam_size/200, fill=False, 
                             color=COLORS['primary'], linewidth=4, linestyle='-')
    circle_sam = plt.Circle((0.5, 0.5), sam_size/200, fill=False,
                             color=COLORS['secondary'], linewidth=4, linestyle='-')
    circle_som = plt.Circle((0.5, 0.5), som_size/200, fill=True,
                             facecolor=COLORS['primary'], alpha=0.3,
                             edgecolor=COLORS['accent'], linewidth=4)
    
    ax.add_patch(circle_tam)
    ax.add_patch(circle_sam)
    ax.add_patch(circle_som)
    
    # Labels with positions
    ax.text(0.5, 0.5 + tam_size/200 + 0.03, 'TAM: $200B+\n(Global Scientific Computing)', 
            ha='center', va='bottom', fontsize=14, fontweight='bold', color=COLORS['primary'])
    
    ax.text(0.5, 0.5 + sam_size/200 + 0.02, 'SAM: $45B\n(Computational Chemistry & AI Science)', 
            ha='center', va='bottom', fontsize=13, fontweight='bold', color=COLORS['secondary'])
    
    ax.text(0.5, 0.5, 'SOM: $2-5B\n(Early Adopters)', 
            ha='center', va='center', fontsize=12, fontweight='bold', color=COLORS['dark'])
    
    # Add vertical breakdown on right side
    breakdown_text = """
VERTICAL BREAKDOWN (SAM):
━━━━━━━━━━━━━━━━━━━
Pharma/Biotech:     $42B
Academic/Gov:       $28B  
Materials Science:  $19B
Energy/Enviro:      $15B
Other:              $11B
━━━━━━━━━━━━━━━━━━━
Total SAM:          $45B
"""
    ax.text(0.92, 0.5, breakdown_text, transform=ax.transAxes, fontsize=9,
            verticalalignment='center', fontfamily='monospace',
            bbox=dict(boxstyle='round,pad=0.5', facecolor=COLORS['light'], edgecolor=COLORS['dark']))
    
    ax.set_xlim(0, 1.15)
    ax.set_ylim(0, 1.1)
    ax.set_aspect('equal')
    ax.axis('off')
    ax.set_title('SciCMP Total Addressable Market Framework\n(2030 Projection)', 
                 fontsize=16, fontweight='bold', color=COLORS['dark'], pad=20)
    
    plt.savefig(OUTPUT_DIR / 'chart_02_tam_framework.png',
                bbox_inches='tight', facecolor='white', edgecolor='none')
    plt.close()
    print("✓ Created: chart_02_tam_framework.png")


def create_competitive_positioning():
    """Chart 3: Competitive Landscape Radar Chart"""
    
    fig, ax = plt.subplots(figsize=(10, 10), subplot_kw=dict(projection='polar'), constrained_layout=True)
    
    categories = ['Computational\nDepth', 'AI/ML Native', 'User\nExperience', 
                  'Integration\nEcosystem', 'Cost\nEfficiency', 'Future-Proof\nDesign']
    N = len(categories)
    
    angles = [n / float(N) * 2 * np.pi for n in range(N)]
    angles += angles[:1]  # Complete the loop
    
    # Competitor scores (out of 10)
    schrodinger = [9, 4, 3, 2, 2, 5]
    benchling = [2, 9, 9, 8, 7, 4]
    dotmatics = [7, 5, 6, 8, 5, 4]
    scicmp_current = [8, 7, 8, 9, 9, 7]
    scicmp_vision = [9, 9, 9, 10, 10, 10]
    
    # Close the loops
    schrodinger += schrodinger[:1]
    benchling += benchling[:1]
    dotmatics += dotmatics[:1]
    scicmp_current += scicmp_current[:1]
    scicmp_vision += scicmp_vision[:1]
    
    # Plot each competitor
    ax.plot(angles, schrodinger, 'o-', linewidth=2, label='Schrödinger', color='#EF4444')
    ax.fill(angles, schrodinger, alpha=0.1, color='#EF4444')
    
    ax.plot(angles, benchling, 'o-', linewidth=2, label='Benchling', color='#3B82F6')
    ax.fill(angles, benchling, alpha=0.1, color='#3B82F6')
    
    ax.plot(angles, dotmatics, 'o-', linewidth=2, label='Dotmatics', color='#F59E0B')
    ax.fill(angles, dotmatics, alpha=0.1, color='#F59E0B')
    
    ax.plot(angles, scicmp_current, 'o-', linewidth=3, label='SciCMP (Current)', color=COLORS['primary'])
    ax.fill(angles, scicmp_current, alpha=0.25, color=COLORS['primary'])
    
    ax.plot(angles, scicmp_vision, 'o--', linewidth=3, label='SciCMP (Vision 2030)', color=COLORS['secondary'])
    ax.fill(angles, scicmp_vision, alpha=0.15, color=COLORS['secondary'])
    
    # Set category labels
    ax.set_xticks(angles[:-1])
    ax.set_xticklabels(categories, size=10, fontweight='bold')
    
    # Y-axis labels
    ax.set_ylim(0, 10)
    ax.set_yticks([2, 4, 6, 8, 10])
    ax.set_yticklabels(['2', '4', '6', '8', '10'], size=8, color='gray')
    
    ax.legend(loc='upper right', bbox_to_anchor=(1.3, 1.0), framealpha=0.95)
    ax.set_title('Competitive Positioning Analysis\n(Dimension Scores out of 10)', 
                 fontsize=14, fontweight='bold', color=COLORS['dark'], pad=20)
    
    plt.savefig(OUTPUT_DIR / 'chart_03_competitive_radar.png',
                bbox_inches='tight', facecolor='white', edgecolor='none')
    plt.close()
    print("✓ Created: chart_03_competitive_radar.png")


def create_evolution_timeline():
    """Chart 4: 20-Year Evolution Timeline"""
    
    fig, ax = plt.subplots(figsize=(14, 9), constrained_layout=True)
    
    # Timeline data
    eras = [
        {'name': 'Era 1:\nFoundation', 'start': 2026, 'end': 2030, 'color': COLORS['primary'],
         'desc': 'AI-Native Platform'},
        {'name': 'Era 2:\nAcceleration', 'start': 2030, 'end': 2035, 'color': COLORS['secondary'],
         'desc': 'Quantum-Classical Hybrid'},
        {'name': 'Era 3:\nTransformation', 'start': 2035, 'end': 2040, 'color': COLORS['accent'],
         'desc': 'Ambient Intelligence'},
        {'name': 'Era 4:\nIntegration', 'start': 2040, 'end': 2045, 'color': COLORS['success'],
         'desc': 'Bio-Digital Fusion'},
        {'name': 'Era 5:\nTranscendence', 'start': 2045, 'end': 2046, 'color': '#EC4899',
         'desc': 'Post-Silicon Computing'},
    ]
    
    y_positions = [4, 3, 2, 1, 0]
    
    for i, era in enumerate(eras):
        # Draw era bar
        bar_width = era['end'] - era['start']
        if era['end'] == 2046:
            bar_width = 1.5  # Visual extension for last era
        
        bars = ax.barh(y_positions[i], bar_width, left=era['start'], 
                       height=0.6, color=era['color'], alpha=0.85,
                       edgecolor='white', linewidth=2)
        
        # Era name inside bar
        ax.text(era['start'] + bar_width/2, y_positions[i], era['name'],
                ha='center', va='center', fontsize=11, fontweight='bold', color='white')
        
        # Description below bar
        ax.text(era['start'] + bar_width/2, y_positions[i] - 0.42, era['desc'],
                ha='center', va='top', fontsize=9, color=era['color'], style='italic')
    
    # Key milestones as markers
    milestones = [
        (2027, 4.5, 'Series A\n$25M', COLORS['dark']),
        (2029, 4.5, '1M Users', COLORS['primary']),
        (2032, 3.5, 'Quantum\nLaunch', COLORS['secondary']),
        (2037, 2.5, 'Self-Driving\nLabs', COLORS['accent']),
        (2042, 1.5, 'Clinical\nBridge', COLORS['success']),
        (2046, 0.5, 'Universal OS', '#EC4899'),
    ]
    
    for year, y, label, color in milestones:
        ax.scatter(year, y, s=200, c=color, zorder=5, edgecolor='white', linewidth=2)
        ax.annotate(label, (year, y), textcoords="offset points", xytext=(0, 15),
                   ha='center', fontsize=8, fontweight='bold', color=color,
                   bbox=dict(boxstyle='round,pad=0.2', facecolor='white', edgecolor=color, alpha=0.9))
    
    # Styling
    ax.set_xlim(2024, 2048)
    ax.set_ylim(-0.8, 5.3)
    ax.set_xlabel('Year', fontsize=12, fontweight='bold', color=COLORS['dark'])
    ax.set_yticks([])
    
    # Remove spines
    for spine in ['top', 'right', 'left']:
        ax.spines[spine].set_visible(False)
    ax.spines['bottom'].set_color(COLORS['dark'])
    ax.spines['bottom'].set_linewidth(2)
    
    # X-axis ticks
    ax.set_xticks(range(2026, 2047, 2))
    ax.tick_params(axis='x', colors=COLORS['dark'])
    
    ax.set_title('SciCMP 20-Year Evolution Roadmap\n2026 → 2046: From Startup to Universal Scientific OS', 
                 fontsize=16, fontweight='bold', color=COLORS['dark'], pad=20)
    
    # Add revenue projection line
    revenue_years = [2026, 2028, 2030, 2032, 2034, 2036, 2038, 2040, 2042, 2044, 2046]
    revenue = [0.5, 5, 50, 120, 250, 400, 600, 750, 1200, 1700, 2000]  # In millions
    
    ax2 = ax.twinx()
    ax2.plot(revenue_years, [r/500 for r in revenue], '--', color=COLORS['danger'], 
             linewidth=2, alpha=0.7, marker='d', markersize=5, label='ARR ($M)')
    ax2.set_ylabel('ARR ($ Millions, scaled)', fontsize=10, color=COLORS['danger'])
    ax2.set_ylim(-0.5, 5)
    ax2.tick_params(axis='y', colors=COLORS['danger'])
    ax2.legend(loc='upper left')
    
    plt.savefig(OUTPUT_DIR / 'chart_04_evolution_timeline.png',
                bbox_inches='tight', facecolor='white', edgecolor='none')
    plt.close()
    print("✓ Created: chart_04_evolution_timeline.png")


def create_revenue_model():
    """Chart 5: Revenue Model Evolution"""
    
    fig, axes = plt.subplots(1, 2, figsize=(14, 6), constrained_layout=True)
    
    # Chart A: Revenue Mix Over Time
    ax1 = axes[0]
    years = [2026, 2028, 2030, 2032, 2034, 2036]
    
    subscription = [90, 70, 55, 45, 40, 35]
    consumption = [5, 15, 25, 30, 32, 33]
    marketplace = [2, 8, 12, 15, 18, 20]
    services = [3, 7, 8, 10, 10, 12]
    
    ax1.stackplot(years, subscription, consumption, marketplace, services,
                 labels=['Subscription', 'Consumption-Based', 'Marketplace', 'Services'],
                 colors=[COLORS['primary'], COLORS['secondary'], COLORS['accent'], COLORS['success']],
                 alpha=0.85)
    
    ax1.set_xlabel('Year', fontsize=11, fontweight='bold', color=COLORS['dark'])
    ax1.set_ylabel('Revenue Mix (%)', fontsize=11, fontweight='bold', color=COLORS['dark'])
    ax1.set_title('Revenue Stream Diversification\n(Reducing Subscription Dependency)', 
                  fontsize=13, fontweight='bold', color=COLORS['dark'])
    ax1.legend(loc='upper right', framealpha=0.95)
    ax1.set_ylim(0, 105)
    ax1.grid(True, alpha=0.3, axis='y')
    
    # Chart B: ARR Growth Projection
    ax2 = axes[1]
    
    arr_years = list(range(2026, 2037))
    arr = [0.5, 2, 8, 25, 50, 90, 150, 220, 310, 420, 550]
    
    bars = ax2.bar(arr_years, arr, color=COLORS['primary'], alpha=0.8, edgecolor='white', linewidth=1.5)
    
    # Color bars differently by era
    era_colors = {
        range(2026, 2031): COLORS['primary'],
        range(2031, 2037): COLORS['secondary'],
    }
    
    for i, (bar, year) in enumerate(zip(bars, arr_years)):
        if 2026 <= year <= 2030:
            bar.set_color(COLORS['primary'])
        else:
            bar.set_color(COLORS['secondary'])
    
    # Add value labels on bars
    for bar, val in zip(bars, arr):
        height = bar.get_height()
        ax2.annotate(f'${val}M',
                    xy=(bar.get_x() + bar.get_width() / 2, height),
                    xytext=(0, 3), textcoords="offset points",
                    ha='center', va='bottom', fontsize=8, fontweight='bold')
    
    # Era labels
    ax2.axvspan(2025.5, 2030.5, alpha=0.1, color=COLORS['primary'], label='Era 1: Foundation')
    ax2.axvspan(2030.5, 2036.5, alpha=0.1, color=COLORS['secondary'], label='Era 2: Acceleration')
    
    ax2.set_xlabel('Year', fontsize=11, fontweight='bold', color=COLORS['dark'])
    ax2.set_ylabel('ARR (USD Millions)', fontsize=11, fontweight='bold', color=COLORS['dark'])
    ax2.set_title('ARR Growth Projection\n(2026-2036)', fontsize=13, fontweight='bold', color=COLORS['dark'])
    ax2.legend(loc='upper left')
    ax2.set_ylim(0, 650)
    ax2.grid(True, alpha=0.3, axis='y')
    
    # Format x-axis to show all years
    ax2.set_xticks(arr_years)
    ax2.tick_params(axis='x', rotation=45)
    
    plt.savefig(OUTPUT_DIR / 'chart_05_revenue_model.png',
                bbox_inches='tight', facecolor='white', edgecolor='none')
    plt.close()
    print("✓ Created: chart_05_revenue_model.png")


def create_technology_adoption():
    """Chart 6: Technology Adoption Curves"""
    
    fig, ax = plt.subplots(figsize=(12, 7), constrained_layout=True)
    
    years = np.linspace(2026, 2050, 100)
    
    # S-curve adoption functions (logistic curves)
    def adoption_curve(t, midpoint, steepness, max_adoption):
        return max_adoption / (1 + np.exp(-steepness * (t - midpoint)))
    
    # Different technologies with different adoption timelines
    cloud_hpc = adoption_curve(years, 2028, 0.8, 95)
    ai_native = adoption_curve(years, 2030, 0.7, 90)
    quantum_hybrid = adoption_curve(years, 2035, 0.6, 80)
    neuromorphic = adoption_curve(years, 2040, 0.5, 70)
    ambient_intel = adoption_curve(years, 2042, 0.45, 65)
    bio_digital = adoption_curve(years, 2046, 0.4, 50)
    
    ax.plot(years, cloud_hpc, '-', linewidth=3, color=COLORS['primary'], label='Cloud HPC (Mature)')
    ax.plot(years, ai_native, '-', linewidth=3, color=COLORS['secondary'], label='AI-Native Workflows')
    ax.plot(years, quantum_hybrid, '-', linewidth=3, color=COLORS['accent'], label='Quantum-Classical Hybrid')
    ax.plot(years, neuromorphic, '-', linewidth=3, color=COLORS['success'], label='Neuromorphic Computing')
    ax.plot(years, ambient_intel, '--', linewidth=2, color='#EC4899', label='Ambient Intelligence')
    ax.plot(years, bio_digital, '--', linewidth=2, color='#8B5CF6', label='Bio-Digital Fusion')
    
    # Add phase regions
    ax.axvspan(2026, 2030, alpha=0.08, color=COLORS['primary'])
    ax.axvspan(2030, 2035, alpha=0.08, color=COLORS['secondary'])
    ax.axvspan(2035, 2040, alpha=0.08, color=COLORS['accent'])
    ax.axvspan(2040, 2046, alpha=0.08, color=COLORS['success'])
    
    # Era labels at top
    ax.text(2028, 102, 'Era 1', ha='center', fontsize=10, fontweight='bold', color=COLORS['primary'])
    ax.text(2032.5, 102, 'Era 2', ha='center', fontsize=10, fontweight='bold', color=COLORS['secondary'])
    ax.text(2037.5, 102, 'Era 3', ha='center', fontsize=10, fontweight='bold', color=COLORS['accent'])
    ax.text(2043, 102, 'Era 4+', ha='center', fontsize=10, fontweight='bold', color=COLORS['success'])
    
    ax.set_xlabel('Year', fontsize=12, fontweight='bold', color=COLORS['dark'])
    ax.set_ylabel('Adoption Rate (%)', fontsize=12, fontweight='bold', color=COLORS['dark'])
    ax.set_title('Technology Adoption Curves in Scientific Computing\n(S-Curve Projections)', 
                 fontsize=14, fontweight='bold', color=COLORS['dark'], pad=20)
    
    ax.legend(loc='center left', framealpha=0.95, fontsize=9)
    ax.set_ylim(0, 108)
    ax.set_xlim(2025, 2050)
    ax.grid(True, alpha=0.3, linestyle='--')
    
    # Add "now" marker
    ax.axvline(x=2026, color=COLORS['danger'], linestyle=':', linewidth=2, alpha=0.7)
    ax.text(2026, 5, 'NOW', rotation=90, ha='right', va='bottom', 
            fontsize=10, fontweight='bold', color=COLORS['danger'])
    
    plt.savefig(OUTPUT_DIR / 'chart_06_technology_adoption.png',
                bbox_inches='tight', facecolor='white', edgecolor='none')
    plt.close()
    print("✓ Created: chart_06_technology_adoption.png")


def create_funding_landscape():
    """Chart 7: Funding Round Parameters"""
    
    fig, ax = plt.subplots(figsize=(11, 8), constrained_layout=True)
    
    rounds = ['Pre-\nSeed', 'Seed', 'Series A', 'Series B', 'Series C', 'Series D/IPO']
    
    # Typical ranges for deep tech/scientific software
    median_raise = [1.5, 10, 30, 75, 150, 300]  # In millions
    pre_money_low = [3, 20, 60, 180, 400, 800]
    pre_money_high = [6, 35, 120, 350, 800, 1500]
    
    x_pos = np.arange(len(rounds))
    
    # Create box-like plot showing valuation ranges
    for i, (low, high, raise_amt) in enumerate(zip(pre_money_low, pre_money_high, median_raise)):
        # Pre-money range bar
        ax.bar(i, high - low, low, 0.5, 
               color=COLORS['primary'], alpha=0.6, edgecolor=COLORS['primary'], linewidth=2)
        # Raise amount (stacked on top conceptually)
        ax.scatter(i, low + raise_amt, s=raise_amt*3, c=COLORS['accent'], 
                  zorder=5, edgecolor='white', linewidth=2, marker='o')
        # Labels
        ax.annotate(f'${raise_amt}M', (i, low + raise_amt), textcoords="offset points",
                   xytext=(0, 12), ha='center', fontsize=9, fontweight='bold', color=COLORS['dark'])
    
    ax.set_xticks(x_pos)
    ax.set_xticklabels(rounds, fontsize=11, fontweight='bold')
    ax.set_ylabel('Valuation / Raise Amount ($ Millions)', fontsize=11, fontweight='bold', color=COLORS['dark'])
    ax.set_title('SciCMP Funding Progression\n(Typical Deep Tech Ranges)', 
                 fontsize=14, fontweight='bold', color=COLORS['dark'], pad=20)
    
    # Legend
    from matplotlib.patches import Patch
    legend_elements = [
        Patch(facecolor=COLORS['primary'], alpha=0.6, edgecolor=COLORS['primary'],
              label='Pre-Money Valuation Range'),
        plt.scatter([], [], s=100, c=COLORS['accent'], edgecolor='white', 
                   label='Raise Amount (size proportional)')
    ]
    ax.legend(handles=legend_elements, loc='upper left', framealpha=0.95)
    
    ax.grid(True, alpha=0.3, axis='y')
    ax.set_ylim(0, 1700)
    
    # Add annotation for current target
    ax.axvline(x=1, color=COLORS['danger'], linestyle='--', linewidth=2, alpha=0.7)
    ax.text(1.1, 1600, 'TARGET:\nSeed Round\n$10M @ $25M\npre-money', 
            fontsize=9, color=COLORS['danger'],
            bbox=dict(boxstyle='round,pad=0.3', facecolor='white', edgecolor=COLORS['danger']))
    
    plt.savefig(OUTPUT_DIR / 'chart_07_funding_landscape.png',
                bbox_inches='tight', facecolor='white', edgecolor='none')
    plt.close()
    print("✓ Created: chart_07_funding_landscape.png")


def create_user_growth_projection():
    """Chart 8: User Growth & Metrics Dashboard"""
    
    fig = plt.figure(figsize=(14, 10))
    
    # Create grid for subplots
    gs = fig.add_gridspec(2, 2, hspace=0.3, wspace=0.25)
    
    # Chart A: User Growth (Top Left)
    ax1 = fig.add_subplot(gs[0, 0])
    years = list(range(2026, 2047))
    users = [1000, 5000, 25000, 100000, 300000, 1000000, 2000000, 3500000, 
             5500000, 8000000, 11000000, 15000000, 19000000, 24000000, 
             29000000, 34000000, 39000000, 43000000, 46000000, 48000000, 50000000]
    
    ax1.fill_between(years, users, alpha=0.3, color=COLORS['primary'])
    ax1.plot(years, users, '-o', color=COLORS['primary'], linewidth=2.5, markersize=4)
    ax1.set_yscale('log')
    ax1.set_xlabel('Year', fontsize=10, fontweight='bold')
    ax1.set_ylabel('Active Users (Log Scale)', fontsize=10, fontweight='bold')
    ax1.set_title('User Growth Projection', fontsize=12, fontweight='bold', color=COLORS['dark'])
    ax1.grid(True, alpha=0.3)
    
    # Key milestone annotations
    milestones_users = [(2030, 1000000, '1M'), (2035, 5000000, '5M'), (2040, 20000000, '20M'), (2046, 50000000, '50M')]
    for year, count, label in milestones_users:
        ax1.annotate(label, (year, count), textcoords="offset points",
                    xytext=(0, 10), ha='center', fontsize=9, fontweight='bold', color=COLORS['dark'])
    
    # Chart B: Geographic Reach (Top Right)
    ax2 = fig.add_subplot(gs[0, 1])
    regions = ['North\nAmerica', 'Europe', 'Asia\nPacific', 'Latin\nAmerica', 'Middle East\n& Africa', 'Oceania']
    users_2046 = [15000000, 14000000, 12000000, 5000000, 3000000, 1000000]
    colors_region = [COLORS['primary'], COLORS['secondary'], COLORS['accent'], 
                     COLORS['success'], '#EC4899', '#8B5CF6']
    
    wedges, texts, autotexts = ax2.pie(users_2046, labels=regions, autopct='%1.1f%%',
                                       colors=colors_region, startangle=90,
                                       explode=[0.02]*6, textprops={'fontsize': 9})
    ax2.set_title('Geographic Distribution (2046)', fontsize=12, fontweight='bold', color=COLORS['dark'])
    
    # Chart C: Institutional Types (Bottom Left)
    ax3 = fig.add_subplot(gs[1, 0])
    inst_types = ['Academic\nResearch', 'Pharma/\nBiotech', 'Government\nLabs', 'Chemical/\nMaterials', 'Energy/\nEnvironmental', 'Agriculture', 'Other']
    inst_pct = [45, 25, 12, 8, 5, 3, 2]
    
    bars = ax3.barh(inst_types, inst_pct, color=[COLORS['primary'], COLORS['secondary'], 
                     COLORS['accent'], COLORS['success'], '#EC4899', '#8B5CF6', 'gray'],
                    height=0.6, edgecolor='white', linewidth=1.5)
    ax3.set_xlabel('% of Users', fontsize=10, fontweight='bold')
    ax3.set_title('User Distribution by Institution Type', fontsize=12, fontweight='bold', color=COLORS['dark'])
    ax3.set_xlim(0, 55)
    
    for bar, pct in zip(bars, inst_pct):
        ax3.annotate(f'{pct}%', (bar.get_width() + 1, bar.get_y() + bar.get_height()/2),
                    va='center', fontsize=9, fontweight='bold')
    
    # Chart D: Impact Metrics (Bottom Right)
    ax4 = fig.add_subplot(gs[1, 1])
    metrics = ['Papers\nCiting SciCMP', 'Drugs Helped\n(to Clinic)', 'Carbon Offset\n(tons CO2)', 'Compute Hours\nSaved (M)']
    values_2046 = [200000, 500, 1000000, 5000000]
    
    bars = ax4.bar(metrics, values_2046, color=[COLORS['primary'], COLORS['secondary'], 
                   COLORS['success'], COLORS['accent'], ], width=0.6,
                  edgecolor='white', linewidth=2)
    ax4.set_yscale('log')
    ax4.set_ylabel('Count (Log Scale)', fontsize=10, fontweight='bold')
    ax4.set_title('Impact Metrics (2046 Vision)', fontsize=12, fontweight='bold', color=COLORS['dark'])
    ax4.tick_params(axis='x', labelsize=9)
    
    # Value labels
    def format_millions(x):
        if x >= 1e6:
            return f'{x/1e6:.0f}M'
        elif x >= 1e3:
            return f'{x/1e3:.0f}K'
        return str(int(x))
    
    for bar, val in zip(bars, values_2046):
        ax4.annotate(format_millions(val), (bar.get_x() + bar.get_width()/2, bar.get_height()),
                   textcoords="offset points", xytext=(0, 5), ha='center', fontsize=10, 
                   fontweight='bold')
    
    # Main title
    fig.suptitle('SciCMP Growth & Impact Dashboard\n2026-2046 Projections', 
                 fontsize=16, fontweight='bold', color=COLORS['dark'], y=1.02)
    
    plt.savefig(OUTPUT_DIR / 'chart_08_growth_dashboard.png',
                bbox_inches='tight', facecolor='white', edgecolor='none')
    plt.close()
    print("✓ Created: chart_08_growth_dashboard.png")


def main():
    """Generate all visualizations"""
    print("\n" + "="*60)
    print("Generating SciCMP Market Assessment Visualizations")
    print("="*60 + "\n")
    
    create_market_size_projection()
    create_tam_framework()
    create_competitive_positioning()
    create_evolution_timeline()
    create_revenue_model()
    create_technology_adoption()
    create_funding_landscape()
    create_user_growth_projection()
    
    print("\n" + "="*60)
    print(f"All visualizations saved to: {OUTPUT_DIR}")
    print("="*60 + "\n")


if __name__ == "__main__":
    main()
