export function Approach() {
  const steps = [
    {
      number: "01",
      title: "discovery",
      description: "we listen to understand your vision and challenges.",
    },
    {
      number: "02",
      title: "design",
      description: "strategic planning that aligns technology with your objectives.",
    },
    {
      number: "03",
      title: "development",
      description: "expert implementation with clean code and modern frameworks.",
    },
    {
      number: "04",
      title: "delivery",
      description: "seamless launch and ongoing support.",
    },
  ]

  return (
    <section id="approach" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-balance">
            A Clear Path Through Complexity
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-12">
          {steps.map((step, index) => (
            <div key={index} className="space-y-4">
              <div className="flex items-start gap-6">
                <span className="text-5xl font-mono text-primary/20 font-light">{step.number}</span>
                <div className="space-y-2 pt-2">
                  <h3 className="text-2xl font-medium">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
