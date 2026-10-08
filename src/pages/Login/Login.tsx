import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { useState, useEffect } from "react";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isSigningUp, setIsSigningUp] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [loginFailed, setLoginFailed] = useState<boolean>(false);
  const [signupFailed, setSignupFailed] = useState<boolean>(false);

  useEffect(() => {
    document.title = `${isSigningUp ? "Sign Up" : "Sign In"} | Bank of CLI`;
  }, [isSigningUp]);

  const { login, signup } = useAuth();

  function handleSubmitSignIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!username || !password) return; //show error
    const success = login(username, password);
    if (!success) setLoginFailed(true);
  }

  const handleSubmitSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // return if any fields empty or pws not matching
    const success = signup(firstName, lastName, email, username, password);
    if (!success) setSignupFailed(true);
  };

  const handleFormSwap = () => {
    clearAllFields();
    setIsSigningUp(!isSigningUp);
  };

  const clearAllFields = () => {
    setLoginFailed(false);
    setSignupFailed(false);
    setUsername("");
    setPassword("");
    setEmail("");
    setFirstName("");
    setLastName("");
    setConfirmPassword("");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      {!isSigningUp ? (
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-center">Sign in to Bank of CLI</CardTitle>
          </CardHeader>

          <Separator />

          <CardContent>
            <form id="login-form" onSubmit={handleSubmitSignIn}>
              <div className="flex flex-col gap-3">
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            </form>
            {loginFailed && (
              <Alert className="border-none px-0" variant="destructive">
                <AlertTitle>Login Failed: Username or password incorrect</AlertTitle>
              </Alert>
            )}
          </CardContent>

          <CardFooter className="flex-col gap-4">
            <Button type="submit" form="login-form" className="w-full">
              Sign in
            </Button>

            <div className="flex w-full items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted-foreground">OR</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Button onClick={handleFormSwap} variant="link">
                Create an account
              </Button>
            </p>
          </CardFooter>
        </Card>
      ) : (
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-center">Create an account with Bank of CLI</CardTitle>
          </CardHeader>

          <Separator />

          <CardContent>
            <form id="login-form" onSubmit={handleSubmitSignUp}>
              <div className="flex flex-col gap-3">
                <div className="grid gap-1">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>

                <div className="grid gap-1">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>

                <div className="grid gap-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="grid gap-1">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                <div className="grid gap-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="grid gap-1">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            </form>
            {signupFailed && (
              <Alert className="border-none px-0" variant="destructive">
                <AlertTitle>Signup Failed: Please review your information</AlertTitle>
              </Alert>
            )}
          </CardContent>

          <CardFooter className="flex-col gap-4">
            <Button type="submit" form="login-form" className="w-full">
              Sign up
            </Button>

            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Button onClick={handleFormSwap} variant="link">
                Sign in
              </Button>
            </p>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};
export default Login;

//todo: have to click signup twice to get it to work for some reason?
