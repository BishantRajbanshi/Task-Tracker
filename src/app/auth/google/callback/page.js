"use client";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const GoogleCallback = () => {
  const [status, setStatus] = useState('Processing...');
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        // Get the token and user data from URL parameters (set by backend redirect)
        const token = searchParams.get('token');
        const user = searchParams.get('user');
        const error = searchParams.get('error');

        if (error) {
          setError(decodeURIComponent(error));
          setStatus('Authentication failed');
          return;
        }

        if (!token) {
          setError('No authentication token received');
          setStatus('Authentication failed');
          return;
        }

        setStatus('Authentication successful! Redirecting...');

        // Store the token and user data
        localStorage.setItem('auth_token', token);
        if (user) {
          localStorage.setItem('user', user);
        }
        
        // Redirect to dashboard or stored redirect location
        const redirectTo = localStorage.getItem('auth_redirect') || '/dashboard';
        localStorage.removeItem('auth_redirect');
        
        setTimeout(() => {
          window.location.href = redirectTo;
        }, 1000);
        
      } catch (err) {
        console.error('Google callback error:', err);
        setError('Authentication failed. Please try again.');
        setStatus('Authentication failed');
      }
    };

    handleGoogleCallback();
  }, [searchParams]);

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        backgroundImage: 'url(/loginregisterbackground.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="max-w-md w-full">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-md p-8 text-center">
          <div className="mb-4">
            {status === 'Processing...' || status === 'Authenticating with Google...' ? (
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            ) : error ? (
              <div className="text-red-500 text-6xl mb-4">✗</div>
            ) : (
              <div className="text-green-500 text-6xl mb-4">✓</div>
            )}
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {error ? 'Authentication Failed' : 'Google Authentication'}
          </h2>
          
          <p className="text-gray-600 mb-4">{status}</p>
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}
          
          {error && (
            <button
              onClick={() => window.location.href = '/Login'}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Back to Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoogleCallback; 