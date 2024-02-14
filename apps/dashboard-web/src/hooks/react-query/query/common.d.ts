/**
 * 어떤 이유에서인지 apiRouter 경로를 변경 후 모든 response로 오는 프로퍼티들이 optional 타입을 추가해서 들어오고 있습니다.
 * 하지만, 이미 프론트 쪽 코도는 optional이 아닌 타입으로 생성을 해둔 상태여서,
 * 모든 타입을 수정하는 리소스보다 queryHook에서 타입단언으로 response의 프로퍼티들을 required 상태로 수정하는 단계를 거치려고 합니다.
 * @DeepRequired 해당 유틸리티 타입은 제네릭으로 설정된 optional한 프로퍼티를 required로 변경해줍니다.
 */
export type DeepRequired<T> = Required<{
  [P in keyof T]: DeepRequired<T[P]>;
}>;
