import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class LibroEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    titulo: string;

    @Column()
    autor: string;

    @Column()
    fecha: string;

    @Column()
    isbn: string;
}
