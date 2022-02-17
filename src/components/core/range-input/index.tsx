import { Input } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";

const INPUT_TYPE = {
  MIN: "min",
  MAX: "max"
};

interface RangeInputProps {
  initialValue;
  onChange;
  min;
  max;
  separator?;
  inputProps?;
}

export const RangeInput = ({
  initialValue,
  onChange,
  min,
  max,
  separator,
  inputProps
}: RangeInputProps) => {
  const minRef = useRef<any>();
  const maxRef = useRef<any>();

  const [value, setValue] = useState({
    min: initialValue?.[0],
    max: initialValue?.[1]
  });

  const clamp = (val) => Math.max(min, Math.min(max, val));

  const clampMin = (v) => {
    if (!v) return;

    if (!min) return v;

    let val = clamp(v);

    if (value.max !== undefined) val = Math.min(val, value.max);

    if (v !== val) minRef.current.value = val;

    return val;
  };

  const clampMax = (v) => {
    if (!v) return;

    if (!max) return v;

    let val = clamp(v);

    if (value.min !== undefined) val = Math.max(val, value.min);

    if (v !== val) maxRef.current.value = val;

    return val;
  };

  const handleOnChange = (e, type) => {
    const numValue = Number(e.target.value);

    const newValue = {
      ...value,
      [type]: type === INPUT_TYPE.MIN ? clampMin(numValue) : clampMax(numValue)
    };

    setValue(newValue);

    onChange([newValue.min, newValue.max]);
  };

  useEffect(() => {
    if (value.min) minRef.current.value = value.min;
    if (value.max) maxRef.current.value = value.max;
  }, []);

  return (
    <>
      <Input
        ref={minRef}
        onBlur={(e) => handleOnChange(e, INPUT_TYPE.MIN)}
        type="number"
        {...inputProps}
      />
      <span>{separator || "-"}</span>
      <Input
        ref={maxRef}
        onBlur={(e) => handleOnChange(e, INPUT_TYPE.MAX)}
        type="number"
        {...inputProps}
      />
    </>
  );
};
