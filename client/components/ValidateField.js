import React from 'react';
import { reduxForm } from 'redux-form';

export const validateUser = values => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'First name is a required field.';
  }
  if (!values.lastName) {
    errors.lastName = 'Last name is a required field.';
  }
  if (!values.email) {
    errors.email = 'Email is a required field.';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email format.'
  }
  return errors;
};

export const validateCategory = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Name is a required field.';
  }
  return errors;
};

export const validateProduct = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Name is a required field.';
  }
  if (!values.price) {
    errors.price = 'Price is a required field.';
  }
  if (!values.SKU) {
    errors.SKU = 'SKU is a required field.';
  }
  if (values.unitsInStock === undefined) {
    errors.unitsInStock = 'Units is a required field.';
  }
  if (
    !/^(?:\w+:)?\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/.test(values.imageUrl)
  ) {
    errors.imageUrl = `Invalid URL format.`;
  }
  return errors;
};

export const validateReview = values => {
  const errors = {};
  if (!values.rating) {
    errors.rating = 'Rating is a required field.';
  } else if (isNaN(Number(values.rating))) {
    errors.rating = 'Rating must be a number.';
  } else if (values.rating < 1 || values.rating > 5) {
    errors.rating = 'Rating must be a number between 1 and 5.';
  }
  return errors;
};

export const validateCheckout = values => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'First name is a required field.';
  }
  if (!values.lastName) {
    errors.lastName = 'Last name is a required field.';
  }
  if (!values.firstName) {
    errors.firstName = 'First name is a required field.';
  }
  if (!values.email) {
    errors.email = 'Email is a required field.';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email format.'
  }
  if (!values.street1) {
    errors.street1 = 'Street address is a required field.';
  }
  return errors;
}

export const validateQuestion = values => {
  const errors = {};
  if (!values.title) {
    errors.title = 'Question is a required field.';
  }
  return errors;
}

export const validateMessage = values => {
  const errors = {};
  if (!values.content) {
    errors.content = 'Message is a required field.';
  }
  return errors;
}

export default props => {
  const {
    input, label, type, name, helpText,
    meta: { dirty, touched, error, valid, visited },
    ...extraProps
  } = props;

  const getValidateClassNames = (touched, error) => {
    if (touched && error) return 'is-danger';
    if (touched && !error && dirty) return 'is-success';
    return '';
  };

  const getFieldIcon = () => {
    const FAS = 'fas';
    if (visited) {
      if (valid) return `${FAS} fa-check`;
      return `${FAS} fa-exclamation-triangle`;
    }
    return '';
  }

  if (type === 'select') {
    return (
      <div className="field">
        <label htmlFor={name} className="label">
          {label}
        </label>
        <div className="control">
          <div className="select">
            <select
              name={input.name}
              onChange={input.onChange}
              onBlur={() => input.onBlur(input.value)}
            >
              <option value="placeholder">Select...</option>
              {extraProps.options.map(opt => (
                <option
                  key={opt.id}
                  value={opt.id}
                >
                  {opt.name}
                </option>
              ))}
            </select>
          </div>
          {touched && error && <p className="help is-danger">{error}</p>}
        </div>
        {helpText && <p className="help">{helpText}</p>}
      </div>
    );
  }

  if (type === 'textarea') {
    return (
      <div className="field">
        <label htmlFor={name} className="label">
          {label}
        </label>
        <div className="control has-icons-right">
          <textarea
            {...input}
            className={`textarea ${getValidateClassNames(touched, error)}`}
          />
          {valid &&
            visited && (
              <span className="icon is-small is-right">
                <i className="fas fa-check" />
              </span>
            )}
          {touched && error && <p className="help is-danger">{error}</p>}
        </div>
        {helpText && <p className="help">{helpText}</p>}
      </div>
    );
  }

  if (type === 'number') {
    return (
      <div className="field">
        <label htmlFor={name} className="label">
          {label}
        </label>
        <div className="control has-icons-right">
          <input
            {...input}
            type="number"
            min={extraProps.min}
            max={extraProps.max}
            step={extraProps.step}
            className={`input ${getValidateClassNames(touched, error)}`}
          />
          {valid &&
            visited && (
              <span className="icon is-small is-right">
                <i className="fas fa-check" />
              </span>
            )}
          {touched && error && <p className="help is-danger">{error}</p>}
        </div>
        {helpText && <p className="help">{helpText}</p>}
      </div>
    );
  }

  // if (type === 'checkbox') {}

  if (type === 'switch') {
    return (
      <div className="field">
        <label className="label">{label}</label>
        <input
          id={name}
          name={name}
          type="checkbox"
          className="switch is-rounded"
        />
        <label htmlFor={name}>{extraProps.switchLabel}</label>
        {helpText && <p className="help">{helpText}</p>}
      </div>
    );
  }

  return (
    <div className="field">
      <label htmlFor={name} className="label">
        {label}
      </label>
      <div>
        <div className="control has-icons-right">
          <input
            {...input}
            type={type}
            className={`input ${getValidateClassNames(touched, error)}`}
          />
          <span className="icon is-small is-right">
            <i
              className={`${getFieldIcon()}`}
            />
          </span>
        </div>
        {touched && error && <p className="help is-danger">{error}</p>}
      </div>
      {helpText && <p className="help">{helpText}</p>}
    </div>
  );
};
