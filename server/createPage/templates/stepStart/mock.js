import Mock from 'mockjs'; // eslint-disable-line

// const { Random } = Mock;
// 使用 Mock
// demo: http://mockjs.com/examples.html
/**
 * "string|1-10": "★" => "string": "★★★★★★"
 * "number|1-100": 100 => "number": 19
 */
Mock.mock(/test/, 'post', {});
