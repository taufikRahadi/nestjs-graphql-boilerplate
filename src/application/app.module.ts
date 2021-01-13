import { Module } from '@nestjs/common';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { join } from 'path'
import { DatabaseModule } from './infrastructure/config/database.config';
import { AgamaModule } from './infrastructure/modules/agama.module';

@Module({
  imports: [
    DatabaseModule,
    GraphQLFederationModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/resources/schema.gql'),
      playground: true,
      debug: false
    }),
    AgamaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
