import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Leave } from 'src/database/entities/trn-leave.entity';
import { Repository } from 'typeorm';
import { filterFunction } from 'src/helpers/function-filter';

@Injectable()
export class LeaveRepo {
  constructor(
    @InjectRepository(Leave)
    private readonly repo: Repository<Leave>,
  ) {}

  async getItemById(id: number) {
    try {
      return await this.repo.findOne({
        where: { id },
        relations: ['mas_user', 'mas_statusleave'],
      });
    } catch (err) {
      throw new InternalServerErrorException(err.message + err?.query);
    }
  }

  async findData(body: any) {
    try {
      const { conditionValue, relationValue, sortingValue } =
        await filterFunction(body);
      const [data, count] = await this.repo.findAndCount({
        relations: relationValue || ['mas_user', 'mas_statusleave'],
        where: conditionValue,
        order: sortingValue,
        skip: (body.page - 1) * body.limit,
        take: body.limit,
      });
      return { data, totalItem: count };
    } catch (err) {
      throw new InternalServerErrorException(err.message + err?.query);
    }
  }

  async findCondition(model: any) {
    try {
      return await this.repo.find(model);
    } catch (err) {
      throw new InternalServerErrorException(err.message + err?.query);
    }
  }

  async save(body: any) {
    try {
      return await this.repo.save(body);
    } catch (err) {
      throw new InternalServerErrorException(err.message + err?.query);
    }
  }

  async softDelete(Id: number) {
    try {
      return await this.repo.softDelete(Id);
    } catch (err) {
      throw new InternalServerErrorException(err.message + err?.query);
    }
  }
}
