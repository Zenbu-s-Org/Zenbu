type ContainerVariant = "primary" | "sky" | "green" | "orange";
type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  variant?: ContainerVariant;
  className?: string;
};
function Container({
  children,
  className,
  variant = "primary",
  ...props
}: ContainerProps) {
  const variants = {
    primary: "bg-black",
    sky: "bg-sky-200",
    green: "bg-lime-300",
    orange: "bg-orange-300",
  };

  const shadow = variants[variant];

  return (
    <div className="relative z-0 flex">
      <div
        className={`z-2 w-full rounded-xl border-3 border-black bg-stone-50 p-2 ${className}`}
        {...props}
      >
        {children}
      </div>
      <div
        className={`absolute border-3 border-black ${shadow} z-1 h-full w-full translate-x-2 translate-y-2 rounded-xl`}
      />
    </div>
  );
}

export default Container;
