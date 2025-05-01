import { Clock, Calendar, BarChart } from "lucide-react";
import { useMemo } from "react";

type ProjectProps = {
  name: string;
};

// vinyl: generate deterministic colors based on project name
const getProjectColor = (name: string) => {
  const colors = [
    "from-blue-500 to-indigo-600",
    "from-purple-500 to-indigo-600",
    "from-emerald-500 to-teal-600",
    "from-orange-500 to-amber-600",
    "from-pink-500 to-rose-600",
    "from-cyan-500 to-sky-600",
    "from-red-500 to-rose-600",
    "from-lime-500 to-green-600",
  ];

  let sum = 0;
  for (let i = 0; i < name.length; i++) {
    sum += name.charCodeAt(i);
  }

  return colors[sum % colors.length];
};

export default function Project({ name }: ProjectProps) {
  const gradientClass = useMemo(() => getProjectColor(name), [name]);

  // vinyl: generate random stats for the project
  const randomProgress = useMemo(() => Math.floor(Math.random() * 100), []);
  const daysLeft = useMemo(() => Math.floor(Math.random() * 30) + 1, []);

  return (
    <div className="w-full h-full flex flex-col justify-between overflow-hidden">
      <div className="flex items-center">
        <div
          className={`h-10 w-10 shrink-0 rounded-md bg-gradient-to-br ${gradientClass} flex items-center justify-center text-white font-bold`}
        >
          {name.substring(0, 2).toUpperCase()}
        </div>
        <div className="ml-3 overflow-hidden">
          <h3 className="font-medium text-gray-800 truncate">{name}</h3>
          <div className="flex items-center text-xs text-gray-500 mt-1">
            <Clock size={12} className="mr-1" />
            <span>{daysLeft} days left</span>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Progress</span>
          <span>{randomProgress}%</span>
        </div>
        <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${gradientClass}`}
            style={{ width: `${randomProgress}%` }}
          ></div>
        </div>
      </div>

      <div className="flex justify-between mt-3 text-xs text-gray-500">
        <div className="flex items-center">
          <Calendar size={12} className="mr-1" />
          <span>May 15</span>
        </div>
        <div className="flex items-center">
          <BarChart size={12} className="mr-1" />
          <span>Medium</span>
        </div>
      </div>
    </div>
  );
}
