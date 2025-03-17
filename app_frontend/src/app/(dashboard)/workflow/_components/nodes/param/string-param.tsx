"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AppNodeInput } from "@/types/app-node";
import { useId, useState } from "react";

interface StringParamProps {
  params: AppNodeInput;
}

const StringParam = ({ params }: StringParamProps) => {
  const id = useId();
  const { input, value, updateNodeInput } = params;
  const [inputValue, setInputValue] = useState(value || "");

  return (
    <div className="space-y-1 p-1 w-full">
      <Label htmlFor={id} className="text-xs flex">
        {input.name}
        {input.required && <span className="text-red-500">*</span>}
      </Label>
      <Input
        id={id}
        className="w-full text-xs"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onBlur={(e) => {
          updateNodeInput(e.target.value);
        }}
      />
      {input.helperText && (
        <p className="text-xs text-muted-foreground ">{input.helperText}</p>
      )}
    </div>
  );
};

export default StringParam;
