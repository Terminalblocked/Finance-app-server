import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator'
import { User } from 'src/user/entities/user.entity'

export class CreateCategoryDto {
	@MaxLength(30)
	@IsNotEmpty()
	title: string

	@IsOptional()
	user?: User
}
