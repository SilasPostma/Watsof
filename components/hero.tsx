import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronDown } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center px-6 pt-20">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-medium tracking-tight text-balance leading-tight">
              Navigate Complexity, Find Clarity{" "}
              <span className="font-accent italic text-primary inline-block -rotate-2">
                Above the Fog
              </span>
            </h1>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            we craft bespoke websites, intelligent automations, and digital experiences —
            built to cut through the noise and reveal what matters.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" className="gap-2" asChild>
              <a href="/#contact">
                Start Your Journey
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/#portfolio">View Our Work</a>
            </Button>
          </div>
        </div>
      </div>
      <a
        href="/#about"
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-foreground transition-colors animate-bounce"
      >
        <ChevronDown className="h-6 w-6" />
      </a>
    </section>
  )
}
