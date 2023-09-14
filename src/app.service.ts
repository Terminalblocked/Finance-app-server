import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
	sayWelcome() {
		return 'Welcome'
	}
}
