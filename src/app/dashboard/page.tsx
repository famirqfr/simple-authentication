"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";
import Image from "next/image";

export default function DashboardPage() {
  const { user, isAuthenticated, logout, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center">
        در حال بارگذاری...
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-bold">
            خوش آمدی، {user.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <div className="flex flex-col items-center gap-2">
            {user.picture && (
              <Image
                src={user.picture}
                alt={user.name}
                className="h-20 w-20 rounded-full border border-border shadow"
                width={80}
                height={80}
                priority
              />
            )}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4 text-primary" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4 text-primary" />
              <span>{user.phone}</span>
            </div>
          </div>

          <Button
            variant="destructive"
            className="mt-4 w-full"
            onClick={() => {
              logout();
              router.push("/login");
            }}
          >
            خروج
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
