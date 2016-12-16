'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _RootCloseWrapper = require('bee-overlay/build/RootCloseWrapper');

var _RootCloseWrapper2 = _interopRequireDefault(_RootCloseWrapper);

var _DropdownToggle = require('./DropdownToggle');

var _DropdownToggle2 = _interopRequireDefault(_DropdownToggle);

var _DropdownMenu = require('./DropdownMenu');

var _DropdownMenu2 = _interopRequireDefault(_DropdownMenu);

var _DropdownMenuItem = require('./DropdownMenuItem');

var _DropdownMenuItem2 = _interopRequireDefault(_DropdownMenuItem);

var _Fade = require('bee-transition/build/Fade');

var _Fade2 = _interopRequireDefault(_Fade);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var DIV = 'div';

var propTypes = {
    disabled: _react.PropTypes.bool,
    trigger: _react.PropTypes.string,
    // block: React.PropTypes.bool,
    dropup: _react.PropTypes.bool,
    transition: _react.PropTypes.bool,
    role: _react.PropTypes.string,
    onClose: _react.PropTypes.func,
    onOpen: _react.PropTypes.func,
    onToggle: _react.PropTypes.func,
    onSelect: _react.PropTypes.func,
    /*
     * If 'select' is true , title will be updated after the 'onSelect' trigger .
     */
    select: _react.PropTypes.bool,
    activeKey: _react.PropTypes.any,
    menuStyle: _react.PropTypes.object
};

var defaultProps = {
    componentClass: DIV,
    disabled: false,
    trigger: 'click',
    clsPrefix: 'u-dropdown',
    transition: true
    // block: false
};

var Dropdown = function (_React$Component) {
    _inherits(Dropdown, _React$Component);

    function Dropdown(props) {
        _classCallCheck(this, Dropdown);

        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

        _this.toggle = _this.toggle.bind(_this);
        _this.handleClick = _this.handleClick.bind(_this);
        _this.handleMouseOver = _this.handleMouseOver.bind(_this);
        _this.handleMouseLeave = _this.handleMouseLeave.bind(_this);
        _this.handleSelect = _this.handleSelect.bind(_this);
        _this.update = _this.update.bind(_this);
        _this.state = {
            title: null,
            activeKey: _this.props.activeKey,
            open: false
        };
        return _this;
    }

    Dropdown.prototype.toggle = function toggle(isOpen) {
        var open = isOpen || !this.state.open;
        var handleToggle = open ? this.props.onOpen : this.props.onClose;

        this.setState({
            open: open
        }, function () {
            handleToggle && handleToggle();
        });

        this.props.onToggle && this.props.onToggle();
    };

    Dropdown.prototype.handleClick = function handleClick() {
        if (this.props.disabled || !(this.props.trigger == "click")) {
            return;
        }

        this.toggle();
    };

    Dropdown.prototype.handleMouseOver = function handleMouseOver() {

        if (this.props.disabled || !(this.props.trigger == "hover")) {
            return;
        }
        this.toggle(true);
    };

    Dropdown.prototype.handleMouseLeave = function handleMouseLeave(event) {

        if (this.props.disabled || !(this.props.trigger == "hover")) {
            return;
        }
        this.toggle(false);
    };

    Dropdown.prototype.handleSelect = function handleSelect(eventKey, props, event) {

        this.props.select && this.setState({
            title: props.children,
            activeKey: props.eventKey
        });

        this.props.onSelect && this.props.onSelect(eventKey, props, event);
    };

    Dropdown.prototype.update = function update(props) {
        var _ref = props || this.props,
            children = _ref.children,
            select = _ref.select,
            activeKey = _ref.activeKey;

        var state = {
            activeKey: activeKey
        };

        var title = void 0;
        if (select) {
            _react2["default"].Children.map(children, function (item, index) {
                if (activeKey === item.props.eventKey && typeof item.props.eventKey !== "undefined") {
                    title = item.props.children;
                } else if (item.props.active) {
                    title = item.props.children;
                }
            });
            title && (state.title = title);
        }

        this.setState(state);
    };

    Dropdown.prototype.componentWillMount = function componentWillMount() {
        this.update();
    };

    Dropdown.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        this.update(nextProps);
    };

    Dropdown.prototype.render = function render() {
        var _props = this.props,
            items = _props.items,
            title = _props.title,
            children = _props.children,
            className = _props.className,
            activeKey = _props.activeKey,
            dropup = _props.dropup,
            transition = _props.transition,
            clsPrefix = _props.clsPrefix,
            menuStyle = _props.menuStyle,
            Component = _props.componentClass,
            props = _objectWithoutProperties(_props, ['items', 'title', 'children', 'className', 'activeKey', 'dropup', 'transition', 'clsPrefix', 'menuStyle', 'componentClass']);

        var Toggle = _react2["default"].createElement(
            _DropdownToggle2["default"],
            _extends({}, props, {
                dropup: dropup,
                onClick: this.handleClick,
                onMouseEnter: this.handleMouseOver
            }),
            this.state.title || title
        );

        var Menu = _react2["default"].createElement(
            _DropdownMenu2["default"],
            {
                onClose: this.toggle,
                onSelect: this.handleSelect,
                activeKey: this.state.activeKey,
                open: this.state.open,
                colors: this.props.colors,
                dropup: dropup,
                style: menuStyle,
                ref: 'menu',
                onMouseLeave: this.handleMouseLeave
            },
            children
        );

        if (transition) {
            Menu = _react2["default"].createElement(
                _Fade2["default"],
                {
                    'in': this.state.open,
                    transitionAppear: true
                },
                Menu
            );
        }

        if (this.state.open) {
            Menu = _react2["default"].createElement(
                _RootCloseWrapper2["default"],
                { onRootClose: this.toggle },
                Menu
            );
        }
        var classes = (0, _classnames2["default"])(_defineProperty({}, '' + clsPrefix, true), className);
        Component = Component ? Component : DIV;
        return _react2["default"].createElement(
            Component,
            _extends({}, props, {
                className: classes,
                role: 'dropdown'
            }),
            Toggle,
            Menu
        );
    };

    return Dropdown;
}(_react2["default"].Component);

;

Dropdown.propTypes = propTypes;
Dropdown.defaultProps = defaultProps;

Dropdown.Item = _DropdownMenuItem2["default"];

exports["default"] = Dropdown;
module.exports = exports['default'];