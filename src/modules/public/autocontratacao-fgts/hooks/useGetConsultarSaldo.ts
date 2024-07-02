import { useQuery } from "react-query";
import { CONSULTA_SALDO_CPF, StepsAutocontratacao } from "../helpers/config";
import { formatCPF } from "../../../../utils/mask/mascaras";
import { sleep } from "../../../../helpers/api/geral";

const useGetConsultarSaldo = (cpf: string, currentIndex: number) => {
  cpf = formatCPF(cpf);
  return useQuery(
    "useGetConsultarSaldoAutocontratacaoFgts",
    async () => {
      await sleep(20000);
      // const response = await connectApi.get("/")
      return CONSULTA_SALDO_CPF;
    },
    {
      enabled: currentIndex === StepsAutocontratacao.CONSULTA_SALDO,
    },
  );
};

export { useGetConsultarSaldo };
