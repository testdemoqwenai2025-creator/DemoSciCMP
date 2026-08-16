'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import {
  // Navigation & UI Icons
  ArrowLeft,
  Home,
  LayoutDashboard,
  Search,
  Filter,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  ExternalLink,
  Copy,
  Download,
  Play,
  Star,
  Heart,
  Share2,
  Eye,
  Users,
  Clock,
  Cpu,
  HardDrive,
  Zap,
  Lock,
  Unlock,
  Gift,
  Crown,
  BookOpen,
  FileText,
  Code2,
  Database,
  FlaskConical,
  Atom,
  Brain,
  Calculator,
  BarChart3,
  Microscope,
  Pill,
  Dna,
  Waves,
  Box,
  Lightbulb,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Info,
  X,
  Maximize2,
  Grid3X3,
  List,
  RefreshCw,
  Tag,
  Award,
  GitBranch,
  MessageSquare,
  ThumbsUp,
  BookmarkPlus,
  Layers,
  Sparkles,
  Rocket,
  Target,
  Puzzle,
  Globe,
  Terminal,
  Settings,
  HelpCircle,
  ArrowUpDown,
  SlidersHorizontal
} from 'lucide-react';

// ============================================================================
// COMPREHENSIVE DATA STRUCTURES
// ============================================================================

interface PaperReference {
  id: string;
  title: string;
  authors: string;
  year: number;
  journal: string;
  doi?: string;
  url: string;
  citations: number;
  abstract: string;
  relevanceScore: number; // 0-100
}

interface TemplateParameter {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'select' | 'file' | 'array';
  description: string;
  required: boolean;
  defaultValue?: string | number | boolean;
  options?: string[]; // For select type
  validation?: string;
}

interface TemplateResource {
  type: 'tutorial' | 'api-doc' | 'dataset' | 'example' | 'video' | 'notebook';
  title: string;
  url: string;
  description: string;
  isFree: boolean;
}

interface UseCaseExample {
  title: string;
  domain: string;
  description: string;
  institution?: string;
  results?: string;
}

interface ScientificTemplate {
  id: string;
  name: string;
  slug: string;
  category: TemplateCategory;
  subcategory: string;
  description: string;
  longDescription: string;
  icon: React.ReactNode;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  tier: 'free' | 'freemium' | 'premium';
  
  // Statistics
  downloads: number;
  stars: number;
  forks: number;
  runs: number;
  lastUpdated: string;
  version: string;
  
  // Technical Details
  computeRequirements: {
    cpu: string;
    memory: string;
    gpu?: string;
    storage: string;
    estimatedTime: string;
    estimatedCost: { free: string; premium: string };
  };
  
  supportedFormats: {
    input: string[];
    output: string[];
  };
  
  parameters: TemplateParameter[];
  
  // Content
  papers: PaperReference[];
  resources: TemplateResource[];
  useCases: UseCaseExample[];
  
  // Features
  tags: string[];
  features: string[];
  limitations: string[];
  
  // Preview
  previewImage?: string;
  codeSnippet?: string;
  
  // Community
  author: string;
  authorInstitution: string;
  maintainers: number;
  contributors: number;
  
  // Integration
  hasApi: boolean;
  hasCli: boolean;
  hasNotebook: boolean;
  workflowCompatible: string[];
}

type TemplateCategory = 
  | 'bioinformatics' 
  | 'cheminformatics' 
  | 'machine-learning' 
  | 'statistics' 
  | 'visualization'
  | 'quantum-computing'
  | 'data-processing'
  | 'simulation';

interface CategoryInfo {
  id: TemplateCategory;
  name: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
  description: string;
  templateCount: number;
}

const categories: CategoryInfo[] = [
  {
    id: 'bioinformatics',
    name: 'Bioinformatics',
    icon: <Dna className="w-5 h-5" />,
    color: 'text-emerald-600',
    gradient: 'from-emerald-500 to-teal-600',
    description: 'Genomics, proteomics, sequence analysis & molecular biology',
    templateCount: 8
  },
  {
    id: 'cheminformatics',
    name: 'Cheminformatics',
    icon: <Pill className="w-5 h-5" />,
    color: 'text-blue-600',
    gradient: 'from-blue-500 to-cyan-600',
    description: 'Drug discovery, molecular docking & chemical informatics',
    templateCount: 6
  },
  {
    id: 'machine-learning',
    name: 'Machine Learning',
    icon: <Brain className="w-5 h-5" />,
    color: 'text-purple-600',
    gradient: 'from-purple-500 to-pink-600',
    description: 'Deep learning, neural networks & predictive modeling',
    templateCount: 7
  },
  {
    id: 'statistics',
    name: 'Statistics',
    icon: <Calculator className="w-5 h-5" />,
    color: 'text-orange-600',
    gradient: 'from-orange-500 to-red-600',
    description: 'Bayesian analysis, hypothesis testing & uncertainty quantification',
    templateCount: 5
  },
  {
    id: 'visualization',
    name: 'Visualization',
    icon: <BarChart3 className="w-5 h-5" />,
    color: 'text-pink-600',
    gradient: 'from-pink-500 to-rose-600',
    description: 'Publication-ready figures, interactive plots & data exploration',
    templateCount: 4
  },
  {
    id: 'quantum-computing',
    name: 'Quantum Computing',
    icon: <Atom className="w-5 h-5" />,
    color: 'text-violet-600',
    gradient: 'from-violet-500 to-indigo-600',
    description: 'Quantum algorithms, simulation & hybrid computing',
    templateCount: 3
  },
  {
    id: 'data-processing',
    name: 'Data Processing',
    icon: <Database className="w-5 h-5" />,
    color: 'text-cyan-600',
    gradient: 'from-cyan-500 to-blue-600',
    description: 'ETL pipelines, data cleaning & transformation workflows',
    templateCount: 4
  },
  {
    id: 'simulation',
    name: 'Simulation',
    icon: <Waves className="w-5 h-5" />,
    color: 'text-slate-600',
    gradient: 'from-slate-500 to-gray-600',
    description: 'Molecular dynamics, Monte Carlo & physical simulations',
    templateCount: 3
  }
];

// ============================================================================
// COMPREHENSIVE TEMPLATE DATA
// ============================================================================

const templates: ScientificTemplate[] = [
  // ==========================================================================
  // BIOINFORMATICS TEMPLATES
  // ==========================================================================
  {
    id: 'blast-sequence-alignment',
    name: 'BLAST+ Sequence Alignment',
    slug: 'blast-sequence-alignment',
    category: 'bioinformatics',
    subcategory: 'Sequence Analysis',
    description: 'Comprehensive BLAST+ workflow for nucleotide and protein sequence similarity searches against NCBI databases.',
    longDescription: `This template provides a complete BLAST+ (Basic Local Alignment Search Tool) pipeline optimized for high-throughput sequence analysis. It supports all major BLAST variants including blastn, blastp, blastx, tblastn, and tblastx, with customizable E-value thresholds, output formats, and parallel processing capabilities.

The workflow includes automated result parsing, hit filtering based on user-defined criteria, and generation of publication-ready visualizations including sequence alignments, phylogenetic trees, and coverage plots.

Key innovations include intelligent database selection based on input sequence type, automatic parameter optimization for different query sizes, and integration with downstream analysis tools such as orthology prediction and functional annotation.`,
    icon: <Dna className="w-6 h-6" />,
    difficulty: 'beginner',
    tier: 'free',
    
    downloads: 45230,
    stars: 1247,
    forks: 342,
    runs: 89045,
    lastUpdated: '2026-08-15',
    version: '3.2.1',
    
    computeRequirements: {
      cpu: '2-8 cores',
      memory: '4-16 GB',
      storage: '10-100 GB',
      estimatedTime: '5 min - 2 hours',
      estimatedCost: { free: '$0', premium: '$0.05-0.50' }
    },
    
    supportedFormats: {
      input: ['FASTA', 'FASTQ', 'GenBank', 'EMBL'],
      output: ['JSON', 'XML', 'TSV', 'HTML', 'PNG']
    },
    
    parameters: [
      { name: 'query_sequence', type: 'file', description: 'Input sequence file in FASTA format', required: true },
      { name: 'blast_type', type: 'select', description: 'BLAST algorithm variant', required: true, defaultValue: 'blastn', options: ['blastn', 'blastp', 'blastx', 'tblastn', 'tblastx'] },
      { name: 'database', type: 'select', description: 'Target database to search against', required: true, defaultValue: 'nr', options: ['nr', 'nt', 'refseq_rna', 'refseq_protein', 'swissprot', 'pdbaa'] },
      { name: 'evalue', type: 'number', description: 'Expect value threshold for significance', required: false, defaultValue: 0.001 },
      { name: 'max_targets', type: 'number', description: 'Maximum number of hits to return', required: false, defaultValue: 100 },
      { name: 'word_size', type: 'number', description: 'Word size for seed matches', required: false, defaultValue: 11 }
    ],
    
    papers: [
      {
        id: 'paper-001',
        title: 'BLAST+: architecture and applications',
        authors: 'Camacho JA, et al.',
        year: 2009,
        journal: 'BMC Bioinformatics',
        doi: '10.1186/1471-2105-10-421',
        url: '#/papers/blast-plus-2009',
        citations: 28456,
        abstract: 'BLAST+ is a significant improvement over the original BLAST software suite...',
        relevanceScore: 98
      },
      {
        id: 'paper-002',
        title: 'Accelerated sequence alignment using GPU-accelerated BLAST',
        authors: 'Liu Y, et al.',
        year: 2021,
        journal: 'Bioinformatics',
        doi: '10.1093/bioinformatics/btaa1024',
        url: '#/papers/gpu-blast-2021',
        citations: 892,
        abstract: 'We present a GPU-accelerated implementation of BLAST achieving 15x speedup...',
        relevanceScore: 85
      },
      {
        id: 'paper-003',
        title: 'Metagenomic sequence analysis using DIAMOND-BLAST',
        authors: 'Buchfink B, et al.',
        year: 2021,
        journal: 'Nature Methods',
        doi: '10.1038/s41592-021-01101-1',
        url: '#/papers/diamond-2021',
        citations: 3240,
        abstract: 'DIAMOND enables blastx-compatible searches at 20,000x speeds...',
        relevanceScore: 78
      },
      {
        id: 'paper-004',
        title: 'Cloud-based BLAST analysis for large-scale genomics',
        authors: 'Zhang W, Chen L',
        year: 2023,
        journal: 'Genome Biology',
        doi: '10.1186/s13059-023-02912-8',
        url: '#/papers/cloud-blast-2023',
        citations: 234,
        abstract: 'Scalable cloud infrastructure for petabyte-scale BLAST analyses...',
        relevanceScore: 72
      },
      {
        id: 'paper-005',
        title: 'Real-time sequence alignment visualization',
        authors: 'Kumar S, et al.',
        year: 2024,
        journal: 'Nucleic Acids Research',
        doi: '10.1093/nar/gkae123',
        url: '#/papers/realtime-viz-2024',
        citations: 156,
        abstract: 'Interactive visualization framework for BLAST results...',
        relevanceScore: 68
      }
    ],
    
    resources: [
      { type: 'tutorial', title: 'Getting Started with BLAST+', url: '#/tutorials/blast/intro', description: 'Step-by-step beginner guide', isFree: true },
      { type: 'notebook', title: 'Jupyter Notebook Example', url: '#/notebooks/blast-example', description: 'Interactive walkthrough', isFree: true },
      { type: 'dataset', title: 'Sample Datasets (5)', url: '#/datasets/blast-samples', description: 'Test sequences included', isFree: true },
      { type: 'api-doc', title: 'REST API Documentation', url: '#/api/blast/docs', description: 'Programmatic access', isFree: true },
      { type: 'video', title: 'Video Tutorial (45 min)', url: '#/videos/blast-tutorial', description: 'Complete walkthrough', isFree: true },
      { type: 'example', title: 'Production Pipeline Example', url: '#/examples/blast-production', description: 'Enterprise deployment', isFree: false }
    ],
    
    useCases: [
      { title: 'Gene Discovery Pipeline', domain: 'Genomics', description: 'Identify novel genes in newly sequenced genomes', institution: 'Broad Institute', results: 'Discovered 847 novel gene candidates' },
      { title: 'Pathogen Detection', domain: 'Clinical', description: 'Rapid identification of bacterial pathogens from metagenomic samples', institution: 'CDC', results: '95% accuracy in clinical trials' },
      { title: 'Evolutionary Analysis', domain: 'Evolutionary Biology', description: 'Track gene family evolution across species', institution: 'EMBL-EBI', results: 'Published in Nature Evolution' }
    ],
    
    tags: ['sequence-analysis', 'alignment', 'ncbi', 'genomics', 'proteomics'],
    features: ['Multi-database support', 'Parallel processing', 'Custom scoring matrices', 'Result caching', 'API access'],
    limitations: ['Database updates may lag 24h', 'Large queries (>1GB) require premium tier'],
    
    author: 'NCBI Team',
    authorInstitution: 'National Center for Biotechnology Information',
    maintainers: 12,
    contributors: 87,
    
    hasApi: true,
    hasCli: true,
    hasNotebook: true,
    workflowCompatible: ['Nextflow', 'Snakemake', 'CWL', 'WDL']
  },
  {
    id: 'rna-seq-differential-expression',
    name: 'RNA-seq Differential Expression',
    slug: 'rna-seq-differential-expression',
    category: 'bioinformatics',
    subcategory: 'Transcriptomics',
    description: 'Complete RNA-seq analysis pipeline from raw reads to differential expression results with quality control and visualization.',
    longDescription: `This production-grade RNA-seq analysis pipeline implements best practices from the ENCODE and GTEx consortia, providing end-to-end analysis from raw FASTQ files to publication-ready differential expression results.

The pipeline includes comprehensive quality control (FastQC, MultiQC), adapter trimming (Trim Galore!), alignment (STAR or HISAT2), quantification (featureCounts or Salmon), normalization (DESeq2 or edgeR), and advanced downstream analysis including pathway enrichment (GSEA, clusterProfiler) and transcription factor binding prediction.

Key features include batch effect detection and correction (Combat, RUVSeq), alternative splicing analysis (rMATS, MAJIQ), fusion gene detection (STAR-Fusion, Arriba), and single-cell compatible outputs for integration with Seurat/Scanpy pipelines.`,
    icon: <Microscope className="w-6 h-6" />,
    difficulty: 'intermediate',
    tier: 'free',
    
    downloads: 38920,
    stars: 1589,
    forks: 456,
    runs: 67234,
    lastUpdated: '2026-08-14',
    version: '4.1.0',
    
    computeRequirements: {
      cpu: '8-32 cores',
      memory: '32-128 GB',
      storage: '50-500 GB',
      estimatedTime: '2-12 hours',
      estimatedCost: { free: '$0', premium: '$1.50-8.00' }
    },
    
    supportedFormats: {
      input: ['FASTQ', 'BAM', 'CRAM', 'SRA'],
      output: ['CSV', 'TSV', 'HTML', 'PDF', 'PNG', 'BDT (Bioconductor)']
    },
    
    parameters: [
      { name: 'fastq_files', type: 'array', description: 'Input FASTQ files (paired or single-end)', required: true },
      { name: 'reference_genome', type: 'select', description: 'Reference genome for alignment', required: true, options: ['GRCh38', 'GRCh37', 'mm10', 'hg38', 'custom'] },
      { name: 'aligner', type: 'select', description: 'Alignment algorithm', required: false, defaultValue: 'STAR', options: ['STAR', 'HISAT2', 'Salmon'] },
      { name: 'de_tool', type: 'select', description: 'Differential expression tool', required: false, defaultValue: 'DESeq2', options: ['DESeq2', 'edgeR', 'limma-voom'] },
      { name: 'batch_column', type: 'string', description: 'Column name for batch correction', required: false },
      { name: 'min_reads', type: 'number', description: 'Minimum read count threshold', required: false, defaultValue: 10 }
    ],
    
    papers: [
      {
        id: 'paper-rna-001',
        title: 'Differential expression analysis for sequence count data',
        authors: 'Love MI, Huber W, Anders S',
        year: 2014,
        journal: 'Genome Biology',
        doi: '10.1186/gb-2014-15-10-r29',
        url: '#/papers/deseq2-2014',
        citations: 28456,
        abstract: 'DESeq2 provides shrinkage estimation for dispersions and fold changes...',
        relevanceScore: 99
      },
      {
        id: 'paper-rna-002',
        title: 'Ultrafast universal RNA-seq aligner',
        authors: 'Dobin A, et al.',
        year: 2013,
        journal: 'Bioinformatics',
        doi: '10.1093/bioinformatics/bts635',
        url: '#/papers/star-2013',
        citations: 18923,
        abstract: 'STAR achieves accurate spliced alignment at unprecedented speed...',
        relevanceScore: 94
      },
      {
        id: 'paper-rna-003',
        title: 'Batch effect removal for RNA-seq data',
        authors: 'Johnson WE, Li C, Rabinovic A',
        year: 2007,
        journal: 'Biostatistics',
        doi: '10.1198/200707986377867427',
        url: '#/papers/combat-2007',
        citations: 8234,
        abstract: 'Empirical Bayes methods for adjusting batch effects...',
        relevanceScore: 88
      },
      {
        id: 'paper-rna-004',
        title: 'Gene set enrichment analysis: A knowledge-based approach',
        authors: 'Subramanian A, et al.',
        year: 2005,
        journal: 'PNAS',
        doi: '10.1073/pnas.0506580102',
        url: '#/papers/gsea-2005',
        citations: 24567,
        abstract: 'GSEA interprets gene expression data at the level of gene sets...',
        relevanceScore: 82
      },
      {
        id: 'paper-rna-005',
        title: 'Fast transcript quantification with Salmon',
        authors: 'Patro R, et al.',
        year: 2017,
        journal: 'Nature Methods',
        doi: '10.1038/nmeth.4197',
        url: '#/papers/salmon-2017',
        citations: 9876,
        abstract: 'Salmon provides rapid and bias-aware transcript quantification...',
        relevanceScore: 79
      },
      {
        id: 'paper-rna-006',
        title: 'Multi-sample quality control for sequencing data',
        authors: 'Ewels P, et al.',
        year: 2020,
        journal: 'Genome Biology',
        doi: '10.1186/s13059-020-02044-6',
        url: '#/papers/multiqc-2020',
        citations: 5678,
        abstract: 'MultiQC aggregates bioinformatics analysis results across samples...',
        relevanceScore: 75
      },
      {
        id: 'paper-rna-007',
        title: 'Alternative splicing detection with rMATS',
        authors: 'Shen S, et al.',
        year: 2014,
        journal: 'PNAS',
        doi: '10.1073/pnas.1409164111',
        url: '#/papers/rmats-2014',
        citations: 3456,
        abstract: 'rMATS detects differential alternative splicing from RNA-seq...',
        relevanceScore: 71
      }
    ],
    
    resources: [
      { type: 'tutorial', title: 'Complete RNA-seq Guide', url: '#/tutorials/rnaseq-complete', description: 'End-to-end tutorial', isFree: true },
      { type: 'notebook', title: 'Analysis Notebook', url: '#/notebooks/rnaseq-analysis', description: 'Interactive analysis', isFree: true },
      { type: 'dataset', title: 'TCGA Sample Data', url: '#/datasets/tcga-lung', description: 'Real cancer dataset', isFree: true },
      { type: 'api-doc', title: 'Pipeline API', url: '#/api/rnaseq/pipeline', description: 'Programmatic control', isFree: true },
      { type: 'video', title: 'Workshop Recording (3hr)', url: '#/videos/rnaseq-workshop', description: 'Expert training', isFree: false },
      { type: 'example', title: 'Single-cell Extension', url: '#/examples/rnaseq-sc', description: 'scRNA-seq add-on', isFree: false }
    ],
    
    useCases: [
      { title: 'Cancer Biomarker Discovery', domain: 'Oncology', description: 'Identify differentially expressed genes in tumor vs normal tissue', institution: 'MD Anderson Cancer Center', results: 'Published in Cancer Cell' },
      { title: 'Drug Response Prediction', domain: 'Pharmacogenomics', description: 'Analyze gene expression changes after drug treatment', institution: 'Pfizer Research', results: 'Predicted drug response with 89% accuracy' },
      { title: 'Developmental Biology Study', domain: 'Developmental Biology', description: 'Track gene expression across embryonic development stages', institution: 'Stanford University', results: 'Novel developmental regulators identified' }
    ],
    
    tags: ['transcriptomics', 'differential-expression', 'rnaseq', 'deseq2', 'star-aligner'],
    features: ['Multiple aligner support', 'Batch correction', 'Pathway enrichment', 'Fusion detection', 'Splicing analysis'],
    limitations: ['Memory intensive for large cohorts', 'Custom genomes require indexing step'],
    
    author: 'Bioconductor Team',
    authorInstitution: 'Fred Hutchinson Cancer Research Center',
    maintainers: 18,
    contributors: 134,
    
    hasApi: true,
    hasCli: true,
    hasNotebook: true,
    workflowCompatible: ['Nextflow', 'Cromwell', 'Snakemake']
  },

  // ==========================================================================
  // CHEMINFORMATICS TEMPLATES
  // ==========================================================================
  {
    id: 'molecular-docking-glide',
    name: 'Molecular Docking (Glide/AutoDock)',
    slug: 'molecular-docking-glide',
    category: 'cheminformatics',
    subcategory: 'Virtual Screening',
    description: 'High-throughput virtual screening pipeline using Glide SP/XP or AutoDock Vina for structure-based drug discovery.',
    longDescription: `This comprehensive molecular docking template supports both Schrödinger's Glide (SP/XP modes) and AutoDock Vina for flexible ligand-receptor docking experiments. The pipeline includes receptor preparation, ligand library curation, grid generation, docking execution, and post-processing with rescoring and interaction analysis.

Advanced features include water molecule displacement analysis, induced-fit docking protocols, consensus scoring strategies, and ADMET property prediction integration. The template supports both single-ligand detailed studies and library-scale virtual screening campaigns with up to millions of compounds.

Results include binding pose visualization, interaction fingerprint analysis, energy decomposition, and automated report generation suitable for patent applications and publications.`,
    icon: <Pill className="w-6 h-6" />,
    difficulty: 'advanced',
    tier: 'freemium',
    
    downloads: 28740,
    stars: 987,
    forks: 234,
    runs: 45678,
    lastUpdated: '2026-08-13',
    version: '5.0.2',
    
    computeRequirements: {
      cpu: '16-64 cores',
      memory: '32-256 GB',
      gpu: 'Optional (V100/A100)',
      storage: '20-200 GB',
      estimatedTime: '30 min - 72 hours',
      estimatedCost: { free: 'First 100 compounds', premium: '$2.00-50.00' }
    },
    
    supportedFormats: {
      input: ['SDF', 'MOL2', 'PDB', 'MAE'],
      output: ['SDF', 'PDB', 'CSV', 'PNG', 'PDF', 'HTML']
    },
    
    parameters: [
      { name: 'receptor_file', type: 'file', description: 'Protein receptor file (prepared)', required: true },
      { name: 'ligand_library', type: 'file', description: 'Ligand library in SDF format', required: true },
      { name: 'docking_engine', type: 'select', description: 'Docking engine to use', required: true, defaultValue: 'glide-sp', options: ['glide-sp', 'glide-xp', 'autodock-vina', 'consensus'] },
      { name: 'grid_center', type: 'string', description: 'Grid box center coordinates (x,y,z)', required: true },
      { name: 'grid_size', type: 'number', description: 'Grid box size in Angstroms', required: false, defaultValue: 20 },
      { name: 'exhaustiveness', type: 'number', description: 'Search exhaustiveness (Vina)', required: false, defaultValue: 8 },
      { name: 'num_poses', type: 'number', description: 'Poses per ligand to generate', required: false, defaultValue: 10 }
    ],
    
    papers: [
      {
        id: 'paper-dock-001',
        title: 'Glide: A new approach for rapid docking and scoring',
        authors: 'Friesner RA, et al.',
        year: 2004,
        journal: 'Journal of Medicinal Chemistry',
        doi: '10.1021/jm030639k',
        url: '#/papers/glide-2004',
        citations: 12345,
        abstract: 'Glide approximates a complete systematic search of conformational space...',
        relevanceScore: 97
      },
      {
        id: 'paper-dock-002',
        title: 'AutoDock Vina: Improving speed and accuracy',
        authors: 'Osterberg F, et al.',
        year: 2010,
        journal: 'Journal of Computational Chemistry',
        doi: '10.1002/jcc.21334',
        url: '#/papers/vina-2010',
        citations: 18790,
        abstract: 'AutoDock Vina significantly improves average accuracy...',
        relevanceScore: 93
      },
      {
        id: 'paper-dock-003',
        title: 'Molecular docking: Advances and applications',
        authors: 'Pinzi L, Rastelli G',
        year: 2019,
        journal: 'Frontiers in Pharmacology',
        doi: '10.3389/fphar.2019.01444',
        url: '#/papers/docking-review-2019',
        citations: 2345,
        abstract: 'Comprehensive review of modern docking methodologies...',
        relevanceScore: 85
      },
      {
        id: 'paper-dock-004',
        title: 'GPU-accelerated molecular docking',
        authors: 'Wang H, Zhang Y',
        year: 2022,
        journal: 'Journal of Chemical Information and Modeling',
        doi: '10.1021/acs.jcim.2c00045',
        url: '#/papers/gpu-docking-2022',
        citations: 567,
        abstract: 'Achieving 100x speedup through GPU acceleration...',
        relevanceScore: 76
      },
      {
        id: 'paper-dock-005',
        title: 'Consensus docking strategies improve VS performance',
        authors: 'Cheng T, et al.',
        year: 2022,
        journal: 'Nature Communications',
        doi: '10.1038/s41467-022-28084-5',
        url: '#/papers/consensus-dock-2022',
        citations: 345,
        abstract: 'Combining multiple scoring functions enhances hit rates...',
        relevanceScore: 73
      }
    ],
    
    resources: [
      { type: 'tutorial', title: 'Docking Fundamentals', url: '#/tutorials/docking-intro', description: 'Beginner-friendly guide', isFree: true },
      { type: 'notebook', title: 'Docking Analysis Notebook', url: '#/notebooks/docking-analysis', description: 'Result interpretation', isFree: true },
      { type: 'dataset', title: 'Sample Receptors (10)', url: '#/datasets/docking-targets', description: 'Common drug targets', isFree: true },
      { type: 'api-doc', title: 'Screening API', url: '#/api/virtual-screening', description: 'HTVS automation', isFree: false },
      { type: 'video', title: 'Masterclass (6 hours)', url: '#/videos/docking-masterclass', description: 'Expert training', isFree: false },
      { type: 'example', title: 'COVID-19 Screening Campaign', url: '#/examples/covid-screening', description: 'Real-world case study', isFree: true }
    ],
    
    useCases: [
      { title: 'Kinase Inhibitor Discovery', domain: 'Drug Discovery', description: 'Virtual screening against EGFR kinase domain', institution: 'Novartis', results: '5 lead compounds advanced to testing' },
      { title: 'Protein-Protein Interface', domain: 'Structural Biology', description: 'Hot spot identification for PPI inhibition', institution: 'UCSF', results: 'Novel allosteric sites discovered' },
      { title: 'Natural Product Screening', domain: 'Natural Products', description: 'Screen 50K natural product derivatives', institution: 'NCI', results: '127 hits confirmed by assay' }
    ],
    
    tags: ['virtual-screening', 'drug-discovery', 'molecular-docking', 'glide', 'autodock'],
    features: ['Multi-engine support', 'Rescoring options', 'Interaction analysis', 'ADMET integration', 'HTVS mode'],
    limitations: ['Receptor flexibility limited', 'Large libraries require premium tier'],
    
    author: 'Computational Chemistry Team',
    authorInstitution: 'Schrödinger & Open Source Community',
    maintainers: 15,
    contributors: 89,
    
    hasApi: true,
    hasCli: true,
    hasNotebook: true,
    workflowCompatible: ['KNIME', 'Pipeline Pilot', 'Nextflow']
  },

  // ==========================================================================
  // MACHINE LEARNING TEMPLATES
  // ==========================================================================
  {
    id: 'ml-pipeline-pytorch',
    name: 'ML Training Pipeline (PyTorch)',
    slug: 'ml-pipeline-pytorch',
    category: 'machine-learning',
    subcategory: 'Deep Learning',
    description: 'Production-grade PyTorch training pipeline with distributed training, hyperparameter optimization, experiment tracking, and model serving.',
    longDescription: `This enterprise-grade machine learning template provides everything needed for training, validating, and deploying deep learning models at scale. Built on PyTorch Lightning for maximum flexibility, it includes automatic mixed precision training, distributed multi-GPU/multi-node support via DeepSpeed, and integrated Weights & Biases experiment tracking.

The template implements state-of-the-art training practices including learning rate scheduling (cosine annealing with warm restarts), gradient accumulation, gradient clipping, early stopping with patience, and model checkpointing with best-model retention. Hyperparameter optimization is supported through Optuna with Bayesian optimization and pruning.

For scientific applications, specialized augmentations are available for images (albumentations), sequences (nlpaug), and tabular data. The pipeline automatically generates comprehensive reports including confusion matrices, ROC curves, calibration plots, attention visualizations, and feature importance rankings.`,
    icon: <Brain className="w-6 h-6" />,
    difficulty: 'advanced',
    tier: 'freemium',
    
    downloads: 52340,
    stars: 2345,
    forks: 678,
    runs: 98765,
    lastUpdated: '2026-08-16',
    version: '6.2.0',
    
    computeRequirements: {
      cpu: '8-32 cores',
      memory: '64-512 GB',
      gpu: '1-8x A100/V100/H100',
      storage: '100 GB - 10 TB',
      estimatedTime: '1 hour - 7 days',
      estimatedCost: { free: 'CPU only (small models)', premium: '$5.00-500.00' }
    },
    
    supportedFormats: {
      input: ['CSV', 'Parquet', 'TFRecord', 'HDF5', 'Images', 'JSON'],
      output: ['ONNX', 'TorchScript', 'TensorRT', 'CSV', 'JSON', 'MLflow']
    },
    
    parameters: [
      { name: 'training_data', type: 'file', description: 'Training dataset path', required: true },
      { name: 'model_architecture', type: 'select', description: 'Base model architecture', required: true, options: ['resnet50', 'vit-base', 'bert-base', 'gpt2', 'custom'] },
      { name: 'task_type', type: 'select', description: 'Machine learning task', required: true, options: ['classification', 'regression', 'segmentation', 'nlp', 'custom'] },
      { name: 'max_epochs', type: 'number', description: 'Maximum training epochs', required: false, defaultValue: 100 },
      { name: 'batch_size', type: 'number', description: 'Training batch size', required: false, defaultValue: 32 },
      { name: 'learning_rate', type: 'number', description: 'Initial learning rate', required: false, defaultValue: 0.001 },
      { name: 'num_trials', type: 'number', description: 'Hyperparameter optimization trials', required: false, defaultValue: 50 }
    ],
    
    papers: [
      {
        id: 'paper-ml-001',
        title: 'PyTorch: An imperative style deep learning framework',
        authors: 'Paszke A, et al.',
        year: 2019,
        journal: 'NeurIPS',
        doi: '',
        url: '#/papers/pytorch-2019',
        citations: 89012,
        abstract: 'PyTorch provides a flexible platform for accelerating research...',
        relevanceScore: 96
      },
      {
        id: 'paper-ml-002',
        title: 'Lightning: The lightweight PyTorch wrapper for ML research',
        authors: 'Falcon W, et al.',
        year: 2019,
        journal: 'ICLR Workshop',
        doi: '',
        url: '#/papers/lightning-2019',
        citations: 2345,
        abstract: 'Lightning decouples science from engineering...',
        relevanceScore: 91
      },
      {
        id: 'paper-ml-003',
        title: 'ZeRO: Memory optimizations for large-scale deep learning',
        authors: 'Rajbhandari S, et al.',
        year: 2020,
        journal: 'OSDI',
        doi: '',
        url: '#/papers/deepspeed-2020',
        citations: 5678,
        abstract: 'ZeRO eliminates memory redundancies in data parallelism...',
        relevanceScore: 87
      },
      {
        id: 'paper-ml-004',
        title: 'Optuna: A next-generation hyperparameter optimization framework',
        authors: 'Akiba T, et al.',
        year: 2019,
        journal: 'SIGKDD',
        doi: '10.1145/3292500.3330701',
        url: '#/papers/optuna-2019',
        citations: 3456,
        abstract: 'Optuna enables efficient hyperparameter optimization...',
        relevanceScore: 83
      },
      {
        id: 'paper-ml-005',
        title: 'Mixed precision training',
        authors: 'Micikevicius P, et al.',
        year: 2018,
        journal: 'ICLR',
        doi: '',
        url: '#/papers/amp-2018',
        citations: 4567,
        abstract: 'FP16/BF16 training reduces memory and increases throughput...',
        relevanceScore: 79
      },
      {
        id: 'paper-ml-006',
        title: 'Vision Transformer (ViT)',
        authors: 'Dosovitskiy A, et al.',
        year: 2021,
        journal: 'ICLR',
        doi: '',
        url: '#/papers/vit-2021',
        citations: 23456,
        abstract: 'An Image is Worth 16x16 Words: Transformers for image recognition...',
        relevanceScore: 75
      }
    ],
    
    resources: [
      { type: 'tutorial', title: 'PyTorch Lightning Guide', url: '#/tutorials/lightning-guide', description: 'Framework fundamentals', isFree: true },
      { type: 'notebook', title: 'Training Dashboard', url: '#/notebooks/ml-dashboard', description: 'Experiment tracking', isFree: true },
      { type: 'dataset', title: 'Benchmark Datasets', url: '#/datasets/ml-benchmarks', description: 'ImageNet subset, etc.', isFree: true },
      { type: 'api-doc', title: 'Training API', url: '#/api/training', description: 'Programmatic control', isFree: true },
      { type: 'video', title: 'Deep Learning Course', url: '#/videos/dl-course', description: '24-hour curriculum', isFree: false },
      { type: 'example', title: 'Medical Imaging Model', url: '#/examples/medical-imaging', description: 'Radiology AI example', isFree: false }
    ],
    
    useCases: [
      { title: 'Medical Image Classification', domain: 'Healthcare AI', description: 'Train CNN for chest X-ray diagnosis', institution: 'Stanford ML Group', results: '94% AUC on CheXpert' },
      { title: 'Drug Property Prediction', domain: 'Pharmaceuticals', description: 'Graph neural network for solubility prediction', institution: 'MIT CSAIL', results: 'RMSE improved by 23%' },
      { title: 'Protein Structure Prediction', domain: 'Structural Biology', description: 'Fine-tune AlphaFold2 for specific families', institution: 'DeepMind', results: 'GDT-TS +5 points on CASP15' }
    ],
    
    tags: ['deep-learning', 'pytorch', 'distributed-training', 'hyperparameter-optimization', 'mlops'],
    features: ['Distributed training', 'Mixed precision', 'Auto-augmentation', 'Experiment tracking', 'Model serving'],
    limitations: ['GPU required for practical use', 'Large models need premium tier'],
    
    author: 'PyTorch Team',
    authorInstitution: 'Meta AI / Linux Foundation',
    maintainers: 25,
    contributors: 267,
    
    hasApi: true,
    hasCli: true,
    hasNotebook: true,
    workflowCompatible: ['MLflow', 'Kubeflow', 'Airflow', 'Prefect']
  },

  // ==========================================================================
  // STATISTICS TEMPLATES
  // ==========================================================================
  {
    id: 'bayesian-inference-stan',
    name: 'Bayesian Analysis Suite (Stan/R)',
    slug: 'bayesian-inference-stan',
    category: 'statistics',
    subcategory: 'Bayesian Statistics',
    description: 'Comprehensive Bayesian inference toolkit with Stan backend supporting hierarchical models, MCMC diagnostics, and posterior predictive checks.',
    longDescription: `This template provides a complete Bayesian analysis environment built on Stan probabilistic programming language with interfaces for R (brms/rstanarm) and Python (CmdStanPy/PyMC). It covers the full Bayesian workflow from prior specification through posterior inference, model checking, and decision-making under uncertainty.

Included are pre-built models for common scientific applications: linear/hierarchical regression, survival analysis, time series (ARIMA/state-space), spatial models (CAR/Gaussian processes), and item response theory. Advanced users can specify custom Stan models with automatic differentiation and HMC/NUTS sampling.

The template emphasizes reproducibility with automatic seed management, convergence diagnostics (R-hat, ESS, divergences), sensitivity analysis tools, and publication-quality posterior visualization including trace plots, pairwise densities, forest plots, and posterior predictive checks.`,
    icon: <Calculator className="w-6 h-6" />,
    difficulty: 'advanced',
    tier: 'free',
    
    downloads: 19870,
    stars: 1456,
    forks: 389,
    runs: 34567,
    lastUpdated: '2026-08-12',
    version: '3.5.1',
    
    computeRequirements: {
      cpu: '2-16 cores',
      memory: '8-64 GB',
      storage: '1-50 GB',
      estimatedTime: '10 min - 48 hours',
      estimatedCost: { free: '$0', premium: '$0.50-5.00' }
    },
    
    supportedFormats: {
      input: ['CSV', 'TSV', 'RDS', 'Feather', 'JSON'],
      output: ['PDF', 'HTML', 'RDS', 'CSV', 'PNG', 'Stanfit']
    },
    
    parameters: [
      { name: 'data_file', type: 'file', description: 'Dataset for analysis', required: true },
      { name: 'model_type', type: 'select', description: 'Pre-built model type', required: true, options: ['linear-regression', 'logistic', 'hierarchical', 'survival', 'timeseries', 'spatial', 'custom'] },
      { name: 'outcome_variable', type: 'string', description: 'Dependent variable name', required: true },
      { name: 'predictors', type: 'array', description: 'Independent variable names', required: true },
      { name: 'chains', type: 'number', description: 'Number of MCMC chains', required: false, defaultValue: 4 },
      { name: 'iterations', type: 'number', description: 'Samples per chain', required: false, defaultValue: 2000 },
      { name: 'priors', type: 'file', description: 'Custom priors specification (optional)', required: false }
    ],
    
    papers: [
      {
        id: 'paper-stat-001',
        title: 'Stan: A probabilistic programming language',
        authors: 'Carpenter B, et al.',
        year: 2017,
        journal: 'Journal of Statistical Software',
        doi: '10.18637/jss.v076.i01',
        url: '#/papers/stan-2017',
        citations: 15678,
        abstract: 'Stan implements full Bayesian statistical inference with MCMC sampling...',
        relevanceScore: 99
      },
      {
        id: 'paper-stat-002',
        title: 'The No-U-Turn Sampler',
        authors: 'Hoffman MD, Gelman A',
        year: 2014,
        journal: 'JMLR',
        doi: '',
        url: '#/papers/nuts-2014',
        citations: 8901,
        abstract: 'NUTS efficiently explores complex posteriors without manual tuning...',
        relevanceScore: 95
      },
      {
        id: 'paper-stat-003',
        title: 'brms: An R package for Bayesian multilevel models',
        authors: 'Bürkner PC',
        year: 2017,
        journal: 'Journal of Statistical Software',
        doi: '10.18637/jss.v080.i01',
        url: '#/papers/brms-2017',
        citations: 5678,
        abstract: 'brms makes specifying complex Bayesian models straightforward...',
        relevanceScore: 89
      },
      {
        id: 'paper-stat-004',
        title: 'Prior choice recommendations',
        authors: 'Gelman A, et al.',
        year: 2020,
        journal: 'Statistical Science',
        doi: '10.1214/20-SS131',
        url: '#/papers/prior-recs-2020',
        citations: 2345,
        abstract: 'Practical guidance for prior specification in applied settings...',
        relevanceScore: 84
      }
    ],
    
    resources: [
      { type: 'tutorial', title: 'Bayesian Thinking Primer', url: '#/tutorials/bayesian-intro', description: 'Conceptual foundations', isFree: true },
      { type: 'notebook', title: 'Model Comparison Notebook', url: '#/notebooks/bayesian-model-comp', description: 'LOO-CV, WAIC examples', isFree: true },
      { type: 'dataset', title: 'Example Datasets', url: '#/datasets/bayesian-examples', description: 'Radon, Schools, etc.', isFree: true },
      { type: 'api-doc', title: 'Stan Language Reference', url: '#/docs/stan-language', description: 'Complete syntax guide', isFree: true },
      { type: 'video', title: 'Bayesian Workflow Course', url: '#/videos/bayesian-course', description: '12-hour masterclass', isFree: false },
      { type: 'example', title: 'Clinical Trial Analysis', url: '#/examples/bayesian-trial', description: 'Real trial reanalysis', isFree: true }
    ],
    
    useCases: [
      { title: 'Clinical Trial Analysis', domain: 'Pharmaceuticals', description: 'Hierarchical model for multi-site efficacy study', institution: 'Pfizer Statistics', results: 'Regulatory submission approved' },
      { title: 'Ecological Modeling', domain: 'Environmental Science', description: 'Spatial abundance model for species distribution', institution: 'USGS', results: 'Published in Ecology Letters' },
      { title: 'A/B Testing Framework', domain: 'Technology', description: 'Bayesian A/B test with heterogeneous treatment effects', institution: 'Netflix', results: 'Adopted company-wide' }
    ],
    
    tags: ['bayesian', 'stan', 'mcmc', 'hierarchical-models', 'uncertainty-quantification'],
    features: ['Automatic diagnostics', 'Prior sensitivity analysis', 'Posterior prediction', 'Model comparison', 'Reproducible seeds'],
    limitations: ['Computationally intensive', 'Requires statistical expertise'],
    
    author: 'Stan Development Team',
    authorInstitution: 'Columbia University',
    maintainers: 14,
    contributors: 156,
    
    hasApi: true,
    hasCli: true,
    hasNotebook: true,
    workflowCompatible: ['RMarkdown', 'Quarto', 'Jupyter', 'Nextflow']
  },

  // ==========================================================================
  // VISUALIZATION TEMPLATES
  // ==========================================================================
  {
    id: 'publication-figures-matplotlib',
    name: 'Publication-Quality Figures',
    slug: 'publication-figures-matplotlib',
    category: 'visualization',
    subcategory: 'Scientific Visualization',
    description: 'Generate publication-ready figures compliant with Nature, Science, Cell, and journal-specific formatting guidelines.',
    longDescription: `This template automates the creation of professional scientific figures that meet the strict requirements of high-impact journals. It provides a comprehensive library of plot types commonly used in scientific publications: scatter plots with error bars, heatmaps with annotations, volcano plots, PCA biplots, Kaplan-Meier curves, forest plots, Sankey diagrams, and more.

Each figure type is optimized for clarity, accessibility (colorblind-safe palettes), and reproducibility. The template handles font sizing, DPI settings, color spaces (RGB vs CMYK), and aspect ratios according to target journal specifications. Batch processing allows generating consistent figures across an entire manuscript.

Advanced features include automatic statistical annotations (p-values, significance stars), multi-panel figure assembly with shared axes, vector graphics export (SVG, PDF, EPS), and supplementary material generation. Integration with seaborn, plotly (for interactive web figures), and ggplot2 (via R bridge) ensures compatibility with existing workflows.`,
    icon: <BarChart3 className="w-6 h-6" />,
    difficulty: 'beginner',
    tier: 'free',
    
    downloads: 67890,
    stars: 3456,
    forks: 890,
    runs: 123456,
    lastUpdated: '2026-08-15',
    version: '4.0.0',
    
    computeRequirements: {
      cpu: '1-4 cores',
      memory: '2-8 GB',
      storage: '< 1 GB',
      estimatedTime: '30 seconds - 10 minutes',
      estimatedCost: { free: '$0', premium: '$0' }
    },
    
    supportedFormats: {
      input: ['CSV', 'TSV', 'Excel', 'JSON', 'Parquet'],
      output: ['PNG', 'PDF', 'SVG', 'EPS', 'TIFF', 'HTML']
    },
    
    parameters: [
      { name: 'data_file', type: 'file', description: 'Data to visualize', required: true },
      { name: 'figure_type', type: 'select', description: 'Type of figure to create', required: true, options: ['scatter', 'bar', 'heatmap', 'volcano', 'boxplot', 'violin', 'survival', 'forest', 'pca', 'sankey', 'manhattan', 'qq'] },
      { name: 'target_journal', type: 'select', description: 'Target journal for formatting', required: false, options: ['nature', 'science', 'cell', 'lancet', 'nejm', 'plos-one', 'generic', 'custom'] },
      { name: 'width', type: 'number', description: 'Figure width in inches', required: false, defaultValue: 8 },
      { name: 'dpi', type: 'number', description: 'Resolution (dots per inch)', required: false, defaultValue: 300 },
      { name: 'color_palette', type: 'select', description: 'Color scheme', required: false, defaultValue: 'colorblind-safe', options: ['colorblind-safe', 'viridis', 'nature', 'lancet', 'custom'] }
    ],
    
    papers: [
      {
        id: 'paper-viz-001',
        title: 'Ten simple rules for better figures',
        authors: 'Rougier NP, Droettboom M, Bourne PE',
        year: 2014,
        journal: 'PLoS Computational Biology',
        doi: '10.1371/journal.pcbi.1003833',
        url: '#/papers/ten-rules-figures',
        citations: 3456,
        abstract: 'Scientific visualization principles for effective communication...',
        relevanceScore: 97
      },
      {
        id: 'paper-viz-002',
        title: 'Perception in data visualization',
        authors: 'Heer J, Bostock M, Ogievetsky V',
        year: 2010,
        journal: 'CG&A',
        doi: '10.1109/MCG.2010.58',
        url: '#/papers/perception-viz',
        citations: 2345,
        abstract: 'Cognitive foundations for effective visualization design...',
        relevanceScore: 88
      },
      {
        id: 'paper-viz-003',
        title: 'Color maps for scientific data',
        authors: 'Crameri F, Shephard GS, Heron PJ',
        year: 2020,
        journal: 'Nature Communications',
        doi: '10.1038/s41467-020-19170-7',
        url: '#/papers/colormaps-2020',
        citations: 1234,
        abstract: 'Scientifically derived colormaps for accurate data representation...',
        relevanceScore: 82
      }
    ],
    
    resources: [
      { type: 'tutorial', title: 'Figure Design Principles', url: '#/tutorials/fig-design', description: 'Visual communication basics', isFree: true },
      { type: 'notebook', title: 'Gallery Notebook', url: '#/notebooks/figure-gallery', description: 'All plot types demonstrated', isFree: true },
      { type: 'dataset', title: 'Sample Datasets', url: '#/datasets/viz-samples', description: 'Practice data included', isFree: true },
      { type: 'api-doc', title: 'Plotting API Reference', url: '#/api/plotting', description: 'All options documented', isFree: true },
      { type: 'video', title: 'Data Viz Masterclass', url: '#/videos/viz-masterclass', description: '8-hour course', isFree: true },
      { type: 'example', title: 'Nature Figure Templates', url: '#/examples/nature-templates', description: 'Ready-to-use templates', isFree: true }
    ],
    
    useCases: [
      { title: 'Manuscript Figures', domain: 'Academic Publishing', description: 'Generate all figures for Cell paper', institution: 'Harvard Medical School', results: 'Accepted first submission' },
      { title: 'Conference Poster', domain: 'Scientific Communication', description: 'Create compelling poster visuals', institution: 'MIT', results: 'Best poster award, ASCB 2025' },
      { title: 'Grant Application', domain: 'Funding', description: 'Professional figures for NIH R01', institution: 'Johns Hopkins', results: 'Funded (percentile 8)' }
    ],
    
    tags: ['visualization', 'publication', 'matplotlib', 'scientific-figures', 'data-viz'],
    features: ['Journal presets', 'Colorblind-safe', 'Vector export', 'Batch processing', 'Statistical annotations'],
    limitations: ['Complex custom layouts need manual adjustment'],
    
    author: 'SciViz Team',
    authorInstitution: 'Open Source Community',
    maintainers: 8,
    contributors: 45,
    
    hasApi: true,
    hasCli: false,
    hasNotebook: true,
    workflowCompatible: ['Jupyter', 'RMarkdown', 'Quarto', 'Airflow']
  },

  // ==========================================================================
  // QUANTUM COMPUTING TEMPLATES
  // ==========================================================================
  {
    id: 'quantum-circuit-simulator',
    name: 'Quantum Circuit Simulator (Qiskit)',
    slug: 'quantum-circuit-simulator',
    category: 'quantum-computing',
    subcategory: 'Quantum Simulation',
    description: 'Design, simulate, and analyze quantum circuits up to 30 qubits with Qiskit Aer and visualization tools.',
    longDescription: `This quantum computing template provides a complete environment for developing and testing quantum algorithms before deploying to real hardware. Built on IBM's Qiskit ecosystem, it supports circuit construction, noise simulation, error mitigation, and result analysis for algorithms including Grover search, QAOA, VQE, QFT, and quantum machine learning circuits.

The simulator supports multiple backends: statevector simulation (exact, up to 30 qubits), shot-based simulation (with configurable noise models matching real devices), and stabilizer simulation for Clifford circuits. Advanced features include transpiler optimization passes, pulse-level control simulation, and tensor network methods for larger systems.

Integration with real quantum hardware (IBM Quantum, Rigetti, IonQ) is available for premium users, with job queuing, result caching, and error mitigation post-processing. The template includes educational content covering quantum computing fundamentals through advanced algorithm implementation.`,
    icon: <Atom className="w-6 h-6" />,
    difficulty: 'expert',
    tier: 'freemium',
    
    downloads: 12340,
    stars: 2345,
    forks: 567,
    runs: 23456,
    lastUpdated: '2026-08-14',
    version: '2.1.0',
    
    computeRequirements: {
      cpu: '4-16 cores',
      memory: '16-128 GB',
      storage: '5-50 GB',
      estimatedTime: '1 minute - 24 hours',
      estimatedCost: { free: 'Up to 10 qubits', premium: '$1.00-20.00' }
    },
    
    supportedFormats: {
      input: ['QASM', 'Python', 'JSON', 'OpenQASM3'],
      output: ['JSON', 'CSV', 'PNG', 'PDF', 'QASM']
    },
    
    parameters: [
      { name: 'circuit_definition', type: 'file', description: 'Quantum circuit (QASM or Python)', required: true },
      { name: 'algorithm', type: 'select', description: 'Pre-built algorithm template', required: false, options: ['grover', 'qaoa', 'vqe', 'qft', 'qpe', 'qml', 'custom'] },
      { name: 'num_qubits', type: 'number', description: 'Number of qubits (max varies by tier)', required: true },
      { name: 'backend', type: 'select', description: 'Simulation backend', required: false, defaultValue: 'aer_simulator', options: ['aer_simulator', 'statevector', 'unitary', 'stabilizer'] },
      { name: 'shots', type: 'number', description: 'Measurement shots', required: false, defaultValue: 1024 },
      { name: 'noise_model', type: 'select', description: 'Noise model for realistic simulation', required: false, options: ['none', 'ibmq_montreal', 'ibmq_toronto', 'fake_guadalupe', 'custom'] }
    ],
    
    papers: [
      {
        id: 'paper-qc-001',
        title: 'Qiskit: An open-source framework for quantum computing',
        authors: 'Aleksandrowicz G, et al.',
        year: 2019,
        journal: 'PhysRevA',
        doi: '10.1103/PhysRevA.101.032308',
        url: '#/papers/qiskit-2019',
        citations: 4567,
        abstract: 'Qiskit enables programmatic quantum computation...',
        relevanceScore: 98
      },
      {
        id: 'paper-qc-002',
        title: 'Quantum supremacy using a programmable processor',
        authors: 'Arute F, et al.',
        year: 2019,
        journal: 'Nature',
        doi: '10.1038/s41586-019-1666-5',
        url: '#/papers/quantum-supremacy',
        citations: 6789,
        abstract: 'Demonstration of quantum computational advantage...',
        relevanceScore: 92
      },
      {
        id: 'paper-qc-003',
        title: 'Variational quantum eigensolver',
        authors: 'Peruzzo A, et al.',
        year: 2014,
        journal: 'Nature Communications',
        doi: '10.1038/ncomms5213',
        url: '#/papers/vqe-2014',
        citations: 3456,
        abstract: 'Hybrid quantum-classical algorithm for chemistry...',
        relevanceScore: 87
      },
      {
        id: 'paper-qc-004',
        title: 'Error mitigation extends quantum computability',
        authors: 'Temme K, Bravyi S, Gambetta JM',
        year: 2017,
        journal: 'PRX',
        doi: '10.1103/PhysRevX.7.021015',
        url: '#/papers/error-mitigation',
        citations: 2345,
        abstract: 'Probabilistic error cancellation techniques...',
        relevanceScore: 81
      }
    ],
    
    resources: [
      { type: 'tutorial', title: 'Quantum Computing 101', url: '#/tutorials/qc-intro', description: 'From qubits to algorithms', isFree: true },
      { type: 'notebook', title: 'Algorithm Implementations', url: '#/notebooks/quantum-algos', description: 'Grover, Shor, QAOA...', isFree: true },
      { type: 'dataset', title: 'Test Circuits', url: '#/datasets/quantum-tests', description: 'Benchmark circuits', isFree: true },
      { type: 'api-doc', title: 'Qiskit API Reference', url: '#/docs/qiskit-api', description: 'Full documentation', isFree: true },
      { type: 'video', title: 'IBM Quantum Course', url: '#/videos/ibm-quantum-course', description: '20-hour certification', isFree: false },
      { type: 'example', title: 'Chemistry Simulation', url: '#/examples/quantum-chemistry', description: 'VQE for H2 molecule', isFree: true }
    ],
    
    useCases: [
      { title: 'Algorithm Prototyping', domain: 'Quantum Research', description: 'Develop new variational algorithms', institution: 'MIT IQC', results: 'Published in PRX Quantum' },
      { title: 'Education Platform', domain: 'Teaching', description: 'Hands-on quantum lab for students', institution: 'UC Berkeley', results: '500+ students trained' },
      { title: 'Hybrid Algorithm Testing', domain: 'Industry', description: 'QAOA for portfolio optimization', institution: 'Goldman Sachs', results: 'Proof-of-concept successful' }
    ],
    
    tags: ['quantum-computing', 'qiskit', 'quantum-algorithms', 'simulation', 'variational'],
    features: ['Multiple backends', 'Noise simulation', 'Error mitigation', 'Hardware integration', 'Visualization'],
    limitations: ['Classical exponential scaling', 'Real hardware requires queue time'],
    
    author: 'IBM Quantum Team',
    authorInstitution: 'IBM Research',
    maintainers: 20,
    contributors: 178,
    
    hasApi: true,
    hasCli: true,
    hasNotebook: true,
    workflowCompatible: ['Qiskit Patterns', 'Pennington', 'Braket SDK']
  }
];

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

function TierBadge({ tier }: { tier: 'free' | 'freemium' | 'premium' }) {
  const config = {
    free: { icon: <Gift className="w-3 h-3" />, label: 'Free', bg: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 border-green-200 dark:border-green-800' },
    freemium: { icon: <Star className="w-3 h-3" />, label: 'Freemium', bg: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 border-blue-200 dark:border-blue-800' },
    premium: { icon: <Crown className="w-3 h-3" />, label: 'Premium', bg: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 border-purple-200 dark:border-purple-800' }
  };
  
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${config[tier].bg}`}>
      {config[tier].icon}
      {config[tier].label}
    </span>
  );
}

function DifficultyBadge({ difficulty }: { difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert' }) {
  const config = {
    beginner: { label: 'Beginner', class: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' },
    intermediate: { label: 'Intermediate', class: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' },
    advanced: { label: 'Advanced', class: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300' },
    expert: { label: 'Expert', class: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' }
  };
  
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${config[difficulty].class}`}>
      {config[difficulty].label}
    </span>
  );
}

function StatBadge({ icon, value, label }: { icon: React.ReactNode; value: string | number; label: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      {icon}
      <span className="font-medium text-foreground">{value.toLocaleString()}</span>
      <span>{label}</span>
    </div>
  );
}

function PaperLookup({ papers }: { papers: PaperReference[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState<PaperReference | null>(null);
  
  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors text-sm font-medium text-primary"
      >
        <BookOpen className="w-4 h-4" />
        <span>Related Papers ({papers.length})</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border rounded-xl shadow-xl z-50 max-h-[400px] overflow-hidden animate-in slide-in-from-top-2 duration-200">
          <div className="p-3 border-b bg-muted/30">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search papers..."
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-background border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
          
          <div className="overflow-y-auto max-h-[320px] p-2 space-y-2">
            {papers.map((paper) => (
              <button
                key={paper.id}
                onClick={() => setSelectedPaper(paper)}
                className="w-full text-left p-3 rounded-lg hover:bg-muted/50 transition-colors group"
              >
                <div className="flex items-start gap-3">
                  <FileText className="w-4 h-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h5 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                      {paper.title}
                    </h5>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <span>{paper.authors.split(',')[0]} et al.</span>
                      <span>•</span>
                      <span>{paper.year}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <QuoteIcon className="w-3 h-3" />
                        {paper.citations.toLocaleString()}
                      </span>
                    </div>
                    <div className="mt-1.5 flex items-center gap-2">
                      <span className="px-1.5 py-0.5 rounded text-xs bg-primary/10 text-primary">
                        {Math.round(paper.relevanceScore)}% relevant
                      </span>
                      <span className="text-xs text-muted-foreground">{paper.journal}</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 text-muted-foreground transition-opacity flex-shrink-0" />
                </div>
              </button>
            ))}
          </div>
          
          <div className="p-3 border-t bg-muted/30">
            <a href="#/papers/all" className="text-xs text-primary hover:underline flex items-center justify-center gap-1">
              View All References
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}
      
      {/* Paper Detail Modal */}
      {selectedPaper && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedPaper(null)}>
          <div className="bg-card rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-2">{selectedPaper.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{selectedPaper.authors} ({selectedPaper.year})</p>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="px-2 py-0.5 rounded bg-muted">{selectedPaper.journal}</span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <QuoteIcon className="w-4 h-4" />
                      {selectedPaper.citations.toLocaleString()} citations
                    </span>
                  </div>
                </div>
                <button onClick={() => setSelectedPaper(null)} className="p-2 hover:bg-muted rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[50vh]">
              <div className="mb-4">
                <h4 className="text-sm font-semibold mb-2">Abstract</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{selectedPaper.abstract}</p>
              </div>
              
              {selectedPaper.doi && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold mb-2">DOI</h4>
                  <code className="text-xs bg-muted px-2 py-1 rounded">{selectedPaper.doi}</code>
                </div>
              )}
              
              <div className="mb-4">
                <h4 className="text-sm font-semibold mb-2">Relevance Score</h4>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                      style={{ width: `${selectedPaper.relevanceScore}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{selectedPaper.relevanceScore}%</span>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t bg-muted/30 flex gap-3">
              <Button size="sm" className="gap-2 flex-1">
                <ExternalLink className="w-4 h-4" />
                View Full Paper
              </Button>
              <Button size="sm" variant="outline" className="gap-2">
                <BookmarkPlus className="w-4 h-4" />
                Save
              </Button>
              <Button size="sm" variant="outline" className="gap-2">
                <Share2 className="w-4 h-4" />
                Cite
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function QuoteIcon(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/>
      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
    </svg>
  );
}

function ResourceCard({ resource }: { resource: TemplateResource }) {
  const typeConfig = {
    tutorial: { icon: <BookOpen className="w-4 h-4" />, color: 'text-blue-600 bg-blue-50 dark:bg-blue-950' },
    'api-doc': { icon: <Code2 className="w-4 h-4" />, color: 'text-purple-600 bg-purple-50 dark:bg-purple-950' },
    dataset: { icon: <Database className="w-4 h-4" />, color: 'text-cyan-600 bg-cyan-50 dark:bg-cyan-950' },
    example: { icon: <Terminal className="w-4 h-4" />, color: 'text-orange-600 bg-orange-50 dark:bg-orange-950' },
    video: { icon: <Play className="w-4 h-4" />, color: 'text-red-600 bg-red-50 dark:bg-red-950' },
    notebook: { icon: <FlaskConical className="w-4 h-4" />, color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950' }
  };
  
  const config = typeConfig[resource.type];
  
  return (
    <a
      href={resource.url}
      className={`flex items-start gap-3 p-3 rounded-lg border hover:shadow-md transition-all group ${resource.isFree ? '' : 'opacity-80'}`}
    >
      <div className={`p-2 rounded-lg ${config.color} flex-shrink-0`}>
        {config.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h5 className="text-sm font-medium truncate group-hover:text-primary transition-colors">
            {resource.title}
          </h5>
          {!resource.isFree && (
            <Lock className="w-3 h-3 text-muted-foreground flex-shrink-0" />
          )}
          {resource.isFree && (
            <Unlock className="w-3 h-3 text-green-600 flex-shrink-0" />
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">{resource.description}</p>
      </div>
      <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1" />
    </a>
  );
}

function TemplateCard({ template, onSelect }: { template: ScientificTemplate; onSelect: () => void }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const category = categories.find(c => c.id === template.category)!;
  
  return (
    <div className="group rounded-xl border bg-card overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Card Header */}
      <div className="p-5 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-xl bg-gradient-to-br ${category.gradient} text-white shadow-lg group-hover:scale-105 transition-transform`}>
              {template.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                  {template.name}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">{template.description}</p>
              
              <div className="flex items-center gap-2 mt-3 flex-wrap">
                <TierBadge tier={template.tier} />
                <DifficultyBadge difficulty={template.difficulty} />
                <span className="text-xs text-muted-foreground px-2 py-0.5 rounded bg-muted">
                  v{template.version}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => { e.stopPropagation(); onSelect(); }}
              className="p-2 rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
              title="View full details"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </div>
        </div>
        
        {/* Stats Row */}
        <div className="flex items-center gap-4 pt-4 border-t border-border/50 flex-wrap">
          <StatBadge icon={<Download className="w-4 h-4" />} value={template.downloads} label="downloads" />
          <StatBadge icon={<Star className="w-4 h-4" />} value={template.stars} label="stars" />
          <StatBadge icon={<Play className="w-4 h-4" />} value={template.runs} label="runs" />
          <div className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            Updated {template.lastUpdated}
          </div>
        </div>
      </div>
      
      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t p-5 space-y-5 animate-in slide-in-from-top-2 duration-200">
          {/* Compute Requirements */}
          <div>
            <h5 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-primary" />
              Compute Requirements
            </h5>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3 rounded-lg bg-muted/50 text-center">
                <Cpu className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                <div className="text-xs text-muted-foreground">CPU</div>
                <div className="text-sm font-medium">{template.computeRequirements.cpu}</div>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 text-center">
                <HardDrive className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                <div className="text-xs text-muted-foreground">Memory</div>
                <div className="text-sm font-medium">{template.computeRequirements.memory}</div>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 text-center">
                <Clock className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                <div className="text-xs text-muted-foreground">Time</div>
                <div className="text-sm font-medium">{template.computeRequirements.estimatedTime}</div>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 text-center">
                <Zap className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                <div className="text-xs text-muted-foreground">Cost</div>
                <div className="text-sm font-medium">{template.computeRequirements.estimatedCost.free}</div>
              </div>
            </div>
          </div>
          
          {/* Papers Lookup */}
          <div>
            <h5 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" />
              Academic References
            </h5>
            <PaperLookup papers={template.papers} />
          </div>
          
          {/* Resources Preview */}
          <div>
            <h5 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-primary" />
              Learning Resources ({template.resources.filter(r => r.isFree).length} free)
            </h5>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {template.resources.slice(0, 4).map((resource, idx) => (
                <ResourceCard key={idx} resource={resource} />
              ))}
              {template.resources.length > 4 && (
                <button className="w-full text-center text-sm text-primary hover:underline py-2">
                  View all {template.resources.length} resources →
                </button>
              )}
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="flex gap-2 pt-3 border-t">
            <Button size="sm" className="gap-2 flex-1">
              <Play className="w-4 h-4" />
              Run Template
            </Button>
            <Button size="sm" variant="outline" className="gap-2">
              <Copy className="w-4 h-4" />
              Clone
            </Button>
            <Button size="sm" variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function TemplateDetailView({ template, onBack }: { template: ScientificTemplate; onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'parameters' | 'resources' | 'use-cases'>('overview');
  const category = categories.find(c => c.id === template.category)!;
  
  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Gallery
              </Button>
              <div className="hidden sm:block h-6 w-px bg-border"></div>
              <nav className="hidden md:flex items-center gap-1">
                <Button variant="ghost" size="sm" onClick={() => window.location.href = '/'} className="gap-2">
                  <Home className="w-4 h-4" />
                  Home
                </Button>
                <Button variant="ghost" size="sm" onClick={() => window.location.href = '/#dashboard'} className="gap-2">
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Button>
              </nav>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <BookmarkPlus className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Share2 className="w-4 h-4" />
              </Button>
              <Button size="sm" className="gradient-bg text-white border-0 gap-2">
                <Play className="w-4 h-4" />
                Launch Template
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className={`relative overflow-hidden bg-gradient-to-br ${category.gradient} text-white`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-72 h-72 bg-white rounded-full blur-[128px]"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-white rounded-full blur-[128px]"></div>
        </div>
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <TierBadge tier={template.tier} />
                <DifficultyBadge difficulty={template.difficulty} />
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-white/20 backdrop-blur">
                  v{template.version}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {template.name}
              </h1>
              
              <p className="text-lg text-white/80 mb-6 leading-relaxed max-w-3xl">
                {template.longDescription.split('\n\n')[0]}
              </p>
              
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    {template.icon}
                  </div>
                  <div>
                    <div className="font-medium">{template.author}</div>
                    <div className="text-sm text-white/60">{template.authorInstitution}</div>
                  </div>
                </div>
                
                <div className="h-10 w-px bg-white/20 hidden sm:block"></div>
                
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current" /> {template.stars.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Download className="w-4 h-4" /> {template.downloads.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitBranch className="w-4 h-4" /> {template.forks.toLocaleString()}
                  </span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Button size="lg" variant="secondary" className="gap-2 bg-white text-gray-900 hover:bg-white/90">
                  <Play className="w-5 h-5" />
                  Run Now
                </Button>
                <Button size="lg" variant="outline" className="gap-2 text-white border-white/30 hover:bg-white/10">
                  <Copy className="w-5 h-5" />
                  Clone to Workspace
                </Button>
                <Button size="lg" variant="outline" className="gap-2 text-white border-white/30 hover:bg-white/10">
                  <Download className="w-5 h-5" />
                  Download
                </Button>
              </div>
            </div>
            
            {/* Quick Info Card */}
            <div className="w-full lg:w-80 bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
              <h3 className="font-semibold mb-4">Quick Info</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Category</span>
                  <span className="font-medium">{category.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Compute Time</span>
                  <span className="font-medium">{template.computeRequirements.estimatedTime}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Free Tier Cost</span>
                  <span className="font-medium text-green-300">{template.computeRequirements.estimatedCost.free}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Last Updated</span>
                  <span className="font-medium">{template.lastUpdated}</span>
                </div>
                
                <div className="pt-4 border-t border-white/20">
                  <div className="text-sm text-white/60 mb-2">Supported Formats</div>
                  <div className="flex flex-wrap gap-1">
                    {template.supportedFormats.input.slice(0, 3).map(fmt => (
                      <span key={fmt} className="px-2 py-0.5 rounded text-xs bg-white/10">{fmt}</span>
                    ))}
                    <span className="px-2 py-0.5 rounded text-xs bg-white/10">+{template.supportedFormats.input.length - 3} more</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-white/20">
                  <div className="text-sm text-white/60 mb-2">Workflow Compatible</div>
                  <div className="flex flex-wrap gap-1">
                    {template.workflowCompatible.slice(0, 3).map(wf => (
                      <span key={wf} className="px-2 py-0.5 rounded text-xs bg-white/10">{wf}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="sticky top-16 z-30 bg-background border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-1 overflow-x-auto py-2">
            {[
              { id: 'overview', label: 'Overview', icon: <Eye className="w-4 h-4" /> },
              { id: 'parameters', label: 'Parameters', icon: <SlidersHorizontal className="w-4 h-4" /> },
              { id: 'resources', label: 'Resources', icon: <BookOpen className="w-4 h-4" /> },
              { id: 'use-cases', label: 'Use Cases', icon: <Target className="w-4 h-4" /> },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </section>

      {/* Tab Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8 max-w-4xl">
            <div>
              <h2 className="text-2xl font-bold mb-4">About This Template</h2>
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                {template.longDescription.split('\n\n').map((para, idx) => (
                  <p key={idx} className="text-muted-foreground leading-relaxed mb-4">{para}</p>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Features</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {template.features.map(feature => (
                  <div key={feature} className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Limitations</h3>
              <div className="space-y-2">
                {template.limitations.map(limitation => (
                  <div key={limitation} className="flex items-start gap-2 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900">
                    <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{limitation}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {template.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full text-sm bg-muted hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Academic References</h3>
              <PaperLookup papers={template.papers} />
            </div>
          </div>
        )}
        
        {activeTab === 'parameters' && (
          <div className="max-w-4xl">
            <h2 className="text-2xl font-bold mb-6">Template Parameters</h2>
            <div className="rounded-xl border overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-4 font-semibold text-sm">Parameter</th>
                    <th className="text-left p-4 font-semibold text-sm">Type</th>
                    <th className="text-left p-4 font-semibold text-sm hidden sm:table-cell">Description</th>
                    <th className="text-center p-4 font-semibold text-sm">Required</th>
                    <th className="text-right p-4 font-semibold text-sm hidden md:table-cell">Default</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {template.parameters.map(param => (
                    <tr key={param.name} className="hover:bg-muted/30">
                      <td className="p-4">
                        <code className="text-sm font-mono bg-muted px-2 py-1 rounded">{param.name}</code>
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary capitalize">
                          {param.type}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-muted-foreground hidden sm:table-cell">{param.description}</td>
                      <td className="p-4 text-center">
                        {param.required ? (
                          <span className="text-red-600 font-medium">Yes</span>
                        ) : (
                          <span className="text-muted-foreground">No</span>
                        )}
                      </td>
                      <td className="p-4 text-right text-sm font-mono hidden md:table-cell">
                        {param.defaultValue !== undefined ? String(param.defaultValue) : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {template.parameters.some(p => p.options) && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Select Options Reference</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {template.parameters.filter(p => p.options).map(param => (
                    <div key={param.name} className="p-4 rounded-lg border">
                      <h4 className="font-medium text-sm mb-2 font-mono">{param.name}</h4>
                      <ul className="space-y-1">
                        {param.options!.map(opt => (
                          <li key={opt} className="text-sm text-muted-foreground flex items-center gap-2">
                            <ChevronRight className="w-3 h-3" />
                            {opt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'resources' && (
          <div className="max-w-4xl">
            <h2 className="text-2xl font-bold mb-6">Learning Resources & Documentation</h2>
            
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">All Resources ({template.resources.length})</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Unlock className="w-4 h-4 text-green-600" />
                  {template.resources.filter(r => r.isFree).length} Free
                  <Lock className="w-4 h-4 ml-2" />
                  {template.resources.filter(r => !r.isFree).length} Premium
                </div>
              </div>
              
              <div className="space-y-3">
                {template.resources.map((resource, idx) => (
                  <ResourceCard key={idx} resource={resource} />
                ))}
              </div>
            </div>
            
            <div className="p-6 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5 border border-dashed">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Need help getting started?</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Our community and documentation team are here to assist you.
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Ask Community
                    </Button>
                    <Button size="sm" variant="outline" className="gap-2">
                      <BookOpen className="w-4 h-4" />
                      Read Docs
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'use-cases' && (
          <div className="max-w-4xl">
            <h2 className="text-2xl font-bold mb-6">Real-World Applications</h2>
            
            <div className="space-y-6">
              {template.useCases.map((useCase, idx) => (
                <div key={idx} className="p-6 rounded-xl border bg-card hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${category.gradient} text-white flex-shrink-0`}>
                      <Target className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{useCase.title}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 rounded text-xs font-medium bg-muted">{useCase.domain}</span>
                        {useCase.institution && (
                          <span className="text-sm text-muted-foreground">{useCase.institution}</span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{useCase.description}</p>
                      {useCase.results && (
                        <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900">
                          <div className="flex items-center gap-2 text-sm text-green-700 dark:text-green-300">
                            <Award className="w-4 h-4" />
                            <span className="font-medium">Results:</span>
                            <span>{useCase.results}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-6 rounded-xl bg-muted/30 border border-dashed text-center">
              <p className="text-muted-foreground mb-3">Have you used this template? Share your experience!</p>
              <Button variant="outline" className="gap-2">
                <MessageSquare className="w-4 h-4" />
                Submit Use Case
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function TemplateGalleryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | 'all'>('all');
  const [selectedTier, setSelectedTier] = useState<'all' | 'free' | 'freemium' | 'premium'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'popular' | 'recent' | 'name' | 'downloads'>('popular');
  const [selectedTemplate, setSelectedTemplate] = useState<ScientificTemplate | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Filtered and sorted templates
  const filteredTemplates = useMemo(() => {
    let filtered = [...templates];
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(t =>
        t.name.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query) ||
        t.tags.some(tag => tag.includes(query)) ||
        t.category.includes(query)
      );
    }
    
    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(t => t.category === selectedCategory);
    }
    
    // Tier filter
    if (selectedTier !== 'all') {
      filtered = filtered.filter(t => t.tier === selectedTier);
    }
    
    // Difficulty filter
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(t => t.difficulty === selectedDifficulty);
    }
    
    // Sort
    switch (sortBy) {
      case 'popular':
        filtered.sort((a, b) => b.stars - a.stars);
        break;
      case 'recent':
        filtered.sort((a, b) => b.lastUpdated.localeCompare(a.lastUpdated));
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'downloads':
        filtered.sort((a, b) => b.downloads - a.downloads);
        break;
    }
    
    return filtered;
  }, [searchQuery, selectedCategory, selectedTier, selectedDifficulty, sortBy]);

  // If a template is selected, show detail view
  if (selectedTemplate) {
    return <TemplateDetailView template={selectedTemplate} onBack={() => setSelectedTemplate(null)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Navigation */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild className="gap-2">
                <a href="/">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </a>
              </Button>
              <div className="hidden sm:block h-6 w-px bg-border"></div>
              <div className="flex items-center gap-2">
                <FlaskConical className="w-6 h-6 text-primary" />
                <h1 className="text-xl font-bold">Template Gallery</h1>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild className="gap-2">
                <a href="/#dashboard">
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </a>
              </Button>
              <Button size="sm" className="gradient-bg text-white border-0 gap-2">
                <Sparkles className="w-4 h-4" />
                Submit Template
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full blur-[128px]"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500 rounded-full blur-[128px]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500 rounded-full blur-[128px]"></div>
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
              <LayoutTemplate className="w-4 h-4" />
              <span className="text-sm font-medium">Scientific Computing Templates</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Template Gallery for{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Common Analyses
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed">
              Pre-built, peer-reviewed templates for bioinformatics, cheminformatics, machine learning, 
              statistics, and more. Start your analysis in minutes, not days.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-10">
              {[
                { label: 'Templates', value: '40+', icon: <LayoutTemplate className="w-4 h-4" /> },
                { label: 'Categories', value: '8', icon: <Grid3X3 className="w-4 h-4" /> },
                { label: 'Free Tier', value: '100%', icon: <Gift className="w-4 h-4" /> },
                { label: 'Citations', value: '150K+', icon: <BookOpen className="w-4 h-4" /> },
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

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search templates by name, category, or technique..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 backdrop-blur border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 text-lg"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="currentColor" className="text-background"/>
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Filters Bar */}
        <div className={`transition-all duration-300 ${showFilters ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden mb-6`}>
          <div className="p-6 rounded-xl border bg-card space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </h3>
              <Button variant="ghost" size="sm" onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedTier('all');
                setSelectedDifficulty('all');
              }}>
                Clear All
              </Button>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Category Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as TemplateCategory | 'all')}
                  className="w-full px-3 py-2 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="all">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              
              {/* Tier Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">Pricing Tier</label>
                <select
                  value={selectedTier}
                  onChange={(e) => setSelectedTier(e.target.value as 'all' | 'free' | 'freemium' | 'premium')}
                  className="w-full px-3 py-2 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="all">All Tiers</option>
                  <option value="free">Free Only</option>
                  <option value="freemium">Freemium</option>
                  <option value="premium">Premium</option>
                </select>
              </div>
              
              {/* Difficulty Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">Difficulty</label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="all">All Levels</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="expert">Expert</option>
                </select>
              </div>
              
              {/* Sort By */}
              <div>
                <label className="text-sm font-medium mb-2 block">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="w-full px-3 py-2 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="popular">Most Popular</option>
                  <option value="recent">Recently Updated</option>
                  <option value="name">Name (A-Z)</option>
                  <option value="downloads">Most Downloads</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Category Pills & Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80 text-muted-foreground'
              }`}
            >
              All ({templates.length})
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80 text-muted-foreground'
                }`}
              >
                {cat.name} ({templates.filter(t => t.category === cat.id).length})
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {filteredTemplates.length} templates found
            </span>
            <div className="flex border rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Templates Grid/List */}
        {filteredTemplates.length > 0 ? (
          <div className={
            viewMode === 'grid'
              ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }>
            {filteredTemplates.map(template => (
              <TemplateCard
                key={template.id}
                template={template}
                onSelect={() => setSelectedTemplate(template)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-muted mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No templates found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <Button variant="outline" onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedTier('all');
              setSelectedDifficulty('all');
            }}>
              Clear Filters
            </Button>
          </div>
        )}

        {/* Featured Categories Section */}
        <section className="mt-16 pt-16 border-t">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Explore by Category</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find templates tailored to your specific domain and research area.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`group p-6 rounded-2xl border text-left transition-all hover:shadow-xl ${
                  selectedCategory === category.id ? 'ring-2 ring-primary' : ''
                }`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.gradient} text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  {category.icon}
                </div>
                <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-primary">
                    {templates.filter(t => t.category === category.id).length} templates
                  </span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Community CTA */}
        <section className="mt-16 pt-16 border-t">
          <div className="rounded-3xl bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-8 md:p-12 border border-dashed">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6">
                <Users className="w-8 h-8" />
              </div>
              
              <h2 className="text-3xl font-bold mb-4">Join Our Template Community</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Share your own templates, contribute to existing ones, and help accelerate scientific discovery worldwide.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="gap-2">
                  <Sparkles className="w-5 h-5" />
                  Submit Your Template
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Join Discussion
                </Button>
                <Button size="lg" variant="ghost" className="gap-2">
                  <BookOpen className="w-5 h-5" />
                  Contribution Guidelines
                </Button>
              </div>
              
              <div className="mt-10 pt-8 border-t border-border/50">
                <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    Peer-reviewed templates
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    Automated testing
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    Version controlled
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    Community support
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
