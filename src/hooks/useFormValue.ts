import { useCallback, useEffect, useState } from "react";

export type FormValueOptions<T> = {
  isDirty?: boolean;
  onBlur?: () => void;
  onChange?: (value: T) => void;
  validate?: (value: T) => (string | undefined) | Promise<string | undefined>;
};

export type FormValue<T> = {
  error: string | undefined;
  errorIfDirty: string | undefined;
  handleBlur: () => void;
  handleChangeValue: (value: T) => void;
  isPristine: boolean;
  isValid: boolean;
  value: T;
};

const useFormValue = <T>(
  defaultValue: T,
  options: FormValueOptions<T> = {}
): FormValue<T> => {
  const [value, setValue] = useState<T>(defaultValue);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isPristine, setIsPristine] = useState(!options.isDirty);

  const { onBlur, onChange, validate } = options;

  const handleValidate = useCallback(
    (newValue: T) => {
      if (!validate) {
        setError(undefined);
        return;
      }
      const errorOrPromise = validate(newValue);
      if (errorOrPromise === undefined) {
        setError(undefined);
        return;
      }
      if (typeof errorOrPromise === "string") {
        setError(errorOrPromise);
        return;
      }
      setError("");
      errorOrPromise.then((newError) => {
        setError(newError);
      });
    },
    [validate]
  );

  const handleChangeValue = useCallback(
    (newValue: T) => {
      setValue(newValue);
      onChange?.(newValue);
      handleValidate(newValue);
    },
    [handleValidate, onChange]
  );

  const handleBlur = useCallback(() => {
    setIsPristine(false);
    onBlur?.();
  }, [onBlur]);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    handleValidate(value);
  }, [handleValidate]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    error,
    errorIfDirty: isPristine ? undefined : error,
    handleBlur,
    handleChangeValue,
    isPristine,
    isValid: error === undefined,
    value,
  };
};

export default useFormValue;
