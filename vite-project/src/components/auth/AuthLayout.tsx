import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
  image: string;
  imageAlt?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, image, imageAlt = 'Decorative gradient' }) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Left Image Panel */}
      <div className="w-full md:w-1/2 p-3 md:p-4 flex-shrink-0">
        <div className="w-full h-64 md:h-full rounded-2xl overflow-hidden">
          <img
            src={image}
            alt={imageAlt}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-10 md:px-12 lg:px-20">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
