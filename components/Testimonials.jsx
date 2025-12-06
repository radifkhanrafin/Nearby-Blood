import { Card } from "./ui/card";
const Testimonials = () => {
    return (
            <section id="testimonials" className="container mx-auto px-4 py-20 bg-card/10 rounded-xl border border-border">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Success Stories</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Real experiences from patients and donors whose lives have been positively impacted.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
            <p className="text-muted-foreground">"Thanks to BloodSync, my father received blood in just 10 minutes. Life saver!"</p>
            <p className="mt-2 font-semibold text-foreground">– Sara K.</p>
          </Card>
          <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
            <p className="text-muted-foreground">"I donated blood and earned points through the platform. It feels amazing to save lives!"</p>
            <p className="mt-2 font-semibold text-foreground">– James P.</p>
          </Card>
          <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
            <p className="text-muted-foreground">"The AI matching system is incredible! It connected me with compatible donors instantly."</p>
            <p className="mt-2 font-semibold text-foreground">– Fatima R.</p>
          </Card>
        </div>
      </section>
    );
};

export default Testimonials;