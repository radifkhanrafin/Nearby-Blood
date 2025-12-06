"use client";

export default function BenefitsBloodDonation() {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Benefits of Donating Blood</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Benefits for Donors:
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 text-muted-foreground">
        <div className="p-6 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors">
          Stimulates the production of new blood cells in the body.
        </div>
        <div className="p-6 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors">
          Improves heart and liver health.
        </div>
        <div className="p-6 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors">
          Enhances social responsibility and satisfaction by helping others.
        </div>
      </div>
    </section>
  )
}
