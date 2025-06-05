import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Factory, Eye, EyeOff } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isSuperAdmin = email === 'superadmin@company.com';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let success = false;
      
      if (isSuperAdmin) {
        // For super admin, check both password options
        if (password === 'password123') {
          success = await login(email, 'password123');
        } else if (password === 'hide123') {
          success = await login(email, 'password123', 'hide123');
        } else {
          setError('Invalid password. Use either "password123" for normal access or "hide123" for full access.');
        }
      } else {
        // For other users, use normal login
        success = await login(email, password);
      }

      if (success) {
        toast({
          title: "Login Successful",
          description: "Welcome to ManufactureFlow!",
        });
        navigate('/'); // Navigate to dashboard after successful login
      } else if (!isSuperAdmin) {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Factory className="h-12 w-12 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold">ManufactureFlow</CardTitle>
          <CardDescription>
            Sign in to your manufacturing management account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {isSuperAdmin && (
                <p className="text-sm text-gray-500">
                  Use "password123" for normal access or "hide123" for full access with hidden transactions
                </p>
              )}
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">Demo Accounts:</h3>
            <div className="text-sm space-y-1 text-gray-600">
              <p><strong>Super Admin:</strong> superadmin@company.com</p>
              <p><strong>Admin:</strong> admin@company.com</p>
              <p><strong>Accounts:</strong> accounts@company.com</p>
              <p><strong>Production:</strong> production@company.com</p>
              <p><strong>Dispatch:</strong> dispatch@company.com</p>
              <p><strong>Worker:</strong> worker@company.com</p>
              <p><strong>Customer:</strong> customer@company.com</p>
              <p className="mt-2"><strong>Password:</strong> password123</p>
              <p><strong>Super Admin Full Access:</strong> hide123</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
