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
          <p className="text-justify leading-relaxed">
            A competição foi uma ideia para incentivar a criatividade e o espírito competitivo entre os alunos. Explore o portfólio dos alunos e vote no seu projeto favorito! Seu voto é importante para deixar a competição ainda mais interessante.
          </p>
          <button className="px-4 py-2 bg-light-white bg-opacity-45 text-light-white rounded-md hover:bg-opacity-80 hover:text-dark-black transition">
            Veja os Participantes
          </button>
        </div>

        <div className="flex justify-end md:w-[50%] order-2 md:order-1">
          <img src="pages-img.png" alt="Imagem de competição"  />
        </div>
      </div>

      <div className="h-[200vh]"></div>

    </div>
  )
}