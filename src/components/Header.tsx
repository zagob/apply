import { format } from "date-fns";
import PTBR from "date-fns/locale/pt-BR";
import { signOut } from "firebase/auth";
import Image from "next/image";
import { ChartBar, Power } from "phosphor-react";
import { useContext } from "react";
import { AuthContextProvider } from "../contexts/AuthContextProvider";
import { ModalContext } from "../contexts/ModalContextProvider";
import { auth } from "../services/firebase";

export function Header() {
  const { onSetModalOpen } = useContext(ModalContext);
  const { onSignOut, userAuthenticate } = useContext(AuthContextProvider);

  return (
    <header className="h-28 flex items-center justify-between px-4 md:px-32">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Image
            className="rounded-full"
            src={userAuthenticate?.avatar!}
            width={42}
            height={42}
            alt={userAuthenticate?.name!}
          />
          <span className="text-gray-300 text-sm sm:text-xl">
            {userAuthenticate?.name!}
          </span>
        </div>
        <time className="text-gray-300 hidden sm:flex sm:text-2xl">
          {format(new Date(), "dd 'de' MMMM 'de' yyyy", {
            locale: PTBR,
          })}
        </time>
      </div>

      <div className="flex items-center gap-10">
        <div className="flex items-center gap-2">
          <span className="text-gray-200 text-xs sm:text-sm">
            Visão geral dos meses
          </span>
          <ChartBar
            onClick={() => onSetModalOpen("modalResumeMonth")}
            className="text-green-700  hover:text-green-500 hover:cursor-pointer transition-all"
            size={32}
          />
        </div>

        <Power
          className="text-gray-400 hover:text-gray-200 hover:cursor-pointer transition-all"
          size={32}
          onClick={() => onSignOut()}
        />
      </div>
    </header>
  );
}
