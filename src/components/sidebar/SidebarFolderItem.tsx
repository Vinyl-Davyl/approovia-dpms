import { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { FolderIcon, Pencil, Check, X, ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { selectFolder, renameFolder } from "../../redux/slices/dashboardSlice";
import { RootState } from "../../redux/store";

type SidebarFolderItemProps = {
  folderName: string;
  onClose: () => void;
};

export default function SidebarFolderItem({ folderName, onClose }: SidebarFolderItemProps) {
  const dispatch = useDispatch();
  const selectedFolder = useSelector((state: RootState) => state.dashboard.selectedFolder);
  const folder = useSelector((state: RootState) => state.dashboard.folders.find((f) => f.name === folderName));
  const { setNodeRef, isOver } = useDroppable({ id: folderName });

  const isSelected = selectedFolder === folderName;

  const [isEditingFolder, setIsEditingFolder] = useState(false);
  const [folderTitle, setFolderTitle] = useState(folderName);
  const [isExpanded, setIsExpanded] = useState(true);

  const handleFolderRename = () => {
    if (folderTitle.trim() && folderTitle !== folderName) {
      dispatch(renameFolder({ oldName: folderName, newName: folderTitle.trim() }));
    }
    setIsEditingFolder(false);
  };

  const cancelEditing = () => {
    setFolderTitle(folderName);
    setIsEditingFolder(false);
  };

  const bgColor = isSelected
    ? "bg-blue-50 text-blue-700 border-l-4 border-blue-500"
    : isOver
    ? "bg-blue-50 border-l-4 border-blue-300"
    : "text-gray-600 hover:bg-gray-50 border-l-4 border-transparent";

  return (
    <li ref={setNodeRef} className="transition-all duration-200">
      <div className={`flex flex-col rounded-md ${bgColor}`}>
        <div className="flex items-center w-full">
          <button
            className="flex items-center flex-1 px-3 py-2 text-sm font-medium"
            onClick={() => {
              if (!isEditingFolder) {
                dispatch(selectFolder(folderName));
                onClose();
              }
            }}
          >
            <ChevronRight
              size={16}
              className={`mr-1 transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
            />
            <FolderIcon size={16} className="mr-2" />

            {isEditingFolder ? (
              <div className="flex items-center flex-1">
                <input
                  value={folderTitle}
                  onChange={(e) => setFolderTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleFolderRename();
                    if (e.key === "Escape") cancelEditing();
                  }}
                  autoFocus
                  className="flex-1 px-2 py-1 bg-white rounded border text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <div className="flex ml-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFolderRename();
                    }}
                    className="p-1 text-green-600 hover:text-green-700"
                  >
                    <Check size={14} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      cancelEditing();
                    }}
                    className="p-1 text-red-600 hover:text-red-700"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center w-full">
                <span>{folderName}</span>
                <div className="flex items-center">
                  <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full">{folder?.projects.length}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsEditingFolder(true);
                      setFolderTitle(folderName);
                    }}
                    className="ml-2 p-1 text-gray-400 hover:text-blue-600 transition-colors rounded-full hover:bg-blue-50"
                  >
                    <Pencil size={12} />
                  </button>
                </div>
              </div>
            )}
          </button>
        </div>
      </div>
    </li>
  );
}
