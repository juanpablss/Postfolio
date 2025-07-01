import Header from "../layouts/Header";
import { useParams } from "react-router-dom";

export default function UserProfile() {
  const { userId } = useParams(); // Obtém o ID do usuário da URL, se necessário

  const user = {
    name: "José Cássios",
    profileImage: "cassios.png",
    available: true,
    description:
      "Desenvolvedor Full Stack apaixonado por criar soluções inovadoras e eficientes.",
    location: "São Paulo, Brasil",
    skills: [
      { name: "React", icon: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" }, // Exemplo de ícone, substitua por ícones reais ou SVGs
      { name: "Node.js", icon: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" },
      { name: "Figma", icon: "https://www.vectorlogo.zone/logos/figma/figma-icon.svg" },
      { name: "MongoDB", icon: "https://www.vectorlogo.zone/logos/mongodb/mongodb-icon.svg" },
    ],
    contact: {
      email: "jose.cassios@example.com",
      instagram: "josecassios_dev",
    },
    projects: [
      {
        id: 1,
        title: "Dashboard de Vendas Interativo",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
      },
      {
        id: 2,
        title: "Sistema de Gerenciamento de Tarefas",
        image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=400&q=80",
      },
      {
        id: 3,
        title: "E-commerce de Produtos Artesanais",
        image: "https://images.unsplash.com/photo-1556740738-b615c43d702d?auto=format&fit=crop&w=400&q=80",
      },
      {
        id: 4,
        title: "API para Aplicativo Mobile",
        image: "https://images.unsplash.com/photo-1518770660439-463061962052?auto=format&fit=crop&w=400&q=80",
      },
      {
        id: 5,
        title: "Website Institucional Moderno",
        image: "https://images.unsplash.com/photo-1496171368470-81920dccbb1b?auto=format&fit=crop&w=400&q=80",
      },
      {
        id: 6,
        title: "Plataforma de Cursos Online",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80",
      },
    ],
  };

  return (
    <div className="bg-gradient-to-br from-blue-950 via-indigo-950 to-purple-950 min-h-screen text-blue-100 font-sans">
      <Header />

      {/* Banner do Perfil */}
      <section className="w-full h-64 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 relative flex items-end justify-center">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80" // Imagem de capa, substitua por uma imagem de alta qualidade
          alt="Banner de Perfil"
          className="w-full h-full object-cover absolute mix-blend-overlay opacity-60"
        />
        <div className="absolute bottom-0 left-0 p-8 flex items-center gap-6">
          <img
            src={user.profileImage}
            alt={user.name}
            className="w-32 h-32 rounded-full border-4 border-indigo-500 shadow-xl object-cover"
          />
        </div>
      </section>

      {/* Conteúdo Principal do Perfil */}
      <main className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Coluna da Esquerda - Informações do Usuário */}
        <aside className="md:col-span-1 bg-indigo-900/50 border border-indigo-800 rounded-xl p-6 shadow-lg">
          <h1 className="text-3xl font-bold text-blue-100 mt-4">{user.name}</h1>
          {user.available && (
            <span className="inline-block bg-emerald-600 text-white text-xs font-semibold px-3 py-1 rounded-full mt-3">
              Disponível
            </span>
          )}
          <p className="text-indigo-200 mt-4 text-sm leading-relaxed">{user.description}</p>

          <div className="mt-6 text-indigo-300 text-sm">
            <div className="flex items-center gap-2 mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-indigo-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              <span>UX/UI Design & Web Design</span> {/* Hardcoded, pode ser dinâmico */}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-indigo-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{user.location}</span>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-blue-100 mt-8 mb-4">Ferramentas</h3>
          <div className="grid grid-cols-2 gap-4">
            {user.skills.map((skill, index) => (
              <div key={index} className="flex items-center gap-3 bg-indigo-800/70 p-3 rounded-lg">
                {skill.icon && (
                  <img src={skill.icon} alt={skill.name} className="w-6 h-6 object-contain" />
                )}
                <span className="text-indigo-200 text-sm">{skill.name}</span>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold text-blue-100 mt-8 mb-4">Contato</h3>
          <div className="text-indigo-200 text-sm">
            <p>
              Email:{" "}
              <a href={`mailto:${user.contact.email}`} className="hover:underline">
                {user.contact.email}
              </a>
            </p>
            <p className="mt-2">
              Instagram:{" "}
              <a
                href={`https://instagram.com/${user.contact.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                @{user.contact.instagram}
              </a>
            </p>
          </div>

          <button className="w-full mt-8 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:brightness-110 transition-all duration-300">
            Contratar
          </button>
        </aside>

        {/* Coluna da Direita - Trabalhos/Projetos */}
        <section className="md:col-span-3">
          <h2 className="text-2xl font-bold text-blue-100 mb-6">Trabalhos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {user.projects.map((project) => (
              <div
                key={project.id}
                className="bg-indigo-900/50 border border-indigo-800 rounded-xl shadow-lg p-4 transition hover:scale-105 hover:shadow-2xl"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold text-blue-100">{project.title}</h3>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}