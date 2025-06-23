export function Container({ children, ...props }) {
  return (
    <div {...props} className="py-6 w-full h-dvh flex flex-col justify-between">
      {children}
    </div>
  );
}
