"use client";

export default function HowToDonate() {
  return (
    <section className="container mx-auto px-4 py-20 bg-card/10 rounded-xl border border-border">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">How to Donate / Steps</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Simple Steps to Donate Blood:
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 text-muted-foreground">
        <StepCard step="1" title="Register" description="Register as a donor or contact a nearby blood bank." />
        <StepCard step="2" title="Locate" description="Locate your nearest blood donation center." />
        <StepCard step="3" title="Donate" description="Donate blood safely following all guidelines." />
        <StepCard step="4" title="Save Lives" description="Help save lives and encourage others to donate." />
      </div>
    </section>
  )
}

function StepCard({ step, title, description }) {
  return (
    <div className="p-6 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors text-center">
      <div className="text-3xl font-bold text-primary mb-2">{step}</div>
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}
