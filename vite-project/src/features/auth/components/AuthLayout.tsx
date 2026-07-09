import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
  image: string;
  imageAlt?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, image, imageAlt = 'Decorative gradient' }) => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white">
      <div className="w-full lg:w-[45%] xl:w-[42%] p-3 md:p-4 flex-shrink-0">
        <div className="w-full h-56 sm:h-72 md:h-80 lg:h-[calc(100vh-2rem)] rounded-2xl overflow-hidden">
          <img
            src={image}
            alt={imageAlt}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="w-full lg:w-[55%] xl:w-[58%] flex items-center justify-center px-6 py-8 md:px-10 lg:px-16 xl:px-24">
        <div className="w-full max-w-[420px]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
