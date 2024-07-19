import dayjs from "dayjs";
import { ChangeEventHandler } from "react";

export const maskCPF = (value: string): string => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};

export const maskPhone = (value: string): string => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{4,5})(\d{4})\d*/, "$1-$2");
};

export const maskCEP = (value: string): string => {
  return value.replace(/\D/g, "").replace(/(\d{5})(\d{1,3})\d*/, "$1-$2");
};

export const maskDate = (value: string): string => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d)/, "$1");
};

export const maskOnlyLetters = (value: string): string => {
  return value.replace(/\W/g, "");
};

export const maskOnlyNumbers = (value: string): string => {
  return value.replace(/\D/g, "");
};

export const maskReal = (value: string): string => {
  if (!value) {
    return "";
  }

  value = value
    .replace(/\D/g, "")
    .replace(/(\d)(\d{2})$/, "$1,$2")
    .replace(/(\d{3}),(\d{2}$)/, "$1,$2")
    .replace(/(\d{1,3})(\d{3},\d{2}$)/, "$1.$2");

  const reg = /(\d)(\d{3})(\.\d{3})/;

  while (reg.test(value)) {
    value = value.replace(reg, "$1.$2$3");
  }

  return value;
};

export const formatDataHora = (d: any) => {
  return dayjs(d).format(" DD/MM/YYYY HH:mm:ss");
};

export const formatCNPJ = (value: string) => {
  if (!value) return "";
  value = value.replace(/\D/g, "");
  value = value.replace(/^(\d{2})(\d)/, "$1.$2");
  value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
  value = value.replace(/\.(\d{3})(\d)/, ".$1/$2");
  value = value.replace(/(\d{4})(\d)/, "$1-$2");
  return value;
};

export const formatCPF = (value: string): string => {
  value = maskOnlyNumbers(value);

  return value.padStart(11, "0");
};

export function roundNumber(num: number, scale: number) {
  if (!("" + num).includes("e")) {
    return Number(Math.round(Number(num + "e+" + scale)) + "e-" + scale);
  }

  const arr = ("" + num).split("e");
  let sig = "";

  if (+arr[1] + scale > 0) {
    sig = "+";
  }

  return Number(
    Math.round(Number(arr[0] + "e" + sig + (+arr[1] + scale))) + "e-" + scale,
  );
}

export const formatNumber = (value: number): string => {
  return maskReal(roundNumber(value, 2).toString());
};

export const formatCEP = (cep: string | number): string => {
  return maskOnlyNumbers(`${cep}`).padStart(8, "0");
};

type IHandleChange = (
  callback?: ChangeEventHandler<HTMLInputElement>,
) => ChangeEventHandler<HTMLInputElement>;

const generateHandleChangeMask: (mask: (value: any) => any) => IHandleChange = (
  mask,
) => {
  return (callback) => {
    return (e) => {
      e.target.value = mask(e.target.value);

      if (callback) {
        callback(e);
      }
    };
  };
};

export const handleChangeCEP: IHandleChange = generateHandleChangeMask(maskCEP);

export const handleChangeCPF: IHandleChange = generateHandleChangeMask(maskCPF);

export const handleChangeTelefone: IHandleChange =
  generateHandleChangeMask(maskPhone);

export const handleChangeReal: IHandleChange =
  generateHandleChangeMask(maskReal);
