const Badge = (props: {
  /** shows cress mark. if set we can delete the hobby */
  isCancellable?: boolean;
  /** hobby text */
  text: string;
  /** tailwind-class string to set color for badge */
  colorString?: string;
  bordered?: boolean;
  /** handler to remove the selected hobby */
  onRemove?: (hobby: string) => void;
}) => {
  const { isCancellable, text, colorString, bordered, onRemove } = props;

  return (
    <div
      className={`badge ${
        isCancellable ? "badge-lg font-medium" : "badge-sm"
      } gap-2 ${colorString ?? "badge-success"} ${
        bordered ? "badge-outline" : ""
      } opacity-80`}
    >
      {text}
      {/* only if it is cancellable and have remove handler. then only show the cross svg mark */}
      {isCancellable && onRemove && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          onClick={() => onRemove(text)}
          className="inline-block w-4 h-4 stroke-current cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      )}
    </div>
  );
};

export default Badge;
