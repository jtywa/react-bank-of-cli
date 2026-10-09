import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { useState, useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
import { popToast } from "@/lib/popToast";
import { isValidEmail, isValidName, isValidPassword, isValidUsername } from "@/utils/utils";

//todo: get email validation working
//todo: email/username exists validation

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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Validated Error States
  const [invalidFirst, setInvalidFirst] = useState(false);
  const [invalidLast, setInvalidLast] = useState(false);
  const [invalidUser, setInvalidUser] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [shortOrLongUser, setShortOrLongUser] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [shortOrLongPassword, setShortOrLongPassword] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  useEffect(() => {
    document.title = `${isSigningUp ? "Sign Up" : "Sign In"} | Bank of CLI`;
  }, [isSigningUp]);

  const { login, signup } = useAuth();

  const handleSubmitSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    if (!username || !password) return; //show error
    const success = login(username, password);
    if (success) {
      setUsername("")
      setPassword("")
    }
    else {
      setLoginFailed(true);
      popToast(success, "", "Login Failed");
    }
  };

  const handleSubmitSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    // return if any fields empty or pws not matching
    const success = signup(firstName, lastName, email, username, password);
        if (success) {
          setIsSigningUp(false);
          setEmail("")
          setUsername("")
          setPassword("")
          setConfirmPassword("")
          setFirstName("")
          setLastName("")
          setInvalidEmail(false);
          setInvalidPassword(false);
          setInvalidFirst(false);
          setInvalidLast(false);
          setInvalidPassword(false);
          setInvalidUser(false);
          setPasswordMismatch(false);
        }
    else setSignupFailed(true);

    popToast(success, "Acount Creation Successful!", "Account Creation Failed");
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

  const handleFirst = () => {
    if (!firstName || isValidName(firstName)) setInvalidFirst(false);
    else setInvalidFirst(true);
  }

  const handleLast = () => {
if (!lastName || isValidName(lastName)) setInvalidLast(false);
    else setInvalidLast(true);
  }

  const handleEmail = () => {
    if (!email || isValidEmail(email)) setInvalidEmail(false);
    else setInvalidEmail(true);
  }

  const handleUser = () => {
    if (!username || isValidUsername(username)) setInvalidUser(false);
    else setInvalidUser(true);
  }

  const handlePassword = () => {
    if (confirmPassword !== "" && password !== confirmPassword) setPasswordMismatch(true);
    else setPasswordMismatch(false);
    if (password === "" && confirmPassword === "") setPasswordMismatch(false);
    if (password === "" || confirmPassword === "") setInvalidPassword(false);

    if (isValidPassword(password)) setInvalidPassword(false);
    else setInvalidPassword(true);
  }

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
                    disabled={isLoading ? true : false}
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
                    disabled={isLoading ? true : false}
                  />
                </div>
              </div>
            </form>

            <Alert className="border-none px-0" variant="destructive">
              <AlertTitle className={loginFailed ? "" : "hidden"}>Invalid username or password</AlertTitle>
            </Alert>
          </CardContent>

          <CardFooter className="flex-col gap-4">
            <Button type="submit" form="login-form" className="w-full" disabled={isLoading ? true : false}>
              {isLoading && <Spinner className="size-6" />}
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>

            <div className="flex w-full items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted-foreground">OR</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Button onClick={handleFormSwap} variant="link" disabled={isLoading ? true : false}>
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

          {/* SIGN UP */}

          <CardContent>
            <form id="signup-form" onSubmit={handleSubmitSignUp}>
              <div className="flex flex-col gap-3">
                {/* FIRST NAME */}

                <div className="grid gap-1">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                  onBlur={handleFirst}
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    disabled={isLoading ? true : false}
                    className={invalidFirst ? "border-red-500" : ""}
                  />
                  {invalidFirst && <Alert className="border-none p-0" variant="destructive">
                    <AlertTitle>First name must be less than 24 characters and contain only letters and - (hyphen) or ' (apostrophe)</AlertTitle>
                  </Alert>}
                </div>

                {/* LAST NAME */}

                <div className="grid gap-1">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                  onBlur={handleLast}
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    disabled={isLoading ? true : false}
                    className={invalidLast ? "border-red-500" : ""}
                  />
                                    {invalidLast && <Alert className="border-none p-0" variant="destructive">
                    <AlertTitle>Last name must be less than 24 characters and contain only letters and - (hyphen) or ' (apostrophe)</AlertTitle>
                  </Alert>}
                </div>

                {/* EMAIL */}

                <div className="grid gap-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                  onBlur={handleEmail}
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading ? true : false}
                    className={invalidEmail ? "border-red-500" : ""}
                  />
                  {invalidEmail && (
                  <Alert className="border-none p-0" variant="destructive">
                    <AlertTitle>Email must be valid</AlertTitle>
                  </Alert>
                )}
                </div>



                {/* USERNAME */}

                <div className="grid gap-1">
                  <Label htmlFor="username">Username</Label>
                  <Input
                  onBlur={handleUser}
                    id="username"
                    name="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    disabled={isLoading ? true : false}
                    className={invalidUser ? "border-red-500" : ""}
                  />
                </div>

                {invalidUser && (
                  <Alert className="border-none p-0" variant="destructive">
                    <AlertTitle>Username must be alphanumeric, 3-16 characters</AlertTitle>
                  </Alert>
                )}

                {/* PASSWORD */}

                <div className="grid gap-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                  onBlur={handlePassword}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading ? true : false}
                    className={invalidPassword || passwordMismatch ? "border-red-500" : ""}
                  />
                </div>

                {/* CONFIRM PASSWORD */}

                <div className="grid gap-1">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                  onBlur={handlePassword}
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    disabled={isLoading ? true : false}
                    className={invalidPassword || passwordMismatch ? "border-red-500" : ""}
                  />
                </div>

                {passwordMismatch && (
                  <Alert className="border-none p-0" variant="destructive">
                    <AlertTitle>Passwords do not match</AlertTitle>
                  </Alert>
                )}

                {invalidPassword && (
                  <Alert className="border-none p-0" variant="destructive">
                    <AlertTitle>Password must be between 8-32 characters, with letters, numbers, and the symbols !, # or _ </AlertTitle>
                  </Alert>
                )}
              </div>
            </form>
          </CardContent>

          <CardFooter className="flex-col gap-4">
            <Button type="submit" form="signup-form" className="w-full" disabled={isLoading ? true : false}>
              {isLoading && <Spinner className="size-6" />}
              {isLoading ? "Signing up..." : "Sign up"}
            </Button>

            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Button onClick={handleFormSwap} variant="link" disabled={isLoading ? true : false}>
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
