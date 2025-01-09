import { appConfig } from 'shared/constants/appConfig';

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

class Logger {
  private static instance: Logger;
  private isDevelopment: boolean;

  private constructor() {
    this.isDevelopment = process.env.NODE_ENV !== 'production';
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private formatMessage(level: LogLevel, message: string, data?: Record<string, unknown>): string {
    const timestamp = new Date().toISOString();
    const appName = appConfig.name;
    return `[${timestamp}] [${appName}] [${level.toUpperCase()}] ${message}${
      data ? '\n' + JSON.stringify(data, null, 2) : ''
    }`;
  }

  private log(level: LogLevel, message: string, data?: Record<string, unknown>) {
    const formattedMessage = this.formatMessage(level, message, data);
    
    switch (level) {
      case 'info':
        console.info(formattedMessage);
        break;
      case 'warn':
        console.warn(formattedMessage);
        break;
      case 'error':
        console.error(formattedMessage);
        break;
      case 'debug':
        if (this.isDevelopment) {
          console.debug(formattedMessage);
        }
        break;
    }
  }

  public info(message: string, data?: Record<string, unknown>) {
    this.log('info', message, data);
  }

  public warn(message: string, data?: Record<string, unknown>) {
    this.log('warn', message, data);
  }

  public error(message: string, data?: Record<string, unknown>) {
    this.log('error', message, data);
  }

  public debug(message: string, data?: Record<string, unknown>) {
    this.log('debug', message, data);
  }
}

export const logger = Logger.getInstance();