import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MasterStatusLeave } from 'src/database/entities/mas-status-leave.entity';
import { Repository } from 'typeorm';
import { filterFunction } from 'src/helpers/function-filter';

@Injectable()
export class MasterStatusLeaveRepo {
  constructor(
    @InjectRepository(MasterStatusLeave)
    private readonly repo: Repository<MasterStatusLeave>,
  ) {}

  async getItemById(id: number) {
    try {
      return await this.repo.findOne({ where: { id } });
    } catch (err) {
      throw new InternalServerErrorException(err.message + err?.query);
    }
  }

  async findData(body: any) {
    try {
      const { conditionValue, relationValue, sortingValue } =
        await filterFunction(body);
      const [data, count] = await this.repo.findAndCount({
        relations: relationValue,
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

  async findCondition(body: any) {
    try {
      return await this.repo.find(body);
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
