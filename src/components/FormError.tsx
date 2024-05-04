import { TriangleAlert } from "lucide-react";

interface FormErrorProp {
  message?: string;
}

const FormError = ({ message }: FormErrorProp) => {
  if (!message) return null;

  return (
    <div className="w-full px-2 py-1.5 text-sm bg-red-100 rounded-md">
      <p className="text-red-600">
        <TriangleAlert className="inline mr-2" size={20} />
        {message}
      </p>
    </div>
  );
};
export default FormError;
