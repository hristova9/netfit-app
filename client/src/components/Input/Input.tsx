import "./Input.styles.css";

interface InputProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const Input: React.FC<InputProps> = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className="input-field">
      <label htmlFor={name}>{label}</label>
      <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} />
    </div>
  );
};

export default Input;
