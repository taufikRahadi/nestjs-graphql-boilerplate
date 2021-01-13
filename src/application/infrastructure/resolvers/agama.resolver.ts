import { Resolver, Query, Args, Int, Mutation } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { AgamaEntity } from "src/entities/agama.entity";
import { Repository } from "typeorm";
import { AgamaArg, AgamaPayload } from "../types/agama.payload";
import { PaginationPayload } from "../types/pagination.payload";
import { checkFilterArg, checkPagination, checkSearchArg, isCanDeleteData, isCanGetData } from "../utils/check-arg";

@Resolver(of => AgamaEntity)
export class AgamaResolver {

  constructor(
    @InjectRepository(AgamaEntity) private readonly agamaRepository: Repository<AgamaEntity>
  ) { }

  @Query(returns => [AgamaEntity], { name: 'getAllAgama' })
  async getAllAgama(
    @Args() paginationPayload: PaginationPayload 
  ) {
    return this.agamaRepository.find(checkPagination(paginationPayload))
  }

  @Query(returns => AgamaEntity, { name: 'getAgama' })
  async getAgama(
    @Args('id', { type: () => Int, nullable: false }) id: number
  ) {
    const agama = await this.agamaRepository.findOne(id);
    isCanGetData(agama, id)
    return agama
  }

  @Query(returns  => [AgamaEntity], { name: 'searchAgama' })
  async searchAgama(
    @Args() agamaPayload: AgamaArg
  ) {
    const where = checkSearchArg(agamaPayload);
    return this.agamaRepository.find({ where });
  }

  @Query(returns => [AgamaEntity], { name: 'filterAgama' })
  async filterAgama(@Args() agamaPayload: AgamaArg) {
    const where = checkFilterArg(agamaPayload);
    return this.agamaRepository.find({ where })
  }

  @Mutation(returns => AgamaEntity)
  async createAgama(
    @Args('agama', { type: () => AgamaPayload }) agamaPayload: AgamaPayload
  ) {
    return this.agamaRepository.save(agamaPayload)
  }

  @Mutation(returns => AgamaEntity)
  async updateAgama(
    @Args('agama', { type: () => AgamaPayload }) agamaPayload: AgamaPayload,
    @Args('id', { type: () => Int, nullable: false }) id: number
  ) {
    const update = await this.agamaRepository.findOne(id)
    isCanGetData(update, id)
    return this.agamaRepository.save({
      ...update, ...agamaPayload
    })
  }

  @Mutation(returns => Boolean)
  async deleteAgama(
    @Args('id', { type: () => Int, nullable: false }) id: number
  ) {
    const softDelete = await this.agamaRepository.softDelete(id)
    isCanDeleteData(softDelete, id)
    return true
  }

}
