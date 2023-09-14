import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UsePipes,
	ValidationPipe,
	UseGuards,
	Req,
	Query,
	BadRequestException,
} from '@nestjs/common'
import { TransactionService } from './transaction.service'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { UpdateTransactionDto } from './dto/update-transaction.dto'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { AuthorGuard } from 'src/guard/author.guard'

@Controller('transactions')
export class TransactionController {
	constructor(private readonly transactionService: TransactionService) {}

	@Post()
	@UsePipes(new ValidationPipe())
	@UseGuards(JwtAuthGuard)
	create(@Body() createTransactionDto: CreateTransactionDto, @Req() req) {
		return this.transactionService.create(createTransactionDto, +req.user.id)
	}

	@Get(':type/find')
	@UseGuards(JwtAuthGuard)
	findAllByType(@Req() req, @Param('type') type: string) {
		return this.transactionService.findAllByType(+req.user.id, type)
	}

	@Get('pagination')
	@UseGuards(JwtAuthGuard)
	findAllWithPagination(
		@Req() req,
		@Query('page') page: string,
		@Query('limit') limit: string,
	) {
		return this.transactionService.findAllWithPagination(
			+req.user.id,
			+page,
			+limit,
		)
	}

	@Get()
	@UseGuards(JwtAuthGuard)
	findAll(@Req() req) {
		return this.transactionService.findAll(+req.user.id)
	}

	@Get(':type/:id')
	@UseGuards(JwtAuthGuard, AuthorGuard)
	findOne(@Param('id') id: string) {
		return this.transactionService.findOne(+id)
	}

	@Patch(':type/:id')
	@UseGuards(JwtAuthGuard, AuthorGuard)
	update(
		@Body() updateTransactionDto: UpdateTransactionDto,
		@Param('id') id: string,
	) {
		return this.transactionService.update(updateTransactionDto, +id)
	}

	@Delete(':type/:id')
	@UseGuards(JwtAuthGuard, AuthorGuard)
	delete(@Param('id') id: string) {
		return this.transactionService.delete(+id)
	}
}
