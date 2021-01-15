import { Module } from '@nestjs/common';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { join } from 'path'
import { DatabaseModule } from '../config/database.config';
import { AgamaModule } from './master/agama/agama.module';
import { RedisModule } from '../config/redis.config';

@Module({
  imports: [
    DatabaseModule,
    RedisModule,
    GraphQLFederationModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/resources/schema.gql'),
      context: ({ req }) => ({ headers: req.headers }),
      playground: true,
      debug: false
    }),
    AgamaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
