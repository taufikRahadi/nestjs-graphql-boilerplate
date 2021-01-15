import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity({
  name: 'agama'
})
@ObjectType()
export class AgamaEntity extends BaseEntity {
  
  @Column({
    name: 'nama',
    type: 'varchar',
    unique: true,
    nullable: false
  })
  @Field(type => String, { nullable: false })
  name: string;

}
