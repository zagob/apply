import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, signInWithGooglePopup } from "../services/firebase";
import { createUser, getUser } from "../services/firebase/firestore";

interface AuthContextProviderProps {
  onSignWithGoogle: () => Promise<void>;
  onSignOut: () => Promise<void>;
  userAuthenticate: userAuthenticateProps | null;
}

export const AuthContextProvider = createContext(
  {} as AuthContextProviderProps
);

interface AuthProviderProps {
  children: ReactNode;
}

interface userAuthenticateProps {
  id: string;
  name: string | null;
  avatar: string | null;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const [userAuthenticate, setUserAuthenticate] =
    useState<userAuthenticateProps | null>(null);

  async function onSignWithGoogle() {
    try {
      const result = await signInWithGooglePopup();

      const { displayName, photoURL, uid } = result.user;
      const user = await getUser(uid);

      const dataUser = {
        id: uid,
        name: displayName,
        avatar: photoURL,
      };

      if (user) {
        setUserAuthenticate(dataUser);
        return;
      }

      await createUser(dataUser);
    } finally {
      // if (userAuthenticate) {
      //   router.push("/dashboard");
      // }
    }
  }

  async function onSignOut() {
    await signOut(auth);
    setUserAuthenticate(null);
  }

  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { displayName, photoURL, uid } = user;
        const existUser = await getUser(uid);

        const dataUser = {
          id: uid,
          name: displayName,
          avatar: photoURL,
        };

        if (existUser) {
          setUserAuthenticate(dataUser);
          return;
        }
      }
    });

    return () => {
      subscribe();
    };
  }, []);

  return (
    <AuthContextProvider.Provider
      value={{ onSignWithGoogle, userAuthenticate, onSignOut }}
    >
      {children}
    </AuthContextProvider.Provider>
  );
}
