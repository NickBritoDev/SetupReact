import { useEffect, useRef } from "react";

const ZoiperComponent = () => {
  const zoiperRef = useRef<HTMLObjectElement>(null); // Referência para o elemento Zoiper

  useEffect(() => {
    const zoiperElement = zoiperRef.current;

    if (zoiperElement) {
      // Aqui você pode adicionar lógica para inicializar o Zoiper e configurar o plugin
      zoiperElement.data = "data:application/x-zoiper-plugin"; // Exemplo de configuração de dados

      // Exemplo: Inicialização básica do Zoiper
      zoiperElement.onload = () => {
        // Aqui você pode acessar métodos do Zoiper após carregar
        const zoiper = (zoiperElement as any).contentWindow?.Zoiper; // Exemplo de acesso ao objeto Zoiper

        if (zoiper) {
          // Exemplo de uso de método Zoiper (Dial)
          zoiper.Dial("+15551234567");
        }
      };
    }
  }, []);

  return (
    <object
      ref={zoiperRef}
      id="ZoiperN"
      data="data:application/x-zoiper-plugin"
      type="application/x-zoiper-plugin"
      width="434"
      height="236"
      style={{ display: "none" }}
    ></object>
  );
};

export default ZoiperComponent;
