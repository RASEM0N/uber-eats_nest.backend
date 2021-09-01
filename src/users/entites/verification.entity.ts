import { JoinColumn, Column, Entity, OneToOne, BeforeInsert } from 'typeorm'
import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { CoreEntity } from '../../common/entities/core.entity'
import { UserEntity } from './user.entity'
import { v4 as uuidv4 } from 'uuid'
import { IsString } from 'class-validator'

@InputType({ isAbstract: true })
@ObjectType()
@Entity({
    name: 'verification-user',
})
export class VerificationEntity extends CoreEntity {
    @Column()
    @IsString()
    @Field((type) => String)
    code: string

    @OneToOne((type) => UserEntity)
    @JoinColumn()
    user: UserEntity

    @BeforeInsert()
    createCode(): void {
        this.code = uuidv4()
    }
}
