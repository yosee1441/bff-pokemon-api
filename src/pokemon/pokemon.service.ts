import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Pokemon, PokemonDocument } from './schemas';
import { CreatePokemonDto, UpdatePokemonDto } from './dtos';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<PokemonDocument>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto): Promise<Pokemon> {
    const newPokemon = new this.pokemonModel(createPokemonDto);
    return newPokemon.save();
  }

  async findAll(): Promise<Pokemon[]> {
    return this.pokemonModel.find().exec();
  }

  async findOne(id: string): Promise<Pokemon> {
    const pokemon = await this.pokemonModel.findById(id).exec();
    if (!pokemon) throw new NotFoundException('Pokemon not found');
    return pokemon;
  }

  async update(
    id: string,
    updatePokemonDto: UpdatePokemonDto,
  ): Promise<Pokemon> {
    const updatedPokemon = await this.pokemonModel
      .findByIdAndUpdate(id, updatePokemonDto, { new: true })
      .exec();
    if (!updatedPokemon) throw new NotFoundException('Pokemon not found');
    return updatedPokemon;
  }

  async remove(id: string): Promise<void> {
    const result = await this.pokemonModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Pokemon not found');
  }
}
