import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
// Ícones podem ser adicionados depois, se necessário
// import { FiUser, FiMail, FiLock, FiCamera, FiLink, FiGithub, FiLinkedin } from 'react-icons/fi';

// Estilos customizados do Tailwind, similar ao LoginPage, se necessário
const TailwindRegisterStyles = () => (
  <style>{`
    @layer utilities {
      .animate-move-gradient {
        animation: moveGradient 20s ease infinite;
        background-size: 200% 200%;
      }
      @keyframes moveGradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      .animate-fade-in-up {
        animation: fadeInUp 0.8s ease-out;
      }
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .bg-glass-darker {
        background: rgba(17, 24, 39, 0.75); /* Um pouco mais escuro que o login para diferenciar */
        backdrop-filter: blur(18px);
        -webkit-backdrop-filter: blur(18px);
        border: 1px solid rgba(99, 102, 241, 0.1);
        box-shadow: 0 8px 32px 0 rgba(0,0,0,0.2);
      }
      .input-glass-register {
        background: rgba(255,255,255,0.05);
        border-bottom: 1px solid rgba(99,102,241,0.12);
      }
      .input-glass-register:focus {
        background: rgba(255,255,255,0.1);
        border-bottom-color: rgba(99,102,241,0.2);
      }
      .btn-register-gradient {
        background-image: linear-gradient(90deg, #2563eb 0%, #4f46e5 100%); /* Tom azulado/roxo */
      }
      .btn-register-glow {
        box-shadow: 0 0 16px 0 rgba(79,70,229,0.4), 0 2px 10px 0 rgba(37,99,235,0.2);
      }
      .tab-indicator {
        transition: all 0.3s ease;
      }
      .profile-pic-preview {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid rgba(99, 102, 241, 0.2);
        background-color: rgba(255,255,255,0.05);
      }
    }
  `}</style>
);

export default function RegisterPage() {
  const [step, setStep] = useState(1); // 1 para dados obrigatórios, 2 para perfil
  const navigate = useNavigate();

  // Estado para a primeira etapa
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Estado para a segunda etapa
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [profilePicPreview, setProfilePicPreview] = useState<string | null>(null);
  const [bio, setBio] = useState('');
  const [website, setWebsite] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [github, setGithub] = useState('');

  // Estado para erros de validação
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleNextStep = (e: FormEvent) => {
    e.preventDefault();
    const currentErrors: Record<string, string> = {};
    if (!email) currentErrors.email = 'Email é obrigatório.';
    else if (!/\S+@\S+\.\S+/.test(email)) currentErrors.email = 'Email inválido.';
    if (!username) currentErrors.username = 'Nome de usuário é obrigatório.';
    if (password.length < 6) currentErrors.password = 'Senha deve ter pelo menos 6 caracteres.';
    if (password !== confirmPassword) currentErrors.confirmPassword = 'As senhas não coincidem.';

    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      return;
    }
    setErrors({});
    setStep(2);
  };

  const handleProfilePicChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePic(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setProfilePic(null);
      setProfilePicPreview(null);
    }
  };

  const handleSubmitRegistration = async (e: FormEvent) => {
    e.preventDefault();
    // Validações da segunda etapa (se houver) podem ser adicionadas aqui
    const finalErrors: Record<string, string> = {};
    // Exemplo: if (bio.length > 200) finalErrors.bio = "Bio muito longa";
    
    if (Object.keys(finalErrors).length > 0) {
      setErrors(finalErrors);
      return;
    }
    setErrors({});

    // Lógica de envio do formulário (simulada)
    console.log('Dados de Registro:', {
      email, username, password, // Não envie a senha diretamente assim para um backend real sem HTTPS e hashing
      profilePic: profilePic?.name, // Apenas nome para log, envie o arquivo 'profilePic'
      bio, website, linkedin, github,
    });

    // Exemplo de como você poderia enviar os dados com FormData se tiver um arquivo
    const formData = new FormData();
    formData.append('email', email);
    formData.append('username', username);
    formData.append('password', password); // Hashear no backend!
    if (profilePic) {
      formData.append('profilePic', profilePic);
    }
    formData.append('bio', bio);
    formData.append('website', website);
    formData.append('linkedin', linkedin);
    formData.append('github', github);

    // const apiURL = import.meta.env.VITE_BACKEND_URL;
    // try {
    //   const response = await fetch(`${apiURL}/api/user/register`, {
    //     method: 'POST',
    //     body: formData, // FormData lida com 'multipart/form-data' automaticamente
    //   });
    //   if (response.ok) {
    //     const data = await response.json();
    //     console.log('Registro bem-sucedido:', data);
    //     alert('Registro finalizado com sucesso!');
    //     navigate('/login'); // Redireciona para o login após o registro
    //   } else {
    //     const errorData = await response.json();
    //     console.error('Falha no registro:', errorData);
    //     alert(`Erro no registro: ${errorData.message || 'Tente novamente.'}`);
    //   }
    // } catch (error) {
    //   console.error('Erro de rede ou servidor:', error);
    //   alert('Erro ao conectar com o servidor. Tente novamente mais tarde.');
    // }

    alert('Registro finalizado com sucesso! (Simulação)');
    navigate('/login'); // Redireciona para o login após o registro (simulado)
  };

  const renderStepOne = () => (
    <form onSubmit={handleNextStep} className="space-y-6">
      <div>
        <label htmlFor="email" className="text-sm font-medium text-blue-100 block mb-1">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          className="w-full py-2.5 px-4 rounded-lg border border-transparent input-glass-register text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
        />
        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="username" className="text-sm font-medium text-blue-100 block mb-1">Nome de Usuário</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="seu_usuario"
          className="w-full py-2.5 px-4 rounded-lg border border-transparent input-glass-register text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
        />
        {errors.username && <p className="text-red-400 text-xs mt-1">{errors.username}</p>}
      </div>
      <div>
        <label htmlFor="password" className="text-sm font-medium text-blue-100 block mb-1">Senha</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full py-2.5 px-4 rounded-lg border border-transparent input-glass-register text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
        />
        {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
      </div>
      <div>
        <label htmlFor="confirm-password" className="text-sm font-medium text-blue-100 block mb-1">Confirmar Senha</label>
        <input
          id="confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full py-2.5 px-4 rounded-lg border border-transparent input-glass-register text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
        />
        {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
      </div>
      <button
        type="submit"
        className="w-full py-3 rounded-lg text-white text-base font-semibold cursor-pointer transition-all duration-300 btn-register-gradient btn-register-glow hover:-translate-y-0.5 hover:shadow-lg hover:brightness-110 active:brightness-95"
      >
        Continuar
      </button>
    </form>
  );

  const renderStepTwo = () => (
    <form onSubmit={handleSubmitRegistration} className="space-y-6">
      <div className="flex flex-col items-center space-y-3">
        <label htmlFor="profile-pic-input" className="cursor-pointer">
          {profilePicPreview ? (
            <img src={profilePicPreview} alt="Preview" className="profile-pic-preview" />
          ) : (
            <div className="profile-pic-preview flex items-center justify-center text-blue-300/70">
              {/* <FiCamera size={40} /> */}
              <span className="text-sm">Foto de Perfil</span>
            </div>
          )}
        </label>
        <input
          type="file"
          id="profile-pic-input"
          accept="image/*"
          onChange={handleProfilePicChange}
          className="hidden"
        />
        {errors.profilePic && <p className="text-red-400 text-xs mt-1">{errors.profilePic}</p>}
      </div>
      <div>
        <label htmlFor="bio" className="text-sm font-medium text-blue-100 block mb-1">Bio</label>
        <textarea
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Conte um pouco sobre você..."
          rows={3}
          className="w-full py-2.5 px-4 rounded-lg border border-transparent input-glass-register text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
        />
        {errors.bio && <p className="text-red-400 text-xs mt-1">{errors.bio}</p>}
      </div>
      <div>
        <label htmlFor="website" className="text-sm font-medium text-blue-100 block mb-1">Website/Blog (Opcional)</label>
        <input
          id="website"
          type="url"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          placeholder="https://seu-site.com"
          className="w-full py-2.5 px-4 rounded-lg border border-transparent input-glass-register text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
        />
      </div>
      <div>
        <label htmlFor="linkedin" className="text-sm font-medium text-blue-100 block mb-1">LinkedIn (Opcional)</label>
        <input
          id="linkedin"
          type="url"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
          placeholder="https://linkedin.com/in/seu-perfil"
          className="w-full py-2.5 px-4 rounded-lg border border-transparent input-glass-register text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
        />
      </div>
      <div>
        <label htmlFor="github" className="text-sm font-medium text-blue-100 block mb-1">GitHub (Opcional)</label>
        <input
          id="github"
          type="url"
          value={github}
          onChange={(e) => setGithub(e.target.value)}
          placeholder="https://github.com/seu-usuario"
          className="w-full py-2.5 px-4 rounded-lg border border-transparent input-glass-register text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
        />
      </div>
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => { setErrors({}); setStep(1);}}
          className="w-full py-3 rounded-lg text-blue-100 bg-gray-600/30 hover:bg-gray-500/40 text-base font-semibold cursor-pointer transition-all duration-300"
        >
          Voltar
        </button>
        <button
          type="submit"
          className="w-full py-3 rounded-lg text-white text-base font-semibold cursor-pointer transition-all duration-300 btn-register-gradient btn-register-glow hover:-translate-y-0.5 hover:shadow-lg hover:brightness-110 active:brightness-95"
        >
          Finalizar Registro
        </button>
      </div>
    </form>
  );

  return (
    <>
      <TailwindRegisterStyles />
      <div className="min-h-screen w-full flex flex-col items-center justify-center font-sans bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 animate-move-gradient p-4">
        <h1
          className="mb-4 text-4xl sm:text-5xl font-light font-georgia tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300 drop-shadow-lg animate-fade-in-up"
          style={{ fontFamily: 'Georgia, serif', letterSpacing: '5px' }}
        >
          POSTFOLIO
        </h1>
        <div className="w-full max-w-md rounded-xl overflow-hidden shadow-2xl bg-glass-darker px-6 sm:px-8 py-8 animate-fade-in-up">
          <h2 className="text-center text-2xl mb-2 font-semibold text-blue-100 drop-shadow-md">
            Crie sua Conta
          </h2>
          {/* Indicador de Etapa */}
          <div className="flex justify-center mb-6">
            <div className={`w-1/2 py-2 text-center cursor-pointer ${step === 1 ? 'text-indigo-300 border-b-2 border-indigo-400' : 'text-gray-400 hover:text-gray-200'}`} onClick={() => { if (step === 2) {setErrors({}); setStep(1); }}}>
              Dados Pessoais
            </div>
            <div className={`w-1/2 py-2 text-center cursor-pointer ${step === 2 ? 'text-indigo-300 border-b-2 border-indigo-400' : 'text-gray-400 hover:text-gray-200'}`} onClick={() => { if (step === 1 && Object.keys(errors).length === 0 && email && username && password && confirmPassword && password === confirmPassword) handleNextStep(new Event('submit') as unknown as FormEvent); /* Hackish, better to validate first */ }}>
              Perfil
            </div>
          </div>
          {step === 1 ? renderStepOne() : renderStepTwo()}
        </div>
        <p className="text-center text-sm text-gray-400 mt-8">
          Já tem uma conta?{' '}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); navigate('/login'); }}
            className="font-semibold text-indigo-300 hover:text-indigo-200 transition-colors"
          >
            Faça Login
          </a>
        </p>
      </div>
    </>
  );
}
