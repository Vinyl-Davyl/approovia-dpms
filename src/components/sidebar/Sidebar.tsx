import { Fragment } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import SidebarFolderItem from "./SidebarFolderItem";
import useIsMobile from "../../hooks/useIsMobile";
import { LayoutDashboard, FolderKanban, Users, Calendar, BarChart2, Settings, HelpCircle, Plus } from "lucide-react";

type SidebarProps = {
  id?: string;
  isOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({ id, isOpen, onClose }: SidebarProps) {
  const folders = useSelector((state: RootState) => state.dashboard.folders);
  const isMobile = useIsMobile();

  return (
    <Fragment>
      <aside
        id={id}
        className={`fixed z-30 inset-y-0 left-0 w-72 bg-white shadow-lg transition-transform transform md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-center">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center mr-2">
                <FolderKanban className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-800">Approovia</span>
            </div>
          </div>

          {/* Main Navigation */}
          <nav className="p-4 flex-1 overflow-y-auto">
            <div className="space-y-1 mb-6">
              <button className="flex items-center gap-3 w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-md font-medium transition-colors">
                <LayoutDashboard className="h-5 w-5 text-gray-500" />
                Dashboard
              </button>
              <button className="flex items-center gap-3 w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-md font-medium transition-colors">
                <Calendar className="h-5 w-5 text-gray-500" />
                Calendar
              </button>
              <button className="flex items-center gap-3 w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-md font-medium transition-colors">
                <Users className="h-5 w-5 text-gray-500" />
                Team
              </button>
              <button className="flex items-center gap-3 w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-md font-medium transition-colors">
                <BarChart2 className="h-5 w-5 text-gray-500" />
                Reports
              </button>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2 px-3">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Project Folders</h3>
                <button className="text-blue-600 hover:text-blue-800 transition-colors">
                  <Plus size={18} />
                </button>
              </div>
              <ul className="space-y-1">
                {!isMobile &&
                  folders.map((folder) => (
                    <SidebarFolderItem key={folder.name} folderName={folder.name} onClose={onClose} />
                  ))}
              </ul>
            </div>
          </nav>

          {/* Sidebar Footer */}
          <div className="border-t border-gray-200 p-4">
            <div className="space-y-1">
              <button className="flex items-center gap-3 w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-md font-medium transition-colors">
                <Settings className="h-5 w-5 text-gray-500" />
                Settings
              </button>
              <button className="flex items-center gap-3 w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-md font-medium transition-colors">
                <HelpCircle className="h-5 w-5 text-gray-500" />
                Help & Support
              </button>
            </div>
          </div>
        </div>
      </aside>
    </Fragment>
  );
}
