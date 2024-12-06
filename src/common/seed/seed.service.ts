import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Pokemon, PokemonDocument } from '@/pokemon/schemas/pokemon.schema';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<PokemonDocument>,
  ) {}

  async runSeed(): Promise<void> {
    this.logger.log('Starting seed process...');

    await this.pokemonModel.deleteMany({});
    this.logger.log('Deleted all existing records.');

    const seedData: Pokemon[] = [
      { name: 'Pikachu', type: 'Electric', level: 5 },
      { name: 'Charmander', type: 'Fire', level: 7 },
      { name: 'Bulbasaur', type: 'Grass', level: 6 },
      { name: 'Squirtle', type: 'Water', level: 4 },
      { name: 'Eevee', type: 'Normal', level: 8 },
    ];

    await this.pokemonModel.insertMany(seedData);
    this.logger.log('Seed data inserted successfully!');
  }
}
