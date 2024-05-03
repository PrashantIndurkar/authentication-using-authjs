import { TriangleAlert } from "lucide-react";

interface FormErrorProp {
  message?: string;
}

const FormError = ({ message }: FormErrorProp) => {
  if (!message) return null;

  return (
    <div className="w-full p-2 bg-red-100 rounded-md">
      <p className="text-red-600">
        <TriangleAlert className="inline mr-2" size={20} />
        {message}
      </p>
    </div>
  );
};
export default FormError;
