import React from "react";
import Logo from "@/assets/icon/logo.png";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";

const NotFound: React.FC = () => {
  return (
    <article className="flex h-full min-h-[100vh] w-full flex-col bg-cpBlue px-20 py-8 max-md:max-w-full max-md:px-5 max-md:py-5">
      <div className="flex h-screen items-center justify-center bg-cpBlue">
        <Card className="w-full max-w-md bg-white">
          <CardHeader className="flex items-center justify-center">
            <img loading="lazy" src={Logo} alt="IT" className="w-auto h-80" />
            <h1 className="ml-4 font-kanit text-3xl font-light text-gray-800">โอ๊ะ โอ๊!</h1>
          </CardHeader>
          <CardContent className="text-center text-gray-600">
            <p className="font-kanit text-2xl">
            ดูเหมือนเราจะไม่พบสิ่งที่คุณกำลังมองหา
            </p>
            <hr className="my-4" />
            <Link to="/" className="text-cpBlue-200 font-kanit hover:text-cpBlue-900 mt-4">
              กลับไป หน้าแรก
            </Link>
          </CardContent>
        </Card>
      </div>
    </article>
  );
};

export default NotFound;
