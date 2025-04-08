import { Button } from "../components/Button";
import { Container } from "../components/Container";
import { Footer } from "../components/Footer";
import {useNavigate} from "react-router-dom"
import ImgHero from "../assets/imgHero.png"

export function Home(){
  const navigate = useNavigate()
  const goTo = (route) => {
    navigate(route)
  }
  return(
    <Container>
        <div className="flex my-9 mx-auto flex-col justify-center items-center gap-2 max-w-[500px]">
          <div className="text-center mb-12">
            <h1 className="text-2xl font-bold ">Boas-vindas!</h1>
            <p>
              A sua plataforma de gerenciamento das suas colmeias.
            </p>
          </div>
          <div className="flex flex-col gap-2 w-full mb-5 px-8">
          <Button className="bg-yellow-500 w-full py-2 px-5 rounded-md text-brown-500 cursor-pointer font-semibold hover:bg-yellow-600" onClick={()=>goTo("/login")}>Já tenho conta</Button>
          <Button onClick={()=>goTo("/createAccount")}>Quero me cadastrar</Button>
          </div>
          <img className="w-[250px]" src={ImgHero} alt="Hero platform" />
        </div>
        <Footer />
      </Container>
  );
}