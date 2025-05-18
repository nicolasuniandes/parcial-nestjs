import { TypeOrmModule } from '@nestjs/typeorm';
import { BibliotecaEntity } from '../../biblioteca/biblioteca.entity/biblioteca.entity';
import { LibroEntity } from '../../libro/libro.entity/libro.entity';

export const TypeOrmTestingConfig = () => [
 TypeOrmModule.forRoot({
   type: 'sqlite',
   database: ':memory:',
   dropSchema: true,
   entities: [BibliotecaEntity, LibroEntity],
   synchronize: true
 }),
 TypeOrmModule.forFeature([BibliotecaEntity, LibroEntity]),
];