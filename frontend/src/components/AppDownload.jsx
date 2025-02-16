import { FaGooglePlay,FaApple } from "react-icons/fa6"
import { Link } from "react-router-dom"
const AppDownload = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-10 bg-base-200 p-10 rounded-2xl">
      {/* Left Side: Text + Buttons */}
      <div className="text-center md:text-left">
        <h2 className="text-3xl text-center font-bold">Get Our Mobile App</h2>
        <p className="text-lg mt-2">
          Order your favorite food easily with our mobile app. Download now!
        </p>

        {/* Download Buttons */}
        <div className="mt-4 flex flex-col justify-center md:flex-row gap-4">
          <Link to='/'
            className="btn btn-primary flex items-center gap-2 px-6"
          >
            <FaGooglePlay />
            Get on Play Store
          </Link>
          <Link to='/'
            className="btn btn-neutral flex items-center gap-2 px-6"
          >
            <FaApple />
            Download on App Store
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AppDownload