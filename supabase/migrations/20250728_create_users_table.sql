-- Create users table for OTP and auth
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  otp text,
  otp_expires_at timestamptz,
  provider text, -- 'local' for email/password, 'google' for Google SSO
  created_at timestamptz DEFAULT now()
);
