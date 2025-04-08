import { Container } from "../components/Container";
import { CardAdd } from "../components/CardAdd";
import { Footer } from "../components/Footer";

export function Beehives(){
  return(
    <Container>
      <div className="m-auto">
        <h3 className="text-center font-bold text-4xl">Minhas colmeias</h3>
        <div>
          <CardAdd />
        </div>
      </div>
      <Footer />
    </Container>
  )
}