import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import Project from "./Project";
import { renameProject } from "../../redux/slices/dashboardSlice";
import { useDispatch } from "react-redux";
import { Check, Pencil, MoreVertical, Trash, Copy, MoveUpRight } from "lucide-react";

type Props = {
  id: string;
  name: string;
  folderName: string;
};

export default function DraggableProjectCard({ id, name, folderName }: Props) {
  const dispatch = useDispatch();
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    data: { projectId: id },
  });

  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectNameDraft, setProjectNameDraft] = useState(name);
  const [showMenu, setShowMenu] = useState(false);

  const handleProjectRename = () => {
    if (projectNameDraft.trim()) {
      dispatch(renameProject({ folderName, projectId: id, newName: projectNameDraft.trim() }));
    }
    setEditingProjectId(null);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <div className="group animate-fadeIn">
      <div className={`relative ${isDragging ? "z-50" : "z-10"}`}>
        <div
          className={`
          bg-white rounded-xl shadow-sm border border-gray-100 transition-all duration-300 ease-in-out
          ${
            isDragging
              ? "opacity-50 scale-95 rotate-1 shadow-none"
              : "group-hover:shadow-md group-hover:border-gray-200"
          }
        `}
        >
          <div className="flex justify-between items-center p-3 border-b border-gray-100">
            {editingProjectId === id ? (
              <div className="flex w-full">
                <input
                  value={projectNameDraft}
                  onChange={(e) => setProjectNameDraft(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleProjectRename()}
                  autoFocus
                  className="flex-1 p-1.5 text-sm rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Project name"
                />
                <button onClick={handleProjectRename} className="ml-2 p-1 rounded-md text-green-600 hover:bg-green-50">
                  <Check size={16} />
                </button>
              </div>
            ) : (
              <div className="flex justify-between w-full">
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">{folderName}</div>
                <div className="flex gap-1">
                  <button
                    onClick={() => {
                      setEditingProjectId(id);
                      setProjectNameDraft(name);
                    }}
                    className="p-1 rounded-md text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                  >
                    <Pencil size={14} />
                  </button>
                  <div className="relative">
                    <button
                      onClick={() => setShowMenu(!showMenu)}
                      className="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      <MoreVertical size={14} />
                    </button>

                    {showMenu && (
                      <>
                        <div className="fixed inset-0 z-20" onClick={closeMenu} />
                        <div className="absolute right-0 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-30">
                          <div className="py-1" role="menu" aria-orientation="vertical">
                            <button
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={closeMenu}
                            >
                              <Copy size={14} className="mr-2" />
                              Duplicate
                            </button>
                            <button
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={closeMenu}
                            >
                              <MoveUpRight size={14} className="mr-2" />
                              Move to...
                            </button>
                            <button
                              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                              onClick={closeMenu}
                            >
                              <Trash size={14} className="mr-2" />
                              Delete
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div ref={setNodeRef} {...attributes} {...listeners} className="p-4 cursor-move">
            <Project name={name} />
          </div>
        </div>
      </div>

      {!isDragging && (
        <div className="absolute inset-x-0 top-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity -translate-y-3">
          <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg">Drag to move</div>
        </div>
      )}
    </div>
  );
}
