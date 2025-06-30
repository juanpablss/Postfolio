interface CreateWorkDTO {
  name: string;
  description: string;
  githublink: string | null;
  portfolio: string;
}

interface UpdateWorkDTO {
  id: string;
  name: string;
  description: string;
  githublink: string | null;
  portfolio: string;
}

export { CreateWorkDTO, UpdateWorkDTO };
