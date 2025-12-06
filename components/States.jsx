'use client'
const States = () => {
    return (
        <section className="border-y border-border bg-card/30 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">10K+</div>
              <div className="text-sm text-muted-foreground">Active Donors</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">&lt;5min</div>
              <div className="text-sm text-muted-foreground">Avg Response Time</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Lives Saved</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">98%</div>
              <div className="text-sm text-muted-foreground">Match Success</div>
            </div>
          </div>
        </div>
      </section>
    );
};

export default States;