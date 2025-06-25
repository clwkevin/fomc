import { Metadata } from "next"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { ChevronRight, ExternalLink, AlertTriangle, Info, FileText } from "lucide-react"

export const metadata: Metadata = {
  title: "Terms of Service | AllSwap",
  description: "Terms of Service for AllSwap DEX",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen hero-gradient">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-4xl py-24 sm:py-28 lg:py-32 mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/10 border border-primary/20 mb-4 sm:mb-6">
            <span className="text-primary font-semibold text-xs sm:text-sm">Legal</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-6 tracking-tight">
            <span className="gradient-text">Terms of Service</span>
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <Card className="p-6 sm:p-10 shadow-lg border border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="space-y-8 sm:space-y-10">
            <section className="pb-6 sm:pb-8">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-foreground flex items-start">
                <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm sm:text-base font-semibold mr-4 flex-shrink-0 mt-1">1</span>
                Acceptance of Terms
              </h2>
              <div className="flex items-start gap-3 mb-4">
                <FileText className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                  By accessing or using AllSwap, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this platform.
                </p>
              </div>
            </section>

            <Separator />

            <section className="py-6 sm:py-8">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-foreground flex items-start">
                <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm sm:text-base font-semibold mr-4 flex-shrink-0 mt-1">2</span>
                Use License
              </h2>
              <p className="text-muted-foreground leading-relaxed text-base sm:text-lg mb-4">
                Permission is granted to temporarily use AllSwap for personal, non-commercial transactional purposes only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-outside pl-8 space-y-2 text-muted-foreground text-base sm:text-lg">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose</li>
                <li>Attempt to decompile or reverse engineer any software contained on AllSwap</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>
            </section>

            <Separator />

            <section className="py-6 sm:py-8">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-foreground flex items-start">
                <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm sm:text-base font-semibold mr-4 flex-shrink-0 mt-1">3</span>
                Disclaimer
              </h2>
              <div className="bg-yellow-50 dark:bg-yellow-950/20 p-5 rounded-xl border border-yellow-200/50 dark:border-yellow-800/30 flex items-start gap-3">
                <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-1" />
                <div className="text-yellow-700 dark:text-yellow-300 leading-relaxed text-base sm:text-lg">
                  <p className="mb-3">The materials on AllSwap are provided on an 'as is' basis. AllSwap makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Implied warranties or conditions of merchantability</li>
                    <li>Fitness for a particular purpose</li>
                    <li>Non-infringement of intellectual property</li>
                    <li>Accuracy, reliability, or completeness of the materials</li>
                  </ul>
                </div>
              </div>
            </section>

            <Separator />

            <section className="py-6 sm:py-8">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-foreground flex items-start">
                <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm sm:text-base font-semibold mr-4 flex-shrink-0 mt-1">4</span>
                Limitations
              </h2>
              <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                In no event shall AllSwap or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use AllSwap, even if AllSwap or an authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>
            </section>

            <Separator />

            <section className="py-6 sm:py-8">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-foreground flex items-start">
                <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm sm:text-base font-semibold mr-4 flex-shrink-0 mt-1">5</span>
                Accuracy of Materials
              </h2>
              <div className="flex items-start gap-3">
                <Info className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                  The materials appearing on AllSwap could include technical, typographical, or photographic errors. AllSwap does not warrant that any of the materials on its platform are accurate, complete, or current. AllSwap may make changes to the materials contained on its platform at any time without notice.
                </p>
              </div>
            </section>

            <Separator />

            <section className="py-6 sm:py-8">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-foreground flex items-start">
                <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm sm:text-base font-semibold mr-4 flex-shrink-0 mt-1">6</span>
                Links
              </h2>
              <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                AllSwap has not reviewed all of the sites linked to its platform and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by AllSwap of the site. Use of any such linked website is at the user's own risk.
              </p>
            </section>

            <Separator />

            <section className="py-6 sm:py-8">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-foreground flex items-start">
                <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm sm:text-base font-semibold mr-4 flex-shrink-0 mt-1">7</span>
                Modifications
              </h2>
              <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                AllSwap may revise these terms of service for its platform at any time without notice. By using AllSwap you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </section>

            <Separator />

            <section className="pt-6 sm:pt-8">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-foreground flex items-start">
                <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm sm:text-base font-semibold mr-4 flex-shrink-0 mt-1">8</span>
                Governing Law
              </h2>
              <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </section>
          </div>
        </Card>

        {/* Footer CTA */}
        <div className="mt-16 sm:mt-20 text-center">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-8 sm:p-10 rounded-2xl border border-primary/20">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-foreground">Questions About Our Terms?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto text-sm sm:text-base">
              If you have any questions about our Terms of Service, please don't hesitate to contact our support team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-colors shadow-lg hover:shadow-xl text-sm sm:text-base"
              >
                Back to AllSwap <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                href="#"
                className="inline-flex items-center px-6 py-3 bg-muted hover:bg-muted/80 text-foreground font-semibold rounded-xl transition-colors text-sm sm:text-base"
              >
                Contact Support <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}