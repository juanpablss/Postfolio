import Header from "../layouts/Header";

export default function Home() {
  return (
    <div className="bg-pattern bg-no-repeat bg-top bg-cover min-h-screen w-full text-light-white">
      <Header />
      <div className="flex flex-col md:flex-row justify-between items-center px-6 md:px-10 py-16 gap-10">
        {/* Texto - Fica primeiro no mobile, mas mantém a posição no desktop */}
        <div className="flex flex-col items-center md:items-center justify-center space-y-5 max-w-[600px] order-1 md:order-1">
          <h1 className="text-light-white text-[33px] font-bold text-center md:text-left">
            A competição de Portfólios começou!
          </h1>
          <h2 className="text-xl font-semibold text-center md:text-left">Design, Frontend e Backend</h2>
          <p className="text-center justify-center leading-relaxed">
            A competição foi uma ideia para incentivar a criatividade e o espírito competitivo entre os alunos. Explore o portfólio dos alunos e vote no seu projeto favorito! Seu voto é importante para deixar a competição ainda mais interessante.
          </p>
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-light-white bg-opacity-25 text-light-white rounded-md hover:bg-opacity-80 hover:text-dark-black transition">
              Veja os competidores
            </button>
            <button className="px-4 py-2 bg-light-white bg-opacity-25 text-light-white rounded-md hover:bg-opacity-80 hover:text-dark-black transition">
              Participante da competição
            </button>
          </div>
          <h1 className="text-light-white text-[33px] font-bold text-center md:text-left">
          </h1>
        </div>
        <div className="flex justify-end md:w-[50%] order-2 md:order-1">
          <img src="pages-img.png" alt="Imagem de competição"  />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center px-6 md:px-10 py-16 gap-10">

        <div className="flex flex-col items-center justify-center space-y-5 order-1 md:order-1">
          <h1 className="text-light-white text-[33px] font-bold text-center md:text-left">
            1. O que é a competição?
          </h1>

          <div className="flex flex-col gap-3">

            <h2 className="text-lg text-zinc-50">Objetivo</h2>
            <div className="flex flex-col w-full mb-10 relative">
              <label className="bg-[#9E2777] shadow-shape px-10 py-5 text-light-white rounded-2xl md:rounded-full transition whitespace-normal text-center max-w-screen-md w-full sm:min-h-[100px] min-h-[150px] flex items-center justify-center relative">
                1. O objetivo principal da competição foi estimular o desenvolvimento dos alunos, o compartilhamento de experiência e um passatempo durante as férias!
              </label>
              <img src="cup.png" alt="Img" className="absolute top-20 -left-10 w-32 h-32 sm:-top-5 sm:-left-20 sm:w-40 sm:h-40" />
            </div>

            <h2 className="text-lg text-zinc-50">Quem está participando?</h2>
            <div className="flex flex-col w-full mb-20 relative">
              <label className="bg-[#9E2777] shadow-shape px-10 py-5 text-light-white rounded-2xl md:rounded-full transition whitespace-normal text-center max-w-screen-md w-full sm:min-h-[100px] min-h-[150px] flex items-center justify-center relative">
                1. Os participantes são os alunos de Ciências da Computação da turma de CC10.
              </label>
              <img src="woman.png" alt="Img" className="absolute top-20 right-[-40px] w-32 h-32 sm:-top-0 sm:right-[-60px] sm:w-40 sm:h-40" />
            </div>

          </div>
        </div>
        <div className="flex flex-col items-center justify-center space-y-5 order-1 md:order-1">
          <h1 className="text-light-white text-[33px] font-bold text-center md:text-left">
            Critérios para avaliação
          </h1>

          <div className="flex flex-col sm:flex-row justify-between gap-6 mt-10">
  {/* Card 1 */}
  <div className="bg-dark-blue text-white border-blue-950 border-4   rounded-2xl p-6 shadow-lg flex-1">
    <h3 className="text-xl font-bold mb-4 text-center">🎨 Design e Estética</h3>
    <ul className="list-disc list-inside space-y-1 text-sm sm:text-base">
      <li>Criatividade</li>
      <li>Layout</li>
      <li>Cores e Tipografia</li>
    </ul>
  </div>

  {/* Card 2 */}
  <div className="bg-dark-blue text-white border-blue-950 border-4 rounded-2xl p-6 shadow-lg flex-1">
    <h3 className="text-xl font-bold mb-4 text-center">⚙️ Funcionalidade e Performance</h3>
    <ul className="list-disc list-inside space-y-1 text-sm sm:text-base">
      <li>Adequação ao Propósito</li>
      <li>Escalabilidade</li>
      <li>Confiabilidade</li>
    </ul>
  </div>

    {/* Card 3 */}
    <div className="bg-dark-blue text-white border-blue-950 border-4 rounded-2xl p-6 shadow-lg flex-1">
      <h3 className="text-xl font-bold mb-4 text-center">🧭 Usabilidade do Usuário</h3>
      <ul className="list-disc list-inside space-y-1 text-sm sm:text-base">
        <li>Navegação Intuitiva</li>
        <li>Acessibilidade e Legibilidade</li>
        <li>Facilidade de Uso</li>
      </ul>
    </div>
  </div>


  <div className="w-[280px] h-[360px] perspective group cursor-pointer">
    <div className="relative w-full h-full transition-transform duration-700 transform-style preserve-3d group-hover:rotate-y-180">
      
      <div className="group [perspective:1000px] w-80 h-96 relative">
    <div className="relative w-full h-full duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
      {/* Frente */}
      <div className="absolute w-full h-full backface-hidden bg-white rounded-2xl shadow-md overflow-hidden font-sans">
        <div className="bg-[#f5f7fa] p-4 text-center">
          <img src="flyplan.png" alt="Logo FlyPlan" className="w-full h-auto mx-auto" />
        </div>
        <div className="p-5 text-center">
          <p className="text-sm text-gray-500 mb-2">Desenvolvedor Full Stack</p>
          <h2 className="text-xl text-gray-900 mb-4 font-semibold">José Cassios</h2>
          <a
            href="http://localhost:5174/"
            className="inline-block px-6 py-2 bg-blue-500 text-white text-sm font-semibold rounded-lg transition-all hover:bg-blue-600 hover:-translate-y-0.5"
          >
            Ver Portfolio
          </a>
        </div>
      </div>
      {/* Verso */}
      <div className="absolute w-full h-full backface-hidden bg-blue-600 rounded-2xl shadow-md text-white flex flex-col items-center justify-center [transform:rotateY(180deg)]">
        <h3 className="text-lg font-bold mb-2">Sobre mim</h3>
        <p className="text-sm px-4">Desenvolvedor apaixonado por tecnologia, focado em soluções inovadoras e experiência do usuário.</p>
        <a
          href="mailto:josecassios@email.com"
          className="mt-4 inline-block px-4 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100"
        >
          Entrar em contato
        </a>
      </div>
    </div>
  </div>

      {/* Verso do card */}
      <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-blue-800 text-white rounded-2xl shadow-md flex flex-col items-center justify-center p-6">
        <h2 className="text-lg font-bold mb-2">Mais sobre mim</h2>
        <p className="text-sm text-center mb-4">
          Gosto de criar APIs eficientes, resolver desafios técnicos e participar de projetos colaborativos. 💻
        </p>
        <a
          href="mailto:contato@josecassios.dev"
          className="text-sm underline hover:text-blue-300"
        >
          contato@josecassios.dev
        </a>
      </div>
    </div>
  </div>

    
        </div>

      </div>
      <div className="h-[200vh]"></div>
    </div>
  )
}
<h1 className="text-light-white text-[38px] font-bold text-center md:text-left">
  Critérios para a Avalição
</h1>