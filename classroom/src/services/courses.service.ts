import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

interface CreateCoureParams {
  title: string;
}

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  listAllCourses() {
    return this.prisma.course.findMany();
  }

  getCourseById(courseId: string) {
    return this.prisma.course.findUnique({
      where: { id: courseId },
    });
  }

  async createCourse({ title }: CreateCoureParams) {
    const slug = title
      .toLowerCase()
      .replaceAll(' ', '-')
      .replaceAll(/[^a-zA-Z 0-9-]+/g, '');

    const courseAlreadyExists = await this.prisma.course.findUnique({
      where: {
        slug,
      },
    });

    if (courseAlreadyExists) throw new Error('Course already exists.');

    return this.prisma.course.create({
      data: {
        title,
        slug,
      },
    });
  }
}
