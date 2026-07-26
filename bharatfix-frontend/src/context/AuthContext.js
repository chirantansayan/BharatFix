"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { login as loginRequest } from "@/lib/endpoints";

const AuthContext = createContext(null);

function decodeUser(token) {
  try {
    const payload = jwtDecode(token);
    // Backend puts subject=username, claim "role"=ADMIN|USER, exp/iat
    return {
      username: payload.sub,
      role: payload.role,
      exp: payload.exp,
    };
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("bf_token");
    if (stored) {
      const decoded = decodeUser(stored);
      if (decoded && decoded.exp * 1000 > Date.now()) {
        setToken(stored);
        setUser(decoded);
      } else {
        localStorage.removeItem("bf_token");
        localStorage.removeItem("bf_user");
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (username, password) => {
    const res = await loginRequest(username, password);
    const jwt = res.data.token;
    const decoded = decodeUser(jwt);
    if (!decoded) throw new Error("Received an invalid token from server");
    localStorage.setItem("bf_token", jwt);
    setToken(jwt);
    setUser(decoded);
    return decoded;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("bf_token");
    localStorage.removeItem("bf_user");
    setToken(null);
    setUser(null);
    router.push("/login");
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
