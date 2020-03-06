import { Controller, Get } from '@nestjs/common';

@Controller('cats')
export class CatsController {
    @Get()
	getHello(): string {
		return 'cats';
	}
}
