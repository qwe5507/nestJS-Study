import { Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import {
  Between,
  Equal,
  ILike, In, IsNull,
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual,
  Not,
  Repository
} from "typeorm";
import { Role, UserModel } from "./entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { ProfileModel } from "./entity/profile.entity";
import { PostModel } from "./entity/post.entity";
import { TagModel } from "./entity/tag.entity";
import { raw } from "express";

@Controller()
export class AppController {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @InjectRepository(ProfileModel)
    private readonly profileRepository: Repository<ProfileModel>,
    @InjectRepository(PostModel)
    private readonly postRepository: Repository<PostModel>,
    @InjectRepository(TagModel)
    private readonly tagRepository: Repository<TagModel>,
  ) {}

  @Post('sample')
  async sample() {
    // 모델에 해당되는 객체 생성 - 저장은 안함
    // const user1 = this.userRepository.create({
    //   email: 'test@google.ai',
    // });

    //저장
    // const user2 = await this.userRepository.save({
    //   email: 'test@google.com',
    // });

    // preload
    // 입력된 값을 기반으로 데이터베이스에 있는 데이터를 불러오고
    // 추가 입력된 값으로 데이터 베이스에서 가져온 값들을 대체함.
    // 저장하지는 않음(*)
    // const user3 = await this.userRepository.preload({
    //   id: 102,
    //   email: 'test.naver.com',
    // });

    // 삭제하기
    // await this.userRepository.delete(102);

    // 값 증가시키기
    // id가 1인 데이터의 'count' 칼럼의 값을 2만큼 증가시킨다.
    // await this.userRepository.increment({
    //     id: 2,
    // }, 'count', 2);

    // 값 감소시킴
    // id가 1인 데이터의 'count' 칼럼의 값을 2만큼 감소시킨다.
    // await this.userRepository.decrement({
    //   id: 2,
    // }, 'count', 2);

    // 갯수 카운팅하기
    // const count = await this.userRepository.count({
    //   where: {
    //     email: ILike('%0%'),
    //   },
    // });

    // sum
    // const sum = await this.userRepository.sum('count', {
    //   id: LessThan(4),
    // });

    // 평균 구하기
    // const average = await this.userRepository.average('count', {
    //   id: LessThan(4),
    // });

    // 최대값 최소값
    // const min = await this.userRepository.minimum('count', {
    //   id: LessThan(4),
    // });
    // const max = await this.userRepository.maximum('count', {
    //   id: LessThan(4),
    // });

    // const userOne = await this.userRepository.findOne({
    //   where: {
    //     id: 3,
    //   },
    // });

    // 데이터를 가져오고 전체 갯수를 끝에 가져온다.
    // pagenation할때 사용
    const usersAndCount = await this.userRepository.findAndCount({
      take: 3,
    });

    return usersAndCount;
  }

  @Post('users')
  async postUser() {
    // return this.userRepository.save({
    //   // title: 'test title',
    //   // role: Role.ADMIN,
    // });
    for (let i = 0; i < 100; i++) {
      await this.userRepository.save({
        email: `user-${i}@google.com`,
      });
    }
  }
  @Get('users')
  getUsers() {
    // return this.userRepository.find({
    //   select: {
    //     id: true,
    //     title: true,
    //   },
    // });
    // return this.userRepository.find({
    //   // relations: {
    //   //   profile: true,
    //   //   posts: true,
    //   // },
    // });
    return this.userRepository.find({
      where: {
        // 아닌 경우 가져오기
        // id: Not(2),
        // 적은 경우 가져오기
        // id: LessThan(30),
        // 적은 경우 or 같은경우
        // id: LessThanOrEqual(30),
        // 많은 경우
        // id: MoreThan(30),
        // id: MoreThanOrEqual(30),
        // id: Equal(30),
        // 유사 값 가져오기
        // email: Like('%GOOGLE%'),
        // 대문자 소문자 구분 안하는 유사값
        // email: ILike('%GOOGLE%'),
        // 사이값
        // id: Between(10, 15),
        // 해당되는 여러개 값
        // id: In([1, 3, 5, 7, 99]),
        // {ID} 가 null인 경우 가져오기
        // id: IsNull(),
      },
      // 어떤 프로퍼티를 선택할지
      // 기본은 모든 프로퍼티를 가져온다. (select를 정의하지 않으면)
      // select를 정의하면 정의된 프로퍼티들만 가져온다.
      // select: {
      //   id: true,
      //   createAt: true,
      //   updateAt: true,
      //   version: true,
      //   profile: {
      //     id: true,
      //   },
      // },
      // 필터링할 조건을 입력하게 된다.
      // 여러개의 조건일 경우 And 조건으로 묶인다
      // where: { version: 1, id: 1 },
      // where: [{ id: 1 }, { version: 3 }], // or 조건으로 하고싶으면 리스트로 조건을 명시하면 된다.
      // where: { profile: { id: 5 } },
      // 관계를 가져오는 법
      // relations에 추가하는 순간 다른 옵션에서 추가한 relations기준으로 옵션을 사용할 수 있다.
      // relations: {
      //   profile: true,
      // },
      // 오름차순 내림차순 설정
      order: {
        id: 'ASC',
      },
      // 처음 몇개를 제외할지 (정렬을 하고나서)
      // skip: 0,
      // default 전체 가져옴
      // 몇개를 가져올지 (정렬을 하고나서)
      // take: 2,
    });
  }

  @Patch('users/:id')
  async patchUser(@Param('id') id: string) {
    const user = await this.userRepository.findOne({
      where: { id: parseInt(id) },
    });

    return this.userRepository.save({
      ...user,
      // title: user.title + '0',
      email: user.email + '@',
    });
  }

  @Delete('users/profile/:id')
  async deleteProfile(@Param('id') id: string) {
    await this.profileRepository.delete(+id);
  }

  @Post('users/profile')
  async createUserAndProfile() {
    const user = await this.userRepository.save({
      email: 'asd@gmail.com',
      profile: {
        profileImg: 'asdf.jpg',
      },
    });

    // const profile = await this.profileRepository.save({
    //   profileImg: 'asdf.jpg',
    //   user,
    // });

    return user;
  }

  @Post('users/post')
  async createUserAndPosts() {
    const user = await this.userRepository.save({
      email: 'postUser@codefactory.ai',
    });

    await this.postRepository.save({
      author: user,
      title: 'post 1',
    });

    await this.postRepository.save({
      author: user,
      title: 'post 2',
    });

    return user;
  }

  @Post('posts/tags')
  async createPostsTags() {
    const post1 = await this.postRepository.save({
      title: 'NestJs Lecture',
    });
    const post2 = await this.postRepository.save({
      title: 'Programming Lecture',
    });

    const tag1 = await this.tagRepository.save({
      name: 'Javascript',
      posts: [post1, post2],
    });

    const tag2 = await this.tagRepository.save({
      name: 'Typescript',
      posts: [post1],
    });

    const post3 = await this.postRepository.save({
      title: 'NextJS Lecture',
      tags: [tag1, tag2],
    });

    return true;
  }

  @Get('posts')
  getPosts() {
    return this.postRepository.find({
      relations: {
        tags: true,
      },
    });
  }

  @Get('tags')
  getTags() {
    return this.tagRepository.find({
      relations: {
        posts: true,
      },
    });
  }
}
