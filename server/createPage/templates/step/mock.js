import Mock from 'mockjs'; // eslint-disable-line

const {Random} = Mock;
// 使用 Mock
// demo: http://mockjs.com/examples.html
/**
 * "string|1-10": "★" => "string": "★★★★★★"
 * "number|1-100": 100 => "number": 19
 */
Mock.mock(/template/, 'post', {
	'list': [{
		'id|+1': 1,
		'email': '@email',
		'name': '@name',
		'age|10-40': 0,
		'address': () => (Random.province() + Random.city() + Random.county()),
	}],
});
Mock.mock(/repay\/input/, 'post', {
	applicationInput: { // 融资申请数据
		maximumFinancingAmount: '25,000,000.00',
		dateOfApplication: '2018-12-22',
		financingAmount: '25,000,000.00',
		repaymentStyle: '请选择',
		financingPeriod: '50',
		useOfFunds: '请选择',
		loanAccountType: '银行账户',
		loanAccount: '5644 8988 45467 789',
		loanAccountName: '一级供应商账号',
		loanAccountBank: '上海徐汇分行',
		financingRate: '6.45',
		interestRate: '15.565',
		amountOfArrivalTotal: '25,000,000.00',
		expectedExchangeRate: '8.45',
	},
	responseCode: '200',
});
