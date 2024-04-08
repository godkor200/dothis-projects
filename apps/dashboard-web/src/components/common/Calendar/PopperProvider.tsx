import {
  arrow as floatingArrow,
  autoUpdate,
  MiddlewareData,
  offset,
  useFloating,
  UseFloatingOptions,
} from '@floating-ui/react-dom';
import type { ReactElement } from 'react';
import React, { createContext, useContext, useRef, useState } from 'react';
import ReactDom from 'react-dom';

const SIDE_OPTIONS = ['top', 'right', 'bottom', 'left'] as const;

const ALIGN_OPTIONS = ['start', 'center', 'end'] as const;

type Side = (typeof SIDE_OPTIONS)[number];

type Align = (typeof ALIGN_OPTIONS)[number];

type PopperContentContextValue = {
  placedSide: Side;
  color: string;
  arrowX?: number;
  arrowY?: number;
  shouldHideArrow: boolean;
};

interface PopperState {
  setReference: (node: any) => void;
  setFloating: (node: HTMLElement | null) => void;
  floatingStyles: React.CSSProperties;
  arrowRef: React.RefObject<HTMLSpanElement>;
  middlewareData: any; //floating UI 타입이 없음
  arrowProps: PopperContentContextValue;
}

const PopperContext = createContext<PopperState | null>(null);

export const usePopperContext = (componentName: string) => {
  const context = useContext(PopperContext);

  if (context === null) {
    throw new Error(
      `${componentName}에 상위 <PopperProvider>가 존재하지 않습니다.`,
    );
  }
  return context;
};

const PopperProvider = ({
  children,

  side = 'bottom',
  align = 'center',
  isArrow = true,
  arrowColor = '#fefefe',
}: {
  children: React.ReactNode;
  side: Side;
  align: Align;
  isArrow: boolean;
  arrowColor: string;
}) => {
  const placement = side + (align !== 'center' ? '-' + align : '');

  const arrowRef = useRef<HTMLSpanElement>(null);

  const {
    refs,
    update,
    floatingStyles,
    elements,
    middlewareData,
    isPositioned,
  } = useFloating({
    placement: placement,
    strategy: 'fixed',
    whileElementsMounted: autoUpdate,
    middleware: [
      arrowRef && floatingArrow({ element: arrowRef }),
      offset({
        mainAxis: 15,
        crossAxis: 0,
      }),
    ],
  });

  const arrowX = middlewareData.arrow?.x;
  const arrowY = middlewareData.arrow?.y;
  const cannotCenterArrow = isArrow && middlewareData.arrow?.centerOffset !== 0;

  return (
    <PopperContext.Provider
      value={{
        setFloating: refs.setFloating,
        setReference: refs.setReference,
        floatingStyles: floatingStyles,
        arrowRef: arrowRef,
        middlewareData,
        arrowProps: {
          color: arrowColor,
          shouldHideArrow: cannotCenterArrow,
          placedSide: side,
          arrowX,
          arrowY,
        },
      }}
    >
      {children}
    </PopperContext.Provider>
  );
};

export default PopperProvider;

export const PopperArrow = React.forwardRef<
  HTMLSpanElement,
  PopperContentContextValue
>(({ placedSide, arrowX, arrowY, shouldHideArrow, color }, ref) => {
  const OPPOSITE_SIDE: Record<Side, Side> = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right',
  };
  const baseSide = OPPOSITE_SIDE[placedSide];

  return (
    <span
      ref={ref}
      style={{
        position: 'absolute',
        left: arrowX,
        top: arrowY,
        [baseSide]: 0,
        transformOrigin: {
          top: '',
          right: '0 0',
          bottom: 'center 0',
          left: '100% 0',
        }[placedSide],
        transform: {
          top: 'translateY(100%)',
          right: 'translateY(50%) rotate(90deg) translateX(-50%)',
          bottom: `rotate(180deg)`,
          left: 'translateY(50%) rotate(-90deg) translateX(50%)',
        }[placedSide],
        // visibility: shouldHideArrow ? 'hidden' : undefined,
      }}
    >
      <Arrow color={color} />
    </span>
  );
});

const Arrow = ({ color }: { color: string }) => {
  return (
    <svg
      width={10}
      height={5}
      viewBox="0 0 30 10"
      preserveAspectRatio="none"
      fill={color}
    >
      {/* We use their children if they're slotting to replace the whole svg */}
      {<polygon points="0,0 30,0 15,10" />}
    </svg>
  );
};
