/* eslint-disable @typescript-eslint/no-explicit-any */
import Logo from "@/assets/icon/loginlogo.png";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import FormFieldWrapper from "@/components/forms/FormFieldWrapper";
import InputFieldAdapter from "@/components/forms/InputFieldAdapter";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/loginSchema";
import { useAuthHandler } from "@/hooks/useAuthHandler";

const getErrorMessage = (error: any): string | null => {
  if (error && error.response && error.response.status === 403) {
    return "The Username or Password is incorrect";
  }
  return null;
};

const LoginComponent: React.FC = () => {
  const { login, isLoading, error } = useAuthHandler();
  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });
  const onSubmit = (data: { username: string; password: string }) =>
    login(data);

  const errorMessage = getErrorMessage(error);

  return (
    <div className="flex h-screen items-center justify-center bg-cpBlue">
      <Card className="w-full max-w-md">
        <CardHeader>
          <img loading="lazy" className="rounded-sm" src={Logo} />
        </CardHeader>
        <CardContent>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-5">
                <FormFieldWrapper
                  component={InputFieldAdapter}
                  name="username"
                  label="Username"
                  type="text"
                  placeholder="Username"
                  disabled={isLoading}
                  required
                />
                <FormFieldWrapper
                  component={InputFieldAdapter}
                  name="password"
                  label="รหัสผ่าน"
                  type="password"
                  placeholder="Password"
                  disabled={isLoading}
                  required
                />
                <Button type="submit" variant="default" disabled={isLoading}>
                  {isLoading ? <p className="font-kanin">เข้าสู่ระบบ...</p> : <p className="font-kanin">เข้าสู่ระบบ</p>}
                </Button>
              </div>
            </form>
          </FormProvider>
          {errorMessage && (
            <p className="text-sm font-medium text-red-500">{errorMessage}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginComponent;
