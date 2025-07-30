import React, { useState, useEffect } from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import app from '../firebase/firebase.config'; // Your Firebase setup

const Login = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth(app); // Use the app instance from config
  const googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const userName = user.displayName || user.email.split('@')[0];

      setUser(user);
      localStorage.setItem("userEmail", user.email); // ✅ Save email

      navigate('/', { replace: true });

      Swal.fire({
        icon: 'success',
        title: `Welcome, ${userName}!`,
        text: 'You have been successfully logged in.',
      });
    } catch (error) {
      console.error('Login error:', error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      localStorage.removeItem("userEmail"); // ✅ Clear email
      navigate('/', { replace: true });

      Swal.fire({
        icon: 'info',
        title: 'Logout Successful',
        text: 'You have been logged out.',
      });
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        localStorage.setItem("userEmail", currentUser.email); // ✅ Maintain on refresh
      }
    });

    return unsubscribe; // Cleanup on unmount
  }, [auth]);

  return (
    <div className='h-screen w-full flex items-center justify-center'>
      {user ? (
        <div className="flex flex-col items-center">
          <p className="text-3xl font-bold mb-4 text-center">
            Logged in as: {user.displayName || user.email.split('@')[0]}
          </p>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
          onClick={handleLogin}
        >
          Login with Google
        </button>
      )}
    </div>
  );
};

export default Login;
