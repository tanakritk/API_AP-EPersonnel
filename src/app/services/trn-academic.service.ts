import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AcademicRepo } from '../repositories/trn-academic.repo';
import { BaseSearchDto } from '../dto/base-search.dto';
import { CreateAcademicDto, UpdateAcademicDto } from '../dto/trn-academic.dto';

@Injectable()
export class AcademicService {
  constructor(private readonly academicRepo: AcademicRepo) {}

  async search(body: BaseSearchDto) {
    return await this.academicRepo.findData(body);
  }

  async create(body: CreateAcademicDto) {
    const { userId, ...newData } = body;
    const resultData = await this.academicRepo.findCondition({
      where: {
        mas_user: { id: userId },
      },
    });
    if (resultData.length > 0) {
      for (let i = 0; i < resultData.length; i++) {
        const data = {
          ...resultData[i],
          isActive: false,
        };
        Object.assign(resultData[i], data);
        await this.academicRepo.save(resultData[i]);
      }
    }
    const modelSave = {
      ...newData,
      isActive: true,
      mas_user: { id: userId },
    };
    return await this.academicRepo.save(modelSave);
  }

  async update(id: number, body: UpdateAcademicDto) {
    const check = await this.academicRepo.findCondition({
      where: {
        id: id,
      },
      relations: {
        mas_user: true,
      },
    });
    if (check.length === 0) {
      throw new InternalServerErrorException('data not found');
    }

    if (body.isActive === true) {
      const resultData = await this.academicRepo.findCondition({
        where: {
          mas_user: { id: check[0].mas_user.id },
        },
      });
      if (resultData.length > 0) {
        for (let i = 0; i < resultData.length; i++) {
          const data = {
            ...resultData[i],
            isActive: false,
          };
          Object.assign(resultData[i], data);
          await this.academicRepo.save(resultData[i]);
        }
      }
    }

    Object.assign(check[0], body);
    return await this.academicRepo.save(check[0]);
  }

  async delete(id: number) {
    const check = await this.academicRepo.getItemById(id);
    if (!check) {
      throw new InternalServerErrorException('data not found');
    }

    return await this.academicRepo.softDelete(id);
  }
}
