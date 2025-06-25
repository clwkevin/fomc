"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useWeb3 } from "@/context/web3-context"
import { AlertTriangle, ChevronDown, ExternalLink, LogOut, CheckCircle2, Wallet, Menu, X } from "lucide-react"
import networksConfig from "@/data/networks.json"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function Header() {
  const { isConnected, connect, disconnect, account, isCorrectNetwork, switchNetwork, chainId, currentNetwork, isConnecting } = useWeb3()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const getExplorerUrl = () => {
    return currentNetwork?.explorerUrl ? `${currentNetwork.explorerUrl}/address/${account}` : "#"
  }

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/90 dark:bg-gray-900/90 shadow-md backdrop-blur-md border-b border-gray-200/50 dark:border-gray-800/50" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-primary/90 to-accent flex items-center justify-center text-white font-bold text-xl shadow-lg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L4 6V18L12 22L20 18V6L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 22V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20 6L12 10L4 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 14L12 18L20 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 10V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold gradient-text">AllSwap</span>
              <span className="text-xs text-muted-foreground -mt-1 hidden sm:block">Multi-Chain DEX</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <nav className="mr-4">
              <ul className="flex items-center gap-6">
                <li>
                  <Link href="/docs" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                    Docs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                    Analytics
                  </Link>
                </li>
              </ul>
            </nav>
            
            {/* Network Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 h-9 px-3 rounded-lg border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                >
                  {currentNetwork?.logoUrl && (
                    <img 
                      src={currentNetwork.logoUrl} 
                      alt={currentNetwork.name} 
                      className="w-4 h-4 rounded-full"
                    />
                  )}
                  <span className="text-sm font-medium">{currentNetwork?.name || "Select Network"}</span>
                  <ChevronDown className="h-3 w-3 opacity-60" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
                {!isConnected && (
                  <>
                    <div className="px-3 py-2 text-xs text-gray-500">
                      Connect wallet to switch networks
                    </div>
                    <DropdownMenuSeparator />
                  </>
                )}
                {networksConfig.networks.map((network) => (
                  <DropdownMenuItem
                    key={network.chainId}
                    onClick={() => isConnected ? switchNetwork(network.chainId) : null}
                    className={`flex items-center justify-between gap-2 py-2 ${
                      !isConnected ? 'opacity-60 cursor-not-allowed' : ''
                    }`}
                    disabled={!isConnected}
                  >
                    <div className="flex items-center gap-2">
                      {network.logoUrl && (
                        <img 
                          src={network.logoUrl} 
                          alt={network.name} 
                          className="w-5 h-5 rounded-full"
                        />
                      )}
                      <span>{network.name}</span>
                    </div>
                    {isConnected && chainId === network.chainId && <CheckCircle2 className="h-4 w-4 text-primary" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Wrong Network Warning */}
            {isConnected && !isCorrectNetwork && (
              <Button
                variant="destructive"
                onClick={() => switchNetwork()}
                size="sm"
                className="flex items-center gap-2 h-9 px-3 rounded-lg"
              >
                <AlertTriangle className="h-4 w-4" />
                <span>Switch Network</span>
              </Button>
            )}

            {/* Wallet Connection */}
            {isConnected ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 h-9 px-3 rounded-lg border-primary/30 bg-primary/5 hover:bg-primary/10"
                  >
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-sm font-medium">{account ? formatAddress(account) : "Connected"}</span>
                    <ChevronDown className="h-3 w-3 opacity-60" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
                  {/* Account Info */}
                  <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-800">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-sm font-medium">Connected</span>
                    </div>
                    <div className="text-xs text-gray-500 font-mono">
                      {account ? formatAddress(account) : "No account"}
                    </div>
                  </div>

                  {/* Network Info */}
                  <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-800">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Network</span>
                      <div className="flex items-center gap-2">
                        {currentNetwork?.logoUrl && (
                          <img 
                            src={currentNetwork.logoUrl} 
                            alt={currentNetwork.name} 
                            className="w-4 h-4 rounded-full"
                          />
                        )}
                        <Badge variant="outline" className="text-xs">
                          {currentNetwork?.name}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <DropdownMenuItem asChild>
                    <a
                      href={getExplorerUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-3 py-2"
                    >
                      <span>View on Explorer</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </DropdownMenuItem>
                  
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem 
                    onClick={disconnect}
                    className="flex items-center justify-between text-red-600 px-3 py-2"
                  >
                    <span>Disconnect</span>
                    <LogOut className="h-4 w-4" />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                onClick={connect} 
                className="h-9 px-4 text-sm rounded-lg font-medium" 
                disabled={isConnecting}
              >
                <Wallet className="h-4 w-4 mr-2" />
                Connect Wallet
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {isConnected ? (
              <Button
                variant="outline"
                size="sm"
                className="h-9 px-3 rounded-lg border-primary/30 bg-primary/5 hover:bg-primary/10"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm font-medium mr-1">{formatAddress(account || "")}</span>
                {isMobileMenuOpen ? <X className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            ) : (
              <>
                <Button 
                  onClick={connect} 
                  className="h-9 px-3 text-sm rounded-lg" 
                  disabled={isConnecting}
                >
                  <Wallet className="h-4 w-4 mr-2" />
                  Connect
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="h-9 w-9 p-0"
                >
                  {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 py-4 space-y-4 animate-in slide-in-from-top duration-300">
            {/* Navigation Links */}
            <div className="space-y-2 px-4">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Menu</span>
              <div className="grid gap-1">
                <Link 
                  href="/docs" 
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="text-sm">Documentation</span>
                </Link>
                <Link 
                  href="#" 
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="text-sm">Analytics</span>
                </Link>
              </div>
            </div>
            
            {/* Network Selector Mobile */}
            <div className="space-y-2 px-4">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Network</span>
              <div className="grid gap-2">
                {networksConfig.networks.map((network) => (
                  <button
                    key={network.chainId}
                    onClick={() => {
                      if (isConnected) switchNetwork(network.chainId)
                      setIsMobileMenuOpen(false)
                    }}
                    className={`flex items-center justify-between p-2 rounded-lg border ${
                      chainId === network.chainId 
                        ? 'border-primary bg-primary/5' 
                        : 'border-gray-200 dark:border-gray-700'
                    } ${!isConnected ? 'opacity-60' : ''}`}
                    disabled={!isConnected}
                  >
                    <div className="flex items-center gap-2">
                      {network.logoUrl && (
                        <img 
                          src={network.logoUrl} 
                          alt={network.name} 
                          className="w-5 h-5 rounded-full"
                        />
                      )}
                      <span className="text-sm font-medium">{network.name}</span>
                    </div>
                    {isConnected && chainId === network.chainId && <CheckCircle2 className="h-4 w-4 text-primary" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Wallet Actions Mobile */}
            {isConnected && (
              <div className="space-y-2 px-4 pt-2 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Wallet</span>
                  <Badge variant="outline" className="text-xs">
                    {currentNetwork?.name}
                  </Badge>
                </div>
                <div className="grid gap-2">
                  <a
                    href={getExplorerUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="text-sm">View on Explorer</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <button
                    onClick={() => {
                      disconnect()
                      setIsMobileMenuOpen(false)
                    }}
                    className="flex items-center justify-between p-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <span className="text-sm">Disconnect</span>
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}