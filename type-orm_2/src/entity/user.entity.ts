import {
  Column,
  CreateDateColumn,
  Entity,
  Generated, JoinColumn, OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn
} from "typeorm";
import { ProfileModel } from './profile.entity';
import { PostModel } from "./post.entity";

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity()
export class UserModel {
  // ID
  // @PrimaryGeneratedColumn()
  // 자동으로 ID를 생성한다.
  // @PrimaryColumn()
  // pk를 직접 넣어줘야 한다.
  // @PrimaryGeneratedColumn('uuid')
  // pk가 uuid로 생성된다.
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  // 제목
  // @Column({
  //   // 데이터베이스에서 인지하는 컬럼 타입
  //   // 자동으로 유추됨
  //   type: 'varchar',
  //   //데이터베이스 컬럼 이름, 프로퍼티 이름으로 자동 유추됨
  //   name: '_title',
  //   // 입력 할 수 있는 글자의 길이
  //   length: 300,
  //   // null이 가능한지
  //   nullable: true,
  //   // true면 처음 저장할때만 값 지정 가능
  //   // 이후에는 값 변경 불가능,
  //   update: false,
  //   // 기본값이 true
  //   // find()를 실행할때 기본으로 값을 불러올지
  //   select: false,
  //   // 아무것도 입력 안했을때 기본으로 입력되게 되는 값
  //   default: 'default value',
  //   // 기본은 false
  //   unique: false,
  // })
  // title: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  // 데이터 생성 일자
  // 데이터가 생성되는 날짜와 시간이 자동으로 찍힌다.
  @CreateDateColumn()
  createAt: Date;

  // 데이터 업데이트 일자
  // 데이터가 업데이트 되는 날짜와 시간이 찍힌다.
  @UpdateDateColumn()
  updateAt: Date;

  // 데이터가 업데이트 될때마다 1씩 올라간다.
  // 처음 생성되면 값은 1이다.
  // save() 함수가 몇번 불렸는지 기억한다.
  @VersionColumn()
  version: number;

  @Column()
  @Generated('uuid') // 이 애노테이션은 @Column과 같이 넣어야 한다, 'increment'하면 값이 1씩 올라가서 세팅됨, 'uuid'는 uuid 세팅
  additionalId: number;

  @OneToOne(() => ProfileModel, (profile) => profile.user, {
    // find() 실행 할 때마다 항상 같이 가져올 relation
    // 기본값은 false
    eager: false,
    // 저장 할때 relation을 한번에 같이 저장가능
    // 기본값은 false
    cascade: true,
    // 기본값 true, 모든 릴레이션은 null이 가능
    nullable: true,
    // 관계가 삭제 됐을 때
    // no action -> 아무것도 안함
    // cascade -> 참조하는 Row도 같이 삯제
    // set null -> 참조하는 Row에서 참조 id를 null로 변경
    // set default -> 기본세팅으로 설정 (테이블의 기본 세팅)
    // restrict -> 참조하고 있는 Row가 있는경우 참조당하는 Row 삭제 불가
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  profile: ProfileModel;

  @OneToMany(() => PostModel, (post) => post.author)
  posts: PostModel[];

  @Column({
    default: 0,
  })
  count: number;
}
