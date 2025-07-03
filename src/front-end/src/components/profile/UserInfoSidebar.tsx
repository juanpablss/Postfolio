import React from 'react';
import { FiMapPin, FiEdit2, FiBriefcase } from 'react-icons/fi';
import TechnologyBadge from './TechnologyBadge';
import ContactLinkDisplay from './ContactLinkDisplay';
import { UserProfileData, FreelancerProfileData, EmployerProfileData } from '../../types/profileTypes';

interface UserInfoSidebarProps {
  profileData: UserProfileData;
  isOwner: boolean;
  openEditModal: (section: string) => void;
  renderEditButton: (section: string) => React.ReactNode;
}

const UserInfoSidebar: React.FC<UserInfoSidebarProps> = ({ profileData, isOwner, openEditModal, renderEditButton }) => {
  const freelancerData = profileData.userType === 'freelancer' ? profileData as FreelancerProfileData : null;
  const employerData = profileData.userType === 'employer' ? profileData as EmployerProfileData : null;

  return (
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
  );
};

export default UserInfoSidebar;
