"use client";

export default function MotivationalQuotes() {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Motivational Quotes</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6 text-muted-foreground">
        <CardQuote quote="Donate Blood, Save Lives." />
        <CardQuote quote="Your blood is a gift of life to someone in need." />
        <CardQuote quote="One donation can make a world of difference." />
      </div>
    </section>
  )
}

function CardQuote({ quote }) {
  return (
    <div className="p-6 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors text-center font-medium text-foreground">
      {quote}
    </div>
  )
}
