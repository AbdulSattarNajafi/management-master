import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTeams = async (req: Request, res: Response): Promise<void> => {
  try {
    const teams = await prisma.team.findMany();

    const teamsWithUsernames = await Promise.all(
      teams.map(async (team) => {
        const productOwner = await prisma.user.findUnique({
          where: { userId: team.productOwnerUserId! },
          select: { username: true },
        });

        const projectManager = await prisma.user.findUnique({
          where: { userId: team.projectManagerUserId! },
          select: { username: true },
        });

        return {
          ...team,
          productOwnerUsername: productOwner?.username,
          projectManagerUsername: projectManager?.username,
        };
      })
    );

    res.json(teamsWithUsernames);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving teams" });
  }
};

// export const createTeam = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   const { teamName, productOwnerUserId, projectManagerUserId } = req.body;
//   try {
//     const newTeam = await prisma.team.create({
//       data: {
//         teamName,
//         productOwnerUserId,
//         projectManagerUserId,
//       },
//     });
//     res.status(201).json(newTeam);
//   } catch (error) {
//     res.status(500).json({ message: "Error creating team" });
//   }
// };
