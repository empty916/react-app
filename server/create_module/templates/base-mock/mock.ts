import Mock from 'mockjs'; // eslint-disable-line

const {Random} = Mock;
// 使用 Mock
// demo: http://mockjs.com/examples.html
/**
 * "string|1-10": "★" => "string": "★★★★★★"
 * "number|1-100": 100 => "number": 19
 */
Mock.mock(/api\/template/, 'post', {
	'list': [{
		'id|+1': 1,
		'email': '@email',
		'name': '@name',
		'age|10-40': 0,
		'address': () => (Random.province() + Random.city() + Random.county()),
	}],
});
