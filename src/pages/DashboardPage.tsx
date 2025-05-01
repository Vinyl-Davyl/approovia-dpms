import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import DraggableProjectCard from "../components/project/DraggableProjectCard";
import SidebarFolderItem from "../components/sidebar/SidebarFolderItem";
import useIsMobile from "../hooks/useIsMobile";
import { FolderPlus, Plus, Filter, ArrowDownAZ } from "lucide-react";
import { useState } from "react";

export default function DashboardPage() {
  const selectedFolder = useSelector((state: RootState) => state.dashboard.selectedFolder);
  const folders = useSelector((state: RootState) => state.dashboard.folders);
  const folder = useSelector((state: RootState) => state.dashboard.folders.find((f) => f.name === selectedFolder));
  const isMobile = useIsMobile();
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Sort projects alphabetically
  const sortedProjects = folder?.projects.slice().sort((a, b) => {
    return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{selectedFolder} Projects</h2>
          <p className="text-gray-500 mt-1">
            {folder?.projects.length} {folder?.projects.length === 1 ? "project" : "projects"} in this folder
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <button className="flex items-center gap-2 px-3 py-2 rounded-md border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 transition-colors">
              <Filter size={16} />
              <span className="text-sm">Filter</span>
            </button>
          </div>

          <button
            className="flex items-center gap-2 px-3 py-2 rounded-md border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          >
            <ArrowDownAZ size={16} className={sortOrder === "desc" ? "rotate-180" : ""} />
            <span className="text-sm">Sort</span>
          </button>

          <button className="flex items-center gap-2 px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors">
            <Plus size={16} />
            <span className="text-sm">New Project</span>
          </button>
        </div>
      </div>

      {isMobile && (
        <div className="p-4 bg-white rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-3 flex items-center">
            <FolderPlus size={20} className="mr-2 text-blue-500" />
            Project Folders
          </h3>
          <ul className="space-y-1">
            {folders.map((folder) => (
              <SidebarFolderItem key={folder.name} folderName={folder.name} onClose={() => {}} />
            ))}
          </ul>
        </div>
      )}

      {sortedProjects && sortedProjects.length > 0 && folder ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProjects.map((project) => (
            <DraggableProjectCard key={project.id} id={project.id} name={project.name} folderName={folder.name} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <FolderPlus size={48} className="text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">No projects in this folder</h3>
          <p className="text-gray-500 mb-4 text-center max-w-md">
            Start by creating a new project or drag existing projects here
          </p>
          <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors">
            <Plus size={16} />
            <span>Add Project</span>
          </button>
        </div>
      )}
    </div>
  );
}
