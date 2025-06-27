import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Import Layout and Custom Components
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import AuthFormContainer from '../components/AuthFormContainer';

// Import shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, CheckCircle } from 'lucide-react';

// Define the validation schema with password confirmation
const formSchema = z.object({
  password: z.string().min(8, { message: "Password must be at least 8 characters long." }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"], // Set the error on the confirmation field
});

const ResetPasswordPage = () => {
  console.log('ResetPasswordPage loaded');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    console.log('Attempting to reset password. Data:', { password: '***' });

    // Simulate an API call to the backend
    await new Promise(resolve => setTimeout(resolve, 1500));

    // On successful reset:
    setSuccess("Your password has been reset successfully! Redirecting to login...");
    setIsLoading(false);
    
    // Redirect to the login page after a short delay
    setTimeout(() => {
        navigate('/'); // Navigate to LoginPage as defined in App.tsx
    }, 3000);

    // Example of a failure case (e.g., invalid token)
    // setError("Failed to reset password. The link may have expired. Please try again.");
    // setIsLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <AuthFormContainer
          title="Reset Your Password"
          subtitle="Enter and confirm your new password below."
          footerContent={
            <p className="text-sm text-muted-foreground">
              Remember your password?{' '}
              <Link to="/" className="font-semibold text-primary hover:underline">
                Login here
              </Link>
            </p>
          }
        >
          {error && (
            <Alert variant="destructive" className="mb-4">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
             <Alert variant="success" className="mb-4">
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} disabled={isLoading || !!success} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} disabled={isLoading || !!success} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full mt-2" disabled={isLoading || !!success}>
                {isLoading ? 'Resetting...' : 'Set New Password'}
              </Button>
            </form>
          </Form>
        </AuthFormContainer>
      </main>
      <Footer />
    </div>
  );
};

export default ResetPasswordPage;