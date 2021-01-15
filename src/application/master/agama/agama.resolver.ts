import { Resolver, Query, Args, Int, Mutation } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { AgamaEntity } from "src/entities/agama.entity";
import { Repository } from "typeorm";
import { AgamaArg, AgamaPayload } from "./agama.payload";
import { PaginationPayload } from "../../../infrastructure/types/pagination.payload";
import { checkFilterArg, checkPagination, checkSearchArg, isCanDeleteData, isCanGetData } from "../../../infrastructure/utils/check-arg";
import { AgamaService } from "./agama.service";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/infrastructure/guards/auth.guard";

@Resolver(of => AgamaEntity)
export class AgamaResolver {

  constructor(
    private agamaService: AgamaService
  ) { }

  @UseGuards(new AuthGuard(['manusia biasa']))
  @Query(returns => [AgamaEntity], { name: 'getAllAgama' })
  async getAllAgama(
    @Args() paginationPayload: PaginationPayload 
  ) {
    return this.agamaService.findAll(checkPagination(paginationPayload))
  }

  @Query(returns => AgamaEntity, { name: 'getAgama' })
  async getAgama(
    @Args('id', { type: () => Int, nullable: false }) id: number
  ) {
    const agama = await this.agamaService.findOne(id);
    return agama
  }

  @Query(returns  => [AgamaEntity], { name: 'searchAgama' })
  async searchAgama(
    @Args() agamaPayload: AgamaArg
  ) {
    const [where] = checkSearchArg(agamaPayload);
    return this.agamaService.searchOrFilter(where);
  }

  @Query(returns => [AgamaEntity], { name: 'filterAgama' })
  async filterAgama(@Args() agamaPayload: AgamaArg) {
    const where = checkFilterArg(agamaPayload);
    return this.agamaService.searchOrFilter(where)
  }

  @Mutation(returns => AgamaEntity)
  async createAgama(
    @Args('agama', { type: () => AgamaPayload }) agamaPayload: AgamaPayload
  ) {
    return this.agamaService.createAgama(agamaPayload)
  }

  @Mutation(returns => AgamaEntity)
  async updateAgama(
    @Args('agama', { type: () => AgamaPayload }) agamaPayload: AgamaPayload,
    @Args('id', { type: () => Int, nullable: false }) id: number
  ) {
    const update = await this.agamaService.updateAgama(agamaPayload, id)
    return update
  }

  @Mutation(returns => Boolean)
  async deleteAgama(
    @Args('id', { type: () => Int, nullable: false }) id: number
  ) {
    return this.agamaService.softDeleteAgama(id)
  }

}
