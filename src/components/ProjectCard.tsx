interface ProjectProps {
    title: string;
    description: string;
    image: string;
  }
  
  export default function ProjectCard({ title, description, image }: ProjectProps) {
    return (
      <div className="border rounded-lg overflow-hidden shadow-md bg-white">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    );
  }
  