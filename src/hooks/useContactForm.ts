import { useState } from "react";
import { useForm, UseFormRegister, FieldErrors, UseFormHandleSubmit } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactFormSchema, ContactFormInput } from "@/lib/validators/contact";

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];
}

export interface UseContactFormReturn {
  register: UseFormRegister<ContactFormInput>;
  handleSubmit: UseFormHandleSubmit<ContactFormInput>;
  errors: FieldErrors<ContactFormInput>;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string | null;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  resetForm: () => void;
}

/**
 * Custom Hook encapsulating React Hook Form, state management,
 * and fetch submission for the API endpoint.
 */
export function useContactForm(): UseContactFormReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormInput>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      source: "FORM",
    },
  });

  const onSubmitHandler = async (data: ContactFormInput) => {
    setIsLoading(true);
    setIsSuccess(false);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result: ApiResponse = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to submit form.");
      }

      setIsSuccess(true);
      reset(); // Clear all fields
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    reset();
    setIsSuccess(false);
    setErrorMessage(null);
  };

  return {
    register,
    handleSubmit,
    errors,
    isLoading,
    isSuccess,
    isError: !!errorMessage,
    errorMessage,
    onSubmit: handleSubmit(onSubmitHandler),
    resetForm,
  };
}
