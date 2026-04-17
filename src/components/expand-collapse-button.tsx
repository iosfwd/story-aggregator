"use client";

type Props = {
  isCollapsed: boolean;
  onClick: () => void;
};

export default function ExpandCollapseButton({ isCollapsed, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="ml-1 cursor-pointer text-stone-400 transition-colors hover:text-stone-600"
    >
      {isCollapsed ? "[+]" : "[–]"}
    </button>
  );
}
