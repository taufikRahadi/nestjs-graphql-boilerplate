import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AgamaEntity } from "src/entities/agama.entity";
import { isCanDeleteData, isCanGetData } from "src/infrastructure/utils/check-arg";
import { internalServerError } from "src/infrastructure/utils/exception";
import { Repository } from "typeorm";
import { AgamaPayload } from "./agama.payload";

@Injectable()
export class AgamaService {

  constructor(
    @InjectRepository(AgamaEntity) private readonly agamaRepo: Repository<AgamaEntity>
  ) { }

  public async findAll(paginate?: any): Promise<AgamaEntity[]> {
    try {
      const allAgama = this.agamaRepo.find(paginate)
      return allAgama
    } catch ({ message }) {
      internalServerError(message)
    }
  }

  public async findOne(id: number): Promise<AgamaEntity> {
    try {
      const agama = await this.agamaRepo.findOne(id)
      isCanGetData(agama, id)
      return agama
    } catch ({ message }) {
      internalServerError(message)
    }
  }

  public async searchOrFilter(payload: any): Promise<AgamaEntity[]> {
    try {
      const agama = this.agamaRepo.find({
        where: payload
      })
      return agama
    } catch ({ message }) {
      internalServerError(message)
    }
  }

  public async createAgama(agama: AgamaPayload): Promise<AgamaEntity> {
    try {
      const newAgama = this.agamaRepo.save({ ...agama })
      return newAgama
    } catch ({ message }) {
      internalServerError(message)
    }
  }

  public async updateAgama(agamaPayload: AgamaPayload, id: number): Promise<AgamaEntity> {
    try {
      const agama = await this.findOne(id)
      isCanGetData(agama, id)
      return this.agamaRepo.save({
        ...agama, ...agamaPayload
      })
    } catch ({ message }) {
      internalServerError(message)
    }
  }
  
  public async softDeleteAgama(id: number): Promise<Boolean> {
    try {
      const agama = await this.agamaRepo.softDelete(id)
      isCanDeleteData(agama, id)
      return true
    } catch ({ message }) {
      internalServerError(message)
    }
  }

}
