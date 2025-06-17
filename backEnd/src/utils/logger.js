import config from '../config/app.js';

class Logger {
  constructor() {
    this.isDevelopment = config.nodeEnv === 'development';
  }

  info(message, data = {}) {
    this.log('INFO', message, data);
  }

  error(message, error = null) {
    this.log('ERROR', message, { error: error?.message || error, stack: error?.stack });
  }

  warn(message, data = {}) {
    this.log('WARN', message, data);
  }

  debug(message, data = {}) {
    if (this.isDevelopment) {
      this.log('DEBUG', message, data);
    }
  }

  // Função para serializar objetos com BigInt
  serializeData(data) {
    return JSON.stringify(data, (key, value) => {
      if (typeof value === 'bigint') {
        return value.toString();
      }
      return value;
    }, 2);
  }

  log(level, message, data) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      message,
      ...data,
    };

    // Usa process.stdout.write para evitar warnings do ESLint
    const logMessage = this.isDevelopment
      ? `[${timestamp}] ${level}: ${message} ${this.serializeData(data)}\n`
      : `${this.serializeData(logEntry)}\n`;

    process.stdout.write(logMessage);
  }
}

export default new Logger(); 