import React from 'react';

const AboutUsPage: React.FC = () => {
  return (
    // <MainLayout> // Exemplo se MainLayout existir
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 text-white font-sans animate-move-gradient">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <header className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            Sobre Nós
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-300">
            Conheça a equipe e a visão por trás do Postfolio.
          </p>
        </header>

        <section className="animate-fade-in-up animation-delay-200 mb-16 bg-white/5 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-2xl">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-indigo-300">Nossa Missão</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            No Postfolio, nossa missão é fornecer uma plataforma elegante, intuitiva e poderosa
            para que criadores, desenvolvedores, designers e artistas possam apresentar seus
            trabalhos e projetos para o mundo. Acreditamos que um portfólio bem construído
            é uma ferramenta essencial para o crescimento profissional e a descoberta de novas
            oportunidades.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Queremos capacitar indivíduos a contarem suas histórias através de seus projetos,
            facilitando a conexão com potenciais empregadores, clientes e colaboradores.
            Buscamos simplificar o processo de criação e gerenciamento de portfólios,
            permitindo que você se concentre no que faz de melhor: criar.
          </p>
        </section>

        <section className="animate-fade-in-up animation-delay-400 mb-16 bg-white/5 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-2xl">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-purple-300">Nossa Visão</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            Nossa visão é ser a plataforma de referência para a exposição de talentos criativos
            e técnicos globalmente. Almejamos um ecossistema onde a qualidade do trabalho
            fale por si só, e onde as barreiras para mostrar suas habilidades sejam mínimas.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Imaginamos um futuro onde cada projeto em seu Postfolio possa abrir portas,
            gerar discussões construtivas e levar a colaborações inovadoras. Estamos
            constantemente explorando novas tecnologias e abordagens para tornar essa
            visão uma realidade.
          </p>
        </section>
        
        <section className="animate-fade-in-up animation-delay-600 text-center bg-white/5 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-2xl">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-pink-300">Junte-se a Nós</h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            Seja você um estudante começando sua jornada, um profissional experiente
            buscando novos desafios, ou um freelancer querendo mostrar seu valor,
            o Postfolio é o seu espaço. Crie seu portfólio hoje mesmo e dê o próximo
            passo em sua carreira!
          </p>
          <a
            href="/register" // Ou para a página de criação de portfólio se o usuário já estiver logado
            className="inline-block bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transform transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          >
            Comece Agora
          </a>
        </section>
      </div>
      <style jsx global>{`
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
          animation: fadeInUp 0.8s ease-out forwards;
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
        .animation-delay-200 { animation-delay: 0.2s; opacity: 0; }
        .animation-delay-400 { animation-delay: 0.4s; opacity: 0; }
        .animation-delay-600 { animation-delay: 0.6s; opacity: 0; }
      `}</style>
    </div>
    // </MainLayout> // Exemplo se MainLayout existir
  );
};

export default AboutUsPage;
