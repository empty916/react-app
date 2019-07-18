import Mock from 'mockjs'; // eslint-disable-line

// const {Random} = Mock;
// 使用 Mock
// demo: http://mockjs.com/examples.html
/**
 * "string|1-10": "★" => "string": "★★★★★★"
 * "number|1-100": 100 => "number": 19
 */
Mock.mock(/template/i, 'get', {
	'list|10': [{
		'eleCertificateNum|+1': 1,
		'eleCertificateAmount|+1': 1,
		'amountPaied': 'accountsPayableNum',
		'receiver': 'partnerName',
		'issueDate': 'myhtNum',
		'payDate': 'accountsPayableAmount',
		'approvalOpinion': 'wqf',
	}],
});

