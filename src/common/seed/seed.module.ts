import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Pokemon, PokemonSchema } from '@/pokemon/schemas/pokemon.schema';
import { SeedService } from './seed.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pokemon.name, schema: PokemonSchema }]),
  ],
  providers: [SeedService],
})
export class SeedModule {}
