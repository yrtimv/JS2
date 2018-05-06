
// Validate form fields.
const arrFields = [
	['name', /^[a-zа-яё\ ]+$/i],
	['phone', /^\+7 ?\(\d{3}\) ?\d{3}\-\d{4}$/],
	['email', /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/],
	['birthday', /^\d{4}\/\d{2}\/\d{2}$/],
	['city', /\S+/],
	['message', /\S+/]
];
const fieldData = {
	name: 'Vasiliy Pupkin',
	phone: '+7 (900) 123-4567',
	email: 'vasiliy.p@mail.ru',
	birthday: '1990/01/01',
	city: 'Moscow',
	message: 'Hello!'
};

function validateField(fieldsData, fieldName, fieldValue) {
	const field = fieldsData.find((val) => {
		return val[0] === fieldName;
	});
	
	return (field ? field[1].test(fieldValue) : undefined);
}

function validateForm(fieldValues) {
	let invalidFields = [];

	// Form fields validation.
	for(const field in fieldData) {
		if (!validateField(arrFields, field, fieldData[field])) {
			invalidFields.push(field);
		}
	};

	return invalidFields;
};
