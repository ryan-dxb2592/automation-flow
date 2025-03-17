import { AppNodeInput } from "@/types/app-node";
import { useId } from "react";

const BrowserInstanceParam = ({ params }: { params: AppNodeInput }) => {
  const { input, updateNodeInput } = params;
  const id = useId();

  return <p className="text-xs"> {input.name}</p>;
};

export default BrowserInstanceParam;
