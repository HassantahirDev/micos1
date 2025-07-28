// Supabase-based authentication API wrappers (no integration, just API functions)
import { supabase } from './supabaseClient';

const SITE_URL = import.meta.env.VITE_SITE_URL;
console.log('SITE_URL:', SITE_URL);
// Login with email and password
export async function login({ email, password }) {
  // Check provider
  const { data: existingUser } = await supabase
    .from('users')
    .select('provider')
    .eq('email', email)
    .single();

  if (existingUser && existingUser.provider === 'google') {
    throw new Error('This email is registered with Google. Please use "Continue with Google" to log in.');
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  // Store JWT and name in localStorage
  if (data?.session?.access_token) {
    localStorage.setItem('jwt_token', data.session.access_token);
    // Get name from user_metadata in the response
    const name =
      data.user?.user_metadata?.full_name ||
      data.user?.user_metadata?.name ||
      "";
    if (name) {
      localStorage.setItem('user_name', name);
    }
  }
  return data;
}

// Sign up with email and password (uses Supabase's email verification link)
export async function signup({ email, password, name }) {
  // Check provider
  const { data: existingUser, error: userError } = await supabase
    .from('users')
    .select('provider')
    .eq('email', email)
    .single();

  if (existingUser && existingUser.provider === 'google') {
    throw new Error('This email is already registered with Google. Please use "Continue with Google" to sign in.');
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: SITE_URL + '/Login',
      data: { name }, // Store name in user_metadata as well
    },
  });
  if (error) throw error;
  // Store JWT in localStorage if available (user may need to verify email first)
  if (data?.session?.access_token) {
    localStorage.setItem('jwt_token', data.session.access_token);
  }
  // Store user in users table with provider 'local' and name
  const { error: upsertError } = await supabase
    .from('users')
    .upsert({ email, name, provider: 'local' }, { onConflict: ['email'] });
  if (upsertError) throw upsertError;
  return data;
}

// Update password (requires accessToken from email link or OTP verification)
export async function updatePassword({ accessToken, newPassword }) {
  const { data, error } = await supabase.auth.updateUser(
    { password: newPassword },
    { accessToken }
  );
  if (error) throw error;
  return data;
}

// Google SSO login/signup
export async function loginWithGoogle(email) {
  // Check provider
  const pendingEmail = localStorage.getItem('pending_google_email'); // Set this before redirect if possible
  if (pendingEmail) {
    const { data: existingUser, error: userError } = await supabase
      .from('users')
      .select('provider')
      .eq('email', pendingEmail)
      .single();

    if (existingUser && existingUser.provider === 'local') {
      throw new Error('This email is already registered with a password. Please log in with email and password.');
    }
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: SITE_URL + '/google-callback',
    },
  });
  if (error) throw error;
  // Store JWT in localStorage if available (usually not available until callback)
  if (data?.session?.access_token) {
    localStorage.setItem('jwt_token', data.session.access_token);
  }
}

// Handle Google OAuth callback: upsert user and redirect
export async function handleGoogleCallback() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session || !session.user) throw new Error('No user session found');
  const { email, user_metadata, access_token } = session.user;
  const name = user_metadata?.full_name || user_metadata?.name || '';
  // Store JWT and name in localStorage
  if (session?.access_token) {
    localStorage.setItem('jwt_token', session.access_token);
    if (name) {
      localStorage.setItem('user_name', name);
    }
  }
  // Upsert user info
  const { error: upsertError } = await supabase
    .from('users')
    .upsert({ email, name, provider: 'google' }, { onConflict: ['email'] });
  if (upsertError) throw upsertError;
  window.location.replace('/dashboard');
}

// Example button handler
const handleGoogleLogin = async () => {
  if (!email) {
    setError("Please enter your email before continuing with Google.");
    return;
  }
  try {
    await loginWithGoogle(email);
  } catch (err) {
    setError(err.message);
  }
};
