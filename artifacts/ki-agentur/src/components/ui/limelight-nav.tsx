import React, { useState, useRef, useLayoutEffect, cloneElement } from "react";

export type NavItem = {
  id: string | number;
  icon: React.ReactElement;
  label?: string;
  href?: string;
  onClick?: () => void;
};

type LimelightNavProps = {
  items: NavItem[];
  defaultActiveIndex?: number;
  activeIndex?: number;
  onTabChange?: (index: number) => void;
  className?: string;
  limelightClassName?: string;
  iconContainerClassName?: string;
  iconClassName?: string;
};

export const LimelightNav = ({
  items,
  defaultActiveIndex = 0,
  activeIndex: controlledIndex,
  onTabChange,
  className,
  limelightClassName,
  iconContainerClassName,
  iconClassName,
}: LimelightNavProps) => {
  const [internalIndex, setInternalIndex] = useState(defaultActiveIndex);
  const activeIndex = controlledIndex ?? internalIndex;
  const [isReady, setIsReady] = useState(false);
  const [limelightStyle, setLimelightStyle] = useState<{ left: number; width: number }>({ left: -999, width: 40 });
  const navItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useLayoutEffect(() => {
    if (items.length === 0) return;
    const activeItem = navItemRefs.current[activeIndex];
    if (activeItem) {
      setLimelightStyle({
        left: activeItem.offsetLeft,
        width: activeItem.offsetWidth,
      });
      if (!isReady) {
        setTimeout(() => setIsReady(true), 50);
      }
    }
  }, [activeIndex, isReady, items]);

  if (items.length === 0) return null;

  const handleItemClick = (index: number, item: NavItem) => {
    setInternalIndex(index);
    onTabChange?.(index);
    if (item.href) {
      if (item.href.startsWith("#")) {
        document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
      } else {
        window.open(item.href, item.href.startsWith("http") ? "_blank" : "_self");
      }
    }
    item.onClick?.();
  };

  return (
    <nav className={`relative inline-flex items-center h-12 rounded-full bg-white/5 ring-1 ring-white/10 backdrop-blur px-1 gap-0 ${className ?? ""}`}>
      {items.map((item, index) => (
        <a
          key={item.id}
          ref={(el) => { navItemRefs.current[index] = el; }}
          className={`relative z-20 flex h-full cursor-pointer items-center justify-center px-4 gap-2 text-sm font-medium transition-colors whitespace-nowrap ${
            activeIndex === index ? "text-white" : "text-white/50 hover:text-white/80"
          } ${iconContainerClassName ?? ""}`}
          onClick={() => handleItemClick(index, item)}
          aria-label={item.label}
        >
          {cloneElement(item.icon, {
            className: `w-[18px] h-[18px] shrink-0 transition-opacity duration-150 ${
              activeIndex === index ? "opacity-100" : "opacity-50"
            } ${item.icon.props.className || ""} ${iconClassName ?? ""}`,
          })}
          {item.label && <span className="hidden lg:inline">{item.label}</span>}
        </a>
      ))}

      <div
        className={`absolute top-0 z-10 h-[3px] rounded-full bg-[#c1ff72] shadow-[0_40px_15px_#c1ff72] ${
          isReady ? "transition-[left,width] duration-400 ease-in-out" : ""
        } ${limelightClassName ?? ""}`}
        style={{ left: limelightStyle.left, width: limelightStyle.width }}
      >
        <div
          className="absolute top-[3px] h-14 bg-gradient-to-b from-[#c1ff72]/20 to-transparent pointer-events-none"
          style={{
            left: "-10%",
            width: "120%",
            clipPath: "polygon(10% 100%, 20% 0, 80% 0, 90% 100%)",
          }}
        />
      </div>
    </nav>
  );
};

export default LimelightNav;
