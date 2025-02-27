import ProjectCard from "./ProjectCard";
import useProjects from "./useProjects";

export default function ProjectGrid() {
  const projects = useProjects();

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-center mb-6 text-[#FFE5F1] drop-shadow-[0_0_10px_#7226FF]">
        Portfólios
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </div>
  );
}
