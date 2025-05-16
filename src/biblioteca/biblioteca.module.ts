import { Module } from '@nestjs/common';
import { BibliotecaService } from './biblioteca.service';
import { BibliotecaEntity } from './biblioteca.entity/biblioteca.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [BibliotecaService],
  imports: [TypeOrmModule.forFeature([BibliotecaEntity])],
})
export class BibliotecaModule {}
