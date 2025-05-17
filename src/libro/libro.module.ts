import { Module } from '@nestjs/common';
import { LibroService } from './libro.service';
import { LibroEntity } from './libro.entity/libro.entity';
import { LibroController } from './libro.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [LibroService],
  imports: [TypeOrmModule.forFeature([LibroEntity])],
  controllers: [LibroController]
})
export class LibroModule {}