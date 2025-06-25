"use client"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AddLiquidity from "@/components/add-liquidity"
import RemoveLiquidity from "@/components/remove-liquidity"
import { useSlippage } from "@/hooks/use-slippage"
import { useWeb3 } from "@/context/web3-context"
import SlippageSettings from "@/components/slippage-settings"
import { useState } from "react"
import { ArrowUpDown, Droplets } from "lucide-react"

export default function LiquidityTab() {
  const { slippage, updateSlippage } = useSlippage()
  const { isConnected } = useWeb3()
  const [showSlippageSettings, setShowSlippageSettings] = useState(false)

  return (
    <div className="p-4 sm:p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg sm:text-xl font-semibold">Liquidity</h2>
        <SlippageSettings 
          slippage={slippage} 
          onSlippageChange={updateSlippage}
          open={showSlippageSettings}
          onOpenChange={setShowSlippageSettings}
        />
      </div>

      <Tabs defaultValue="add" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4 p-0 h-11 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
          <TabsTrigger 
            value="add" 
            className="flex items-center justify-center gap-2 rounded-none py-2.5 px-4 text-sm font-medium transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-gray-900 dark:data-[state=active]:bg-gray-900 dark:data-[state=active]:text-white text-gray-600 dark:text-gray-400 h-full"
          >
            <ArrowUpDown className="w-4 h-4" />
            <span>Add</span>
          </TabsTrigger>
          <TabsTrigger 
            value="remove" 
            className="flex items-center justify-center gap-2 rounded-none py-2.5 px-4 text-sm font-medium transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-gray-900 dark:data-[state=active]:bg-gray-900 dark:data-[state=active]:text-white text-gray-600 dark:text-gray-400 h-full"
          >
            <Droplets className="w-4 h-4" />
            <span>Remove</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="add" className="animate-fade-in">
          <AddLiquidity slippage={slippage} updateSlippage={updateSlippage} />
        </TabsContent>
        <TabsContent value="remove" className="animate-fade-in">
          <RemoveLiquidity slippage={slippage} updateSlippage={updateSlippage} />
        </TabsContent>
      </Tabs>
    </div>
  )
}