import { NotFoundException } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

describe('CoursesService', () => {
  let service: CoursesService;
  let id;
  let date;

  beforeEach(async () => {
    service = new CoursesService();
    id = '4b208fd6-12ad-4b61-b31c-c0d8f700ec83';
    date = new Date();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should create a course', async () => {
    const expectOutputTags = [
      {
        id,
        name: 'jest',
        created_at: new Date(),
      },
    ];

    const expectedOutputCourse = {
      id,
      name: 'Test',
      description: 'teste with jest',
      created_at: new Date(),
      tags: expectOutputTags,
    };

    const mockCourseRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectedOutputCourse)),
      save: jest.fn().mockReturnValue(Promise.resolve(expectedOutputCourse)),
    };

    const mockTagRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutputTags)),
      findOne: jest.fn(),
    };

    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;
    //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository;

    const createCourseDto: CreateCourseDto = {
      name: 'Test',
      description: 'teste with jest',
      tags: ['jest'],
    };

    const newCourse = await service.create(createCourseDto);

    expect(mockCourseRepository.save).toHaveBeenCalled();
    expect(expectedOutputCourse).toEqual(newCourse);
  });

  it('Should list courses', async () => {
    const expectOutputTags = [
      {
        id,
        name: 'jest',
        created_at: new Date(),
      },
    ];

    const expectedOutputCourse = [
      {
        id,
        name: 'Test',
        description: 'teste with jest',
        created_at: new Date(),
        tags: expectOutputTags,
      },
    ];

    const mockCourseRepository = {
      findAll: jest.fn().mockReturnValue(Promise.resolve(expectedOutputCourse)),
      find: jest.fn().mockReturnValue(Promise.resolve(expectedOutputCourse)),
    };

    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;

    const newCourse = await service.findAll();

    expect(mockCourseRepository.find).toHaveBeenCalled();
    expect(expectedOutputCourse).toEqual(newCourse);
  });

  it('Should find one course', async () => {
    const expectOutputTags = [
      {
        id,
        name: 'jest',
        created_at: new Date(),
      },
    ];

    const expectedOutputCourse = {
      id,
      name: 'Test',
      description: 'teste with jest',
      created_at: new Date(),
      tags: expectOutputTags,
    };

    const mockCourseRepository = {
      findOne: jest.fn().mockReturnValue(Promise.resolve(expectedOutputCourse)),
    };

    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;

    const newCourse = await service.findOne(id);

    expect(mockCourseRepository.findOne).toHaveBeenCalled();
    expect(expectedOutputCourse).toEqual(newCourse);
  });

  it(`Shouldn't find one course`, async () => {
    const mockCourseRepository = {
      findOne: jest.fn().mockReturnValue(Promise.resolve(undefined)),
    };

    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;

    try {
      await service.findOne(id);
    } catch (error) {
      expect(mockCourseRepository.findOne).toHaveBeenCalled();
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toEqual(`Course id ${id} not found`);
    }
  });

  it('Should update a course', async () => {
    const expectOutputTags = [
      {
        id,
        name: 'jest',
        created_at: new Date(),
      },
    ];

    const expectedOutputCourse = {
      id,
      name: 'Test',
      description: 'teste with jest',
      created_at: new Date(),
      tags: expectOutputTags,
    };

    const mockCourseRepository = {
      update: jest.fn().mockReturnValue(Promise.resolve(expectedOutputCourse)),
      save: jest.fn().mockReturnValue(Promise.resolve(expectedOutputCourse)),
      preload: jest.fn().mockReturnValue(Promise.resolve(expectedOutputCourse)),
    };

    const mockTagRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutputTags)),
      findOne: jest.fn(),
    };

    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;
    //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository;

    const updateCourseDto: UpdateCourseDto = {
      name: 'Test',
      description: 'teste with jest',
      tags: ['jest'],
    };

    const updateCourse = await service.update(id, updateCourseDto);

    expect(mockCourseRepository.save).toHaveBeenCalled();
    expect(expectedOutputCourse).toEqual(updateCourse);
  });

  it(`Shouldn't update a course`, async () => {
    const expectOutputTags = [
      {
        id,
        name: 'jest',
        created_at: new Date(),
      },
    ];

    const expectedOutputCourse = {
      id,
      name: 'Test',
      description: 'teste with jest',
      created_at: new Date(),
      tags: expectOutputTags,
    };

    const mockCourseRepository = {
      update: jest.fn(),
      save: jest.fn().mockReturnValue(Promise.resolve(expectedOutputCourse)),
      preload: jest.fn().mockReturnValue(Promise.resolve(expectedOutputCourse)),
    };
    const mockTagRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutputTags)),
      findOne: jest.fn(),
    };

    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;
    //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository;

    const updateCourseDto: UpdateCourseDto = {
      name: 'Test',
      description: 'teste with jest',
      tags: ['jest'],
    };

    try {
      await service.update(id, updateCourseDto);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toEqual(`Course id ${id} not found`);
    }
  });

  it('Should remove one course', async () => {
    const expectOutputTags = [
      {
        id,
        name: 'jest',
        created_at: new Date(),
      },
    ];

    const expectedOutputCourse = {
      id,
      name: 'Test',
      description: 'teste with jest',
      created_at: new Date(),
      tags: expectOutputTags,
    };

    const mockCourseRepository = {
      findOne: jest.fn().mockReturnValue(Promise.resolve(expectedOutputCourse)),
      remove: jest.fn().mockReturnValue(Promise.resolve(expectedOutputCourse)),
    };

    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;

    const newCourse = await service.remove(id);

    expect(mockCourseRepository.remove).toHaveBeenCalled();
    expect(expectedOutputCourse).toEqual(newCourse);
  });

  it(`Shouldn't remove one course`, async () => {
    const mockCourseRepository = {
      findOne: jest.fn().mockReturnValue(Promise.resolve(undefined)),
    };

    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;

    try {
      await service.remove(id);
    } catch (error) {
      expect(mockCourseRepository.findOne).toHaveBeenCalled();
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toEqual(`Course id ${id} not found`);
    }
  });
});
