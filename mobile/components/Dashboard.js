import { useState } from "react";
import { FormActivity } from "./FormActivity";
import { FormDisease } from "./FormDisease";
import { FormFood } from "./FormFood";
import { FormProductionHoney } from "./FormProductionHoney";
import { FormTemperatureHumidity } from "./FormTemperatureHumidity";
import { Modal } from "./Modal";
import { SectionListWithActions } from "./SectionListWithActions";

function Dashboard() {
  const [openModal, setOpenModal] = useState(null);

  return (
    <>
      <SectionListWithActions title="Atividade" onAdd={setOpenModal} />
      <SectionListWithActions title="Doenças/Pragas" onAdd={setOpenModal} />

      <Modal
        visible={!!openModal}
        onClose={() => setOpenModal(null)}
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
export default Dashboard;
