import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 sm:space-y-8">
        <div>
          <h1 className="mt-4 text-center text-3xl sm:text-4xl font-extrabold text-gray-900">
            Welcome to QR Code Login
          </h1>
          <p className="mt-2 text-center text-sm sm:text-base text-gray-600">
            A simple and secure way to manage your account
          </p>
        </div>
        <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
          <Link
            href="/login"
            className="group relative w-full flex justify-center py-2 sm:py-2.5 px-4 border border-transparent text-sm sm:text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="group relative w-full flex justify-center py-2 sm:py-2.5 px-4 border border-transparent text-sm sm:text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
