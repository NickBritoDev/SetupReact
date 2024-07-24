import { AutocontratacaoContext, getDefaultContext } from "./context/context";
import AutocontracaoBody from "./autocontracaoBody";

export default function AutocontratacaoFgts() {
  return (
    <AutocontratacaoContext.Provider value={getDefaultContext()}>
      <AutocontracaoBody />
    </AutocontratacaoContext.Provider>
  );
}
