import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../../firebase';
import './Login.css';

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from || '/';

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isSignup) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, {
          displayName: name,
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate(from, { replace: true });
    } catch (err) {
      setError("Error: " + err.message);
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleAuth} className="login-form">
        <h2>{isSignup ? 'Sign Up' : 'Sign In'}</h2>

        {isSignup && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">{isSignup ? 'Sign Up' : 'Sign In'}</button>

        {error && <p className="error">{error}</p>}

        <p className="signup-link">
          {isSignup ? 'Already have an account?' : 'New to Netflix?'}{' '}
          <span
            className="toggle-link"
            onClick={() => {
              setIsSignup(!isSignup);
              setError('');
            }}
          >
            {isSignup ? 'Sign in now' : 'Sign up now'}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
