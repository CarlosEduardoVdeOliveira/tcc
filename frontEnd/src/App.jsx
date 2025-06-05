import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { PrivateRoute } from "./components/PrivateRoute";
import { AuthProvider } from "./contexts/auth";
import { BeehiveDetails } from "./pages/BeehiveDetails";
import { Beehives } from "./pages/Beehives";
import { CreateAccount } from "./pages/CreateAccount";
import { CreateBeehive } from "./pages/CreateBeehive";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Profile } from "./pages/Profile";
import { UpdateBeehive } from "./pages/UpdateBeehive";
import { UpdateProfile } from "./pages/updateProfile";
const token = localStorage.getItem("user_token");
//const user = localStorage.getItem("user");

export function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={token ? <Beehives /> : <Home />} />
            <Route path="/perfil" element={<Profile />} />
            <Route path="/atualizar_perfil/:id" element={<UpdateProfile />} />
            <Route path="/criar_conta" element={<CreateAccount />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/colmeias"
              element={
                <PrivateRoute>
                  <Beehives />
                </PrivateRoute>
              }
            />
            <Route path="/cadastrar_colmeia" element={<CreateBeehive />} />
            <Route path="/colmeia/:id" element={<BeehiveDetails />} />
            <Route path="/atualizar_colmeia/:id" element={<UpdateBeehive />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}
