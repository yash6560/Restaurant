
const HeroSection = () => {
  return (
    <div className="hero bg-cover bg-center" style={{ backgroundImage: "url('header_img.png')" }}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-white py-14">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Welcome to Tasty Bites 🍽</h1>
            <p className="py-4">Experience the best flavors with our handcrafted delicacies!</p>
            <a href="/menu" className="btn btn-primary">View Menu</a>
          </div>
        </div>
      </div>
  )
}

export default HeroSection