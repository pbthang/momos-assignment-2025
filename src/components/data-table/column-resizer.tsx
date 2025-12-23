import type { Header } from "@tanstack/react-table";
import type { DataRecord } from "./columns";

export const ColumnResizer = ({
    header,
}: {
    header: Header<DataRecord, unknown>;
}) => {
    if (header.column.getCanResize() === false) return <></>;

    return (
        <div
            onDoubleClick={header.column.resetSize}
            onMouseDown={header.getResizeHandler()}
            onTouchStart={header.getResizeHandler()}
            className={`absolute w-1 top-2 bottom-2 right-0 cursor-col-resize rounded-sm
                bg-neutral-600 opacity-20 hover:opacity-70 touch-none select-none`}
        />
    );
};
