import { formatCEP } from "@utils/mask/mascaras";
import { useQuery } from "react-query";

export interface IConsultaCep {
  bairro: string;
  cep: string;
  complemento: string;
  ddd: string;
  gia: string;
  ibge: string;
  localidade: string;
  logradouro: string;
  siafi: string;
  uf: string;
  unidade: string;
}

interface IConsultaCepErro {
  erro: "true";
}

const useGetConsultaCep = (cep: string) => {
  const cepFormatado = formatCEP(cep);
  return useQuery<IConsultaCep | IConsultaCepErro>(
    ["consultaCep", cepFormatado],
    async () => {
      const data = await fetch(
        `https://viacep.com.br/ws/${cepFormatado}/json/`,
        { method: "GET" },
      );

      const body = await data.json();

      return body;
    },
    {
      enabled: cep.includes("-") ? cep.length === 9 : cep.length === 8,
    },
  );
};

export { useGetConsultaCep };
