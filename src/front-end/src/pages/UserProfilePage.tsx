/* eslint-disable no-irregular-whitespace */
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import UserProfileLayout from '../layouts/UserProfileLayout';
import { UserProfileData, FreelancerProfileData, EmployerProfileData, ContactLink, Project, Technology } from '../types/profileTypes';

// Mock de dados do usuário logado (substituir por contexto de autenticação real)
const MOCK_LOGGED_IN_USER_ID = "jose-cassios"; // Simula o ID do usuário logado

export default function UserProfilePage() {
  const { userId: routeUserId } = useParams<{ userId: string }>();
  const [profileData, setProfileData] = useState<UserProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);

  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [tempProfileData, setTempProfileData] = useState<FreelancerProfileData | EmployerProfileData | null>(null);
  const [newTechnology, setNewTechnology] = useState<Technology>({ id: '', name: '', iconUrl: '' });
  const [newContactLink, setNewContactLink] = useState<ContactLink>({ type: 'other', value: '', label: '' });
  const [newProject, setNewProject] = useState<Project>({ id: '', title: '', imageUrl: '', description: '', projectUrl: '' });

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
    setNewTechnology({ id: '', name: '', iconUrl: '' });
    setNewContactLink({ type: 'other', value: '', label: '' });
    setNewProject({ id: '', title: '', imageUrl: '', description: '', projectUrl: '' });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!tempProfileData) return;
    const { name, value } = e.target;
    setTempProfileData((prev: unknown) => {
      if (!prev) return prev;
      return { ...prev, [name]: value };
    });
  };

  const handleAddTechnology = () => {
    if (!tempProfileData || tempProfileData.userType !== 'freelancer') return;
    if (!newTechnology.name) return; // Certifique-se que o nome da tecnologia não está vazio
    setTempProfileData((prev: { userType: string; technologies: unknown; }) => {
        if (!prev || prev.userType !== 'freelancer') return prev;
        // Garanta que `technologies` seja um array antes de adicionar
        const currentTechnologies = Array.isArray(prev.technologies) ? prev.technologies : [];
        return {
            ...prev,
            technologies: [
                ...currentTechnologies,
                { ...newTechnology, id: Date.now().toString() } // Adiciona ID único
            ]
        };
    });
    setNewTechnology({ id: '', name: '', iconUrl: '' }); // Resetar o estado de nova tecnologia
};


  const handleRemoveTechnology = (id: string) => {
    if (!tempProfileData || tempProfileData.userType !== 'freelancer') return;
    setTempProfileData((prev: { userType: string; technologies: unknown[]; }) => {
      if (!prev || prev.userType !== 'freelancer') return prev;
      return {
        ...prev,
        technologies: prev.technologies.filter((t: { id: string; }) => t.id !== id)
      };
    });
  };

  const handleAddContactLink = () => {
    if (!tempProfileData || tempProfileData.userType !== 'freelancer') return;
    if (!newContactLink.value) return;
    setTempProfileData((prev: { userType: string; contactLinks: unknown; }) => {
      if (!prev || prev.userType !== 'freelancer') return prev;
      const currentContactLinks = Array.isArray(prev.contactLinks) ? prev.contactLinks : [];
      return {
        ...prev,
        contactLinks: [
          ...currentContactLinks,
          { ...newContactLink }
        ]
      };
    });
    setNewContactLink({ type: 'other', value: '', label: '' });
  };

  const handleRemoveContactLink = (index: number) => {
    if (!tempProfileData || tempProfileData.userType !== 'freelancer') return;
    setTempProfileData((prev: { userType: string; contactLinks: unknown[]; }) => {
      if (!prev || prev.userType !== 'freelancer') return prev;
      return {
        ...prev,
        contactLinks: prev.contactLinks.filter((_: any, i: number) => i !== index)
      };
    });
  };

  const handleAddProject = () => {
    if (!tempProfileData || tempProfileData.userType !== 'freelancer') return;
    if (!newProject.title) return;
    setTempProfileData((prev: { userType: string; projects: unknown; }) => {
      if (!prev || prev.userType !== 'freelancer') return prev;
      const currentProjects = Array.isArray(prev.projects) ? prev.projects : [];
      return {
        ...prev,
        projects: [
          ...currentProjects,
          { ...newProject, id: Date.now().toString() }
        ]
      };
    });
    setNewProject({ id: '', title: '', imageUrl: '', description: '', projectUrl: '' });
  };

  const handleRemoveProject = (id: string) => {
    if (!tempProfileData || tempProfileData.userType !== 'freelancer') return;
    setTempProfileData((prev: { userType: string; projects: unknown; }) => {
      if (!prev || prev.userType !== 'freelancer') return prev;
      return {
        ...prev,
        projects: (prev.projects || []).filter((p: { id: string; }) => p.id !== id)
      };
    });
  };

  const handleProfilePictureChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && tempProfileData) {
      const file = e.target.files[0];
      const pictureUrl = URL.createObjectURL(file);
      setTempProfileData((prev: unknown) => ({ ...prev!, profilePictureUrl: pictureUrl }) as UserProfileData);
    }
  };

  const handleCoverImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && tempProfileData) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setTempProfileData((prev: unknown) => ({ ...prev!, coverImageUrl: imageUrl }) as UserProfileData);
    }
  };

  const handleSave = (section: string) => {
    if (tempProfileData) {
      setProfileData(tempProfileData);
      setIsOwner(tempProfileData.userId === MOCK_LOGGED_IN_USER_ID);
    }
    closeEditModal();
    alert(`${section.charAt(0).toUpperCase() + section.slice(1)} atualizado com sucesso! (Simulação)`);
  };

  return (
    <UserProfileLayout
      profileData={profileData}
      isLoading={isLoading}
      isOwner={isOwner}
      editingSection={editingSection}
      tempProfileData={tempProfileData}
      newTechnology={newTechnology}
      setNewTechnology={setNewTechnology}
      newContactLink={newContactLink}
      setNewContactLink={setNewContactLink}
      newProject={newProject}
      setNewProject={setNewProject}
      openEditModal={openEditModal}
      closeEditModal={closeEditModal}
      handleNameChange={handleNameChange}
      handleAddTechnology={handleAddTechnology}
      handleRemoveTechnology={handleRemoveTechnology}
      handleAddContactLink={handleAddContactLink}
      handleRemoveContactLink={handleRemoveContactLink}
      handleAddProject={handleAddProject}
      handleRemoveProject={handleRemoveProject}
      handleProfilePictureChange={handleProfilePictureChange}
      handleCoverImageChange={handleCoverImageChange}
      handleSave={handleSave}
    />
  );
}
