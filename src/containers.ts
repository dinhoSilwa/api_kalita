// src/container.ts
import { FormService } from './services/FormService';
import { PrismaServiceFormRepository } from './repositories/implementations/PrismaServiceFormRepository';
import type { IServiceFormRepository } from './repositories/interfaces/IserviceFormsRepositoty';

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

const formRepository: IServiceFormRepository = new PrismaServiceFormRepository();
const formService = new FormService(formRepository);

container.register('IFormRepository', formRepository);
container.register('FormService', formService);