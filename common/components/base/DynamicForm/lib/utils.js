export const getUniqID = () => Math.random().toString(36).substr(2, 6);

export const createFormItem = config => {
	const {
		label,
		itemProps,
		options,
		type,
		name,
		value,
		rules,
		children,
		props,
		fieldOption,
	} = config;
	const formItem = {
		props: {
			key: name || getUniqID(),
		},
		input: {
			type,
		},
	};
	formItem.input.value = value;
	formItem.props.label = label;
	formItem.input.name = name;
	formItem.input.children = children;
	formItem.input.props = props;
	formItem.input.options = options;
	formItem.rules = rules;
	formItem.fieldOption = fieldOption;
	formItem.props = {
		...formItem.props,
		...itemProps,
	};
	return formItem;
};
