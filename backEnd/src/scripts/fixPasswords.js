import bcrypt from "bcryptjs";
import database from "../config/database.js";

async function fixPasswords() {
  await database.connect();
  const prisma = database.getClient();

  const users = await prisma.producer.findMany();
  for (const user of users) {
    if (!user.password.startsWith("$2")) {
      // Senha em texto puro, precisa ser hasheada
      const hashed = await bcrypt.hash(user.password, 10);
      await prisma.producer.update({
        where: { id: user.id },
        data: { password: hashed }
      });
      console.log(`Senha do usuário ${user.email} atualizada para hash bcrypt.`);
    }
  }
  await database.disconnect();
  console.log("Processo finalizado.");
  process.exit(0);
}

fixPasswords(); 