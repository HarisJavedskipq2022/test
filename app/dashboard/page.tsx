"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface UserData {
  email: string;
  qrCode: string;
  aiGeneratedMessage: string;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState<UserData | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user?.email) {
        try {
          const res = await fetch(
            `/api/user?email=${encodeURIComponent(session.user.email)}`
          );
          const data = await res.json();
          setUserData(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [session]);

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      toast({
        title: "Success",
        description: "You have been logged out successfully",
      });
      router.push("/login");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to log out. Please try again.",
      });
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:py-8 sm:px-6 lg:py-12 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Welcome to your Dashboard
              </h1>
              <p className="mt-2 text-sm sm:text-base text-gray-600 break-words">
                {session?.user?.email}
              </p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>

          {userData && (
            <div className="space-y-6 sm:space-y-8">
              <div className="border-t border-gray-200 pt-6 sm:pt-8">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
                  Your QR Code
                </h2>
                <div className="flex justify-center">
                  <div className="p-2 sm:p-4 bg-white rounded-lg shadow-lg">
                    <img
                      src={userData.qrCode}
                      alt="QR Code"
                      className="w-48 h-48 sm:w-64 sm:h-64 object-contain"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6 sm:pt-8">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
                  AI-Generated Message
                </h2>
                <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
                  <p className="text-blue-700 text-base sm:text-lg break-words">
                    {userData.aiGeneratedMessage}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
