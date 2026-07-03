import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import cosmicGradient from '../assets/cosmic-gradient.jpg';

const CompleteProfilePage: React.FC = () => {
  const [formData, setFormData] = useState({
    rollNo: '',
    department: '',
    program: '',
    semester: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Profile data:', formData);
  };

  const selectClasses =
    'w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-sm text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 cursor-pointer';

  return (
    <AuthLayout image={cosmicGradient}>
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 tracking-tight">
          Hey... Shaad!
        </h1>
        <p className="text-gray-500 text-sm mb-8 leading-relaxed">
          We are Almost there, Let's complete your<br />
          Student Profile
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Roll No */}
          <div>
            <label htmlFor="rollNo" className="block text-sm font-medium text-gray-900 mb-1.5">
              Roll No.
            </label>
            <input
              type="text"
              id="rollNo"
              name="rollNo"
              value={formData.rollNo}
              onChange={handleChange}
              placeholder="eg. XXXXXXXX"
              className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Department */}
          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-900 mb-1.5">
              Department
            </label>
            <div className="relative">
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className={selectClasses}
              >
                <option value="" disabled>eg. Computer Science</option>
                <option value="cs">Computer Science</option>
                <option value="it">Information Technology</option>
                <option value="ece">Electronics & Communication</option>
                <option value="ee">Electrical Engineering</option>
                <option value="me">Mechanical Engineering</option>
                <option value="ce">Civil Engineering</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Program */}
          <div>
            <label htmlFor="program" className="block text-sm font-medium text-gray-900 mb-1.5">
              Program
            </label>
            <div className="relative">
              <select
                id="program"
                name="program"
                value={formData.program}
                onChange={handleChange}
                className={selectClasses}
              >
                <option value="" disabled>eg. B.tech</option>
                <option value="btech">B.Tech</option>
                <option value="mtech">M.Tech</option>
                <option value="bca">BCA</option>
                <option value="mca">MCA</option>
                <option value="phd">PhD</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Semester */}
          <div>
            <label htmlFor="semester" className="block text-sm font-medium text-gray-900 mb-1.5">
              Semester
            </label>
            <div className="relative">
              <select
                id="semester"
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                className={selectClasses}
              >
                <option value="" disabled>eg. 3</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <div className="pt-2">
            <Link to="/forgot-password">
              <button
                type="submit"
                id="profile-continue-btn"
                className="w-full py-3.5 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 active:scale-[0.98] transition-all duration-200 cursor-pointer"
              >
                Continue
              </button>
            </Link>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default CompleteProfilePage;
