import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SwapTab from "@/components/swap-tab"
import LiquidityTab from "@/components/liquidity-tab"
import { ArrowUpDown, Droplets } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero Section - Simplified */}
      <section className="hero-gradient pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              <span className="text-primary">AllSwap</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Trading Interface */}
      <section className="py-8 -mt-6">
        <div className="container mx-auto px-4 max-w-md">
          <div className="card-clean p-6 animate-fade-in">
            <Tabs defaultValue="swap" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                <TabsTrigger 
                  value="swap" 
                  className="flex items-center gap-2 rounded-md py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-900"
                >
                  <ArrowUpDown className="w-4 h-4" />
                  <span className="font-medium">Swap</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="liquidity" 
                  className="flex items-center gap-2 rounded-md py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-900"
                >
                  <Droplets className="w-4 h-4" />
                  <span className="font-medium">Pool</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="swap" className="animate-fade-in">
                <SwapTab />
              </TabsContent>
              <TabsContent value="liquidity" className="animate-fade-in">
                <LiquidityTab />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </div>
  )
}