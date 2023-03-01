import { useState, ChangeEvent } from "react";

export const useInput = (initialState) => {
  const [value, setValue] = useState(initialState);
  const [isDirty, setIsDirty] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onBlur = (e: ChangeEvent<HTMLInputElement>) => {
    setIsDirty(true);
  };

  return { value, onChange, onBlur };
};

export const useValidation = (props: {
  value: string;
  validations: Record<string, string>[];
}) => {
    
};
