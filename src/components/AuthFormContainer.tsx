import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface AuthFormContainerProps {
  /**
   * The main title of the form, e.g., "Login" or "Create an Account".
   */
  title: string;
  /**
   * The subtitle or description displayed below the title.
   */
  subtitle: string;
  /**
   * The main content of the form, typically input fields and submission buttons.
   */
  children: React.ReactNode;
  /**
   * The content for the footer, usually for contextual links like "Forgot Password?" or "Don't have an account?".
   */
  footerContent: React.ReactNode;
}

/**
 * A specialized wrapper for authentication forms.
 * It provides a consistent layout with a title, subtitle, content area, and a footer for contextual links.
 */
const AuthFormContainer: React.FC<AuthFormContainerProps> = ({ title, subtitle, children, footerContent }) => {
  console.log('AuthFormContainer loaded');

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold tracking-tight">{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {children}
      </CardContent>
      <CardFooter className="flex justify-center text-sm">
        {footerContent}
      </CardFooter>
    </Card>
  );
};

export default AuthFormContainer;