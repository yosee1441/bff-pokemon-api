import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { PokemonService } from './pokemon.service';
import { CreatePokemonDto, UpdatePokemonDto } from './dtos';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @MessagePattern({ cmd: 'createPokemon' })
  create(@Payload() dto: CreatePokemonDto) {
    return this.pokemonService.create(dto);
  }

  @MessagePattern({ cmd: 'findAllPokemons' })
  findAll() {
    return this.pokemonService.findAll();
  }

  @MessagePattern({ cmd: 'findOnePokemon' })
  findOne(@Payload('id') id: string) {
    return this.pokemonService.findOne(id);
  }

  @MessagePattern({ cmd: 'updatePokemon' })
  update(@Payload('id') id: string, @Payload() dto: UpdatePokemonDto) {
    return this.pokemonService.update(id, dto);
  }

  @MessagePattern({ cmd: 'removePokemon' })
  remove(@Payload('id') id: string) {
    return this.pokemonService.remove(id);
  }
}
