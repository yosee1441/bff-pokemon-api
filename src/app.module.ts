import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { envs, SeedModule } from './common';
import { PokemonModule } from './pokemon/pokemon.module';

@Module({
  imports: [
    MongooseModule.forRoot(envs.mongoUrl, {
      dbName: envs.mongoInitDbDatabase,
    }),
    PokemonModule,
    SeedModule,
  ],
})
export class AppModule {}
