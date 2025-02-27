interface ProjectProps {
  title: string;
  description: string;
  image: string;
}

export default function ProjectCard({ title, description, image }: ProjectProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md bg-card-bg bg-cover bg-center text-dark-900">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4 bg-black/50 backdrop-blur-sm rounded-lg">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>
  );
}
