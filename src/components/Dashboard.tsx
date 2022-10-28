import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowSquareDown, ArrowSquareUp, CircleNotch } from "phosphor-react";
import { useContext, useEffect, useState } from "react";
import { AuthContextProvider } from "../contexts/AuthContextProvider";
import { ModalContext } from "../contexts/ModalContextProvider";
import { addCount, downCount, getCount } from "../services/firebase/firestore";
import { Header } from "./Header";
import { Modal } from "./Modal";
import { ModalResumeMonth } from "./ModalResumeMonth";

export function Dashboard() {
  const { userAuthenticate } = useContext(AuthContextProvider);
  const { modal } = useContext(ModalContext);

  const [loading, setLoading] = useState(true);
  const [numberCount, setNumberCount] = useState(0);

  async function handleAddNumberCount() {
    setNumberCount((old) => old + 1);
    await addCount(numberCount + 1, userAuthenticate?.id!);
  }

  async function handleDownNumberCount() {
    setNumberCount((old) => old - 1);
    await downCount(numberCount - 1, userAuthenticate?.id!);
  }

  useEffect(() => {
    async function getCountsQuantity() {
      try {
        const response = await getCount(userAuthenticate?.id!);

        if (!response) {
          setNumberCount(0);
          return;
        }

        setNumberCount(response);
      } finally {
        setLoading(false);
      }
    }

    getCountsQuantity();
  }, [userAuthenticate]);
  return (
    <>
      {modal === "modalResumeMonth" && <ModalResumeMonth />}
      <Header />
      <div className="flex justify-center text-center sm:hidden">
        <time className="text-gray-300 text-xl">
          {format(new Date(), "dd 'de' MMMM 'de' yyyy", {
            locale: ptBR,
          })}
        </time>
      </div>
      <div className="h-[calc(100vh-112px)] flex items-center justify-center">
        {loading ? (
          <CircleNotch size={100} className="text-gray-400 animate-spin" />
        ) : (
          <div className="flex items-center">
            <h1 className="text-9xl text-gray-200">{numberCount}</h1>
            <div className="flex flex-col justify-center">
              <button
                type="button"
                className="text-green-500 hover:text-green-400 hover:cursor-pointer transition-all"
              >
                <ArrowSquareUp size={60} onClick={handleAddNumberCount} />
              </button>

              <button
                type="button"
                disabled={numberCount === 0}
                onClick={handleDownNumberCount}
                className="text-red-500 hover:text-red-400 hover:cursor-pointer transition-all disabled:cursor-not-allowed disabled:text-gray-700"
              >
                <ArrowSquareDown size={60} />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
