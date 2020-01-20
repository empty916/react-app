import {Controller, Get, HttpCode, Post} from '@nestjs/common';
import {AppService} from '../../service/app.service';

@Controller('demo')
export default class AppController {
	constructor(private readonly appService: AppService) {
	}

	@Get()
	getHello(): string {
		return 'demo';
	}

	@Get('233')
	get2333(): string {
		return 'demo 233';
	}

	@Post()
	@HttpCode(200)
	minePost(): string {
		return 'demo';
	}
}
