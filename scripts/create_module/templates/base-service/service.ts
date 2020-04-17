// import http from '@/http';
import ck from 'convert-key';

const dataMap = {
    userName: 'name',
    userAge: 'age',
}

type dataMap = {
    userName: 'name',
    userAge: 'age',
}

const ckData = ck<dataMap>(dataMap);

const myData = ckData({
    userName: 'tom',
    userAge: 14,
})
console.log(myData.name === 'tom');
console.log(myData.age === 14);

export default {
	
}