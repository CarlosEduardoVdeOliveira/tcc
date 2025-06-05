"use client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBeehives } from "../api/beehiveApi.js";
import { CardAdd } from "../components/CardAdd";
import { CardBeehive } from "../components/CardBeehive";
import { Container } from "../components/Container";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header.jsx";

export function Beehives() {
  const [beehives, setBeehives] = useState([]);
  const getUser = localStorage.getItem("user");
  const userId = JSON.parse(getUser)?.id;
  const user_token = localStorage.getItem("user_token")

  useEffect(() => {
    if (!userId) {
      return <Navigate to="/login" />;
    }
    async function fetchBeehives() {
      try {
        const response = await getBeehives({
          headers: {
            Authorization: `Bearer ${user_token}`,
          },
        });
        // Só pega as colmeias do produtor atual
        const userBeehives = response.data.filter(
          (b) => b.producerId === userId
        );
        setBeehives(userBeehives);
      } catch (err) {
        console.error("Erro ao carregar colmeias:", err);
      }
    }

    fetchBeehives();
  }, [userId, user_token]);

  return (
    <>
      <Header pathName="/" />
      <Container>
        <div className="m-auto">
          <h3 className="text-center font-bold text-4xl">Minha(s) colmeia(s)</h3>
          <div className="flex flex-wrap items-center justify-center gap-2 p-4">
            {/* beehives.length === 0 ? <p>Não à colmeia(s) cadastrada(s).</p> : */beehives.map((beehive) => (
              <Link key={beehive.id} to={`/colmeia/${beehive.id}`}>
                <CardBeehive
                  beehive={beehive}
                  latitude={beehive.latitude}
                  longitude={beehive.longitude}
                />
              </Link>
            ))}
            <CardAdd />
          </div>
        </div>
        <Footer />
      </Container>
    </>
  );
}
