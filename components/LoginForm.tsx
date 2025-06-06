"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Invalid email or password",
        });
        return;
      }

      router.push("/dashboard");
      toast({
        title: "Success",
        description: "Welcome back!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred during login",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid gap-4 sm:gap-6">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="grid gap-3 sm:gap-4">
          <div className="grid gap-1.5 sm:gap-2">
            <Label htmlFor="email" className="text-sm sm:text-base">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              className="h-9 sm:h-10"
            />
          </div>
          <div className="grid gap-1.5 sm:gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-sm sm:text-base">
                Password
              </Label>
            </div>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              autoComplete="current-password"
              disabled={isLoading}
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              className="h-9 sm:h-10"
            />
          </div>
          <Button
            disabled={isLoading}
            className="h-9 sm:h-10 mt-1 sm:mt-2 bg-white text-secondary-foreground hover:bg-blue-500/90 text-sm sm:text-base font-medium text-black cursor-pointer"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign In
          </Button>
        </div>
      </form>
    </div>
  );
}
