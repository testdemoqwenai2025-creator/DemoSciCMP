#!/usr/bin/env python3
"""
Update TemplateGalleryPage.tsx to add:
1. One-click Setup Task Modal with step-by-step tasks
2. Proper state management for setup tasks
3. Enhanced interactivity for Core Capabilities
"""

import re

FILE_PATH = '/home/z/my-project/src/components/SciCMP/TemplateGalleryPage.tsx'

def read_file():
    with open(FILE_PATH, 'r', encoding='utf-8') as f:
        return f.read()

def write_file(content):
    with open(FILE_PATH, 'w', encoding='utf-8') as f:
        f.write(content)

def main():
    content = read_file()
    
    # 1. Add new state variables for One-click Setup Modal
    old_state = """  // NEW: State for enhanced interactivity
  const [activeTab, setActiveTab] = useState<'overview' | 'presets' | 'practices' | 'community' | 'quickstart'>('overview');
  const [isLaunching, setIsLaunching] = useState(false);
  const [launchProgress, setLaunchProgress] = useState(0);
  const [showLaunchModal, setShowLaunchModal] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<ParameterPreset | null>(null);"""
    
    new_state = """  // NEW: State for enhanced interactivity
  const [activeTab, setActiveTab] = useState<'overview' | 'presets' | 'practices' | 'community' | 'quickstart'>('overview');
  const [isLaunching, setIsLaunching] = useState(false);
  const [launchProgress, setLaunchProgress] = useState(0);
  const [showLaunchModal, setShowLaunchModal] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<ParameterPreset | null>(null);
  
  // NEW: One-click Setup Task Modal state
  const [showOneClickSetupModal, setShowOneClickSetupModal] = useState(false);
  const [setupTasks, setSetupTasks] = useState<SetupTask[]>([]);
  const [currentSetupStep, setCurrentSetupStep] = useState(0);
  const [isRunningSetup, setIsRunningSetup] = useState(false);"""
    
    content = content.replace(old_state, new_state)
    
    # 2. Add SetupTask interface and generateSetupTasks function before URL ROUTING
    url_routing_marker = "// ============================================================================\n// URL ROUTING CONFIGURATION\n// ============================================================================"
    
    setup_tasks_code = """// ============================================================================
// ONE-CLICK SETUP TASKS DATA
// ============================================================================

interface SetupTask {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'running' | 'completed' | 'error';
  command?: string;
  output?: string;
  estimatedTime: string;
}

const generateSetupTasks = (template: TemplateData): SetupTask[] => [
  {
    id: 'validate-env',
    title: 'Validate Environment',
    description: `Checking system requirements for ${template.name}...`,
    status: 'pending',
    command: 'scicmp env check --template ' + template.id,
    output: '✓ Python 3.10+ detected\\n✓ Memory: 16GB available\\n✓ Disk: 50GB free\\n✓ GPU: Not required (CPU mode)',
    estimatedTime: '5-10 sec'
  },
  {
    id: 'fetch-deps',
    title: 'Fetch Dependencies',
    description: 'Downloading and installing required packages...',
    status: 'pending',
    command: 'scicmp deps install --preset default',
    output: `Installing ${template.category} packages...\\n✓ numpy 1.24.0\\n✓ pandas 2.0.0\\n✓ scikit-learn 1.3.0\\n✓ matplotlib 3.7.0\\n✓ jupyter 1.0.0`,
    estimatedTime: '30-60 sec'
  },
  {
    id: 'load-sample-data',
    title: 'Load Sample Data',
    description: 'Downloading sample dataset for initial testing...',
    status: 'pending',
    command: 'scicmp data load --sample',
    output: `Loading ${template.sampleDataType || 'sample'} dataset...\\n✓ Downloaded 2.5MB\\n✓ Validated checksum\\n✓ Extracted to ./data/`,
    estimatedTime: '10-20 sec'
  },
  {
    id: 'configure-preset',
    title: 'Apply Configuration Preset',
    description: 'Applying recommended parameters for optimal results...',
    status: 'pending',
    command: 'scicmp config apply --preset recommended',
    output: `Applied ${template.name} recommended preset:\\n• method: auto\\n• confidence: 0.95\\n• threads: 4\\n• output_format: pdf`,
    estimatedTime: '5 sec'
  },
  {
    id: 'init-workspace',
    title: 'Initialize Workspace',
    description: 'Creating project structure and workspace files...',
    status: 'pending',
    command: 'scicmp workspace init --name ' + template.id.replace('-', '_'),
    output: `Workspace initialized:\\n✓ ./workspace/ created\\n✓ config.yaml written\\n✓ notebooks/ ready\\n✓ outputs/ configured`,
    estimatedTime: '10 sec'
  },
  {
    id: 'validate-setup',
    title: 'Validate Setup',
    description: 'Running smoke tests to verify installation...',
    status: 'pending',
    command: 'scicmp validate --full',
    output: `✓ All dependencies resolved\\n✓ Sample data accessible\\n✓ Configuration valid\\n✓ Test run successful\\n\\n🎉 ${template.name} is ready to use!`,
    estimatedTime: '15-30 sec'
  }
];

"""
    
    content = content.replace(url_routing_marker, setup_tasks_code + url_routing_marker)
    
    # 3. Add triggerOneClickSetup and closeOneClickSetupModal functions after launchTemplate
    # Find the end of launchTemplate function (after the closing }, []);)
    launch_template_end = """  }, []);
  
  // Copy to clipboard helper"""
    
    new_functions = """  }, []);

  // NEW: One-click Setup with Task Modal
  const triggerOneClickSetup = useCallback((template: TemplateData) => {
    const tasks = generateSetupTasks(template);
    setSetupTasks(tasks);
    setCurrentSetupStep(0);
    setIsRunningSetup(true);
    setShowOneClickSetupModal(true);
    
    // Run tasks sequentially with visual feedback
    tasks.forEach((task, index) => {
      setTimeout(() => {
        setSetupTasks(prev => prev.map((t, i) => 
          i === index ? { ...t, status: 'running' as const } : t
        ));
        
        // Simulate task completion after delay
        setTimeout(() => {
          setSetupTasks(prev => prev.map((t, i) => 
            i === index ? { ...t, status: 'completed' as const } : t
          ));
          setCurrentSetupStep(index + 1);
          
          // Mark setup as complete when all done
          if (index === tasks.length - 1) {
            setTimeout(() => {
              setIsRunningSetup(false);
            }, 500);
          }
        }, 800 + Math.random() * 700);
      }, index * 1500);
    });
  }, []);

  const closeOneClickSetupModal = useCallback(() => {
    if (!isRunningSetup) {
      setShowOneClickSetupModal(false);
      setSetupTasks([]);
      setCurrentSetupStep(0);
    }
  }, [isRunningSetup]);
  
  // Copy to clipboard helper"""
    
    content = content.replace(launch_template_end, new_functions)
    
    # 4. Update the action button handler in Core Capabilities to handle one-click-setup
    old_action_handler = """if (capability.actionType === 'launch') {
                          // Launch first template
                          launchTemplate(templates[0]);
                        } else if (capability.actionType === 'navigate') {"""
    
    new_action_handler = """if (capability.id === 'one-click-setup') {
                          // Show One-click Setup Task Modal
                          triggerOneClickSetup(templates[0]);
                        } else if (capability.actionType === 'launch') {
                          launchTemplate(templates[0]);
                        } else if (capability.actionType === 'navigate') {"""
    
    content = content.replace(old_action_handler, new_action_handler)
    
    # 5. Add the One-click Setup Modal before the closing </div> of the main component
    # Find the Launch Modal closing and add after it
    launch_modal_close = """        )}
      </div>
    );
  }

  // Gallery View"""
    
    one_click_modal = """        )}

        {/* ========================================== */}
        {/* ONE-CLICK SETUP TASK MODAL - NEW FEATURE     */}
        {/* ========================================== */}
        {showOneClickSetupModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60] p-4">
            <div className="bg-slate-900 rounded-2xl p-6 max-w-2xl w-full border border-cyan-500/30 max-h-[85vh] overflow-hidden flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold flex items-center gap-2">
                  <Zap className="w-7 h-7 text-cyan-400" />
                  One-Click Setup
                </h3>
                {!isRunningSetup && (
                  <button
                    onClick={closeOneClickSetupModal}
                    className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
                  >
                    ✕
                  </button>
                )}
              </div>
              
              <p className="text-slate-400 text-sm mb-4">
                Automatically configuring your environment for <strong className="text-white">{templates[0]?.name}</strong>. Each step runs sequentially.
              </p>
              
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Setup Progress</span>
                  <span>{currentSetupStep}/{setupTasks.length} steps completed</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2.5">
                  <div 
                    className="bg-gradient-to-r from-cyan-500 to-violet-600 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${setupTasks.length > 0 ? (currentSetupStep / setupTasks.length) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Tasks List */}
              <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-2">
                {setupTasks.map((task, index) => (
                  <div 
                    key={task.id}
                    className={`rounded-lg p-4 border transition-all ${
                      task.status === 'completed' ? 'bg-emerald-500/10 border-emerald-500/30' :
                      task.status === 'running' ? 'bg-cyan-500/10 border-cyan-500/30 animate-pulse' :
                      task.status === 'error' ? 'bg-red-500/10 border-red-500/30' :
                      'bg-slate-800 border-slate-700'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Status Icon */}
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        task.status === 'completed' ? 'bg-emerald-500' :
                        task.status === 'running' ? 'bg-cyan-500 animate-spin' :
                        task.status === 'error' ? 'bg-red-500' :
                        'bg-slate-600'
                      }`}>
                        {task.status === 'completed' && <CheckCircle2 className="w-4 h-4 text-white" />}
                        {task.status === 'running' && <RefreshCw className="w-4 h-4 text-white" />}
                        {task.status === 'error' && <span className="text-white text-xs">!</span>}
                        {task.status === 'pending' && <span className="text-slate-400 text-xs">{index + 1}</span>}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className={`font-medium text-sm ${
                            task.status === 'completed' ? 'text-emerald-400' :
                            task.status === 'running' ? 'text-cyan-400' :
                            task.status === 'error' ? 'text-red-400' :
                            'text-white'
                          }`}>
                            {task.title}
                          </h4>
                          <span className="text-xs text-slate-500">({task.estimatedTime})</span>
                        </div>
                        
                        <p className="text-xs text-slate-400 mb-2">{task.description}</p>
                        
                        {/* Command */}
                        {task.status !== 'pending' && task.command && (
                          <code className="block text-xs bg-slate-950 p-2 rounded text-emerald-400 font-mono mb-2">
                            $ {task.command}
                          </code>
                        )}
                        
                        {/* Output */}
                        {task.status === 'completed' && task.output && (
                          <pre className="text-xs bg-slate-950 p-2 rounded text-slate-300 font-mono whitespace-pre-wrap">
                            {task.output}
                          </pre>
                        )}
                        
                        {task.status === 'running' && (
                          <div className="flex items-center gap-2 text-xs text-cyan-400">
                            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                            Executing...
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Footer Actions */}
              <div className="border-t border-slate-700 pt-4">
                {!isRunningSetup ? (
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setShowOneClickSetupModal(false);
                        // Also launch the template after setup completes
                        if (templates[0]) launchTemplate(templates[0]);
                      }}
                      className="flex-1 py-3 bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-500 hover:to-violet-500 rounded-lg font-medium flex items-center justify-center gap-2 transition-all"
                    >
                      <Rocket className="w-5 h-5" />
                      Open Workspace
                    </button>
                    <button
                      onClick={closeOneClickSetupModal}
                      className="px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg font-medium transition-colors"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-2 text-sm text-slate-400 flex items-center justify-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Running setup steps... Please wait
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Gallery View"""
    
    content = content.replace(launch_modal_close, one_click_modal)
    
    write_file(content)
    print("✅ TemplateGalleryPage.tsx updated successfully!")
    print("   - Added One-click Setup Task Modal")
    print("   - Added SetupTask interface and data")
    print("   - Added triggerOneClickSetup() function")
    print("   - Updated Core Capabilities action handler")

if __name__ == '__main__':
    main()
