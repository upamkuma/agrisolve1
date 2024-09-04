import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase.js'
import { Navigate, useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Sign-in successful');
      navigate('/marketplace')
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };
  
  return (
    <div className='bg-[#D6EFD8] flex justify-center items-center max-w-screen min-h-screen' >
        <div className="bg-white p-8 rounded-3xl shadow-lg max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Sign In To Your Account.</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
          <div className="relative">
            <input
              type="email"
              id="email"
              className="w-full p-3 border border-gray-300 rounded-full pl-10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="youremail@example.com"
              required
            />
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full p-3 border border-gray-300 rounded-full pl-10 pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="form-checkbox text-green-700"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <span className="ml-2 text-gray-700">Remember For 30 Days</span>
          </label>
          <a href="#" className="text-green-700 hover:underline">Forgot Password</a>
        </div>
        <button
          type="submit"
          className="w-full bg-green-700 text-white p-3 rounded-full font-semibold hover:bg-green-800 transition duration-300"
        >
          Sign In
        </button>
      </form>
      <p className="text-center mt-6">
        Don't have an account? <a href="#" className="text-green-700 hover:underline">Sign Up</a>
      </p>
      <div className="relative mt-6 mb-6">
        <hr className="border-t border-gray-300" />
        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-gray-500">OR</span>
      </div>
      <button
        className="w-full border border-gray-300 p-3 rounded-full flex items-center justify-center hover:bg-gray-50 transition duration-300"
      >
        <FaGoogle className="text-green-700 mr-2" />
        Sign In With Google
      </button>
    </div>
    </div>
    
  );
};

export default SignIn;