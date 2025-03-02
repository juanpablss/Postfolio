import Header from "../layouts/Header";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="flex 'justify-between">
        <div className="flex flex-col items-center justify-center space-y-5">
          <h1 className="text-light-white text-3xl pad">A competição de Portífolios começou!</h1>
          <h2>Design, Front-End e Back-End</h2>
          <p>
            A competição foi um ideia para  incentivar a criatividade e o espito competitivo entre os alunos. Explore o portífolio dos alunos e vote no seu projeto favorito! Seu voto é importante para deixar a competição ainda mais interessante.
          </p>
          <button className="px-4 py-2 bg-light-white bg-opacity-45 text-light-white rounded-md hover:bg-opacity-80 hover:text-dark-black">
            Veja os Participantes
          </button>
        </div>

        <div>
            <img src="pages-img.png" alt=""/>
        </div>

      </div>
    </div>
  )
}