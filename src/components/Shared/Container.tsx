import { FunctionComponent, PropsWithChildren } from "react";

interface Props {
  className?: string;
}

const Container: FunctionComponent<PropsWithChildren<Props>> = ({
  className,
  ...props
}) => {
  return (
    <div
      {...props}
      className={`w-[96%] mx-auto xl:w-[96%] px-[0px] xl:px-[100px] ${className}`}
    />
  );
};

export default Container;
