import { Globe, Bot, ArrowUpRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const projects = [
  {
    name: "Bas Westerweel",
    domain: "baswesterweel.nl",
    tag: "Website",
    icon: Globe,
  },
  {
    name: "Now for Next",
    domain: "nowfornext.org",
    tag: "Website",
    icon: Globe,
  },
  {
    name: "Knowei",
    domain: "knowei.nl",
    tag: "Website",
    icon: Globe,
  },
  {
    name: "Problemsolver",
    domain: "problemsolver.knowei.nl",
    tag: "AI Tool",
    icon: Bot,
  },
]

export function Work() {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-balance">
            Selected Work
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            a few of the projects we&apos;ve built.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <a
              key={project.domain}
              href={`https://${project.domain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <Card className="h-full border-border/50 bg-card hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                <CardContent className="p-8 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <project.icon className="h-6 w-6" />
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h2 className="text-xl font-medium">{project.name}</h2>
                    <p className="text-sm text-muted-foreground">{project.domain}</p>
                  </div>
                  <span className="inline-block text-xs font-medium text-primary bg-primary/10 rounded-full px-3 py-1">
                    {project.tag}
                  </span>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
