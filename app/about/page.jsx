import React from "react";

const AboutPage = () => {
  return (
    <div className="about-page max-w-5xl mx-auto p-6 space-y-8">
      {/* Page Header */}
      <header className="text-center">
        <h1 className="text-4xl font-bold text-red-600">About BearBy Blood</h1>
        <p className="mt-2 text-gray-600">
          Connecting blood donors and patients efficiently, saving lives every day.
        </p>
      </header>

      {/* Our Mission Section */}
      <section className="mission bg-gray-50 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-red-500 mb-3">Our Mission</h2>
        <p className="text-gray-700">
          At BearBy Blood, our mission is to ensure that blood reaches those in need as
          quickly and safely as possible. We strive to connect donors and recipients
          through a reliable and easy-to-use platform, making life-saving donations
          accessible for everyone.
        </p>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-red-500 mb-3">How It Works</h2>
        <ol className="list-decimal list-inside text-gray-700 space-y-2">
          <li>Sign up and create a profile as a donor or recipient.</li>
          <li>Search for blood donors by blood group and location.</li>
          <li>Request a donation and get notified instantly when a match is found.</li>
          <li>Save lives by connecting with your nearby donors efficiently.</li>
        </ol>
      </section>

      {/* Our Values Section */}
      <section className="values bg-gray-50 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-red-500 mb-3">Our Values</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Compassion: Helping those in need with urgency and care.</li>
          <li>Reliability: Ensuring accurate information and timely responses.</li>
          <li>Community: Building a strong network of donors and volunteers.</li>
          <li>Transparency: Maintaining trust through clear and honest communication.</li>
        </ul>
      </section>

      {/* Call to Action Section */}
      <section className="cta text-center p-6">
        <h2 className="text-2xl font-semibold text-red-500 mb-3">Join Us Today!</h2>
        <p className="text-gray-700 mb-4">
          Become a part of our life-saving network. Your donation could save lives!
        </p>
        <button className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition">
          Register Now
        </button>
      </section>
    </div>
  );
};

export default AboutPage;
