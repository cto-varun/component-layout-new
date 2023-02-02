import React from 'react';

const getIndices = (children = [], classesToWrap = []) => {
    let max = -Infinity;
    let min = Infinity;

    classesToWrap.forEach((className) => {
        const index = children.findIndex(
            (child) => child.props.className === className
        );

        if (index !== -1) {
            if (index >= max) {
                min = max;
                max = index;
            } else if (index <= min) {
                min = index;
            }
        }
    });

    const minMax = [min, max];
    const filtered = minMax.filter((n) => n >= 0 && n < children.length);
    const result =
        filtered.length > 0
            ? filtered.length === 2
                ? [min, max]
                : filtered[0]
            : -1;

    return result;
};

export default function Layout(props) {
    let { children = false } = props;
    const {
        component: { params },
    } = props;

    const {
        childClassNames = [],
        parentClassName = '',
        layoutClassName = '',
        insert = {},
    } = params;

    if (children !== false) {
        children = React.Children.map(children, (child, index) => {
            return (
                <div
                    className={
                        index in childClassNames ? childClassNames[index] : ''
                    }
                >
                    {React.cloneElement(child, {
                        parentProps: props,
                        layoutClassName,
                    })}
                </div>
            );
        });
    } else {
        children = '';
    }

    if (insert.type === 'wrap') {
        const indices = getIndices(children, insert.wrap) || -1;
        if (indices !== -1) {
            if (indices.length === 1) {
                children = [
                    children.slice(0, indices),
                    <div className={insert.wrapClassName || ''}>
                        {children[indices]}
                    </div>,
                    children.slice(indices + 1),
                ];
            } else {
                const [min, max] = indices;
                children = [
                    children.slice(0, min),
                    <div className={insert.wrapClassName || ''}>
                        {children.slice(min, max + 1)}
                    </div>,
                    children.slice(max + 1),
                ];
            }
        }
    }

    // for wrap property, look for index of start class name, index of end class name. insert element around

    return <div className={parentClassName || ''}>{children}</div>;
}
