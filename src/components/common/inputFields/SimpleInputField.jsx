import InputField from './InputField';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const SimpleInputField = ({ nameList }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      {nameList.map(({ name, type, ...rest }, i) => {
        if (type === 'password') {
          return (
            <div key={i} style={{ position: 'relative' }}>
              <InputField
                name={name}
                type={showPassword ? 'text' : 'password'}
                {...rest}
              />
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowPassword((v) => !v)}
                style={{
                  position: 'absolute',
                  right: 40,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  zIndex: 2,
                }}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          );
        }
        return <InputField name={name} type={type} {...rest} key={i} />;
      })}
    </>
  );
};

export default SimpleInputField;
