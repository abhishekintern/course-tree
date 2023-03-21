const ToggleArrow = ({ toggleArrow, setToggleArrow }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#9ca3af"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="#9ca3af"
      className="w-4 h-4 mx-4"
      onClick={() => setToggleArrow(!toggleArrow)}
    >
      {!toggleArrow && (
        <path
          fillRule="evenodd"
          d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
          clipRule="evenodd"
        />
      )}
      {toggleArrow && (
        <path
          fillRule="evenodd"
          d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
          clipRule="evenodd"
        />
      )}
    </svg>
  );
};

export default ToggleArrow;
