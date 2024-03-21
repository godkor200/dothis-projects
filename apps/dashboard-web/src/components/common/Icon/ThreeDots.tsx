const HorizontalThreeDotsIcon = ({ size }: { size?: number }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={size ? `h-${size} w-${size}` : 'h-6 w-6'}
      viewBox="0 0 24 24"
      stroke="black"
      fill="#000"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
      />
    </svg>
  );
};

const VerticalThreeDotsIcon = ({ size }: { size?: number }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={size ? `h-${size} w-${size}` : 'h-6 w-6'}
      viewBox="0 0 24 24"
      stroke="black"
      fill="#000"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 010-2 1 1 0 010 2zm0 7a1 1 0 010-2 1 1 0 010 2zm0 7a1 1 0 010-2 1 1 0 010 2z"
      />
    </svg>
  );
};

export { HorizontalThreeDotsIcon, VerticalThreeDotsIcon };
