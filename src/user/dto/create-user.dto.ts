import { IsEmail, MinLength } from 'class-validator'

export class CreateUserDto {
	@IsEmail({}, { message: 'Invalid email format' })
	email: string

	@MinLength(6, { message: 'Password must be more than 6 symbols' })
	password: string
}
