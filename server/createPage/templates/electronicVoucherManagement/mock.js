import Mock from 'mockjs'; // eslint-disable-line

const {Random} = Mock;
// 使用 Mock
// demo: http://mockjs.com/examples.html
/**
 * "string|1-10": "★" => "string": "★★★★★★"
 * "number|1-100": 100 => "number": 19
 */
Mock.mock(/Template/, 'post', {
	'list': [{
		'id|+1': 1,
		'email': '@email',
		'name': '@name',
		'age|10-40': 0,
		'address': () => (Random.province() + Random.city() + Random.county()),
	}],
});
// 企业金条列表全部
Mock.mock(/core\/evoucher\/list/, 'post', {
	data: {
		records: [
			{
				// id: '1',
				gldId: '3985445645645HFR',
				gldAmt: '5,000,000.00',
				canPyAmt: '0.00',
				estbName: '广州电信核心企业',
				estbDay: '2019-12-23',
				exDay: '2019-12-23',
				tcPtyStatus: 'T01',
			},
			{
				// id: '1',
				gldId: '2985445645645HFR',
				gldAmt: '5,000,000.00',
				canPyAmt: '0.00',
				estbName: '广州电信核心企业',
				estbDay: '2019-12-23',
				exDay: '2019-12-23',
				tcPtyStatus: 'T01',
			},
			{
				// id: '1',
				gldId: '3985445645645HFR',
				gldAmt: '5,000,000.00',
				canPyAmt: '0.00',
				estbName: '广州电信核心企业',
				estbDay: '2019-12-23',
				exDay: '2019-12-23',
				tcPtyStatus: 'T03',
			},
		],
		total: 3,
	},
	responseCode: '200',
});
