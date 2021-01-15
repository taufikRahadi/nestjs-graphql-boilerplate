import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AgamaEntity } from "src/entities/agama.entity";
import { AgamaResolver } from "./agama.resolver";
import { AgamaService } from "./agama.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([AgamaEntity])
  ],
  providers: [ AgamaResolver, AgamaService ]
})
export class AgamaModule { }
