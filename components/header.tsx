import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background shadow-[0_1px_12px_-4px_rgba(0,0,0,0.12)]">
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
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="default" size="sm">
              Get Started
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}
