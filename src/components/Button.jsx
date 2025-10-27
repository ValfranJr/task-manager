import { tv } from "tailwind-variants";

const Button = ({
  children,
  color = "primary",
  className,
  size = "small",
  ...rest
}) => {
  const button = tv({
    base: 'flex items-center justify-center gap-2 rounded-lg px-3 font-semibold hover:opacity-75',
    variants: {
      color:{
        primary: "bg-brand-primary text-white",
        ghost: "bg-transparent text-brand-dark-gray",
        secondary: "bg-[#EEEEEE] text-brand-dark-blue",
      },
      size: {
        small: "py-1 text-xs",
        large: "py-2 text-sm",
      },
    },
    defaultVariants: {
      color: "primary",
      size: "small",
    },
  })


  return (
    <>
      <button
        {...rest}
        className={button({ color, size, className })}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
