export default function AboutUs({ onShop }) {
  return (
    <main className="page-wrap">
      <div className="about-layout">
        <div className="about-copy">
          <p className="eyebrow" style={{ color: "#64855d" }}>OUR STORY</p>
          <h1>A little more green, every day.</h1>
          <p>
            Paradise Nursery is a small plant shop built around a simple idea:
            plants can make everyday spaces feel more welcoming. We help new
            and experienced plant lovers find greenery that suits their homes
            and routines.
          </p>
          <p>
            Our collection focuses on attractive, easy-to-care-for indoor
            plants. We share straightforward information so customers can
            choose a plant with confidence and enjoy watching it grow.
          </p>
          <button className="primary-button" onClick={onShop}>Explore our plants →</button>
        </div>
        <img className="about-photo" src="https://images.unsplash.com/photo-1449247709967-d4461a6a6103?auto=format&fit=crop&w=1000&q=80" alt="Sunlit room filled with green plants" />
      </div>
    </main>
  );
}