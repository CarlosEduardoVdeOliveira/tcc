import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { Container } from "../components/Container";
import { GroupInput } from "../components/GroupInput";
import { Button } from "../components/Button";
import { Footer } from "../components/Footer";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";

export function Login(){
  const [viewPassword, setViewPassword] = useState(true);
  function view(){
    setViewPassword(prev => !prev)
  }
  const navigate = useNavigate()
  const goTo = (route) => {
    navigate(route)
  }
  return (
    <Container>
      
      <div className="flex flex-col m-auto p-8 gap-4 sm:w-[50%] w-full">
        <h3 className="text-center font-semibold mb-8">Já tem conta? Faça seu login:</h3>
        <GroupInput label="CPF/CNPJ"
          id="cpfCnpj"
          type="text"
          placeholder="Digite seu CPF ou CNPJ"
          icon={false}
        />
        <GroupInput label="Senha"
          id="password"
          placeholder="Digite sua senha"
          type={viewPassword?"password":"text"}
          icon={viewPassword ? <EyeClosedIcon onClick={view}/> : <EyeIcon onClick={view} />}
        />
        <Button className="mt-8 mb-8" onClick={() => goTo("/beehives")}>Entrar</Button>
        <div className="text-center">
          <span className="text-center">Não tenho conta,{" "}
            <Link className="font-semibold underline cursor-pointer hover:text-yellow-600" 
              to={"/createAccount"}
              >
              criar conta?
            </Link>
          </span>
          <br />
          <span className="text-center">Esqueci a senha,{" "}
            <Link className="font-semibold underline cursor-pointer hover:text-yellow-600" 
              to={"#"}
              >
              recuperar senha?
            </Link>
          </span>
            </div>
      </div>
      <Footer />
    </Container>
  );
}