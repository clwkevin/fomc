"use client"

import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
      <div className="container mx-auto px-4 max-w-6xl py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white font-bold text-lg shadow-lg">
              A
            </div>
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                © 2025 AllSwap. All rights reserved.
              </p>
            </div>
          </div>

          {/* Navigation Links - Only essential links as requested */}
          <div className="flex items-center gap-6 text-sm">
            <Link 
              href="/docs" 
              className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors font-medium"
            >
              Docs
            </Link>
            <Link 
              href="/privacy" 
              className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors font-medium"
            >
              Privacy
            </Link>
            <Link 
              href="/terms" 
              className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors font-medium"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}