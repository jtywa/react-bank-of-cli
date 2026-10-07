import { useState } from "react";

import "./App.css";
import {
  Card,

  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function App() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
 
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // Replace with your real sign-in call
    console.log({ username, password })
  }


  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Sign in to Bank of CLI</CardTitle>

          </CardHeader>

          <CardContent>
            <form id="login-form" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
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
          </CardContent>

          <CardFooter className="flex-col gap-4">
            <Button type="submit" form="login-form" className="w-full">
              Sign in
            </Button>

            {/* OR divider */}
            <div className="flex w-full items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted-foreground">OR</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <a
                href="#"
                className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
              >
                Create an account
              </a>
            </p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default App;
