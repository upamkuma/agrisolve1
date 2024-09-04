// import React, { useState } from 'react';
// import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
// import { auth, googleProvider } from '../firebase-config';
// import { useNavigate } from 'react-router-dom';

// const SignIn = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const uid = userCredential.user.uid;
//       redirectToUserPage(uid);
//     } catch (error) {
//       console.error('Error signing in:', error);
//     }
//   };

//   const handleGoogleSignIn = async () => {
//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       const uid = result.user.uid;
//       redirectToUserPage(uid);
//     } catch (error) {
//       console.error('Error with Google sign-in:', error);
//     }
//   };

//   const redirectToUserPage = async (uid) => {
//     try {
//       const response = await fetch(`http://localhost:3000/getUserData?uid=${uid}`);
//       const data = await response.json();

//       if (data.type === 'buyer') {
//         navigate('/Supplier_Dashboard');
//       } else if (data.type === 'farmer') {
//         navigate('/Marketplace');
//       } else {
//         navigate('/');
//         console.error('Unknown user type:', data.type);
//       }
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//     }
//   };

//   return (
//     <div className='bg-[#D6EFD8] flex justify-center items-center max-w-screen min-h-screen'>
//       <div className="bg-white p-8 rounded-3xl shadow-lg max-w-md mx-auto">
//         <h1 className="text-3xl font-bold mb-6">Sign In To Your Account.</h1>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
//             <div className="relative">
//               <input
//                 type="email"
//                 id="email"
//                 className="w-full p-3 border border-gray-300 rounded-full pl-10"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="youremail@example.com"
//                 required
//               />
//             </div>
//           </div>
//           <div className="mb-6">
//             <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 id="password"
//                 className="w-full p-3 border border-gray-300 rounded-full pl-10 pr-10"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//               >
//                 {showPassword ? 'Hide' : 'Show'}
//               </button>
//             </div>
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-green-700 text-white p-3 rounded-full font-semibold hover:bg-green-800 transition duration-300"
//           >
//             Sign In
//           </button>
//         </form>
//         <p className="text-center mt-6">
//           Don't have an account? <a href="#" className="text-green-700 hover:underline">Sign Up</a>
//         </p>
//         <div className="relative mt-6 mb-6">
//           <hr className="border-t border-gray-300" />
//           <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-gray-500">OR</span>
//         </div>
//         <button
//           onClick={handleGoogleSignIn}
//           className="w-full border border-gray-300 p-3 rounded-full flex items-center justify-center hover:bg-gray-50 transition duration-300"
//         >
//           Sign In With Google
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SignIn;
import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase-config';
import { useNavigate } from 'react-router-dom';

const SignIn = ({ setUid }) => { // Accept setUid as a prop
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
      setUid(uid); // Store uid in App component state
      redirectToUserPage(uid);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const uid = result.user.uid;
      setUid(uid); // Store uid in App component state
      redirectToUserPage(uid);
    } catch (error) {
      console.error('Error with Google sign-in:', error);
    }
  };

  const redirectToUserPage = async (uid) => {
    try {
      const response = await fetch(`http://localhost:3000/getUserData?uid=${uid}`);
      const data = await response.json();

      if (data.type === 'buyer') {
        navigate('/supplier_dashboard');
      } else if (data.type === 'farmer') {
        navigate('/marketplace');
      } else {
        navigate('/');
        console.error('Unknown user type:', data.type);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <div className='bg-[#D6EFD8] flex justify-center items-center max-w-screen min-h-screen'>
      <div className="bg-white p-8 rounded-3xl shadow-lg max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-6">Sign In To Your Account.</h1>
        <form onSubmit={handleSubmit}>
          {/* Sign In Form */}
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
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
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
          onClick={handleGoogleSignIn}
          className="w-full border border-gray-300 p-3 rounded-full flex items-center justify-center hover:bg-gray-50 transition duration-300"
        >
          Sign In With Google
        </button>
      </div>
    </div>
  );
};

export default SignIn;
