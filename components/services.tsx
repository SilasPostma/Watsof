import { Globe, Bot, Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const services = [
  {
    icon: Globe,
    title: "custom websites",
    description: "modern, responsive web experiences built to match your unique requirements.",
  },
  {
    icon: Bot,
    title: "smart automations",
    description: "intelligent automation tailored to your workflows and business logic.",
  },
  {
    icon: Sparkles,
    title: "digital solutions",
    description: "technical consulting and implementation for complex challenges.",
  },
]

export function Services() {
  return (
    <section id="services" className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-balance">
            Personalized Solutions for Modern Challenges
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            every project begins with understanding your landscape.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className="border-border/50 bg-card hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
            >
              <CardContent className="p-8 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-medium">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
