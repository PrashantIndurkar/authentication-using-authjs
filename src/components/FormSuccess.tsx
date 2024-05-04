import { CircleCheckBig } from "lucide-react";

interface FormSuccessProp {
  message?: string;
}

const FormSuccess = ({ message }: FormSuccessProp) => {
  if (!message) return null;

  return (
    <div className="w-full px-2 py-1.5 text-sm bg-green-100 rounded-md">
      <p className="text-green-600">
        <CircleCheckBig className="inline mr-2" size={20} />
        {message}
      </p>
    </div>
  );
};
export default FormSuccess;
