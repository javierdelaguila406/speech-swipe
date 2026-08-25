import { useState, useCallback } from 'react';
export const useFormValidation = (initialValues, validationRules, onSubmit) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const validate = useCallback((fieldsToValidate) => {
        const newErrors = {};
        const fieldsToCheck = fieldsToValidate || Object.keys(validationRules);
        fieldsToCheck.forEach((field) => {
            const rule = validationRules[field];
            const value = values[field];
            if (!rule)
                return;
            // Required
            if (rule.required && (!value || (typeof value === 'string' && !value.trim()))) {
                newErrors[field] = 'Este campo es requerido';
                return;
            }
            if (!value)
                return; // No validar campos vacíos si no son required
            // MinLength
            if (rule.minLength && value.length < rule.minLength) {
                newErrors[field] = `Mínimo ${rule.minLength} caracteres`;
                return;
            }
            // MaxLength
            if (rule.maxLength && value.length > rule.maxLength) {
                newErrors[field] = `Máximo ${rule.maxLength} caracteres`;
                return;
            }
            // Pattern
            if (rule.pattern && !rule.pattern.test(value)) {
                newErrors[field] = 'Formato inválido';
                return;
            }
            // Custom
            if (rule.custom) {
                const customResult = rule.custom(value);
                if (customResult !== true) {
                    newErrors[field] = typeof customResult === 'string' ? customResult : 'Validación fallida';
                }
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [validationRules, values]);
    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setValues((prev) => ({
            ...prev,
            [name]: value
        }));
        // Clear error for this field
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: undefined
            }));
        }
    }, [errors]);
    const handleBlur = useCallback((e) => {
        const { name } = e.target;
        validate([name]);
    }, [validate]);
    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        if (!validate()) {
            return;
        }
        setIsSubmitting(true);
        try {
            await onSubmit(values);
        }
        catch (error) {
            console.error('Form submission error:', error);
        }
        finally {
            setIsSubmitting(false);
        }
    }, [values, validate, onSubmit]);
    const setFieldValue = useCallback((field, value) => {
        setValues((prev) => ({
            ...prev,
            [field]: value
        }));
    }, []);
    const reset = useCallback(() => {
        setValues(initialValues);
        setErrors({});
    }, [initialValues]);
    return {
        values,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        reset,
        validate,
        setErrors
    };
};
