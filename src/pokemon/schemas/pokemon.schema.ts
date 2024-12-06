import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PokemonDocument = HydratedDocument<Pokemon>;

@Schema()
export class Pokemon {
  @Prop({ required: true })
  name: string;

  @Prop()
  type: string;

  @Prop({ default: 0 })
  level: number;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
