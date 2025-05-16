import { LibroEntity } from '../../libro/libro.entity/libro.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BibliotecaEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @Column()
    direccion: string;

    @Column()
    ciudad: string;

    @Column()
    horario_apertura: string;

    @Column()
    horario_cierre: string;

    @ManyToMany(() => LibroEntity, libro => libro.bibliotecas)
    @JoinTable()
    libros: LibroEntity[];
}
