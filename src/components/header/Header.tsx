import { Bell, MessageSquare, Search, Settings } from "lucide-react";

type HeaderProps = {
  children?: React.ReactNode;
};

export default function Header({ children }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm py-3 px-4 md:px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {children}
        <h1 className="text-xl font-bold text-gray-800">Approovia Dashboard</h1>
      </div>

      <div className="hidden md:flex items-center relative max-w-md w-full mx-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search projects..."
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="flex items-center gap-3">
        <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
          <Bell size={20} />
        </button>
        <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
          <MessageSquare size={20} />
        </button>
        <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
          <Settings size={20} />
        </button>
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium">
          A
        </div>
      </div>
    </header>
  );
}
