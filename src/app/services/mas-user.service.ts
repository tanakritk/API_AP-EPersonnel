import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  CreateMasterUserDto,
  CreateRelationMasterUserDto,
  UpdateMasterUserDto,
  UpdatePasswordDto,
} from '../dto/mas-user.dto';
import { MasterUserRepo } from '../repositories/mas-user.repo';
import { configDotenv } from 'dotenv';
configDotenv({ path: '.env' });

@Injectable()
export class MasterUserService {
  constructor(
    private masterUserRepo: MasterUserRepo,
    private authService: AuthService,
  ) {}

  async search(body: any) {
    const result = await this.masterUserRepo.findData(body);
    const mapNotPassword = result.data.map((item) => {
      const { password, ...rest } = item;
      return rest;
    });
    return { data: mapNotPassword, totalItem: result.totalItem };
  }

  async create(body: CreateMasterUserDto) {
    body.password = await this.authService.hashPassword(body.password);
    const checkUsername = await this.masterUserRepo.findByUsername(
      body.username,
    );
    if (checkUsername) {
      throw new InternalServerErrorException('username นี้มีผู้ใช้งานแล้ว');
    }
    const result = await this.masterUserRepo.save(body);
    return result;
  }

  async update(body: UpdateMasterUserDto, Id: number) {
    const resultCheck = await this.masterUserRepo.getItemById(Id);
    if (!resultCheck) {
      throw new InternalServerErrorException('Data not found');
    }
    const { username, password, ...req } = body;
    Object.assign(resultCheck, req);
    return await this.masterUserRepo.save(resultCheck);
  }

  async delete(id: number) {
    const resultCheck = await this.masterUserRepo.getItemById(id);
    if (!resultCheck) {
      throw new InternalServerErrorException('Data not found');
    }
    return await this.masterUserRepo.softDelete(id);
  }

  async resetPassword(id: number) {
    const resultCheck = await this.masterUserRepo.getItemById(id);
    if (!resultCheck) {
      throw new InternalServerErrorException('Data not found');
    }
    const newPassword = process.env.APP_DEFAULT_PASSWORD;
    resultCheck.password = await this.authService.hashPassword(newPassword);
    resultCheck.isRefactorPassword = false;
    return await this.masterUserRepo.save(resultCheck);
  }

  async updatePassword(body: UpdatePasswordDto, id: number) {
    const resultCheck = await this.masterUserRepo.getItemById(id);
    if (!resultCheck) {
      throw new InternalServerErrorException('Data not found');
    }
    resultCheck.password = await this.authService.hashPassword(body.password);
    resultCheck.isRefactorPassword = true;
    return await this.masterUserRepo.save(resultCheck);
  }

  async createRelation(body: CreateRelationMasterUserDto) {
    const checkUsername = await this.masterUserRepo.findByUsername(
      body.username,
    );
    if (checkUsername) {
      throw new InternalServerErrorException('username นี้มีผู้ใช้งานแล้ว');
    }
    const userInstance = await this.masterUserRepo.createInstanceModel(body);
    const newPassword = process.env.APP_DEFAULT_PASSWORD;
    userInstance.password = await this.authService.hashPassword(newPassword);
    return await this.masterUserRepo.save(userInstance);
  }

  async updateRelation(id: number, body: UpdateMasterUserDto) {
    const resultCheck = await this.masterUserRepo.findCondition({
      where: { id: id },
      relations: ['mate', 'child'],
    });
    console.log(resultCheck);
    if (!resultCheck) throw new InternalServerErrorException('Data not found');
    const { username, password, ...req } = body;
    Object.assign(resultCheck[0], req);
    return await this.masterUserRepo.save(resultCheck);
  }
}
