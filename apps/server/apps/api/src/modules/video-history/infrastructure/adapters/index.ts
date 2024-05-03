export * from './video-history.base.adapter';
/**
 * 비디오 히스토리의 최신 데이터만 받아서 한 듀플만 보내주는 함수
 */
export * from './video-history.last-one.adapter';
/**
 * 비디오 히스토리의 기간내에 전부 가져오는 함수, 캐시테이블 한개아니면 두개
 */
export * from './video-history.single-duo.adapter';
/**
 * 비디오 아이디를 여러개 받아서 한번에 리턴
 */
export * from './video-history.get-multiple-by-id.adapter';
/**
 * 비디오 히스토리 정보를 조회하여 반환하는 메소드. union으로 여러개의 캐시 테이블을 조회
 */
export * from './video-history.get-list-extended.adapter';
