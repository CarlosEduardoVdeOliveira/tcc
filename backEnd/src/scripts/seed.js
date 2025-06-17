import bcrypt from 'bcryptjs';
import config from '../config/app.js';
import database from '../config/database.js';
import logger from '../utils/logger.js';

const seedDatabase = async () => {
  try {
    await database.connect();
    const prisma = database.getClient();

    logger.info('🌱 Iniciando seed do banco de dados...');

    // Limpa o banco de dados
    await prisma.disease.deleteMany();
    await prisma.food.deleteMany();
    await prisma.temperaturesHumidity.deleteMany();
    await prisma.productionHoney.deleteMany();
    await prisma.activity.deleteMany();
    await prisma.beehive.deleteMany();
    await prisma.producer.deleteMany();

    // Cria produtores de exemplo
    const hashedPassword = await bcrypt.hash('senha123', config.security.bcryptRounds);

    const producer1 = await prisma.producer.create({
      data: {
        name: 'João Silva',
        email: 'joao.silva@apiario.com',
        password: hashedPassword,
        cpfCnpj: '123.456.789-00',
        longitude: -46.6388,
        latitude: -23.5489,
        startDate: new Date('2020-01-15'),
        status: 'Ativo',
      },
    });

    const producer2 = await prisma.producer.create({
      data: {
        name: 'Maria Santos',
        email: 'maria.santos@apiario.com',
        password: hashedPassword,
        cpfCnpj: '987.654.321-00',
        longitude: -46.6333,
        latitude: -23.5505,
        startDate: new Date('2019-06-20'),
        status: 'Ativo',
      },
    });

    // Cria colmeias de exemplo
    const beehive1 = await prisma.beehive.create({
      data: {
        producerId: producer1.id,
        name: 'Colmeia A1',
        longitude: -46.6388,
        latitude: -23.5489,
        startDate: new Date('2020-02-01'),
        status: 'Ativa',
        typeBeehive: 'Langstroth',
        observations: 'Colmeia principal do apiário',
      },
    });

    const beehive2 = await prisma.beehive.create({
      data: {
        producerId: producer1.id,
        name: 'Colmeia A2',
        longitude: -46.6385,
        latitude: -23.5485,
        startDate: new Date('2020-02-15'),
        status: 'Ativa',
        typeBeehive: 'Langstroth',
        observations: 'Colmeia secundária',
      },
    });

    const beehive3 = await prisma.beehive.create({
      data: {
        producerId: producer2.id,
        name: 'Colmeia B1',
        longitude: -46.6333,
        latitude: -23.5505,
        startDate: new Date('2019-07-01'),
        status: 'Ativa',
        typeBeehive: 'Dadant',
        observations: 'Primeira colmeia do produtor 2',
      },
    });

    // Cria atividades de exemplo
    await prisma.activity.createMany({
      data: [
        {
          beehiveId: beehive1.id,
          dateActivity: new Date('2024-01-15'),
          typeActivity: 'Inspeção',
          descriptions: 'Verificação geral da colmeia',
          observations: 'Colmeia saudável, população forte',
        },
        {
          beehiveId: beehive1.id,
          dateActivity: new Date('2024-01-20'),
          typeActivity: 'Colheita',
          descriptions: 'Colheita de mel',
          observations: 'Boa produção de mel',
        },
        {
          beehiveId: beehive2.id,
          dateActivity: new Date('2024-01-18'),
          typeActivity: 'Alimentação',
          descriptions: 'Suplementação com xarope',
          observations: 'Aceitação boa do alimento',
        },
      ],
    });

    // Cria produções de mel de exemplo
    await prisma.productionHoney.createMany({
      data: [
        {
          beehiveId: beehive1.id,
          dateCollection: new Date('2024-01-20'),
          amount: 15.5,
          quality: 'Excelente',
          observations: 'Mel claro e saboroso',
        },
        {
          beehiveId: beehive2.id,
          dateCollection: new Date('2024-01-25'),
          amount: 12.0,
          quality: 'Boa',
          observations: 'Produção dentro do esperado',
        },
      ],
    });

    // Cria medições de temperatura e umidade
    await prisma.temperaturesHumidity.createMany({
      data: [
        {
          beehiveId: beehive1.id,
          dateMeasurement: new Date('2024-01-15T10:00:00Z'),
          internalTemperature: 35.5,
          externalTemperature: 28.0,
          humidityInternal: 65.0,
          humidityExternal: 70.0,
        },
        {
          beehiveId: beehive1.id,
          dateMeasurement: new Date('2024-01-15T14:00:00Z'),
          internalTemperature: 36.2,
          externalTemperature: 32.0,
          humidityInternal: 60.0,
          humidityExternal: 55.0,
        },
      ],
    });

    // Cria alimentações de exemplo
    await prisma.food.createMany({
      data: [
        {
          beehiveId: beehive2.id,
          dateFeeding: new Date('2024-01-18'),
          typeFood: 'Xarope de açúcar',
          amount: 2.0,
          observations: 'Suplementação para fortalecimento',
        },
        {
          beehiveId: beehive3.id,
          dateFeeding: new Date('2024-01-22'),
          typeFood: 'Pólen',
          amount: 0.5,
          observations: 'Suplementação proteica',
        },
      ],
    });

    // Cria doenças de exemplo
    await prisma.disease.createMany({
      data: [
        {
          beehiveId: beehive1.id,
          dateDiagnosis: new Date('2024-01-10'),
          diseasePrague: 'Varroa',
          treatment: 'Aplicação de acaricida',
          observations: 'Infestação leve, tratamento preventivo',
        },
      ],
    });

    logger.info('✅ Seed do banco de dados concluído com sucesso!');
    logger.info(`📊 Dados criados:`);
    logger.info(`   - 2 produtores`);
    logger.info(`   - 3 colmeias`);
    logger.info(`   - 3 atividades`);
    logger.info(`   - 2 produções de mel`);
    logger.info(`   - 2 medições de temperatura/umidade`);
    logger.info(`   - 2 alimentações`);
    logger.info(`   - 1 doença`);

    // Credenciais de teste
    logger.info('🔑 Credenciais de teste:');
    logger.info('   Email: joao.silva@apiario.com');
    logger.info('   Senha: senha123');
    logger.info('   Email: maria.santos@apiario.com');
    logger.info('   Senha: senha123');

  } catch (error) {
    logger.error('❌ Erro durante o seed:', error);
    process.exit(1);
  } finally {
    await database.disconnect();
  }
};

seedDatabase(); 