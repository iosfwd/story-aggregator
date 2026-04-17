"use client";

type Props = {
  isCollapsed: boolean;
  onClick: () => void;
  accentColor: string;
};

export default function ExpandCollapseBar({
  isCollapsed,
  onClick,
  accentColor,
}: Props) {
  return (
    <div className="flex w-4 shrink-0 flex-col items-center">
      <button
        onClick={onClick}
        className={`w-px flex-1 border-l-2 ${accentColor} mt-1 cursor-pointer p-2 opacity-40 transition-opacity hover:opacity-100`}
        title={isCollapsed ? "Expand" : "Collapse"}
      />
    </div>
  );
}
