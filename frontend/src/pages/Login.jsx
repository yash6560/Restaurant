import {Link} from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useMenuSelectionStore } from '../store/useMenuSelectionStore';

const Login = () => {
  const {userLogin, isLoggingn, authUser, chechAuth} = useAuthStore();
  const {fetchCartData} = useMenuSelectionStore();
  const navigate = useNavigate();
  const [formdata, setFormdata] = useState({
      email: '',
      password: '',
    })

  const handleSubmit = async(e) => {
    e.preventDefault();
    const res = await userLogin(formdata);
    if(res?.success){
      fetchCartData();
      chechAuth();
      navigate('/')
    }
    console.log(authUser);

  }
  return (
    <div className="flex items-center justify-center min-h-screen  p-5">
      <div className="card w-96 bg-base-200 shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text"> Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              value={formdata.email}
              onChange={(e) => setFormdata({...formdata, email: e.target.value})}
              required
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
              required
            />
          </div>
          <button type='submit' className="btn btn-primary w-full mt-4">{isLoggingn ? "Loading.." : "Login"}</button>
        </form>
        <p className="text-left mt-2">
         <Link to="/forgot-password" className="text-blue-500 hover:underline">Forgot Password?</Link>
        </p>
        <p className="text-center mt-4">
          Do not have an account? <Link to="/signup" className="text-blue-500">Signup</Link>
        </p>
      </div>
    </div>
  )
}

export default Login