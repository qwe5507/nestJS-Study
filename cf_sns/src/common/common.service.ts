import { BadRequestException, Injectable } from "@nestjs/common";
import { BasePaginationDto } from './dto/base-pagination.dto';
import { FindManyOptions, FindOptionsOrder, FindOptionsWhere, Repository } from "typeorm";
import { BaseModel } from './entity/base.entity';
import { FILTER_MAPPER } from "./const/filter-mapper.const";

@Injectable()
export class CommonService {
  paginate<T extends BaseModel>(
    dto: BasePaginationDto,
    repository: Repository<T>,
    overrideFindOptions: FindManyOptions<T>,
    path: string,
  ) {
    if (dto.page) {
      return this.pagePaginate(dto, repository, overrideFindOptions);
    } else {
      return this.cursorPaginate(dto, repository, overrideFindOptions, path);
    }
  }

  private async pagePaginate<T extends BaseModel>(
    dto: BasePaginationDto,
    repository: Repository<T>,
    overrideFindOptions: FindManyOptions<T>,
  ) {

  }

  private async cursorPaginate<T extends BaseModel>(
    dto: BasePaginationDto,
    repository: Repository<T>,
    overrideFindOptions: FindManyOptions<T>,
    path: string,
  ) {
    /**
     * where__likeCount__more_than
     *
     * where__title__ilike
     */
    const findOptions = this.composeFindOptions<T>(dto);
  }

  private composeFindOptions<T extends BaseModel>(
    dto: BasePaginationDto,
  ): FindManyOptions<T> {
    /** 반환 값
     * where,
     * order,
     * take,
     * skip -> page 기반 일때만
     */

    /**
     * DTO의 현재 생긴 구조는 아래와 같다.
     * {
     *   where__id__more_than: 1,
     *   order__createAt: 'ASC'
     * }
     *
     * 현재는 where__id__more_than / where__id__less_than에 해당하는 where 필터만 사용 중이지만,
     * 나중에 where__likeCount__more_than 이나 where__title__ilike 등 추가 필터를 넣고 싶어졌을때
     * 모든 where 필터들을 자동으로 파싱 할 수 있을만한 기능을 제작해야 한다.
     *
     * 1) where로 시작한다면 필터 로직을 적용한다.
     * 2) order로 시작한다면 정렬 로직을 적용한다.
     * 3) 필터 로직을 적용한다면 '__' 기준으로 split했을때 3개의 값으로 나뉘는지
     *    2개의 값으로 나뉘는지 확인한다.
     *    3-1) 3개의 값으로 나뉜다면, FILTER_MAPPER에서 해당하는 operator 함수를 찾아서 적용한다.
     *        ['where', 'id', 'more_than']
     *    3-2) 2개의 값으로 나뉜다면, 정확한 값을 필터 하는것 이기 때문에 operator 없이 적용한다.
     *        ['where', 'id']
     * 4) order의 경우 3-2와 같이 적용한다.(항상 두개로 split되기 떄문에)
     *
     */
    let where: FindOptionsWhere<T> = {};
    let order: FindOptionsOrder<T> = {};

    for (const [key, value] of Object.entries(dto)) {
      // key -> where__id__more_than
      // value -> 1

      if (key.startsWith('where__')) {
        where = {
          ...where,
          ...this.parseWhereFilter(key, value),
        };
      } else if (key.startsWith('order__')) {
        order = {
          ...order,
          ...this.parseWhereFilter(key, value),
        };
      }
    }

    return {
      where,
      order,
      take: dto.take,
      skip: dto.page ? dto.take * (dto.page - 1) : null,
    };
  }

  private parseWhereFilter<T extends BaseModel>(key: string, value: any): FindOptionsWhere<T> | FindOptionsOrder<T> {
    const options: FindOptionsWhere<T> | FindOptionsOrder<T> = {};

    /**
     * 예를들어 where__id__more_than
     * __를 기준으로 나누었을때
     *
     * ['where', 'id', 'more_than']
     */
    const split = key.split('__');

    if (split.length !== 2 && split.length !== 3) {
      throw new BadRequestException(
        `where 필터는 '__'로 스플릿 했을때 길이가 2 또는 3이어야 합니다. - 문제되는 키 값 : ${key}`,
      );
    }
    /**
     * 길이가 2일 경우
     * where__id = 3
     *
     * FindOptionsWhere로 풀어보면 아래와 같다.
     * {
     *   where : {
     *     id: 3,
     *   }
     * }
     */
    if (split.length === 2) {
      // ['where', 'id']
      const [_, field] = split;

      /**
       * field -> 'id'
       * value -> 3
       * {
       *   id : 3,
       * }
       */
      options[field] = value;
    } else {
      /**
       * 길이가 3일 경우에는 TypeORM 유틸리티 적용이 필요한 경우이다.
       * where__id__more_than의 경우
       * where는 버려도 되고 두번째 값은 필터할 키 값이 되고
       * 세번째 값은 typeORM 유틸리티가 된다.
       *
       * FILTER_MAPPER에 미리 정의해둔 값들로
       * field 값에 FILTER_MAPPER에서 해당하는 utility를 가져온 후
       * 값에 적용 해준다.
       */
      // ['where', 'id', 'more_than']
      const [_, field, operator] = split;

      // where__id__between = 3,4
      // 만약에 split대상 문자열이 존재하지 않으면 길이가 무조건 1이다.
      // const value = value.toString().split(',');
      // field -> id
      // operator -> more_than
      // FILTER_MAPPER[operator] -> MoreThan
      // if (operator = 'between') { // operator기능의 인자가 여러개인 건 이렇게 수동으로 추가해줘야 함
      //   options[field] = FILTER_MAPPER[operator](value[0], value[1]);
      // } else {
      //   options[field] = FILTER_MAPPER[operator](value);
      // }
      // 단일 값만 넣는다고 가정하고 진행
      options[field] = FILTER_MAPPER[operator](value);
    }

    return options;
  }
}
