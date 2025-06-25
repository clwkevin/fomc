"use client"

import Link from "next/link"
import { Github, Twitter, Globe, Heart } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
      <div className="container mx-auto px-4 max-w-6xl py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left Side - Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white font-bold text-lg shadow-lg">
              A
            </div>
            <div className="text-center md:text-left">
              <h3 className="font-bold text-gray-900 dark:text-white">AllSwap</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Decentralized Exchange</p>
            </div>
          </div>

          {/* Center - Links */}
          <div className="flex items-center gap-6 text-sm">
            <Link 
              href="/docs" 
              className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
            >
              Documentation
            </Link>
            <Link 
              href="/terms" 
              className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
            >
              Terms
            </Link>
            <Link 
              href="/privacy" 
              className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
            >
              Privacy
            </Link>
          </div>

          {/* Right Side - Social & Copyright */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <div className="flex items-center gap-3">
              <a 
                href="#" 
                className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-primary transition-all"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-primary transition-all"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-primary transition-all"
                aria-label="Website"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
              <span>© 2024 AllSwap</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                Made with <Heart className="w-3 h-3 text-red-500" /> for DeFi
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Status */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span>All systems operational</span>
            </div>
            <span>•</span>
            <span>Multi-chain DEX</span>
          </div>
          
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Powered by decentralized protocols
          </div>
        </div>
      </div>
    </footer>
  )
}