const ArrowUp: React.FC<{ stroke?: string }> = ({ stroke = "#4661e6" }) => {
  return (
    <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 6l4-4 4 4"
        stroke={stroke}
        strokeWidth="2"
        fill="none"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default ArrowUp;
