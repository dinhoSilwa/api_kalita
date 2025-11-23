// src/container.ts
import { FormService } from './services/service-form/FormService';
import { PrismaServiceFormRepository } from './repositories/PrismaServiceFormRepository';
import type { IServiceFormRepository } from './interfaces/service-forms/IserviceFormsRepositoty';
import type { IStoragePortifolioRepository } from './interfaces/portifolio-upload/IStorageRepository';
import { CloudinaryRepository } from './repositories/CloudinaryRepository ';
import { PortfolioUploadService } from './services/portifolio-upload/portifolioUploadService';

class Container {
  private instances = new Map();

  register<T>(key: string, instance: T): void {
    this.instances.set(key, instance);
  }

  resolve<T>(key: string): T {
    const instance = this.instances.get(key);
    if (!instance) {
      throw new Error(`Service ${key} not found in container`);
    }
    return instance;
  }
}

export const container = new Container();


// Configuração dos Services de Formulário
const formRepository: IServiceFormRepository = new PrismaServiceFormRepository();
const formService = new FormService(formRepository);

// Configuração dos Services de Upload de Portfólio
const portfolioUploadRepository: IStoragePortifolioRepository = new CloudinaryRepository();
const portfolioUploadService = new PortfolioUploadService(portfolioUploadRepository);

container.register('IServiceFormRepository', formRepository);
container.register('FormService', formService);

container.register('IStoragePortifolioRepository', portfolioUploadRepository);
container.register('PortfolioUploadService', portfolioUploadService);