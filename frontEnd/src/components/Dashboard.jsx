import { useState } from "react";
import { SectionListWithActions } from "./SectionListWithActions";
import { Modal } from "./Modal";
import { FormActivity } from "./forms/FormActivity";
import { FormDisease } from "./forms/FormDisease";
import { FormProductionHoney } from "./forms/FormProductionHoney";
import { FormFood } from "./forms/FormFood";
import { FormTemperatureHumidity } from "./forms/FormTemperatureHumidity";

export function Dashboard() {
  const [openModal, setOpenModal] = useState(null);
  const handleOpenModal = (section) => setOpenModal(section);
  const handleCloseModal = () => setOpenModal(null);
  return (
    <>
      <SectionListWithActions title="Atividade" onAdd={handleOpenModal}>
        {/* conteúdo */}
      </SectionListWithActions>

      <SectionListWithActions title="Doenças/Pragas" onAdd={handleOpenModal}>
        {/* conteúdo */}
      </SectionListWithActions>

      <Modal
        open={openModal !== null}
        onClose={handleCloseModal}
        title={`Adicionar ${openModal}`}
      >
        {openModal === "Atividade" && <FormActivity />}
        {openModal === "Doenças/Pragas" && <FormDisease />}
        {openModal === "Produtos" && <FormProductionHoney />}
        {openModal === "Comidas" && <FormFood />}
        {openModal === "Temperatura e Umidade" && <FormTemperatureHumidity />}
      </Modal>
    </>
  );
}
