import { GoogleLogo } from "phosphor-react";
import { useContext } from "react";
import { AuthContextProvider } from "../contexts/AuthContextProvider";

export function Login() {
  const { onSignWithGoogle } = useContext(AuthContextProvider);

  async function handleSignInWithGoogle() {
    await onSignWithGoogle();
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <button
        type="button"
        onClick={handleSignInWithGoogle}
        className="flex items-center justify-center gap-2 text-2xl text-gray-400 border border-gray-700 bg-gray-900 py-2 px-10 rounded-md hover:bg-gray-800 transition-all"
      >
        <GoogleLogo size={32} />
        Login
      </button>
    </div>
  );
}
