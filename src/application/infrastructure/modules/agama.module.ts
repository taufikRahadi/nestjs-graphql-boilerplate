import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AgamaEntity } from "src/entities/agama.entity";
import { AgamaResolver } from "../resolvers/agama.resolver";

@Module({
  imports: [
    TypeOrmModule.forFeature([AgamaEntity])
  ],
  providers: [AgamaResolver]
})
export class AgamaModule { }
