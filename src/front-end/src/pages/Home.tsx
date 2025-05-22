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

          <div className="flex justify-between gap-4">
            <label className="bg-dark-blue shadow-shape px-10 py-5 text-light-white rounded-2xl transition whitespace-normal text-center max-w-screen-md w-full sm:min-h-[100px] min-h-[150px] flex items-center justify-center relative">
              1. O objetivo principal da competição foi estimular o desenvolvimento dos alunos, o compartilhamento de experiência e um passatempo durante as férias!
            </label>
            <label className="bg-dark-pink shadow-shape px-10 py-5 text-light-white rounded-2xl transition whitespace-normal text-center max-w-screen-md w-full sm:min-h-[100px] min-h-[150px] flex items-center justify-center relative">
              1. O objetivo principal da competição foi estimular o desenvolvimento dos alunos, o compartilhamento de experiência e um passatempo durante as férias!
            </label>
            <label className="bg-light-blue shadow-shape px-10 py-5 text-light-white rounded-2xl transition whitespace-normal text-center max-w-screen-md w-full sm:min-h-[100px] min-h-[150px] flex items-center justify-center relative">
              1. O objetivo principal da competição foi estimular o desenvolvimento dos alunos, o compartilhamento de experiência e um passatempo durante as férias!
            </label>
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