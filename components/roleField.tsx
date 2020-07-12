import { ChangeEvent } from 'react';
import { string, bool, number, func } from 'prop-types';

type RoleFieldProps = {
  role: string;
  roleName: string;
  value: number;
  started: boolean;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

function roleField({
  role,
  roleName,
  value,
  started,
  handleChange,
}: RoleFieldProps): JSX.Element {
  return (
    <>
      <div className="flex-item__grow" />
      <label className="flex-item__shrink container">
        <span className="flex-item__shrink margin">{roleName}</span>
        <input
          style={{ maxWidth: '3em' }}
          className="flex-item__grow margin"
          type="number"
          size={2}
          min="0"
          max="10"
          name={role}
          value={value}
          onChange={handleChange}
          disabled={started}
          required
        />
      </label>
      <div className="flex-item__grow" />
    </>
  );
}

roleField.propTypes = {
  role: string.isRequired,
  roleName: string.isRequired,
  value: number.isRequired,
  started: bool.isRequired,
  handleChange: func.isRequired,
};

export default roleField;
