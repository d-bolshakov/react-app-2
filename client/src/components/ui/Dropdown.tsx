import { useLayoutEffect, useRef, useState } from "react";
import { getElementDirection } from "../../utils/ElementDirection";

type Props = { children: React.ReactNode };

export const Dropdown = ({ children }: Props) => {
  const menuRef = useRef(null);
  const [menuVisibility, setMenuVisibility] = useState(false);
  const [direction, setDirection] = useState("right");
  useLayoutEffect(() => {
    if (menuVisibility && menuRef.current && direction === "right") {
      const { x, width } = menuRef.current.getBoundingClientRect();
      setDirection(
        getElementDirection({ x, width }, { width: document.body.clientWidth })
      );
    }
  }, [menuVisibility]);
  return (
    <div
      className="inline-block group group-hover:relative"
      onMouseEnter={() => setMenuVisibility(true)}
      onMouseLeave={() => setMenuVisibility(false)}
    >
      <button className="text-md px-2 rounded-full group-hover:bg-gray-300">
        <i className="fa-solid fa-ellipsis-vertical"></i>
      </button>
      <div
        ref={menuRef}
        className={`
          ${direction === "left" && "right-0.5"}
          hidden
          group-hover:block
          whitespace-nowrap 
          group-hover:absolute
          group-hover:bg-white 
          border-gray-400 border-1 rounded-md
          shadow shadow-gray-600
          overflow-hidden
        `}
      >
        {children}
      </div>
    </div>
  );
};
