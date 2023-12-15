import { ChangeEvent } from "react";

type CustomInputProps = {
  label: string;
  name: string;
  type: "text" | "email" | "number";
  placeholder: string;
  errorMessage?: string;
  value: string;
  onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
};

const CustomInput = (props: CustomInputProps) => {
  const {
    label,
    type,
    name,
    placeholder,
    errorMessage,
    value,
    onChangeHandler,
  } = props;
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        type={type}
        value={value}
        name={name}
        placeholder={placeholder}
        className={`input input-bordered ${
          errorMessage ? "input-error" : "input-primary"
        } w-full rounded-full transition-all duration-500`}
        onChange={onChangeHandler}
      />
      <div
        className={`label transition-all duration-300 ${
          errorMessage ? "opactity-100" : "opacity-0 h-0 absolute"
        }`}
      >
        <span className="label-text-alt text-error">{errorMessage}</span>
      </div>
    </label>
  );
};

export default CustomInput;
