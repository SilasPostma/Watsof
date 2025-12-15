import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-sm">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-12">
            <a href="/" className="flex items-center gap-3">
              <span className="text-xl font-display font-medium tracking-tight">
                watsof
              </span>
            </a>
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#services"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Services
              </a>
              <a
                href="#approach"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Approach
              </a>
              <a
                href="#contact"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
          <Button variant="default" size="sm">
            Get Started
          </Button>
        </div>
      </nav>
    </header>
  );
}
