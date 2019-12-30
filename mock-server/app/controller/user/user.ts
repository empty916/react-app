import { Controller } from 'egg';
import { Get, Prefix } from 'egg-shell-decorators';
import * as Mock from 'mockjs';

const data = Mock.mock({
	"list|1-10": [
		{
			'id|+1': 1,
			'email': '@email',
			'contactPerson': '@cname',
			'cstNm': '@cname',
			'phone': /^[1][3,4,5,6,7,8][0-9]{9}$/,
			'cstTpCd|1-10': 0,
			'intSt|1-3': 0,
		}
	]
});

// @Prefix('/user')
@Prefix('/test')
export default class UserController extends Controller {
	// 资金方邀请客户列表接口
	@Get('/')
	public async getTest() {
		this.ctx.body = {
			status: 200,
			data: 'success',
		}
	}
}
