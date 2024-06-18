import {
  Button,
  Checkbox,
  Flex,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { FcClearFilters, FcFilledFilter } from "react-icons/fc";
import { useMobile } from "../../../../helpers/responsividade/useMediaQuery";
import ferramentasData from "../../../../json/marketplace/data.json";
import { FiltrosType } from "../types/types";

export default function FiltrosComponent({ onApplyFilters }: FiltrosType) {
  const [selectedFerramentas, setSelectedFerramentas] = useState(
    ferramentasData.map((f) => f.ferramenta),
  );
  const [selectedStatus, setSelectedStatus] = useState([
    "Inativos",
    "Ativos",
    "Expirados",
  ]);
  const [selectedGrupos, setSelectedGrupos] = useState([
    "Sem grupo de confiança",
    "Com grupo de confiança",
  ]);
  const [showLimparFiltros, setShowLimparFiltros] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);

  const handleApplyFilters = () => {
    onApplyFilters({
      ferramentas: selectedFerramentas,
      status: selectedStatus,
      grupos: selectedGrupos,
    });
    setShowLimparFiltros(true);
    onClose();
  };

  const handleClearFilters = () => {
    setSelectedFerramentas(ferramentasData.map((f) => f.ferramenta));
    setSelectedStatus(["Inativos", "Ativos", "Expirados"]);
    setSelectedGrupos(["Sem grupo de confiança", "Com grupo de confiança"]);
    setShowLimparFiltros(false);
    onApplyFilters({
      ferramentas: [],
      status: [],
      grupos: [],
    });
  };

  return (
    <>
      <Button
        ref={btnRef}
        onClick={onOpen}
        _hover={{ backgroundColor: "green", color: "white" }}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={2}
      >
        <Text display={useMobile() ? "none" : ""}>Filtros</Text>
        <FcFilledFilter size={22} />
      </Button>

      <Button
        _hover={{ backgroundColor: "red", color: "white" }}
        display={showLimparFiltros ? "flex" : "none"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={2}
        onClick={handleClearFilters}
      >
        <Text display={useMobile() ? "none" : ""}>Limpar filtros</Text>
        <FcClearFilters size={22} />
      </Button>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            Realize seus filtros para melhor visualização
          </DrawerHeader>

          <DrawerBody>
            <Flex flexDir={"column"} gap={4}>
              <Flex flexDir={"column"}>
                <Text fontSize={18} fontWeight={"semibold"}>
                  Ferramentas
                </Text>
                <Stack mt={2} spacing={2} direction="column">
                  {ferramentasData.map((ferramenta) => (
                    <Checkbox
                      key={ferramenta.ferramenta}
                      colorScheme="green"
                      isChecked={selectedFerramentas.includes(
                        ferramenta.ferramenta,
                      )}
                      onChange={(e) => {
                        const newSelection = e.target.checked
                          ? [...selectedFerramentas, ferramenta.ferramenta]
                          : selectedFerramentas.filter(
                              (f) => f !== ferramenta.ferramenta,
                            );
                        setSelectedFerramentas(newSelection);
                      }}
                    >
                      {ferramenta.ferramenta}
                    </Checkbox>
                  ))}
                </Stack>
              </Flex>

              <Flex flexDir={"column"}>
                <Text fontSize={18} fontWeight={"semibold"}>
                  Status
                </Text>
                <Stack mt={2} spacing={2} direction="column">
                  {["Inativos", "Ativos", "Expirados"].map((status) => (
                    <Checkbox
                      key={status}
                      colorScheme="green"
                      isChecked={selectedStatus.includes(status)}
                      onChange={(e) => {
                        const newSelection = e.target.checked
                          ? [...selectedStatus, status]
                          : selectedStatus.filter((s) => s !== status);
                        setSelectedStatus(newSelection);
                      }}
                    >
                      {status}
                    </Checkbox>
                  ))}
                </Stack>
              </Flex>

              <Flex flexDir={"column"}>
                <Text fontSize={18} fontWeight={"semibold"}>
                  Grupo de confiança
                </Text>
                <Stack mt={2} spacing={2} direction="column">
                  {["Sem grupo de confiança", "Com grupo de confiança"].map(
                    (grupo) => (
                      <Checkbox
                        key={grupo}
                        colorScheme="green"
                        isChecked={selectedGrupos.includes(grupo)}
                        onChange={(e) => {
                          const newSelection = e.target.checked
                            ? [...selectedGrupos, grupo]
                            : selectedGrupos.filter((g) => g !== grupo);
                          setSelectedGrupos(newSelection);
                        }}
                      >
                        {grupo}
                      </Checkbox>
                    ),
                  )}
                </Stack>
              </Flex>
            </Flex>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleApplyFilters} colorScheme="green">
              Salvar filtros
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
