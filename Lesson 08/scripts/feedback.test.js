describe('Feedback form validation.', () => {
	it('Validate default field data (no invalid fields).', () => {
		expect(validateForm(fieldData)).toEqual([]);
	});
	
	it('Validate altered field data (3 invalid fields).', () => {
		// Change some field data to invalid.
		fieldData.phone = '8 (900) 123-45-67';
		fieldData.birthday = '01.01.1990';
		fieldData.message = '';

		expect(validateForm(fieldData).length).toBe(3);
	});

	 it('Validate a single field (undefined result).', () => {
		expect(validateField(arrFields, 'newField', '123')).toBe(undefined);
	 });
});
