import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import {User} from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(createUser: User): Promise<User> {
        const {user, password} = createUser;

        const userCreate = this.create();
        createUser.user = user;
        createUser.password = password;

        try {
            await userCreate.save();
            return userCreate;
        } catch (error){
            if (error.code.toString()==='23505'){
                throw new ConflictException('User já cadastrado');
            }else{
                throw new InternalServerErrorException ('Error ao salvar o User no banco');
            }
        }

    }
}