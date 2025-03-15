import { FastifyInstance } from "fastify";
import { PortfolioController } from "../controller/PortfolioController";
import { UserMiddle } from "../middleware/UserMiddle";
import PortfolioRepositoryImp from "../repository/PortfolioRepositoryImp";
import { PortfolioServiceImp } from "../../application/service/PortfolioServiceImp";

const portfolioRepository = new PortfolioRepositoryImp();
const portfolioService = PortfolioServiceImp(portfolioRepository);
const portfolioController = PortfolioController(portfolioService);

export async function PortfolioRoute(app: FastifyInstance) {
  app.get("/all", portfolioController.getAll);
  app.post(
    "",
    { preHandler: UserMiddle.authenticate },
    portfolioController.register
  );
  app.get(
    "",
    { preHandler: UserMiddle.authenticate },
    portfolioController.getByUser
  );

  // app.get("/:id", )
}
