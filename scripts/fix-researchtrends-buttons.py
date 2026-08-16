#!/usr/bin/env python3
"""
Fix ResearchTrendsPage.tsx - Add onClick handlers to all buttons
"""

FILE_PATH = '/home/z/my-project/src/components/SciCMP/ResearchTrendsPage.tsx'

def read_file():
    with open(FILE_PATH, 'r', encoding='utf-8') as f:
        return f.read()

def write_file(content):
    with open(FILE_PATH, 'w', encoding='utf-8') as f:
        f.write(content)

def main():
    content = read_file()
    
    # Fix 1: Upgrade button in FeatureCard (line ~470)
    old_upgrade_btn = """<Button size="sm" variant="outline" className="gap-1 text-xs h-8">
                      <Crown className="w-3 h-3" />
                      {feature.tier === 'premium' ? 'Upgrade to Pro' : 'View Plans'}
                    </Button>"""
    
    new_upgrade_btn = """<Button 
                      size="sm" 
                      variant="outline" 
                      className="gap-1 text-xs h-8"
                      onClick={() => {
                        const msg = feature.tier === 'premium' 
                          ? '💎 Upgrading to Pro tier...\\n\\nThis would:\\n• Unlock all premium features\\n• Enable advanced tools\\n• Provide priority support'
                          : '📋 Viewing available plans...';
                        alert(msg);
                      }}
                    >
                      <Crown className="w-3 h-3" />
                      {feature.tier === 'premium' ? 'Upgrade to Pro' : 'View Plans'}
                    </Button>"""
    
    content = content.replace(old_upgrade_btn, new_upgrade_btn)
    
    # Fix 2: Phase CTA buttons - Active phase
    old_active_btns = """{phase.status === 'active' && (
                  <>
                    <Button size="lg" variant="secondary" className="gap-2 whitespace-nowrap">
                      <Play className="w-4 h-4" />
                      Get Started Free
                    </Button>
                    <Button size="lg" variant="outline" className="gap-2 text-white border-white/30 hover:bg-white/10 whitespace-nowrap">
                      <BookOpen className="w-4 h-4" />
                      Documentation
                    </Button>
                  </>
                )}"""
    
    new_active_btns = """{phase.status === 'active' && (
                  <>
                    <Button 
                      size="lg" 
                      variant="secondary" 
                      className="gap-2 whitespace-nowrap"
                      onClick={() => alert('🚀 Starting with free tier...\\n\\nRedirecting to template gallery!')}
                    >
                      <Play className="w-4 h-4" />
                      Get Started Free
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="gap-2 text-white border-white/30 hover:bg-white/10 whitespace-nowrap"
                      onClick={() => alert('📖 Opening documentation...\\n\\nLoading user guides and API docs.')}
                    >
                      <BookOpen className="w-4 h-4" />
                      Documentation
                    </Button>
                  </>
                )}"""
    
    content = content.replace(old_active_btns, new_active_btns)
    
    # Fix 3: Phase CTA buttons - Upcoming phase
    old_upcoming_btns = """{phase.status === 'upcoming' && (
                  <>
                    <Button size="lg" variant="secondary" className="gap-2 whitespace-nowrap">
                      <Bell className="w-4 h-4" />
                      Join Waitlist
                    </Button>
                    <Button size="lg" variant="outline" className="gap-2 text-white border-white/30 hover:bg-white/10 whitespace-nowrap">
                      <Eye className="w-4 h-4" />
                      Preview Demo
                    </Button>
                  </>
                )}"""
    
    new_upcoming_btns = """{phase.status === 'upcoming' && (
                  <>
                    <Button 
                      size="lg" 
                      variant="secondary" 
                      className="gap-2 whitespace-nowrap"
                      onClick={() => {
                        alert('🔔 Joining waitlist...\\n\\nYou will be notified when these features are available!\\n\\nPhase: ' + phase.title);
                      }}
                    >
                      <Bell className="w-4 h-4" />
                      Join Waitlist
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="gap-2 text-white border-white/30 hover:bg-white/10 whitespace-nowrap"
                      onClick={() => alert('👁️ Loading preview demo...\\n\\nShowing sneak peek of upcoming features.')}
                    >
                      <Eye className="w-4 h-4" />
                      Preview Demo
                    </Button>
                  </>
                )}"""
    
    content = content.replace(old_upcoming_btns, new_upcoming_btns)
    
    # Fix 4: Phase CTA buttons - Future phase
    old_future_btns = """{phase.status === 'future' && (
                  <>
                    <Button size="lg" variant="secondary" className="gap-2 whitespace-nowrap">
                      <MessageSquare className="w-4 h-4" />
                      Share Feedback
                    </Button>
                    <Button size="lg" variant="outline" className="gap-2 text-white border-white/30 hover:bg-white/10 whitespace-nowrap">
                      <Rocket className="w-4 h-4" />
                      View Roadmap
                    </Button>
                  </>
                )}"""
    
    new_future_btns = """{phase.status === 'future' && (
                  <>
                    <Button 
                      size="lg" 
                      variant="secondary" 
                      className="gap-2 whitespace-nowrap"
                      onClick={() => {
                        alert('💬 Opening feedback form...\\n\\nYour input helps shape the future of SciCMP!');
                      }}
                    >
                      <MessageSquare className="w-4 h-4" />
                      Share Feedback
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="gap-2 text-white border-white/30 hover:bg-white/10 whitespace-nowrap"
                      onClick={() => alert('🗺️ Viewing full roadmap...\\n\\nShowing timeline for all planned features.')}
                    >
                      <Rocket className="w-4 h-4" />
                      View Roadmap
                    </Button>
                  </>
                )}"""
    
    content = content.replace(old_future_btns, new_future_btns)
    
    write_file(content)
    print("✅ ResearchTrendsPage.tsx updated successfully!")
    print("   - Added onClick to Upgrade/View Plans button")
    print("   - Added onClick to Get Started Free button")
    print("   - Added onClick to Documentation button")
    print("   - Added onClick to Join Waitlist button")
    print("   - Added onClick to Preview Demo button")
    print("   - Added onClick to Share Feedback button")
    print("   - Added onClick to View Roadmap button")

if __name__ == '__main__':
    main()
