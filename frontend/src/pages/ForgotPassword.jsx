import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const {isForgotPassword, forgotPassword} = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    const res = await forgotPassword(email);
    if(res?.success === true){
      navigate('/verifyOTP');
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen  p-5">
      <div className="card w-96 bg-base-200 shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="mt-4">
        
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <button type='submit' className="btn btn-primary w-full mt-4">{isForgotPassword ? "Loading..." : "Verify"}</button>
        </form>
        <p className="text-center mt-4">
          Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default ForgotPassword