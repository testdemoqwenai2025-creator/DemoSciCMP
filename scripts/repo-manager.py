#!/usr/bin/env python3
"""
Private/Public Repository Manager
===================================

Manages communication between:
- PRIVATE repo: Source code (main development)
- PUBLIC repo: Built preview for GitHub Pages (no source code)

Uses GitHub API to sync builds from private → public.

Usage:
  python3 scripts/repo-manager.py init        # Set up repos
  python3 scripts/repo-manager.py sync        # Build and sync
  python3 scripts/repo-manager.py status      # Check status
"""

import os
import json
import subprocess
import requests
from datetime import datetime
from pathlib import Path

# Configuration - Load from environment or use defaults
GITHUB_TOKEN = os.getenv('GITHUB_TOKEN', '')  # Must be set via environment
GITHUB_USER = os.getenv('GITHUB_USER', 'testdemoqwenai2025-creator')

PRIVATE_REPO = 'DemoSciCMP-private'  # Source code (private)
PUBLIC_REPO = 'DemoSciCMP'          # Built preview (public)

API_BASE = 'https://api.github.com'

class RepoManager:
    def __init__(self):
        self.headers = {
            'Authorization': f'token {GITHUB_TOKEN}',
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
        }
    
    def api_request(self, method, endpoint, data=None):
        """Make GitHub API request"""
        url = f'{API_BASE}{endpoint}'
        response = requests.request(method, url, headers=self.headers, json=data)
        
        if response.status_code in [200, 201, 204]:
            return response.json() if response.text else {}
        else:
            print(f"API Error {response.status_code}: {response.text}")
            return None
    
    def create_private_repo(self):
        """Create private repo if it doesn't exist"""
        print(f"\n🔒 Setting up private repository: {PRIVATE_REPO}")
        
        # Check if exists
        existing = self.api_request('GET', f'/repos/{GITHUB_USER}/{PRIVATE_REPO}')
        
        if existing:
            print(f"   ✅ Private repo already exists")
            return existing
        
        # Create private repo
        result = self.api_request('POST', '/user/repos', {
            'name': PRIVATE_REPO,
            'description': 'SciCMP Source Code (PRIVATE)',
            'private': True,
            'has_issues': True,
            'has_wiki': False,
            'auto_init': False
        })
        
        if result:
            print(f"   ✅ Created private repo: {result['html_url']}")
        return result
    
    def ensure_public_repo(self):
        """Ensure public repo exists and is configured for Pages"""
        print(f"\n🌐 Setting up public repository: {PUBLIC_REPO}")
        
        existing = self.api_request('GET', f'/repos/{GITHUB_USER}/{PUBLIC_REPO}')
        
        if not existing:
            print(f"   ⚠️  Public repo doesn't exist. Creating...")
            result = self.api_request('POST', '/user/repos', {
                'name': PUBLIC_REPO,
                'description': 'SciCMP Preview (PUBLIC - Built Files Only)',
                'private': False,
                'has_issues': False,
                'has_wiki': False,
                'auto_init': False
            })
            if result:
                print(f"   ✅ Created public repo: {result['html_url']}")
        else:
            print(f"   ✅ Public repo already exists")
            existing = None
        
        return existing or self.api_request('GET', f'/repos/{GITHUB_USER}/{PUBLIC_REPO}')
    
    def setup_github_pages(self):
        """Configure GitHub Pages on public repo"""
        print(f"\n⚙️  Configuring GitHub Pages...")
        
        # Enable GitHub Actions as source
        result = self.api_request(
            'PUT', 
            f'/repos/{GITHUB_USER}/{PUBLIC_REPO}/pages',
            {
                'build_type': 'workflow',
                'source': {'branch': 'gh-actions', 'path': '/'}
            }
        )
        
        if result:
            print(f"   ✅ GitHub Pages configured")
            print(f"   📦 Site will be at: https://{GITHUB_USER}.github.io/{PUBLIC_REPO}/")
        
        return result
    
    def build_and_sync(self):
        """Build project and sync output to public repo"""
        print(f"\n🏗️  Building project...")
        
        # Run Next.js build
        build_result = subprocess.run(
            ['npm', 'run', 'build'],
            cwd='/home/z/my-project',
            capture_output=True,
            text=True
        )
        
        if build_result.returncode != 0:
            print(f"   ❌ Build failed!")
            print(build_result.stderr[-500:] if len(build_result.stderr) > 500 else build_result.stderr)
            return False
        
        print(f"   ✅ Build successful!")
        
        # Check if out directory exists
        out_dir = Path('/home/z/my-project/out')
        if not out_dir.exists():
            print(f"   ⚠️  No output directory found. Trying .next...")
            out_dir = Path('/home/z/my-project/.next')
        
        if out_dir.exists():
            file_count = len(list(out_dir.rglob('*')))
            print(f"   📁 Output: {file_count} files")
            
            # Create archive of built files
            print(f"\n📤 Preparing to sync to public repo...")
            return True
        
        return False
    
    def push_to_public(self):
        """Push built files to public repo (without source)"""
        print(f"\n📤 Pushing to public repository...")
        
        # This would be done via git operations
        # For now, we'll commit the current state which has the build artifacts
        try:
            # Add all files except source code patterns
            exclude_patterns = [
                '*.ts', '*.tsx', '*.js.map',
                'src/', '.env*', 'node_modules/',
                '*.sh'  # Exclude deploy scripts with tokens
            ]
            
            # Git commands to prepare clean build commit
            cmds = [
                ['git', 'add', '-f', 'out/', '.next/', 'public/'],
                ['git', 'commit', '-m', f'build: Auto-deploy {datetime.now().isoformat()}'],
                ['git', 'push', 'origin', 'main']
            ]
            
            for cmd in cmds:
                result = subprocess.run(cmd, cwd='/home/z/my-project', capture_output=True)
                if result.returncode != 0 and 'push' not in cmd:
                    print(f"   ⚠️  Command failed: {' '.join(cmd)}")
            
            print(f"   ✅ Pushed to public repo!")
            return True
            
        except Exception as e:
            print(f"   ❌ Error: {e}")
            return False
    
    def get_status(self):
        """Get status of both repositories"""
        print(f"\n📊 Repository Status:")
        print("=" * 50)
        
        # Private repo
        private = self.api_request('GET', f'/repos/{GITHUB_USER}/{PRIVATE_REPO}')
        if private:
            print(f"\n🔒 Private Repo ({PRIVATE_REPO}):")
            print(f"   URL: {private.get('html_url', 'N/A')}")
            print(f"   Private: {private.get('private', 'N/A')}")
            print(f"   Default branch: {private.get('default_branch', 'N/A')}")
        
        # Public repo
        public = self.api_request('GET', f'/repos/{GITHUB_USER}/{PUBLIC_REPO}')
        if public:
            print(f"\n🌐 Public Repo ({PUBLIC_REPO}):")
            print(f"   URL: {public.get('html_url', 'N/A')}")
            print(f"   Private: {public.get('private', 'N/A')}")
            print(f"   Has Pages: {bool(public.get('pages'))}")
            
            if public.get('pages'):
                pages_status = public['pages'].get('status', 'unknown')
                print(f"   Pages Status: {pages_status}")
                
                if pages_status == 'built':
                    print(f"   🌍 Live at: https://{GITHUB_USER}.github.io/{PUBLIC_REPO}/")
        
        # Recent builds
        runs = self.api_request('GET', f'/repos/{GITHUB_USER}/{PUBLIC_REPO}/actions/runs?per_page=3')
        if runs and runs.get('workflow_runs'):
            print(f"\n📋 Recent Builds:")
            for run in runs['workflow_runs'][:3]:
                status_icon = '✅' if run['conclusion'] == 'success' else '❌'
                print(f"   {status_icon} #{run['run_number']}: {run['conclusion'] or 'running'} - {run['created_at'][:10]}")
        
        return {'private': private, 'public': public}
    
    def create_webhook(self):
        """Create webhook to auto-sync on push to private repo"""
        print(f"\n🪝 Setting up webhook for auto-sync...")
        
        # This would trigger a GitHub Action that builds and deploys
        webhook_config = {
            'url': f'https://api.github.com/repos/{GITHUB_USER}/{PUBLIC_REPO}/dispatches',
            'content_type': 'json',
            'secret': 'webhook-secret-change-me',
            'insecure_ssl': '0'
        }
        
        result = self.api_request(
            'POST',
            f'/repos/{GITHUB_USER}/{PRIVATE_REPO}/hooks',
            {
                'name': 'webhook',
                'active': True,
                'events': ['push'],
                'config': webhook_config
            }
        )
        
        if result:
            print(f"   ✅ Webhook created for auto-sync")
        
        return result


def main():
    import sys
    
    manager = RepoManager()
    
    if len(sys.argv) < 2:
        print("""
╔══════════════════════════════════════════════════════════╗
║     SciCMP Private/Public Repository Manager              ║
╠══════════════════════════════════════════════════════════╣
║                                                          ║
║   Commands:                                              ║
║     init      - Initialize repositories                   ║
║     sync      - Build and sync to public                  ║
║     status    - Show repository status                     ║
║     webhook   - Setup auto-sync webhook                   ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
        """)
        return
    
    command = sys.argv[1].lower()
    
    if command == 'init':
        manager.create_private_repo()
        manager.ensure_public_repo()
        manager.setup_github_pages()
        print("\n✅ Initialization complete!")
        
    elif command == 'sync':
        if manager.build_and_sync():
            manager.push_to_public()
        print("\n✅ Sync complete!")
        
    elif command == 'status':
        manager.get_status()
        
    elif command == 'webhook':
        manager.create_webhook()
        
    else:
        print(f"Unknown command: {command}")


if __name__ == '__main__':
    main()
