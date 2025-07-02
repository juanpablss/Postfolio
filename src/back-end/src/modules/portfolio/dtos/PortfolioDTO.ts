interface CreatePortfolioDTO {
  name: string;
  description: string;
  pagelink: string | null;
  authorId: string;
}

interface UpdatePortfolioDTO {
  id: string;
  name: string;
  description: string;
  pagelink: string | null;
  authorId: string;
}

export { CreatePortfolioDTO, UpdatePortfolioDTO };
