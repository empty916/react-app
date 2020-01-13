import {Controller, Get, HttpCode, Post} from '@nestjs/common';
import {AppService} from '../../service/app.service';

@Controller('mine')
export class AppController {
	constructor(private readonly appService: AppService) {
	}

	@Get()
	getHello(): string {
		return 'mine';
	}

	@Post()
	@HttpCode(200)
	minePost(): string {
		return 'mine';
	}
}
