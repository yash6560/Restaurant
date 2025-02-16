import { useState } from "react"
import { Link } from "react-router-dom"
import {useAuthStore} from '../store/useAuthStore';
import { useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const [otp, setOtp] = useState('')
  const {verifyOtp,isOtpVerified, isEmailforOtp} = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(isEmailforOtp != null)
      {
        const res = await verifyOtp(otp);
        if(res?.success === true){
          navigate('/reset-password')
      }
    }
    } catch (error) {
      console.log(error);
    }
    
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-5">
      <div className="card w-96 bg-base-200 shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center">Verify With OTP</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">OTP</span>
            </label>
            <input
              type="text"
              placeholder="Enter your OTP"
              className="input input-bordered w-full"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary w-full mt-4">{ isOtpVerified ? "Loading" : "Verify" }</button>
        </form>
        <p className="text-left mt-2">
         <Link to="/forgot-password" className="text-blue-500 hover:underline">Resend Again</Link>
        </p>
        
      </div>
    </div>
  )
}

export default VerifyOtp