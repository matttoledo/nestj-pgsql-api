import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import {User} from "./user.entity";
import {CreateUserDto} from "./create-user.dto";
import {UserRole} from "./user-roles.enum";
import * as bcrypt from 'bcrypt';
import {CredentialsDto} from "./credentials.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(
        createUserDto: CreateUserDto,
        role: UserRole,
    ): Promise<User> {
        const {name, password } = createUserDto;

        const user = this.create();
        user.name = name;
        user.role = role;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);
        try {
            await user.save();
            delete user.password;
            delete user.salt;
            return user;
        } catch (error) {
            if (error.code.toString() === '23505') {
                throw new ConflictException('User já está em uso');
            } else {
                throw new InternalServerErrorException(
                    'Erro ao salvar o usuário no banco de dados',
                );
            }
        }
    }
    async checkCredentials(credentialsDto: CredentialsDto): Promise<User> {
        const { id, password } = credentialsDto;
        const user = await this.findOne(id);

        if (user && user.checkPassword(password)) {
            return user;
        } else {
            return null;
        }
    }


    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}