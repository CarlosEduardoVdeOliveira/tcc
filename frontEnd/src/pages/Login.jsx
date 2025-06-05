import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Container } from "../components/Container";
import { Footer } from "../components/Footer";
import { GroupInput } from "../components/GroupInput";
import { AuthContext } from "../contexts/auth";

export function Login() {
  const [viewPassword, setViewPassword] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const result = await signin(email, password);
    if (result.success) {
      navigate("/colmeias");
    } else {
      alert(result.message);
    }
  };

  return (
    <Container>
      <div className="flex flex-col m-auto p-8 gap-4 sm:w-[50%] w-full">
        <h3 className="text-center font-semibold mb-8">
          Já tem conta? Faça seu login:
        </h3>
        <GroupInput
          label="E-mail"
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu e-mail"
        />
        <GroupInput
          label="Senha"
          id="password"
          type={viewPassword ? "password" : "text"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite sua senha"
          icon={
            viewPassword ? (
              <EyeClosedIcon onClick={() => setViewPassword((v) => !v)} />
            ) : (
              <EyeIcon onClick={() => setViewPassword((v) => !v)} />
            )
          }
        />
        <Button className="mt-8 mb-8" onClick={handleLogin}>
          Entrar
        </Button>
      </div>
      <Footer />
    </Container>
  );
}
