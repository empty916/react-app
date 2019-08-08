const update = (state: any) => state;

const asyncUpdate = async (state: any) => {
	await new Promise(res => setTimeout(res, 3000));
	return state;
};

export default {
	update,
	asyncUpdate,
};
