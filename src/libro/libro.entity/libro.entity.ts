import { BibliotecaEntity } from '../../biblioteca/biblioteca.entity/biblioteca.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class LibroEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    titulo: string;

    @Column()
    autor: string;

    @Column()
    fecha: Date;

    @Column()
    isbn: string;

    @ManyToMany(() => BibliotecaEntity, biblioteca => biblioteca.libros)
    bibliotecas: BibliotecaEntity[];
}
