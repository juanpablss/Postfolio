/* eslint-disable no-irregular-whitespace */
import React, { useEffect, useState } from 'react';
import Header from "../layouts/Header";
import { useParams } from "react-router-dom";
import { FiMapPin, FiEdit2, FiBriefcase, FiX, FiSave, FiPlus, FiTrash2, FiExternalLink } from 'react-icons/fi';
import TechnologyBadge from '../components/profile/TechnologyBadge';
import ContactLinkDisplay from '../components/profile/ContactLinkDisplay';

interface Technology {
  id: string;
  name: string;
  iconUrl?: string;
}

interface ContactLink {
  type: 'email' | 'phone' | 'linkedin' | 'github' | 'behance' | 'portfolio' | 'other';
  value: string;
  label?: string;
}

interface Project {
  id: string;
  title: string;
  imageUrl?: string;
  description?: string;
  projectUrl?: string;
  technologiesUsed?: Technology[];
}

interface BaseUserProfile {
  userId: string;
  username: string;
  fullName: string;
  profilePictureUrl?: string;
  coverImageUrl?: string;
  location?: string;
}

interface FreelancerProfileData extends BaseUserProfile {
  userType: 'freelancer';
  bio?: string;
  title?: string;
  availableForWork: boolean;
  technologies: Technology[];
  contactLinks: ContactLink[];
  projects?: Project[];
}

interface EmployerProfileData extends BaseUserProfile {
  userType: 'employer';
  companyName?: string;
  companyWebsite?: string;
  companyLogoUrl?: string;
  aboutCompany?: string;
}

type UserProfileData = FreelancerProfileData | EmployerProfileData;

// Mock de dados do usuário logado (substituir por contexto de autenticação real)
const MOCK_LOGGED_IN_USER_ID = "jose-cassios"; // Simula o ID do usuário logado

export default function UserProfilePage() {
  const { userId: routeUserId } = useParams<{ userId: string }>();
  const [profileData, setProfileData] = useState<UserProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);

  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [tempProfileData, setTempProfileData] = useState<FreelancerProfileData | EmployerProfileData | null>(null);
  const [newTechnology, setNewTechnology] = useState({ name: '', iconUrl: '' });
  const [newContactLink, setNewContactLink] = useState<ContactLink>({ type: 'other', value: '', label: '' });

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      let fetchedData: UserProfileData | null = null;
      let profileIdToLoad = routeUserId;
      if (!profileIdToLoad) {
        profileIdToLoad = MOCK_LOGGED_IN_USER_ID;
      }
      if (profileIdToLoad === "jose-cassios") {
        fetchedData = {
          userId: "jose-cassios",
          userType: 'freelancer',
          username: "jose-cassios",
          fullName: "José Cássios",
          profilePictureUrl: "/cassios.png",
          coverImageUrl: "/master-sword.jpg",
          bio: "Desenvolvedor Full Stack pronto para criar soluções inovadoras e eficientes com React, Node.js. Sempre em busca de novos desafios e aprendizados no universo da tecnologia.",
          title: "Engenheiro de Software Full Stack",
          location: "Caxias, Brasil",
          availableForWork: true,
          technologies: [ 
            { id: "1", name: "React", iconUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" },
            { id: "2", name: "Node.js", iconUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" },
            { id: "3", name: "TypeScript" },
            { id: "4", name: "Python", iconUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg"},
            { id: "5", name: "Figma", iconUrl: "https://www.vectorlogo.zone/logos/figma/figma-icon.svg" },
          ],
          contactLinks: [
            { type: 'email', value: 'cassios.torres.010@gmail.com' },
            { type: 'linkedin', value: 'linkedin.com/in/cassios-torres' },
            { type: 'github', value: 'github.com/cassios-torres' },
            { type: 'portfolio', value: 'cassios-torres.dev', label: 'Meu Portfólio' },
          ],
          projects: [
            { id: "p1", title: "Plataforma de E-learning Interativa", imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80", description: "Plataforma completa com cursos, quizzes e acompanhamento de progresso." },
            { id: "p2", title: "API Segura para Mobile Banking", imageUrl: "https://images.unsplash.com/photo-1518770660439-463061962052?auto=format&fit=crop&w=400&q=80", description: "Backend robusto para aplicativo financeiro." },
            { id: "p3", title: "Dashboard Analítico de Vendas", imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80", description: "Visualização de dados para tomada de decisão." },
          ],
        };
      } else if (profileIdToLoad === "contratante456") {
        fetchedData = {
          userId: "contratante456",
          userType: 'employer',
          username: "techcorp",
          fullName: "TechCorp Solutions",
          profilePictureUrl: "/cup.png",
          coverImageUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
          location: "Curitiba, Brasil",
          companyName: "TechCorp Solutions Ltda.",
          companyWebsite: "techcorp.example.com",
          aboutCompany: "Somos uma empresa líder em soluções de TI, buscando talentos para projetos inovadores. Valorizamos a criatividade e o trabalho em equipe.",
        };
      } else {
        console.warn(`Nenhum dado mockado encontrado para o perfil ID: ${profileIdToLoad}. Exibindo 'Perfil não encontrado'.`);
      }
      if (fetchedData) {
        setProfileData(fetchedData);
        setIsOwner(fetchedData.userId === MOCK_LOGGED_IN_USER_ID);
      } else {
        setProfileData(null); 
        setIsOwner(false);
      }
      setIsLoading(false);
    }, 500);
  }, [routeUserId]);

  const openEditModal = (section: string) => {
    setTempProfileData(JSON.parse(JSON.stringify(profileData)));
    setEditingSection(section);
  };

  const closeEditModal = () => {
    setEditingSection(null);
    setTempProfileData(null);
    setNewTechnology({ name: '', iconUrl: '' });
    setNewContactLink({ type: 'other', value: '', label: '' });
  };

  // Função de atualização para campos simples
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!tempProfileData) return;
    const { name, value } = e.target;
    setTempProfileData(prev => {
      if (!prev) return prev;
      return { ...prev, [name]: value };
    });
  };

  // Funções para tecnologias
  const handleAddTechnology = () => {
    if (!tempProfileData || tempProfileData.userType !== 'freelancer') return;
    if (!newTechnology.name) return;
    setTempProfileData(prev => {
      if (!prev || prev.userType !== 'freelancer') return prev;
      return {
        ...prev,
        technologies: [
          ...prev.technologies,
          { id: Date.now().toString(), name: newTechnology.name, iconUrl: newTechnology.iconUrl }
        ]
      };
    });
    setNewTechnology({ name: '', iconUrl: '' });
  };

  const handleRemoveTechnology = (id: string) => {
    if (!tempProfileData || tempProfileData.userType !== 'freelancer') return;
    setTempProfileData(prev => {
      if (!prev || prev.userType !== 'freelancer') return prev;
      return {
        ...prev,
        technologies: prev.technologies.filter(t => t.id !== id)
      };
    });
  };

  // Funções para contatos
  const handleAddContactLink = () => {
    if (!tempProfileData || tempProfileData.userType !== 'freelancer') return;
    if (!newContactLink.value) return;
    setTempProfileData(prev => {
      if (!prev || prev.userType !== 'freelancer') return prev;
      return {
        ...prev,
        contactLinks: [
          ...prev.contactLinks,
          { ...newContactLink }
        ]
      };
    });
    setNewContactLink({ type: 'other', value: '', label: '' });
  };

  const handleRemoveContactLink = (index: number) => {
    if (!tempProfileData || tempProfileData.userType !== 'freelancer') return;
    setTempProfileData(prev => {
      if (!prev || prev.userType !== 'freelancer') return prev;
      return {
        ...prev,
        contactLinks: prev.contactLinks.filter((_, i) => i !== index)
      };
    });
  };

  // Funções para projetos
  const [newProject, setNewProject] = useState<Project>({
    id: '',
    title: '',
    imageUrl: '',
    description: '',
    projectUrl: ''
  });

  const handleAddProject = () => {
    if (!tempProfileData || tempProfileData.userType !== 'freelancer') return;
    if (!newProject.title) return;
    setTempProfileData(prev => {
      if (!prev || prev.userType !== 'freelancer') return prev;
      return {
        ...prev,
        projects: [
          ...(prev.projects || []),
          { ...newProject, id: Date.now().toString() }
        ]
      };
    });
    setNewProject({ id: '', title: '', imageUrl: '', description: '', projectUrl: '' });
  };

  const handleRemoveProject = (id: string) => {
    if (!tempProfileData || tempProfileData.userType !== 'freelancer') return;
    setTempProfileData(prev => {
      if (!prev || prev.userType !== 'freelancer') return prev;
      return {
        ...prev,
        projects: (prev.projects || []).filter(p => p.id !== id)
      };
    });
  };

  // Foto de perfil e capa
  const handleProfilePictureChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && tempProfileData) {
      const file = e.target.files[0];
      const pictureUrl = URL.createObjectURL(file);
      setTempProfileData(prev => ({ ...prev!, profilePictureUrl: pictureUrl }) as UserProfileData);
    }
  };
  const handleCoverImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && tempProfileData) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setTempProfileData(prev => ({ ...prev!, coverImageUrl: imageUrl }) as UserProfileData);
    }
  };

  // Salvar alterações
  const handleSave = (section: string) => {
    if (tempProfileData) {
      setProfileData(tempProfileData);
      setIsOwner(tempProfileData.userId === MOCK_LOGGED_IN_USER_ID);
    }
    closeEditModal();
    alert(`${section.charAt(0).toUpperCase() + section.slice(1)} atualizado com sucesso! (Simulação)`);
  };

  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-blue-950 via-indigo-950 to-purple-950 min-h-screen flex items-center justify-center text-blue-100">
        Carregando perfil...
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="bg-gradient-to-br from-blue-950 via-indigo-950 to-purple-950 min-h-screen flex items-center justify-center text-blue-100">
        Perfil não encontrado.
      </div>
    );
  }

  const renderEditButton = (section: string) => {
    if (isOwner && profileData.userType === 'freelancer') {
      return (
        <button
          onClick={() => openEditModal(section)}
          className="text-indigo-400 hover:text-indigo-200 transition-colors ml-2"
          aria-label={`Editar ${section}`}
        >
          <FiEdit2 size={18} />
        </button>
      );
    }
    return null;
  };

  const freelancerData = profileData.userType === 'freelancer' ? profileData : null;
  const employerData = profileData.userType === 'employer' ? profileData : null;

  // Modais de edição
  const renderEditModal = () => {
    if (!editingSection || !tempProfileData) return null;

    // Modal para nome e título
    if (editingSection === 'nameAndTitle') {
      return (
        <ModalBase title="Editar Nome e Título" onClose={closeEditModal}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-blue-200">Nome completo</label>
              <input
                name="fullName"
                value={tempProfileData.fullName}
                onChange={handleNameChange}
                className="w-full rounded p-2 text-black"
              />
            </div>
            {tempProfileData.userType === 'freelancer' && (
              <div>
                <label className="block text-sm text-blue-200">Título profissional</label>
                <input
                  name="title"
                  value={(tempProfileData as FreelancerProfileData).title || ''}
                  onChange={handleNameChange}
                  className="w-full rounded p-2 text-black"
                />
              </div>
            )}
            {tempProfileData.userType === 'employer' && (
              <div>
                <label className="block text-sm text-blue-200">Nome da empresa</label>
                <input
                  name="companyName"
                  value={(tempProfileData as EmployerProfileData).companyName || ''}
                  onChange={handleNameChange}
                  className="w-full rounded p-2 text-black"
                />
              </div>
            )}
          </div>
          <ModalFooter onSave={() => handleSave('nome/título')} onCancel={closeEditModal} />
        </ModalBase>
      );
    }

    // Modal para bio
    if (editingSection === 'bio') {
      return (
        <ModalBase title="Editar Bio/Descrição" onClose={closeEditModal}>
          <textarea
            name={tempProfileData.userType === 'freelancer' ? "bio" : "aboutCompany"}
            value={tempProfileData.userType === 'freelancer'
              ? (tempProfileData as FreelancerProfileData).bio || ''
              : (tempProfileData as EmployerProfileData).aboutCompany || ''}
            onChange={handleNameChange}
            rows={5}
            className="w-full rounded p-2 text-black"
          />
          <ModalFooter onSave={() => handleSave('bio')} onCancel={closeEditModal} />
        </ModalBase>
      );
    }

    // Modal para localização
    if (editingSection === 'location') {
      return (
        <ModalBase title="Editar Localização" onClose={closeEditModal}>
          <input
            name="location"
            value={tempProfileData.location || ''}
            onChange={handleNameChange}
            className="w-full rounded p-2 text-black"
          />
          <ModalFooter onSave={() => handleSave('localização')} onCancel={closeEditModal} />
        </ModalBase>
      );
    }

    // Modal para tecnologias
    if (editingSection === 'technologies' && tempProfileData.userType === 'freelancer') {
      return (
        <ModalBase title="Editar Tecnologias" onClose={closeEditModal}>
          <div className="mb-4">
            <div className="flex gap-2 mb-2">
              <input
                placeholder="Nome da tecnologia"
                value={newTechnology.name}
                onChange={e => setNewTechnology(nt => ({ ...nt, name: e.target.value }))}
                className="rounded p-2 text-black flex-1"
              />
              <input
                placeholder="URL do ícone (opcional)"
                value={newTechnology.iconUrl}
                onChange={e => setNewTechnology(nt => ({ ...nt, iconUrl: e.target.value }))}
                className="rounded p-2 text-black flex-1"
              />
              <button
                onClick={handleAddTechnology}
                className="bg-indigo-600 text-white p-2 rounded"
              >
                <FiPlus />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {(tempProfileData as FreelancerProfileData).technologies.map(tech => (
                <span key={tech.id} className="flex items-center bg-indigo-800 px-2 py-1 rounded text-white text-xs">
                  {tech.name}
                  <button onClick={() => handleRemoveTechnology(tech.id)} className="ml-1 text-red-300">
                    <FiTrash2 size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>
          <ModalFooter onSave={() => handleSave('tecnologias')} onCancel={closeEditModal} />
        </ModalBase>
      );
    }

    // Modal para contatos
    if (editingSection === 'contactLinks' && tempProfileData.userType === 'freelancer') {
      return (
        <ModalBase title="Editar Contatos" onClose={closeEditModal}>
          <div className="mb-4">
            <div className="flex gap-2 mb-2">
              <select
                value={newContactLink.type}
                onChange={e => setNewContactLink(nc => ({ ...nc, type: e.target.value as ContactLink['type'] }))}
                className="rounded p-2 text-black"
              >
                <option value="email">Email</option>
                <option value="phone">Telefone</option>
                <option value="linkedin">LinkedIn</option>
                <option value="github">GitHub</option>
                <option value="behance">Behance</option>
                <option value="portfolio">Portfólio</option>
                <option value="other">Outro</option>
              </select>
              <input
                placeholder="Valor"
                value={newContactLink.value}
                onChange={e => setNewContactLink(nc => ({ ...nc, value: e.target.value }))}
                className="rounded p-2 text-black flex-1"
              />
              <input
                placeholder="Rótulo (opcional)"
                value={newContactLink.label}
                onChange={e => setNewContactLink(nc => ({ ...nc, label: e.target.value }))}
                className="rounded p-2 text-black flex-1"
              />
              <button
                onClick={handleAddContactLink}
                className="bg-indigo-600 text-white p-2 rounded"
              >
                <FiPlus />
              </button>
            </div>
            <div className="space-y-1">
              {(tempProfileData as FreelancerProfileData).contactLinks.map((link, idx) => (
                <div key={idx} className="flex items-center bg-indigo-800 px-2 py-1 rounded text-white text-xs justify-between">
                  <span>{link.label ? `${link.label}: ` : ''}{link.value}</span>
                  <button onClick={() => handleRemoveContactLink(idx)} className="ml-2 text-red-300">
                    <FiTrash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <ModalFooter onSave={() => handleSave('contatos')} onCancel={closeEditModal} />
        </ModalBase>
      );
    }

    // Modal para projetos
    if (editingSection === 'projects' && tempProfileData.userType === 'freelancer') {
      return (
        <ModalBase title="Editar Projetos" onClose={closeEditModal}>
          <div className="mb-4">
            <div className="flex flex-col gap-2 mb-3">
              <input
                placeholder="Título do projeto"
                value={newProject.title}
                onChange={e => setNewProject(np => ({ ...np, title: e.target.value }))}
                className="rounded p-2 text-black"
              />
              <input
                placeholder="URL da imagem"
                value={newProject.imageUrl}
                onChange={e => setNewProject(np => ({ ...np, imageUrl: e.target.value }))}
                className="rounded p-2 text-black"
              />
              <input
                placeholder="URL do projeto"
                value={newProject.projectUrl}
                onChange={e => setNewProject(np => ({ ...np, projectUrl: e.target.value }))}
                className="rounded p-2 text-black"
              />
              <textarea
                placeholder="Descrição"
                value={newProject.description}
                onChange={e => setNewProject(np => ({ ...np, description: e.target.value }))}
                className="rounded p-2 text-black"
              />
              <button
                onClick={handleAddProject}
                className="bg-indigo-600 text-white p-2 rounded flex items-center gap-1"
              >
                <FiPlus /> Adicionar Projeto
              </button>
            </div>
            <div className="space-y-2">
              {(tempProfileData as FreelancerProfileData).projects?.map((project) => (
                <div key={project.id} className="flex items-center bg-indigo-800 px-2 py-1 rounded text-white text-xs justify-between">
                  <span>{project.title}</span>
                  <button onClick={() => handleRemoveProject(project.id)} className="ml-2 text-red-300">
                    <FiTrash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <ModalFooter onSave={() => handleSave('projetos')} onCancel={closeEditModal} />
        </ModalBase>
      );
    }

    // Modal para foto de perfil
    if (editingSection === 'profilePicture') {
      return (
        <ModalBase title="Editar Foto de Perfil" onClose={closeEditModal}>
          <input type="file" accept="image/*" onChange={handleProfilePictureChange} className="mb-4" />
          {tempProfileData.profilePictureUrl && (
            <img src={tempProfileData.profilePictureUrl} alt="Nova foto" className="w-32 h-32 rounded-full mx-auto" />
          )}
          <ModalFooter onSave={() => handleSave('foto de perfil')} onCancel={closeEditModal} />
        </ModalBase>
      );
    }

    // Modal para imagem de capa
    if (editingSection === 'coverImage') {
      return (
        <ModalBase title="Editar Imagem de Capa" onClose={closeEditModal}>
          <input type="file" accept="image/*" onChange={handleCoverImageChange} className="mb-4" />
          {tempProfileData.coverImageUrl && (
            <img src={tempProfileData.coverImageUrl} alt="Nova capa" className="w-full h-40 object-cover rounded" />
          )}
          <ModalFooter onSave={() => handleSave('imagem de capa')} onCancel={closeEditModal} />
        </ModalBase>
      );
    }

    // Modal para adicionar projeto (atalho)
    if (editingSection === 'addProject' && tempProfileData.userType === 'freelancer') {
      return (
        <ModalBase title="Adicionar Projeto" onClose={closeEditModal}>
          <div className="flex flex-col gap-2">
            <input
              placeholder="Título do projeto"
              value={newProject.title}
              onChange={e => setNewProject(np => ({ ...np, title: e.target.value }))}
              className="rounded p-2 text-black"
            />
            <input
              placeholder="URL da imagem"
              value={newProject.imageUrl}
              onChange={e => setNewProject(np => ({ ...np, imageUrl: e.target.value }))}
              className="rounded p-2 text-black"
            />
            <input
              placeholder="URL do projeto"
              value={newProject.projectUrl}
              onChange={e => setNewProject(np => ({ ...np, projectUrl: e.target.value }))}
              className="rounded p-2 text-black"
            />
            <textarea
              placeholder="Descrição"
              value={newProject.description}
              onChange={e => setNewProject(np => ({ ...np, description: e.target.value }))}
              className="rounded p-2 text-black"
            />
            <button
              onClick={handleAddProject}
              className="bg-indigo-600 text-white p-2 rounded flex items-center gap-1"
            >
              <FiPlus /> Adicionar Projeto
            </button>
          </div>
          <ModalFooter onSave={() => handleSave('projetos')} onCancel={closeEditModal} />
        </ModalBase>
      );
    }

    return null;
  };

  return (
    <div className="bg-gradient-to-br from-blue-950 via-indigo-950 to-purple-950 min-h-screen text-blue-100 font-sans">
      <Header />
      {renderEditModal()}

      {/* Banner do Perfil */}
      <section className="w-full h-56 sm:h-64 bg-gradient-to-r relative">
        {profileData.coverImageUrl && (
          <img
            src={profileData.coverImageUrl}
            alt="Banner de Perfil"
            className="w-full h-full object-cover absolute mix-blend-overlay opacity-60"
          />
        )}
        <div className="absolute -bottom-12 sm:-bottom-16 left-4 sm:left-8 p-1 bg-gradient-to-br from-blue-950 via-indigo-950 to-purple-950 rounded-full">
          <img
            src={profileData.profilePictureUrl || '/woman.png'}
            alt={profileData.fullName}
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-indigo-500 shadow-xl object-cover"
          />
        </div>
         {isOwner && profileData.userType === 'freelancer' && (
            <button 
              onClick={() => openEditModal('profilePicture')} 
              className="absolute bottom-0 left-20 sm:left-28 p-2 bg-indigo-600 hover:bg-indigo-500 rounded-full text-white shadow-md"
              aria-label="Editar foto de perfil"
            >
              <FiEdit2 size={16}/>
            </button>
          )}
           {isOwner && profileData.userType === 'freelancer' && (
             <button 
              onClick={() => openEditModal('coverImage')} 
              className="absolute top-4 right-4 p-2 bg-black/30 hover:bg-black/50 rounded-lg text-white text-xs sm:text-sm flex items-center gap-1"
              aria-label="Editar imagem de capa"
            >
              <FiEdit2 size={14}/> <span>Editar Capa</span>
            </button>
           )}
      </section>

      <main className="container mx-auto px-4 py-8 pt-20 sm:pt-24 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Coluna da Esquerda - Informações do Usuário */}
        <aside className="md:col-span-1 bg-indigo-900/50 border border-indigo-800 rounded-xl p-6 shadow-lg h-fit">
          <div className="flex justify-between items-start">
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-100">{profileData.fullName}</h1>
            {renderEditButton('nameAndTitle')}
          </div>

          {freelancerData?.title && (
            <p className="text-indigo-300 mt-1 text-sm sm:text-base">{freelancerData.title}</p>
          )}
          {employerData?.companyName && (
             <p className="text-indigo-300 mt-1 text-sm sm:text-base">{employerData.companyName}</p>
          )}

          {freelancerData?.availableForWork && (
            <span className="inline-block bg-emerald-600 text-white text-xs font-semibold px-3 py-1 rounded-full mt-3">
              Disponível para Trabalho
            </span>
          )}
          
          <div className="mt-4">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-semibold text-blue-200 mb-1">Sobre</h3>
              {renderEditButton('bio')}
            </div>
            <p className="text-indigo-200 text-sm leading-relaxed">
              {freelancerData?.bio || employerData?.aboutCompany || "Nenhuma descrição disponível."}
            </p>
          </div>

          {(profileData.location || (isOwner && profileData.userType === 'freelancer')) && (
            <div className="mt-6 text-indigo-300 text-sm">
              <div className="flex justify-between items-center">
                 <h3 className="text-base font-semibold text-blue-200 mb-1">Localização</h3>
                {renderEditButton('location')}
              </div>
              {profileData.location && (
                <div className="flex items-center gap-2 mt-1">
                  <FiMapPin className="h-5 w-5 text-indigo-400" />
                  <span>{profileData.location}</span>
                </div>
              )}
              {!profileData.location && isOwner && <p className="text-xs text-indigo-400">Adicione sua localização</p>}
            </div>
          )}

          {freelancerData && (
            <>
              <div className="mt-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-semibold text-blue-200 mb-2">Tecnologias</h3>
                  {renderEditButton('technologies')}
                </div>
                {freelancerData.technologies.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3">
                    {freelancerData.technologies.map((tech) => (
                      <TechnologyBadge key={tech.id || tech.name} name={tech.name} iconUrl={tech.iconUrl} />
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-indigo-400">{isOwner ? "Adicione suas tecnologias." : "Nenhuma tecnologia listada."}</p>
                )}
              </div>

              <div className="mt-6">
                 <div className="flex justify-between items-center">
                  <h3 className="text-base font-semibold text-blue-200 mb-2">Contato</h3>
                  {renderEditButton('contactLinks')}
                </div>
                {freelancerData.contactLinks.length > 0 ? (
                  <div className="space-y-2 text-sm">
                    {freelancerData.contactLinks.map((link, index) => (
                      <ContactLinkDisplay
                        key={index}
                        type={link.type}
                        value={link.value}
                        label={link.label}
                      />
                    ))}
                  </div>
                ) : (
                   <p className="text-xs text-indigo-400">{isOwner ? "Adicione seus links de contato." : "Nenhum contato listado."}</p>
                )}
              </div>
              
              {!isOwner && (
                <button className="w-full mt-8 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:brightness-110 transition-all duration-300">
                  Contratar {profileData.fullName}
                </button>
              )}
            </>
          )}

          {employerData && (
             <div className="mt-6">
                <h3 className="text-base font-semibold text-blue-200 mb-2">Informações da Empresa</h3>
                 {employerData.companyWebsite && (
                    <ContactLinkDisplay type="portfolio" value={employerData.companyWebsite} label="Website da Empresa" />
                 )}
                 <button className="w-full mt-8 px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold shadow-lg hover:brightness-110 transition-all duration-300 flex items-center justify-center gap-2">
                    <FiBriefcase /> Ver Vagas Abertas
                </button>
             </div>
          )}
        </aside>

        {/* Coluna da Direita - Trabalhos/Projetos (apenas para freelancer) */}
        {freelancerData && (
          <section className="md:col-span-3">
             <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-blue-100">Projetos</h2>
                {renderEditButton('projects')}
            </div>
            {freelancerData.projects && freelancerData.projects.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {freelancerData.projects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-indigo-900/50 border border-indigo-800 rounded-xl shadow-lg p-4 transition-all duration-300 hover:scale-105 hover:shadow-indigo-500/30"
                  >
                    <img
                      src={project.imageUrl || 'https://via.placeholder.com/400x220?text=Projeto'}
                      alt={project.title}
                      className="w-full h-40 sm:h-48 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-lg font-semibold text-blue-100 truncate" title={project.title}>{project.title}</h3>
                    {project.description && <p className="text-sm text-indigo-300 mt-1 mb-2 h-10 overflow-hidden text-ellipsis">{project.description}</p>}
                    {project.projectUrl && (
                       <a 
                          href={project.projectUrl.startsWith('http') ? project.projectUrl : `https://${project.projectUrl}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-indigo-400 hover:text-indigo-200 hover:underline inline-flex items-center gap-1"
                        >
                          Ver Projeto <FiExternalLink size={12}/>
                       </a>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-indigo-900/30 rounded-xl">
                <p className="text-indigo-300">{isOwner ? "Você ainda não adicionou nenhum projeto." : "Nenhum projeto listado."}</p>
                {isOwner && (
                   <button 
                    onClick={() => openEditModal('addProject')}
                    className="mt-4 px-6 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-md hover:brightness-110 transition-all"
                  >
                    Adicionar Projeto
                  </button>
                )}
              </div>
            )}
          </section>
        )}
        {/* Seção para contratantes, se houver algo específico para a coluna da direita */}
        {employerData && (
            <section className="md:col-span-3">
                <h2 className="text-2xl font-bold text-blue-100 mb-6">Vagas Abertas</h2>
                 <div className="text-center py-10 bg-indigo-900/30 rounded-xl">
                    <p className="text-indigo-300">A TechCorp Solutions está sempre em busca de novos talentos!</p>
                     <button 
                        onClick={() => alert("Redirecionando para a página de carreiras (simulação)...")}
                        className="mt-4 px-6 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold shadow-md hover:brightness-110 transition-all"
                    >
                        Ver Oportunidades
                    </button>
                </div>
            </section>
        )}
      </main>
    </div>
  );
}

// Componentes auxiliares para modais
function ModalBase({ title, children, onClose }: { title: string, children: React.ReactNode, onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
      <div className="bg-indigo-950 border border-indigo-700 rounded-xl shadow-xl w-full max-w-lg p-6 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-indigo-300 hover:text-red-400">
          <FiX size={22} />
        </button>
        <h2 className="text-xl font-bold mb-4 text-blue-100">{title}</h2>
        {children}
      </div>
    </div>
  );
}

function ModalFooter({ onSave, onCancel }: { onSave: () => void, onCancel: () => void }) {
  return (
    <div className="mt-6 flex justify-end gap-2">
      <button onClick={onCancel} className="px-4 py-2 rounded bg-indigo-800 text-blue-200 hover:bg-indigo-700">
        Cancelar
      </button>
      <button onClick={onSave} className="px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-500 flex items-center gap-1">
        <FiSave /> Salvar
      </button>
    </div>
  );
}
