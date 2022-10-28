import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  ArrowArcLeft,
  ArrowLeft,
  ArrowRight,
  ClosedCaptioning,
  X,
} from "phosphor-react";
import { useContext, useEffect, useState } from "react";
import { AuthContextProvider } from "../contexts/AuthContextProvider";
import { ModalContext } from "../contexts/ModalContextProvider";
import { getCounts } from "../services/firebase/firestore";
import { Modal } from "./Modal";

interface dataMonthProps {
  value: number;
  month: number;
  year: number;
}

export function ModalResumeMonth() {
  const { onCloseModal } = useContext(ModalContext);
  const { userAuthenticate } = useContext(AuthContextProvider);
  const [year, setYear] = useState(0);

  const [dataMonth, setDataMonth] = useState<dataMonthProps[]>([]);

  function downYear() {
    setYear((old) => old - 1);
  }

  function nextYear() {
    setYear((old) => old + 1);
  }

  useEffect(() => {
    setYear(Number(format(new Date(), "yyyy")));
  }, []);

  useEffect(() => {
    async function getCountsResponse() {
      const response = await getCounts(userAuthenticate?.id!, year);
      setDataMonth(response);
    }
    getCountsResponse();
  }, [year, userAuthenticate]);

  return (
    <Modal>
      <div className="w-[600px] h-[300px] bg-gray-800 relative flex flex-col">
        <X
          size={32}
          className="text-gray-200 absolute right-[-12px] top-[-12px] rounded-full bg-red-400"
          onClick={onCloseModal}
        />
        <header className="flex items-center justify-center gap-2 text-gray-200 py-4">
          <button
            type="button"
            onClick={downYear}
            className="border border-gray-500 p-1 hover:border-gray-400 transition-all"
          >
            <ArrowLeft size={20} />
          </button>
          <span className="text-xl">{year}</span>
          <button
            type="button"
            onClick={nextYear}
            className="border border-gray-500 p-1 hover:border-gray-400 transition-all"
          >
            <ArrowRight size={20} />
          </button>
        </header>

        <main className="grid grid-cols-4">
          {dataMonth.map((item) => (
            <div
              key={item.month}
              className="text-gray-200 flex flex-col items-center p-1 border m-1 border-gray-700"
            >
              <span>{item.value}</span>
              <span className="text-sm">
                {format(new Date(item.year, item.month - 1), "MMMM", {
                  locale: ptBR,
                })}
              </span>
            </div>
          ))}
        </main>
      </div>
    </Modal>
  );
}
