import React, {
    FC
} from 'react';

enum RightClickMenuType {
    taskGroup,
}

interface RightClickMenuProps {
    clientX: number,
    clientY: number,
    type: RightClickMenuType
}

const RightClickMenu : FC<RightClickMenuProps> = ({
    clientX,
    clientY,
    type
} : RightClickMenuProps) => {
    return (
        <div className={`absolute top-${clientY} left-${clientX} w-20 top-20 rounded-md shadow-md bg-theta-bg`}>
                asdasdasd
        </div>
    )
}

export default RightClickMenu;