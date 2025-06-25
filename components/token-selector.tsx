"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Search, ChevronDown, AlertCircle, Loader2, Check, X } from "lucide-react"
import Image from "next/image"
import tokenList from "@/data/tokens.json"
import networkConfig from "@/data/network.json"
import { useWeb3 } from "@/context/web3-context"
import { Skeleton } from "@/components/ui/skeleton"
import { ethers } from "ethers"
import ERC20_ABI from "@/data/abis/erc20.json"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Token {
  address: string
  name: string
  symbol: string
  logoURI?: string
  decimals: number
  isNative?: boolean
  isCustom?: boolean
  chainId?: number
}

interface TokenBalance {
  balance: string
  isLoading: boolean
}

interface TokenSelectorProps {
  onSelect: (token: Token) => void
  selectedToken?: Token | null
  otherToken?: Token | null
  showBalance?: boolean
}

export default function TokenSelector({ onSelect, selectedToken, otherToken, showBalance = true }: TokenSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [tokens, setTokens] = useState<Token[]>([])
  const [isLoadingCustomToken, setIsLoadingCustomToken] = useState(false)
  const [customToken, setCustomToken] = useState<Token | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { isConnected, provider, signer, account, currentNetwork } = useWeb3()
  const [tokenBalances, setTokenBalances] = useState<Record<string, TokenBalance>>({})

  useEffect(() => {
    if (!currentNetwork) return
    const allTokens = [
      {
        address: "ETH",
        name: currentNetwork.nativeCurrency.name,
        symbol: currentNetwork.nativeCurrency.symbol,
        decimals: currentNetwork.nativeCurrency.decimals,
        logoURI: "https://token-icons.s3.amazonaws.com/eth.png",
        isNative: true,
        chainId: currentNetwork.chainId,
      },
      ...tokenList.tokens.filter(token => token.chainId === currentNetwork.chainId),
    ]
    setTokens(allTokens)
  }, [currentNetwork])

  useEffect(() => {
    if (!isConnected || !provider || !account || !tokens.length || !currentNetwork?.contracts?.WETH) {
      return
    }
    const fetchAllBalances = async () => {
      const balances: Record<string, TokenBalance> = {}
      tokens.forEach((token) => {
        balances[token.address] = { balance: "0", isLoading: true }
      })
      setTokenBalances(balances)
      for (const token of tokens) {
        try {
          let rawBalance: ethers.BigNumberish = "0"
          if (token.isNative) {
            rawBalance = await provider.getBalance(account)
          } else {
            const tokenContract = new ethers.Contract(token.address, ERC20_ABI, provider)
            rawBalance = await tokenContract.balanceOf(account)
          }
          const formatted = ethers.formatUnits(rawBalance, token.decimals)
          setTokenBalances((prev) => ({
            ...prev,
            [token.address]: { balance: formatted, isLoading: false },
          }))
        } catch (error) {
          console.error(`Error fetching balance for token ${token.symbol} on chain ${currentNetwork?.chainId}:`, error)
          setTokenBalances((prev) => ({
            ...prev,
            [token.address]: { balance: "0", isLoading: false },
          }))
        }
      }
    }
    fetchAllBalances()
    const intervalId = setInterval(fetchAllBalances, 30000)
    return () => clearInterval(intervalId)
  }, [isConnected, provider, account, tokens, currentNetwork])

  const isValidAddress = (address: string): boolean => {
    try {
      if (typeof address !== "string" || address.length !== 42) {
        return false
      }
      if (!address.startsWith("0x")) {
        return false
      }
      const hexRegex = /^0x[0-9a-fA-F]{40}$/
      return hexRegex.test(address)
    } catch (error) {
      console.error("Error validating address:", error)
      return false
    }
  }

  const fetchTokenInfo = async (address: string) => {
    setIsLoadingCustomToken(true)
    setError(null)
    if (!provider && !window.ethereum) {
       setError("No web3 provider available.")
       setIsLoadingCustomToken(false)
       return null
    }
    try {
      console.log("Fetching token info for address:", address)
      let tokenContract
      if (signer) {
        tokenContract = new ethers.Contract(address, ERC20_ABI, signer)
      } else if (provider) {
        tokenContract = new ethers.Contract(address, ERC20_ABI, provider)
      } else if (typeof window !== "undefined" && window.ethereum) {
        const tempProvider = new ethers.BrowserProvider(window.ethereum)
        tokenContract = new ethers.Contract(address, ERC20_ABI, tempProvider)
      } else {
         throw new Error("No provider available")
      }
      const name = await tokenContract.name()
      const symbol = await tokenContract.symbol()
      const decimals = await tokenContract.decimals()
      console.log("Token info fetched:", { name, symbol, decimals })
      const tokenInfo = {
        address,
        name,
        symbol,
        decimals: Number(decimals),
        isCustom: true,
        chainId: currentNetwork?.chainId,
      }
      setCustomToken(tokenInfo)
      if (isConnected && provider && account) {
        try {
          const rawBalance = await tokenContract.balanceOf(account)
          const formatted = ethers.formatUnits(rawBalance, decimals)
          setTokenBalances((prev) => ({
            ...prev,
            [address]: { balance: formatted, isLoading: false },
          }))
        } catch (error) {
          console.error(`Error fetching custom token balance for ${address}:`, error)
          setTokenBalances((prev) => ({
            ...prev,
            [address]: { balance: "0", isLoading: false },
          }))
        }
      }
      return tokenInfo
    } catch (error) {
      console.error("Error fetching token info:", error)
      setError("Invalid token address or not an ERC20 token on the current network.")
      setCustomToken(null)
      return null
    } finally {
      setIsLoadingCustomToken(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    if (value !== searchQuery) {
      setError(null)
      if (!isValidAddress(value)) {
        setCustomToken(null)
      }
    }
    if (isValidAddress(value)) {
      console.log("Valid address detected:", value)
      fetchTokenInfo(value)
    }
  }

  const filteredTokens = tokens.filter((token) => {
    const query = searchQuery.toLowerCase()
    const matchesSearch = (
      token.symbol.toLowerCase().includes(query) ||
      token.name.toLowerCase().includes(query) ||
      (!token.isNative && token.address.toLowerCase().includes(query))
    )
    const matchesNetwork = token.chainId === currentNetwork?.chainId || (token.isCustom && !token.chainId)
    return matchesSearch && matchesNetwork
  })

  const displayTokens = customToken && (customToken.chainId === currentNetwork?.chainId || !customToken.chainId)
    ? [customToken, ...filteredTokens.filter((t) => t.address.toLowerCase() !== customToken.address.toLowerCase())]
    : filteredTokens

  displayTokens.sort((a, b) => {
    if (a.isNative) return -1
    if (b.isNative) return 1
    return a.symbol.localeCompare(b.symbol)
  })

  const selectedTokenBalance = selectedToken ? tokenBalances[selectedToken.address]?.balance : "0"
  const isSelectedTokenBalanceLoading = selectedToken ? tokenBalances[selectedToken.address]?.isLoading : false

  const handleSelect = (token: Token) => {
    onSelect(token)
    setIsOpen(false)
    setSearchQuery("")
    setCustomToken(null)
    setError(null)
  }

  const truncateAddress = (address: string) => {
    if (!address) return ""
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const formatBalance = (balance: string) => {
    if (!balance || balance === "0") return "0"
    const num = Number(balance);
    if (num < 0.0001 && num > 0) {
      return num.toExponential(2);
    }
    return num.toLocaleString(undefined, { maximumSignificantDigits: 4 });
  }

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 h-10 px-3 rounded-lg border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors w-[120px] sm:w-[140px] justify-between hover:bg-[#FBFAF9] hover:text-foreground dark:hover:text-white"
      >
        {selectedToken ? (
          <div className="flex items-center gap-2 min-w-0 w-full">
            {selectedToken.logoURI ? (
              <div className="w-5 h-5 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700 flex-shrink-0">
                <Image
                  src={selectedToken.logoURI}
                  alt={selectedToken.symbol}
                  width={20}
                  height={20}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.svg"
                  }}
                />
              </div>
            ) : (
              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-xs flex-shrink-0">
                {selectedToken.symbol.charAt(0)}
              </div>
            )}
            <span className="font-medium text-sm truncate">{selectedToken.symbol}</span>
          </div>
        ) : (
          <span className="text-sm text-gray-500 dark:text-gray-400 truncate">Select Token</span>
        )}
        <ChevronDown className="w-4 h-4 opacity-60 flex-shrink-0 ml-auto" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 max-w-md w-[95vw] sm:w-full p-0" hideCloseButton={true}>
          <div className="p-4 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-lg font-semibold">Select Token</DialogTitle>
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
            
            <div className="mt-4 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search name or paste address"
                className="pl-10 pr-4 py-2 h-11"
                value={searchQuery}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {isLoadingCustomToken && (
            <div className="flex items-center gap-2 px-4 py-3 text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Fetching token info...</span>
            </div>
          )}

          {error && (
            <div className="px-4 py-2">
              <Alert variant="destructive" className="py-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-xs">{error}</AlertDescription>
              </Alert>
            </div>
          )}

          <div className="max-h-[320px] overflow-y-auto p-2">
            {displayTokens.length === 0 && !isLoadingCustomToken && !error ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No tokens found.</p>
              </div>
            ) : (
              <div className="space-y-1">
                {displayTokens.map((token) => (
                  <div
                    key={token.address}
                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedToken?.address === token.address 
                        ? "bg-primary/10 border border-primary/20" 
                        : "hover:bg-muted/50"
                    } ${otherToken?.address === token.address ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={() => otherToken?.address !== token.address && handleSelect(token)}
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      {token.logoURI ? (
                        <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700 flex-shrink-0">
                          <Image
                            src={token.logoURI}
                            alt={token.symbol}
                            width={36}
                            height={36}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/placeholder.svg"
                            }}
                          />
                        </div>
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium flex-shrink-0">
                          {token.symbol.charAt(0)}
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h4 className="font-medium text-foreground truncate">{token.symbol}</h4>
                          {token.isCustom && (
                            <span className="text-xs font-medium text-primary bg-primary/10 px-1.5 py-0.5 rounded-full flex-shrink-0">
                              Custom
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{token.name}</p>
                        {!token.isNative && (
                          <p className="text-xs text-muted-foreground/70 font-mono mt-0.5">{truncateAddress(token.address)}</p>
                        )}
                      </div>
                    </div>
                    
                    {isConnected && showBalance && (
                      <div className="text-right flex-shrink-0 ml-2">
                        {tokenBalances[token.address]?.isLoading ? (
                          <div className="space-y-1">
                            <Skeleton className="h-4 w-16" />
                            <Skeleton className="h-3 w-12" />
                          </div>
                        ) : (
                          <div className="space-y-0.5">
                            <span className="text-sm font-medium text-foreground block">
                              {formatBalance(tokenBalances[token.address]?.balance || "0")}
                            </span>
                            <span className="text-xs text-muted-foreground block">
                              ${(Number(tokenBalances[token.address]?.balance || "0") * 0).toFixed(2)}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}