"use client";

export default function WhyDonateBlood() {
  return (
    <section className="container mx-auto px-4 py-20 bg-card/10 rounded-xl border border-border">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Why Donate Blood?</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Blood donation saves lives in emergencies and medical treatments.
        </p>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mt-2">
          It helps reduce the shortage of blood in hospitals.
        </p>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mt-2">
          Donating blood ensures that patients in need can get life-saving help.
        </p>
      </div>
    </section>
  )
}
