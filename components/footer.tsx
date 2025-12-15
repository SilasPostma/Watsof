import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer id="contact" className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-balance">
            Ready to Navigate Forward?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            Let's discuss your vision.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
            {/* Start a Conversation button (can link to a form or mailto) */}
            <Button size="lg" asChild>
              <a href="mailto:silas.p.postma@gmail.com">Start a Conversation</a>
            </Button>

            {/* Direct Email link */}
            <Button size="lg" variant="outline" asChild>
              <a href="mailto:silas.p.postma@gmail.com">Email Me</a>
            </Button>
          </div>

          {/* Added Social Link below the main CTA */}
          <div className="pt-6">
            <a
              href="https://www.linkedin.com/in/silaspostma/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors text-base font-medium"
            >
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2025 watsof. all rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-foreground transition-colors">
                privacy
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                terms
              </a>
              <a
                href="mailto:silas.p.postma@gmail.com"
                className="hover:text-foreground transition-colors"
              >
                contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
