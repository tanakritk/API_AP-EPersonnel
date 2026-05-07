import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InsigniaRepo } from '../repositories/trn-insignia.repo';
import { BaseSearchDto } from '../dto/base-search.dto';
import { CreateInsigniaDto, UpdateInsigniaDto } from '../dto/trn-insignia.dto';

@Injectable()
export class InsigniaService {
  constructor(private readonly insigniaRepo: InsigniaRepo) {}

  async search(body: BaseSearchDto) {
    return await this.insigniaRepo.findData(body);
  }

  async create(body: CreateInsigniaDto) {
    const { userId, ...newData } = body;
    const resultData = await this.insigniaRepo.findCondition({
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
        await this.insigniaRepo.save(resultData[i]);
      }
    }
    const modelSave = {
      ...newData,
      isActive: true,
      mas_user: { id: userId },
    };
    return await this.insigniaRepo.save(modelSave);
  }

  async update(id: number, body: UpdateInsigniaDto) {
    const check = await this.insigniaRepo.findCondition({
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
      const resultData = await this.insigniaRepo.findCondition({
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
          await this.insigniaRepo.save(resultData[i]);
        }
      }
    }

    Object.assign(check[0], body);
    console.log('check--> ', check[0]);
    return await this.insigniaRepo.save(check[0]);
  }

  async delete(id: number) {
    const check = await this.insigniaRepo.getItemById(id);
    if (!check) {
      throw new InternalServerErrorException('data not found');
    }

    return await this.insigniaRepo.softDelete(id);
  }
}
