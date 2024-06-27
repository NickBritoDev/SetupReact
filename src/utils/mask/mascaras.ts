import dayjs from "dayjs";

export const maskCPF = (value: string): any => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};

export const maskPhone = (value: any): any => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d{4})(\d)/, "$1-$2");
};

export const maskCEP = (value: string): any => {
  return value.replace(/\D/g, "").replace(/^(\d{5})(\d{3})+?$/, "$1-$2");
};

export const maskDate = (value: string): any => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d)/, "$1");
};

export const maskOnlyLetters = (value: string): any => {
  return value.replace(/[0-9!@#¨$%^&*)(+=._-]+/g, "");
};

export const maskOnlyNumbers = (value: string): any => {
  return value.replace(/\D/g, "");
};

const formatDataHora = (d: any) => {
  return dayjs(d).format(" DD/MM/YYYY HH:mm:ss");
};

export default formatDataHora;
