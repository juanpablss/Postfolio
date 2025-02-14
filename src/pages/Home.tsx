import ProjectCard from "../components/ProjectCard";

export default function Home() {
  const projects = [
    {
      title: "Projeto 1",
      description: "Descrição breve do projeto 1.",
      image: "https://source.unsplash.com/300x200/?tech",
    },
    {
      title: "Projeto 2",
      description: "Descrição breve do projeto 2.",
      image: "https://source.unsplash.com/300x200/?design",
    },
    {
      title: "Projeto 3",
      description: "Descrição breve do projeto 3.",
      image: "https://source.unsplash.com/300x200/?innovation",
    },
  ];

  return (
    <div className="p-6">
      {/* Nome do Site */}
      <h1 className="text-4xl font-bold text-center mb-6">ArenaPortfolio</h1>

      {/* Grid de Projetos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </div>
  );
}
