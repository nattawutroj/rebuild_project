/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { FieldValues, Path } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useFormFields } from "@/hooks";

interface FormFieldWrapperProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  label: string;
  component: React.ComponentType<any>;
  placeholder?: string;
  [key: string]: any;
}

const FormFieldWrapper = React.memo(
  React.forwardRef(
    <TFieldValues extends FieldValues>(
      {
        name,
        label,
        placeholder,
        component: Component,
        ...props
      }: FormFieldWrapperProps<TFieldValues>,
      ref: React.Ref<any>,
    ) => {
      const { getFieldProps, getFormItemClassName } =
        useFormFields<TFieldValues>();
      const fieldProps = getFieldProps({ name });
      const autoPlaceholder = placeholder || `Please choose a ${label}`;
      return (
        <FormField
          name={name}
          control={fieldProps.control}
          render={({ field, fieldState: { error } }) => (
            <FormItem className={getFormItemClassName(error?.message)}>
              <FormLabel htmlFor={fieldProps.id}>{label}</FormLabel>
              <Component
                {...field}
                {...props}
                id={fieldProps.id}
                ref={ref}
                placeholder={autoPlaceholder}
              />
              {error && (
                <FormMessage role="alert" className={cn("text-red-500")}>
                  {error.message}
                </FormMessage>
              )}
            </FormItem>
          )}
        />
      );
    },
  ),
);

FormFieldWrapper.displayName = "FormFieldWrapper";
export default FormFieldWrapper;
