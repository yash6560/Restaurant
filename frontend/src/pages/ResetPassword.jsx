import { useState } from "react";
import { Link } from "react-router-dom"
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [newpassword, setNewpassword] = useState('')
  const navigate = useNavigate();

  const {resetPassword} = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await resetPassword(newpassword);
    if(res?.success === true){
      navigate('/login')
    }

  }
  return (
    <div className="flex items-center justify-center min-h-screen  p-5">
      <div className="card w-96 bg-base-200 shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center">Reset Password</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">New Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter your New password"
              className="input input-bordered w-full"
              value={newpassword}
              onChange={(e) => setNewpassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary w-full mt-4">Set Password</button>
        </form>
        
        <p className="text-center mt-4">
          Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default ResetPassword