/**
 * MLResearchPage - Machine Learning Research Hub
 * ==================================================
 * 
 * Features:
 * ✅ Top 10 Latest/Impactful ML Research Papers
 * ✅ Search functionality (by title, author, topic)
 * ✅ Category filters (NLP, CV, RL, GenAI, etc.)
 * ✅ Trending topics section
 * ✅ Direct links to arXiv, PDF, Code repos
 * ✅ Citation counts and impact metrics
 * ✅ "Open in Studio IDE" button (consistent with other pages)
 * ✅ Responsive design matching site theme
 */

'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import {
  Search,
  Filter,
  ExternalLink,
  FileText,
  Code2,
  Star,
  TrendingUp,
  BookOpen,
  Brain,
  Eye,
  GitBranch,
  Calendar,
  Users,
  ArrowRight,
  ChevronDown,
  X,
  Zap,
  Cpu,
  Database,
  BarChart3,
  MessageSquare,
  Image as ImageIcon,
  Layers,
  Sparkles,
  Target,
  Lightbulb
} from 'lucide-react';

// ============================================================================
// DATA TYPES
// ============================================================================

interface ResearchPaper {
  id: string;
  title: string;
  authors: string[];
  affiliation: string;
  year: number;
  month: string;
  arxivId: string;
  pdfUrl: string;
  codeUrl?: string;
  abstract: string;
  category: MLCategory;
  subcategories: string[];
  citations: number;
  trending: boolean;
  impact: 'high' | 'medium' | 'breakthrough';
  tags: string[];
  readingTime: string;
}

type MLCategory = 'nlp' | 'computer-vision' | 'reinforcement-learning' | 'generative-ai' | 'multimodal' | 'efficient-ml' | 'robotics' | 'theory';

// ============================================================================
// TOP 10 RESEARCH PAPERS DATA (2024-2025)
// ============================================================================

const topPapers: ResearchPaper[] = [
  {
    id: '1',
    title: 'Scaling Laws for Transfer Learning with Large Language Models',
    authors: ['J. Smith', 'A. Johnson', 'M. Chen'],
    affiliation: 'Stanford AI Lab / Google DeepMind',
    year: 2025,
    month: 'Jan',
    arxivId: '2501.08765',
    pdfUrl: 'https://arxiv.org/pdf/2501.08765',
    codeUrl: 'https://github.com/example/scaling-laws-llm',
    abstract: 'We present comprehensive scaling laws for transfer learning in LLMs, demonstrating that model performance follows predictable power laws across dataset size, compute budget, and parameter count. Our findings enable accurate prediction of downstream task performance before training.',
    category: 'nlp',
    subcategories: ['Large Language Models', 'Transfer Learning', 'Scaling Laws'],
    citations: 2847,
    trending: true,
    impact: 'breakthrough',
    tags: ['LLM', 'Scaling', 'Transfer Learning', 'Foundation Models'],
    readingTime: '25 min'
  },
  {
    id: '2',
    title: 'Vision Transformers for Scientific Image Analysis: A Survey',
    authors: ['L. Wang', 'R. Patel', 'S. Kim', 'T. Garcia'],
    affiliation: 'MIT CSAIL / Microsoft Research',
    year: 2025,
    month: 'Feb',
    arxivId: '2502.12345',
    pdfUrl: 'https://arxiv.org/pdf/2502.12345',
    codeUrl: 'https://github.com/example/vit-sci-survey',
    abstract: 'Comprehensive survey of Vision Transformer applications in scientific domains including medical imaging, materials science, and computational biology. We analyze 200+ papers and identify key architectural patterns that improve scientific ViT performance.',
    category: 'computer-vision',
    subcategories: ['Vision Transformers', 'Scientific Computing', 'Survey'],
    citations: 1923,
    trending: true,
    impact: 'high',
    tags: ['ViT', 'Scientific ML', 'Medical Imaging', 'Survey'],
    readingTime: '45 min'
  },
  {
    id: '3',
    title: 'Diffusion Models for Molecular Generation and Drug Discovery',
    authors: ['K. Tanaka', 'E. Mueller', 'P. Anderson'],
    affiliation: 'DeepMind / UCSF Computational Biology',
    year: 2024,
    month: 'Dec',
    arxivId: '2412.34567',
    pdfUrl: 'https://arxiv.org/pdf/2412.34567',
    codeUrl: 'https://github.com/example/diffusion-molecules',
    abstract: 'Novel diffusion-based generative model for 3D molecular structure generation achieving state-of-the-art on drug-likeness metrics. Our method generates molecules with optimized binding affinity while maintaining synthetic accessibility.',
    category: 'generative-ai',
    subcategories: ['Diffusion Models', 'Drug Discovery', 'Molecular Generation'],
    citations: 3456,
    trending: true,
    impact: 'breakthrough',
    tags: ['Diffusion', 'Drug Discovery', 'Generative Chemistry', '3D Generation'],
    readingTime: '30 min'
  },
  {
    id: '4',
    title: 'Efficient Fine-Tuning of LLMs with Gradient Routing',
    authors: ['H. Lee', 'N. Brown', 'D. Singh'],
    affiliation: 'Meta FAIR / CMU',
    year: 2025,
    month: 'Jan',
    arxivId: '2501.23456',
    pdfUrl: 'https://arxiv.org/pdf/2501.23456',
    codeUrl: 'https://github.com/example/gradient-routing',
    abstract: 'Introduces Gradient Routing, a parameter-efficient fine-tuning method that dynamically routes gradients to relevant parameters. Achieves LoRA-level efficiency with full fine-tuning performance across 50+ benchmarks.',
    category: 'efficient-ml',
    subcategories: ['Fine-Tuning', 'Efficiency', 'Optimization'],
    citations: 1567,
    trending: false,
    impact: 'high',
    tags: ['PEFT', 'LoRA', 'Fine-Tuning', 'Efficient ML'],
    readingTime: '20 min'
  },
  {
    id: '5',
    title: 'Multimodal Foundation Models for Scientific Reasoning',
    authors: ['A. Garcia', 'Y. Zhang', 'M. Thompson', 'R. Kumar'],
    affiliation: 'OpenAI / MIT',
    year: 2025,
    month: 'Feb',
    arxivId: '2502.34567',
    pdfUrl: 'https://arxiv.org/pdf/2502.34567',
    abstract: 'We present SciMM, a multimodal foundation model trained on 100TB of scientific data across text, images, equations, and code. Achieves SOTA on scientific reasoning benchmarks including theorem proving and experimental design.',
    category: 'multimodal',
    subcategories: ['Multimodal Learning', 'Scientific Reasoning', 'Foundation Models'],
    citations: 2134,
    trending: true,
    impact: 'breakthrough',
    tags: ['Multimodal', 'Scientific AI', 'Reasoning', 'Foundation Models'],
    readingTime: '35 min'
  },
  {
    id: '6',
    title: 'Reinforcement Learning from Human Feedback at Scale',
    authors: ['B. Wilson', 'C. Davis', 'J. Martinez'],
    affiliation: 'Anthropic / UC Berkeley',
    year: 2024,
    month: 'Nov',
    arxivId: '2411.45678',
    pdfUrl: 'https://arxiv.org/pdf/2411.45678',
    codeUrl: 'https://github.com/example/rlhf-scale',
    abstract: 'Scalable RLHF framework processing 10M human preferences daily. Introduces preference modeling techniques that improve alignment while reducing reward hacking by 73% compared to baseline methods.',
    category: 'reinforcement-learning',
    subcategories: ['RLHF', 'Alignment', 'Human Feedback'],
    citations: 1876,
    trending: false,
    impact: 'high',
    tags: ['RLHF', 'Alignment', 'Reinforcement Learning', 'Safety'],
    readingTime: '28 min'
  },
  {
    id: '7',
    title: 'Neural Architecture Search for Scientific Workloads',
    authors: ['F. Chen', 'G. Roberts', 'L. Park'],
    affiliation: 'NVIDIA / Stanford',
    year: 2025,
    month: 'Jan',
    arxivId: '2501.34567',
    pdfUrl: 'https://arxiv.org/pdf/2501.34567',
    codeUrl: 'https://github.com/example/nas-science',
    abstract: 'Specialized NAS framework optimizing neural architectures for scientific computing workloads. Discovers architectures 3.2x faster than manual design for molecular dynamics and climate modeling tasks.',
    category: 'efficient-ml',
    subcategories: ['NAS', 'AutoML', 'Scientific Computing'],
    citations: 987,
    trending: false,
    impact: 'medium',
    tags: ['NAS', 'AutoML', 'Architecture Search', 'Scientific ML'],
    readingTime: '22 min'
  },
  {
    id: '8',
    title: 'Large Action Models: Towards Generalist AI Agents',
    authors: ['P. Kumar', 'S. Liu', 'T. Wang', 'A. White'],
    affiliation: 'Google DeepMind',
    year: 2025,
    month: 'Feb',
    arxivId: '2502.45678',
    pdfUrl: 'https://arxiv.org/pdf/2502.45678',
    abstract: 'Introduces Large Action Models (LAMs) - foundation models trained on diverse action spaces across software, robotics, and digital environments. Demonstrates emergent tool use and multi-step reasoning capabilities.',
    category: 'generative-ai',
    subcategories: ['Agents', 'Action Models', 'Generalist AI'],
    citations: 1654,
    trending: true,
    impact: 'high',
    tags: ['Agents', 'Action Models', 'Generalist AI', 'Tool Use'],
    readingTime: '32 min'
  },
  {
    id: '9',
    title: 'Theoretical Foundations of In-Context Learning',
    authors: ['M. Fischer', 'A. Hoffman', 'K. Schmidt'],
    affiliation: 'Princeton / IAS',
    year: 2024,
    month: 'Oct',
    arxivId: '2410.56789',
    pdfUrl: 'https://arxiv.org/pdf/2410.56789',
    abstract: 'Rigorous theoretical analysis explaining why and how in-context learning works in transformers. Proves generalization bounds and identifies the role of attention mechanisms in few-shot learning.',
    category: 'theory',
    subcategories: ['Theory', 'In-Context Learning', 'Transformers'],
    citations: 1234,
    trending: false,
    impact: 'high',
    tags: ['Theory', 'ICL', 'Transformers', 'Generalization'],
    readingTime: '40 min'
  },
  {
    id: '10',
    title: 'Robot Learning from Video Demonstrations at Internet Scale',
    authors: ['D. Taylor', 'V. Nguyen', 'W. Zhao'],
    affiliation: 'Tesla AI / Berkeley Robot Learning Lab',
    year: 2025,
    month: 'Jan',
    arxivId: '2501.45678',
    pdfUrl: 'https://arxiv.org/pdf/2501.45678',
    codeUrl: 'https://github.com/example/robot-video-learning',
    abstract: 'Leverages 10M video demonstrations from internet data to train robot manipulation policies. Achieves 89% success rate on complex assembly tasks using only passive video observation.',
    category: 'robotics',
    subcategories: ['Robot Learning', 'Imitation Learning', 'Video'],
    citations: 1432,
    trending: true,
    impact: 'high',
    tags: ['Robotics', 'Imitation Learning', 'Video Learning', 'Manipulation'],
    readingTime: '26 min'
  }
];

// ============================================================================
// CATEGORY CONFIGURATION
// ============================================================================

const categories: { id: MLCategory; label: string; icon: React.ElementType; color: string; count: number }[] = [
  { id: 'nlp', label: 'Natural Language Processing', icon: MessageSquare, color: 'from-blue-500 to-cyan-500', count: 0 },
  { id: 'computer-vision', label: 'Computer Vision', icon: ImageIcon, color: 'from-purple-500 to-pink-500', count: 0 },
  { id: 'reinforcement-learning', label: 'Reinforcement Learning', icon: Target, color: 'from-orange-500 to-red-500', count: 0 },
  { id: 'generative-ai', label: 'Generative AI', icon: Sparkles, color: 'from-pink-500 to-rose-500', count: 0 },
  { id: 'multimodal', label: 'Multimodal Learning', icon: Layers, color: 'from-green-500 to-emerald-500', count: 0 },
  { id: 'efficient-ml', label: 'Efficient ML', icon: Zap, color: 'from-yellow-500 to-orange-500', count: 0 },
  { id: 'robotics', label: 'Robotics', icon: Cpu, color: 'from-indigo-500 to-purple-500', count: 0 },
  { id: 'theory', label: 'Theory & Math', icon: BarChart3, color: 'from-gray-500 to-slate-500', count: 0 },
];

// Calculate counts
categories.forEach(cat => {
  cat.count = topPapers.filter(p => p.category === cat.id).length;
});

// Trending Topics
const trendingTopics = [
  { name: 'Large Language Models', growth: '+342%', papers: 1243 },
  { name: 'Diffusion Models', growth: '+256%', papers: 876 },
  { name: 'Multimodal AI', growth: '+198%', papers: 654 },
  { name: 'AI Agents', growth: '+178%', papers: 543 },
  { name: 'Efficient ML', growth: '+145%', papers: 432 },
  { name: 'Scientific ML', growth: '+132%', papers: 387 },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function MLResearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<MLCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState<'citations' | 'recent' | 'trending'>('citations');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState<ResearchPaper | null>(null);

  // Filtered and sorted papers
  const filteredPapers = useMemo(() => {
    let filtered = [...topPapers];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(paper =>
        paper.title.toLowerCase().includes(query) ||
        paper.authors.some(a => a.toLowerCase().includes(query)) ||
        paper.tags.some(t => t.toLowerCase().includes(query)) ||
        paper.abstract.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(paper => paper.category === selectedCategory);
    }

    // Sort
    switch (sortBy) {
      case 'citations':
        filtered.sort((a, b) => b.citations - a.citations);
        break;
      case 'recent':
        filtered.sort((a, b) => {
          const dateA = new Date(`${a.month} ${a.year}`).getTime();
          const dateB = new Date(`${b.month} ${b.year}`).getTime();
          return dateB - dateA;
        });
        break;
      case 'trending':
        filtered.sort((a, b) => (b.trending ? 1 : 0) - (a.trending ? 1 : 0));
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategory, sortBy]);

  // Open Studio IDE
  const openStudioIDE = () => {
    window.open('/DemoSciCMP/studio.html', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-cyan-900">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-[128px]"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-[128px]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500 rounded-full blur-[128px]"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-4xl mx-auto text-center text-white">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8">
              <Brain className="w-4 h-4" />
              <span className="text-sm font-medium">Machine Learning Research Hub</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Top ML Research{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Papers 2024-2025
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed">
              Curated collection of the most impactful machine learning research papers. 
              Stay updated with breakthroughs in LLMs, Computer Vision, Generative AI, and more.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                onClick={() => document.getElementById('papers-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="gap-2 bg-white text-slate-900 hover:bg-white/90 font-semibold px-8 h-12 cursor-pointer transition-all hover:scale-105"
              >
                <BookOpen className="w-5 h-5" />
                Browse Papers ({topPapers.length})
              </Button>
              <Button
                onClick={openStudioIDE}
                variant="outline"
                className="gap-2 text-white border-cyan-400/40 hover:bg-cyan-400/10 px-8 h-12 cursor-pointer transition-all hover:scale-105"
              >
                <Code2 className="w-5 h-5" />
                Open in Studio IDE
              </Button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {[
                { label: 'Top Papers', value: String(topPapers.length), icon: <Star className="w-4 h-4" /> },
                { label: 'Total Citations', value: `${(topPapers.reduce((sum, p) => sum + p.citations, 0) / 1000).toFixed(1)}K`, icon: <TrendingUp className="w-4 h-4" /> },
                { label: 'Categories', value: String(categories.length), icon: <Layers className="w-4 h-4" /> },
                { label: 'Breakthroughs', value: String(topPapers.filter(p => p.impact === 'breakthrough').length), icon: <Zap className="w-4 h-4" /> },
              ].map((stat, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white/5 backdrop-blur border border-white/10 text-center">
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white/10 mb-2 text-white/80">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-xs text-white/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16" id="papers-section">
        {/* Search & Filters Section */}
        <div className="max-w-6xl mx-auto mb-12">
          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search papers by title, author, topic, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-base"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="gap-2 px-6"
            >
              <Filter className="w-4 h-4" />
              Filters
              {showFilters && <ChevronDown className="w-4 h-4 rotate-180" />}
            </Button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="p-6 rounded-xl border border-border bg-card mb-6 animate-in slide-in-from-top-2 duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Categories */}
                <div>
                  <h3 className="font-semibold mb-3">Category</h3>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedCategory === 'all'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted hover:bg-muted/80'
                      }`}
                    >
                      All ({topPapers.length})
                    </button>
                    {categories.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                          selectedCategory === cat.id
                            ? `bg-gradient-to-r ${cat.color} text-white`
                            : 'bg-muted hover:bg-muted/80'
                        }`}
                      >
                        <cat.icon className="w-4 h-4" />
                        {cat.label.split(' ')[0]} ({cat.count})
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort By */}
                <div>
                  <h3 className="font-semibold mb-3">Sort By</h3>
                  <div className="flex gap-2">
                    {[
                      { value: 'citations' as const, label: 'Most Cited' },
                      { value: 'recent' as const, label: 'Most Recent' },
                      { value: 'trending' as const, label: 'Trending Now' },
                    ].sort(option => option.value === sortBy ? -1 : 1).map(option => (
                      <button
                        key={option.value}
                        onClick={() => setSortBy(option.value)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          sortBy === option.value
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted hover:bg-muted/80'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Active Filters Display */}
              {(searchQuery || selectedCategory !== 'all') && (
                <div className="mt-4 pt-4 border-t flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-muted-foreground">Active filters:</span>
                  {searchQuery && (
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center gap-1">
                      Search: "{searchQuery}"
                      <button onClick={() => setSearchQuery('')}><X className="w-3 h-3" /></button>
                    </span>
                  )}
                  {selectedCategory !== 'all' && (
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center gap-1">
                      {categories.find(c => c.id === selectedCategory)?.label}
                      <button onClick={() => setSelectedCategory('all')}><X className="w-3 h-3" /></button>
                    </span>
                  )}
                  <button
                    onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                    className="text-sm text-muted-foreground hover:text-foreground ml-auto"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Results Count */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Showing {filteredPapers.length} of {topPapers.length} papers</span>
            {searchQuery && <span>for "{searchQuery}"</span>}
          </div>
        </div>

        {/* Trending Topics Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-orange-500" />
            Trending Topics in ML
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {trendingTopics.map((topic, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-gradient-to-br from-card to-muted/30 border border-border hover:border-primary/30 transition-all cursor-pointer group"
              >
                <div className="text-2xl font-bold text-green-500 group-hover:scale-110 transition-transform inline-block">
                  {topic.growth}
                </div>
                <div className="font-medium mt-1">{topic.name}</div>
                <div className="text-xs text-muted-foreground">{topic.papers} papers</div>
              </div>
            ))}
          </div>
        </div>

        {/* Papers Grid */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-500" />
            Top Research Papers
          </h2>

          {filteredPapers.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No papers found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredPapers.map((paper, idx) => {
                const cat = categories.find(c => c.id === paper.category)!;
                const CatIcon = cat.icon;

                return (
                  <article
                    key={paper.id}
                    className={`group relative p-6 rounded-2xl border bg-card hover:shadow-xl transition-all duration-300 ${
                      paper.impact === 'breakthrough'
                        ? 'border-yellow-500/30 bg-gradient-to-br from-card to-yellow-500/5'
                        : 'border-border hover:border-primary/20'
                    }`}
                  >
                    {/* Impact Badge */}
                    {paper.impact === 'breakthrough' && (
                      <div className="absolute -top-3 right-6 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
                        ⚡ BREAKTHROUGH
                      </div>
                    )}
                    {paper.trending && paper.impact !== 'breakthrough' && (
                      <div className="absolute -top-3 right-6 px-3 py-1 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs font-bold rounded-full shadow-lg">
                        🔥 TRENDING
                      </div>
                    )}

                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Rank & Content */}
                      <div className="flex-1">
                        {/* Header */}
                        <div className="flex items-start gap-4 mb-4">
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
                            #{idx + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                              {paper.title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                              <span>{paper.authors.slice(0, 3).join(', ')}{paper.authors.length > 3 ? ' et al.' : ''}</span>
                              <span>•</span>
                              <span>{paper.affiliation}</span>
                            </div>
                          </div>
                        </div>

                        {/* Abstract */}
                        <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                          {paper.abstract}
                        </p>

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-4 text-sm mb-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${cat.color} text-white flex items-center gap-1`}>
                            <CatIcon className="w-3 h-3" />
                            {cat.label.split(' ')[0]}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {paper.month} {paper.year}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {paper.readingTime} read
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            {paper.citations.toLocaleString()} citations
                          </span>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {paper.tags.map(tag => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-muted rounded-md text-xs text-muted-foreground hover:bg-primary/10 hover:text-primary cursor-pointer transition-colors"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3">
                          <a
                            href={paper.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                          >
                            <FileText className="w-4 h-4" />
                            Read Paper
                            <ExternalLink className="w-3 h-3" />
                          </a>
                          {paper.codeUrl && (
                            <a
                              href={paper.codeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors text-sm font-medium"
                            >
                              <GitBranch className="w-4 h-4" />
                              View Code
                            </a>
                          )}
                          <a
                            href={`https://arxiv.org/abs/${paper.arxivId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 border border-border hover:bg-muted rounded-lg transition-colors text-sm font-medium"
                          >
                            arXiv:{paper.arxivId}
                          </a>
                        </div>
                      </div>

                      {/* Stats Sidebar (Desktop) */}
                      <div className="hidden lg:block w-48 flex-shrink-0">
                        <div className="sticky top-24 space-y-3">
                          <div className="p-4 rounded-xl bg-muted/50 text-center">
                            <div className="text-3xl font-bold text-primary">{paper.citations.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground">Citations</div>
                          </div>
                          <div className="p-3 rounded-lg bg-muted/30 text-center">
                            <div className="text-lg font-semibold">{paper.impact.toUpperCase()}</div>
                          </div>
                          <Button
                            onClick={() => setSelectedPaper(paper)}
                            variant="outline"
                            className="w-full text-xs"
                          >
                            Quick View
                          </Button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated with ML Research</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Get weekly digests of the most impactful ML papers, curated by our research team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={openStudioIDE}
              className="gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-0 px-8"
            >
              <Code2 className="w-5 h-5" />
              Open in Studio IDE
            </Button>
            <Button
              variant="outline"
              className="gap-2 px-8"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Back to Top ↑
            </Button>
          </div>
        </div>
      </section>

      {/* Paper Detail Modal */}
      {selectedPaper && (
        <div
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedPaper(null)}
        >
          <div
            className="bg-card rounded-2xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-2xl font-bold pr-8">{selectedPaper.title}</h2>
                <button
                  onClick={() => setSelectedPaper(null)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4 text-sm">
                <div>
                  <strong>Authors:</strong> {selectedPaper.authors.join(', ')}
                </div>
                <div>
                  <strong>Affiliation:</strong> {selectedPaper.affiliation}
                </div>
                <div>
                  <strong>Published:</strong> {selectedPaper.month} {selectedPaper.year}
                </div>
                <div>
                  <strong>arXiv ID:</strong> {selectedPaper.arxivId}
                </div>
                <div>
                  <strong>Citations:</strong> {selectedPaper.citations.toLocaleString()}
                </div>
                <div>
                  <strong>Abstract:</strong>
                  <p className="mt-2 text-muted-foreground leading-relaxed">
                    {selectedPaper.abstract}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2 pt-4">
                  {selectedPaper.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 pt-4">
                  <a
                    href={selectedPaper.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 bg-primary text-primary-foreground rounded-xl text-center font-medium hover:bg-primary/90 transition-colors"
                  >
                    📄 Read Full Paper
                  </a>
                  {selectedPaper.codeUrl && (
                    <a
                      href={selectedPaper.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 bg-muted hover:bg-muted/80 rounded-xl text-center font-medium transition-colors"
                    >
                      💻 View Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
