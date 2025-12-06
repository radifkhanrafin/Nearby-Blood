"use client";

export default function BloodDonationRules() {
  return (
    <section className="container mx-auto px-4 py-20 bg-card/10 rounded-xl border border-border">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Blood Donation Rules / Guidelines</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8 text-muted-foreground">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Eligibility:</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Age: 18–60 years</li>
            <li>Weight: 45 kg or above</li>
            <li>Must be in good health</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Rules During Donation:</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Eat a light meal before donating.</li>
            <li>Stay hydrated.</li>
            <li>Get adequate rest.</li>
          </ul>
          <h3 className="text-xl font-semibold text-foreground mt-4 mb-2">After Donation:</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Rest for a few minutes after donating.</li>
            <li>Drink water and eat something light.</li>
            <li>Avoid heavy physical activities for the rest of the day.</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
