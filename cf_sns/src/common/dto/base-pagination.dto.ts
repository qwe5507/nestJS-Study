import { IsIn, IsNumber, IsOptional } from 'class-validator';

export class BasePaginationDto {
  @IsNumber()
  @IsOptional()
  page?: number;

  @IsNumber()
  @IsOptional()
  where__id_less_than?: number;

  // 이전 마지막 데이터의 id
  // 이 프로퍼티에 입력된 id 보다 높은 id 부터 값을 가져오기
  // @Type(() => Number)
  @IsNumber()
  @IsOptional()
  where__id_more_than?: number;

  // 정렬
  @IsIn(['ASC', 'DESC']) // 특정 데이터가 들어와야만 통과
  @IsOptional()
  order__createdAt?: 'ASC' | 'DESC' = 'ASC';

  // 몇개의 데이터를 응답으로 받을지
  @IsNumber()
  @IsOptional()
  take: number = 20;
}
