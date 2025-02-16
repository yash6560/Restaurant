import {Link} from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const {userSignup, isSigningUp} = useAuthStore();
  const navigate = useNavigate();
  const [formdata, setFormdata] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await userSignup(formdata);
    if(res) {
      navigate('/login')
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen  p-5">
      <div className="card w-96 bg-base-200 shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center">Register</h2>
        <form onSubmit={handleSubmit} className="mt-4">
        <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="name"
              name="name"
              placeholder="Enter your Name"
              className="input input-bordered w-full"
              value={formdata.name}
              onChange={(e) => setFormdata({...formdata, name: e.target.value})}
              
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              value={formdata.email}
              onChange={(e) => setFormdata({...formdata, email: e.target.value})}
              
            />
          </div>
          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full"
              value={formdata.password}
              onChange={(e) => setFormdata({...formdata, password: e.target.value})}
              
            />
          </div>
          <button type='submit' className="btn btn-primary w-full mt-4">{isSigningUp ? "Loading" : "SignUp"}</button>
        </form>
        <p className="text-center mt-4">
          Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Signup