import {Container} from "../components/Container"
import {GroupInput} from "../components/GroupInput"
import { Footer } from "../components/Footer"
import { Button } from "../components/Button"
import { EyeIcon, EyeClosedIcon } from "lucide-react"
import {Link, useNavigate} from "react-router-dom"
import {useState} from "react"

export function CreateAccount(){
  const [viewPassword, setViewPassword] = useState(true);
  const view = ()=>{
    setViewPassword(prev => !prev)
  }
  const navigate = useNavigate()
  const goTo = (route) => {
    navigate(route)
  }
  return(
    <Container>
      <div className="p-8 w-full" />
      <div className="flex flex-col gap-4 m-auto sm:w-[50%] w-full">
        <h3 className="text-center"><strong>Ainda não tem cadastro?</strong><br/>
        Comece hoje a gerenciar suas colmeias, precisamos de alguns dados:</h3>
        <GroupInput 
          label="Nome" 
          id="name" 
          placeholder="Digite seu nome." 
          icon={false} />
        <GroupInput 
          label="CPF/CNPJ" 
          id="cpfCnpj" 
          placeholder="Digite seu CPF ou CNPJ" 
          icon={false} />
        <GroupInput 
          label="Senha"
          type={viewPassword ? "password" : "text"}
          id="password"
          placeholder="Digite uma senha."
          icon={viewPassword ? <EyeClosedIcon onClick={view}/> : <EyeIcon onClick={view} />} />
        <GroupInput 
          label="Repita a senha"
          type={viewPassword ? "password" : "text"}
          id="repeatPassword" placeholder="Repita a senha."
          icon={viewPassword ? <EyeClosedIcon onClick={view}/> : <EyeIcon onClick={view} />} />
        <Button className="mt-8 mb-4" onClick={()=>goTo("/beehives")}>Cadastrar</Button>
        <span className="text-center mb-8">Já tenho conta,{" "}
          <Link className="font-semibold underline cursor-pointer hover:text-yellow-600" 
            to={"/login"}
          >
            fazer login?
          </Link>
        </span>
      </div>
      <Footer />
    </Container>
  )
}