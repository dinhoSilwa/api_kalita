// src/services/FormService.ts
import { NotFound } from '../../errors/customErros';
import type { IServiceFormRepository } from '../../interfaces/service-forms/IserviceFormsRepositoty';
import { ServiceFormInput } from '../../schemas/Form.schema';

export class FormService {
  constructor(private repository: IServiceFormRepository) {}

  async createServiceForm(data: ServiceFormInput) {
    return await this.repository.create(data);
  }

  async getFormById(id: string) {
    const form = await this.repository.findById(id);
    if (!form) {
      throw new NotFound('Formulário não encontrado');
    }
    return form;
  }

  async getFormsByEmail(email: string) {
    return await this.repository.findByEmail(email);
  }

  // async updateFormStatus(id: string, status: string, photographer?: string) {
  //   return await this.repository.update(id, {
  //     status,
  //     ...(photographer && { assigned_photographer: photographer }),
  //   });
  // }

  async getAllForms(page: number = 1, limit: number = 10) {
    return await this.repository.findAll({ page, limit });
  }
}