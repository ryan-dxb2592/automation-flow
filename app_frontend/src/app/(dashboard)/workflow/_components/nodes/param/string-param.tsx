"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AppNodeInput } from "@/types/app-node";
import { useEffect, useId, useState } from "react";
import { ChangeEvent, FocusEvent } from "react";

interface StringParamProps {
  params: AppNodeInput;
}

type InputComponent = typeof Input | typeof Textarea;

const StringParam = ({ params }: StringParamProps) => {
  const id = useId();
  const { input, value, updateNodeInput, disabled } = params;
  const [inputValue, setInputValue] = useState(value || "");

  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  const Component: InputComponent =
    input.variant === "textarea" ? Textarea : Input;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(e.target.value);
  };

  const handleBlur = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    updateNodeInput(e.target.value);
  };

  return (
    <div className="space-y-1 p-1 w-full">
      <Label htmlFor={id} className="text-xs flex">
        {input.name}
        {input.required && <span className="text-red-500">*</span>}
      </Label>
      <Component
        id={id}
        className="w-full text-xs"
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={disabled}
      />
      {input.helperText && (
        <p className="text-xs text-muted-foreground ">{input.helperText}</p>
      )}
    </div>
  );
};

export default StringParam;
