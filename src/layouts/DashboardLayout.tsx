import {
  DndContext,
  DragOverlay,
  DragEndEvent,
  DragStartEvent,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
} from "@dnd-kit/core";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import Project from "../components/project/Project";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { moveProject } from "../redux/slices/dashboardSlice";
import { Menu, X } from "lucide-react";
import useIsMobile from "../hooks/useIsMobile";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const folders = useSelector((state: RootState) => state.dashboard.folders);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<{ id: string; name: string } | null>(null);
  const dispatch = useDispatch();
  const projectsByFolder = useSelector((state: RootState) => state.dashboard.folders);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("sidebar");
      const menuButton = document.getElementById("menuButton");

      if (
        isMobile &&
        sidebar &&
        !sidebar.contains(event.target as Node) &&
        menuButton &&
        !menuButton.contains(event.target as Node) &&
        isSidebarOpen
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile, isSidebarOpen]);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { id } = event.active;
    const folder = projectsByFolder.find((f) => f.projects.some((p) => p.id === id));
    const project = folder?.projects.find((p) => p.id === id);
    if (project) {
      setActiveProject(project);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      toast.error("Please drop the project in a folder", {
        icon: "🚫",
        style: {
          borderRadius: "10px",
          background: "#fff",
          color: "#333",
        },
      });
      return;
    }

    const fromIndex = folders.findIndex((f) => f.projects.find((p) => p.id === active.id));
    const toIndex = folders.findIndex((f) => f.name === over.id);

    if (fromIndex === -1 || toIndex === -1) {
      toast.error("Invalid target folder", {
        icon: "⚠️",
        style: {
          borderRadius: "10px",
          background: "#fff",
          color: "#333",
        },
      });
      return;
    }

    const fromFolder = folders[fromIndex];
    const toFolder = folders[toIndex];

    const projectToMove = fromFolder.projects.find((p) => p.id === active.id);
    if (!projectToMove) return;

    if (fromFolder.name === toFolder.name) {
      toast.error("Cannot move to the same folder", {
        icon: "🔄",
        style: {
          borderRadius: "10px",
          background: "#fff",
          color: "#333",
        },
      });
      return;
    }

    if (over && active.id !== over.id) {
      dispatch(moveProject({ projectId: active.id as string, targetFolder: over.id as string }));

      toast.promise(
        new Promise((resolve) =>
          setTimeout(() => {
            resolve(true);
          }, 800)
        ),
        {
          loading: `Moving ${projectToMove.name}...`,
          success: (
            <div className="flex items-center gap-2">
              <span className="font-medium">{projectToMove.name}</span>
              <span>➡️</span>
              <span className="font-medium">{toFolder.name}</span>
            </div>
          ),
          error: "Move failed",
        },
        {
          style: {
            borderRadius: "10px",
            background: "#fff",
            color: "#333",
          },
          success: {
            duration: 3000,
            icon: "✅",
          },
        }
      );
    }

    setActiveProject(null);
  };

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex h-screen bg-gray-50 overflow-hidden">
        <Sidebar id="sidebar" isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="flex flex-col flex-1 overflow-hidden">
          <Header>
            <button
              id="menuButton"
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isSidebarOpen ? <X size={20} className="text-gray-600" /> : <Menu size={20} className="text-gray-600" />}
            </button>
          </Header>

          <main className="flex-1 overflow-auto px-4 py-6 md:p-6">
            <div className="max-w-7xl mx-auto animate-fadeIn">{children}</div>
          </main>
        </div>

        {/* Backdrop for mobile sidebar */}
        {isMobile && isSidebarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-20" onClick={() => setSidebarOpen(false)} />
        )}
      </div>

      <DragOverlay>
        {activeProject ? (
          <div className="w-64 bg-white shadow-lg rounded-lg p-3 opacity-90 border-2 border-blue-500 transform scale-105">
            <Project name={activeProject.name} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
