import { NavLink } from "react-router-dom";
import { tv } from "tailwind-variants";

const SidebarButton = ({ children, to }) => {
  const sidebar = tv({
    base: "flex items-center gap-2 rounded-lg px-6 py-3",
    variants: {
      color: {
        default: "text-brand-dark-blue",
        selected: "bg-[#e6f7f8] text-brand-primary",
      },
    },
    defaultVariants: {
      color: "default",
    },
  });

  return (
    <>
      <NavLink
        to={to}
        className={({ isActive }) =>
          sidebar({ color: isActive ? "selected" : "default" })
        }
      >
        {children}
      </NavLink>
    </>
  );
};

export default SidebarButton;
