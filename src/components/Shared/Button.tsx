import { FunctionComponent, HTMLAttributes } from "react";

const Button: FunctionComponent<HTMLAttributes<HTMLButtonElement>> = (
  props
) => {
  return (
    <button
      {...props}
      className="capitalize font-medium bg-[#3417FF] hover:bg-[#2612a8] border-[#3417FF] border-[1.5px] border-solid md:px-[18px] px-[6px] md:py-[11px] py-[8px] font-['Outfit'] md:text-[15px] text-[11px] duration-100 rounded-[6px]"
    />
  );
};

export default Button;
