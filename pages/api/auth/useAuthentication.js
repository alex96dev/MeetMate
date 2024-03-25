import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";

export default function useAuthentication() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkSession() {
      const session = await getSession();
      if (session) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
      setLoading(false);
    }

    checkSession();
  }, [router]);

  return { authenticated, loading };
}
