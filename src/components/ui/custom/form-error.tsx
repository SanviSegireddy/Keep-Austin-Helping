import { FC } from "react";
import { TriangleAlertIcon } from "lucide-react";

interface FormErrorProps {
  message?: string;
}

export const FormError: FC<FormErrorProps> = ({ message }) => {
  if (!message) {
    return null;
  }

  return (
    <div className="flex items-center gap-x-2 text-sm text-destructive bg-destructive/15 p-3 rounded-md dark:bg-destructive/30 dark:text-red-700">
      <TriangleAlertIcon className="h-4 w-4" />
      {message}
    </div>
  );
};
