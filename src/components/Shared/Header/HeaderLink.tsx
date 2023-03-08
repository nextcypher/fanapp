import { FunctionComponent, PropsWithChildren } from "react";
import { NavLink } from "react-router-dom";

interface Props {
  to: string;
  className?: React.ComponentProps<"div">["className"];
}

const HeaderLink: FunctionComponent<PropsWithChildren<Props>> = ({
  to,
  children,
  className,
}) => {
  return (
    <NavLink
      to={to}
      end
      className={(props) =>
        `${className} ${
          props.isActive
            ? "text-[16px] font-medium"
            : "text-[16px] font-normal text-[#ffffff99] hover:text-[#ffffffca]"
        }`
      }
    >
      {children}
    </NavLink>
  );
};

export default HeaderLink;
