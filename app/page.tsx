import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SwapTab from "@/components/swap-tab"
import LiquidityTab from "@/components/liquidity-tab"
import { ArrowUpDown, Droplets, Shield, Zap, TrendingUp } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero Section */}
      <section className="hero-gradient pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              Trade with
              <span className="text-primary block mt-2">Confidence</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              The most trusted decentralized exchange for seamless token swaps and liquidity provision
            </p>
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

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Why Choose AllSwap?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Built for traders who demand the best in DeFi
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 animate-slide-in">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Lightning Fast</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Execute trades in seconds with our optimized smart contracts
              </p>
            </div>
            
            <div className="text-center p-6 animate-slide-in" style={{ animationDelay: '0.1s' }}>
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Secure & Audited</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Battle-tested smart contracts audited by leading security firms
              </p>
            </div>
            
            <div className="text-center p-6 animate-slide-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Best Rates</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Access deep liquidity pools for minimal slippage on trades
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}