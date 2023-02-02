"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Layout;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const getIndices = function () {
  let children = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  let classesToWrap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  let max = -Infinity;
  let min = Infinity;
  classesToWrap.forEach(className => {
    const index = children.findIndex(child => child.props.className === className);
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
  const filtered = minMax.filter(n => n >= 0 && n < children.length);
  const result = filtered.length > 0 ? filtered.length === 2 ? [min, max] : filtered[0] : -1;
  return result;
};
function Layout(props) {
  let {
    children = false
  } = props;
  const {
    component: {
      params
    }
  } = props;
  const {
    childClassNames = [],
    parentClassName = '',
    layoutClassName = '',
    insert = {}
  } = params;
  if (children !== false) {
    children = _react.default.Children.map(children, (child, index) => {
      return /*#__PURE__*/_react.default.createElement("div", {
        className: index in childClassNames ? childClassNames[index] : ''
      }, /*#__PURE__*/_react.default.cloneElement(child, {
        parentProps: props,
        layoutClassName
      }));
    });
  } else {
    children = '';
  }
  if (insert.type === 'wrap') {
    const indices = getIndices(children, insert.wrap) || -1;
    if (indices !== -1) {
      if (indices.length === 1) {
        children = [children.slice(0, indices), /*#__PURE__*/_react.default.createElement("div", {
          className: insert.wrapClassName || ''
        }, children[indices]), children.slice(indices + 1)];
      } else {
        const [min, max] = indices;
        children = [children.slice(0, min), /*#__PURE__*/_react.default.createElement("div", {
          className: insert.wrapClassName || ''
        }, children.slice(min, max + 1)), children.slice(max + 1)];
      }
    }
  }

  // for wrap property, look for index of start class name, index of end class name. insert element around

  return /*#__PURE__*/_react.default.createElement("div", {
    className: parentClassName || ''
  }, children);
}
module.exports = exports.default;