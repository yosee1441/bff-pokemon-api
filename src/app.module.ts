import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { envs } from './config';
import { PokemonModule } from './pokemon/pokemon.module';

@Module({
  imports: [
    MongooseModule.forRoot(envs.mongoUrl, {
      dbName: envs.mongoInitDbDatabase,
    }),
    PokemonModule,
  ],
})
export class AppModule {}
