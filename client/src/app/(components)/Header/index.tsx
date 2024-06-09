import React from "react";

type HeaderProps = {
  name: string;
  buttonComponent?: any;
  isSmallText?: boolean;
};

const Header = ({
  name,
  buttonComponent,
  isSmallText = false,
}: HeaderProps) => {
  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-2">
      <h1
        className={`${
          isSmallText ? "text-lg" : "text-xl"
        } font-semibold text-gray-700 dark:text-white`}
      >
        {name}
      </h1>
      {buttonComponent}
    </div>
  );
};

export default Header;
