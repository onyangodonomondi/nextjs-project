import { Prisma } from '@prisma/client';

export type PostWithRelations = Prisma.PostGetPayload<{
  include: {
    author: {
      select: {
        name: true;
        email: true;
      };
    };
    tags: {
      select: {
        name: true;
      };
    };
  };
}>; 