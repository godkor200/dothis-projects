/**
 * Auth 관련 zustand actions
 */
export interface AuthActions {
  /**
   * 로그인 되어있는지 여부를 설정하는 함수
   */
  setIsSignedIn: (value: boolean) => void;
  /**
   * 로그인이(토큰이) 필요한지 여부를 설정하는 함수
   */
  setIsTokenRequired: (value: boolean) => void;
  /**
   * 회원가입 모달 트리거 함수
   */
  setIsOpenSignUpModal: (value: boolean) => void;
}

/**
 * Auth 관련 zustand state
 */
export interface AuthState {
  /**
   * 로그인 되어있는지 여부
   */
  isSignedIn: boolean;
  /**
   * 로그인이 (토큰이) 필요한지 여부
   */
  isTokenRequired: boolean;
  /**
   * 회원가입/로그인 모달 트리거 값
   */
  isOpenSignUpModal: boolean;
  /**
   * Action 함수
   */
  actions: AuthActions;
}
