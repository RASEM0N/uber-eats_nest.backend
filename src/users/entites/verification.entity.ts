import { JoinColumn, Column, Entity, OneToOne } from 'typeorm'
import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { CoreEntity } from '../../common/entities/core.entity'
import { UserEntity } from './user.entity'

@InputType({ isAbstract: true })
@ObjectType()
@Entity({
    name: 'verification-user',
})
export class VerificationEntity extends CoreEntity {
    @Column()
    @Field((type) => String)
    code: string

    @OneToOne((type) => UserEntity)
    @JoinColumn()
    user: UserEntity
}
