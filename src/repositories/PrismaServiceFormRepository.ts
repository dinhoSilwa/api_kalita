// src/repositories/implementations/PrismaServiceFormRepository.ts
import { prisma } from '../db/prisma';
import type { ServiceFormInput } from '../schemas/Form.schema';
import type { IServiceFormRepository, PaginationParams } from '../interfaces/service-forms/IserviceFormsRepositoty';

export class PrismaServiceFormRepository implements IServiceFormRepository {
  async create(data: ServiceFormInput) {
    return await prisma.serviceForm.create({
      data: {
        ...data,
        phone: this.cleanPhone(data.phone),
        status: data.status || 'pending',
        assigned_photographer: data.assigned_photographer || null,
      },
    });
  }

  async findById(id: string) {
    return await prisma.serviceForm.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string) {
    return await prisma.serviceForm.findMany({
      where: { email },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: string, data: Partial<ServiceFormInput>) {
    return await prisma.serviceForm.update({
      where: { id },
      data: {
        ...data,
        ...(data.phone && { phone: this.cleanPhone(data.phone) }),
      },
    });
  }

  async delete(id: string) {
    await prisma.serviceForm.delete({
      where: { id },
    });
  }

  async findAll(params?: PaginationParams) {
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const skip = (page - 1) * limit;

    return await prisma.serviceForm.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });
  }

  private cleanPhone(phone: string): string {
    return phone.replace(/\D/g, '');
  }
}