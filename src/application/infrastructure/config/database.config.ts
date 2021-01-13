import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm"
import { AgamaEntity } from "src/entities/agama.entity"

const dbConfig = (env: ConfigService): TypeOrmModuleOptions => {
  return {
    type: 'mysql',
    host: env.get<string>('TYPEORM_HOST'),
    port: env.get<number>('TYPEORM_PORT'),
    database: env.get<string>('TYPEORM_DATABASE'),
    password: env.get<string>('TYPEORM_PASSWORD'),
    username: env.get<string>('TYPEORM_USERNAME'),
    entities: [
      AgamaEntity
    ],
    migrations: [
      'dist/resources/migrations/*.ts'
    ],
    "cli": {
      "migrationsDir": 'src/resources/migrations'
    }
  }
}

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        return dbConfig(config)
      }
    })
  ]
})
export class DatabaseModule { }
