// import r from './r';

import { Options } from 'jss-plugin-default-unit';

const px = 'px';
const ms = 'ms';
const percent = '%';
// const vw = r;
const current = px;
/**
 * Generated jss-plugin-default-unit CSS property units
 *
 * @type object
 */
const options: Options = {
	// Animation properties
	'animation-delay': ms,
	'animation-duration': ms,

	// Background properties
	'background-position': current,
	'background-position-x': current,
	'background-position-y': current,
	'background-size': current,

	// Border Properties
	border: px,
	'border-bottom': px,
	'border-bottom-left-radius': px,
	'border-bottom-right-radius': px,
	'border-bottom-width': px,
	'border-left': px,
	'border-left-width': px,
	'border-radius': px,
	'border-right': px,
	'border-right-width': px,
	'border-top': px,
	'border-top-left-radius': px,
	'border-top-right-radius': px,
	'border-top-width': px,
	'border-width': px,

	// Margin properties
	margin: current,
	'margin-bottom': current,
	'margin-left': current,
	'margin-right': current,
	'margin-top': current,

	// Padding properties
	padding: current,
	'padding-bottom': current,
	'padding-left': current,
	'padding-right': current,
	'padding-top': current,

	// Mask properties
	'mask-position-x': current,
	'mask-position-y': current,
	'mask-size': current,

	// Width and height properties
	height: current,
	width: current,
	'min-height': current,
	'max-height': current,
	'min-width': current,
	'max-width': current,

	// Position properties
	bottom: current,
	left: current,
	top: current,
	right: current,

	// Shadow properties
	'box-shadow': current,
	'text-shadow': current,

	// Column properties
	'column-gap': current,
	'column-rule': current,
	'column-rule-width': current,
	'column-width': current,

	// Font and text properties
	'font-size': current,
	'font-size-delta': current,
	'letter-spacing': current,
	'text-indent': current,
	'text-stroke': current,
	'text-stroke-width': current,
	'word-spacing': current,

	// Motion properties
	motion: current,
	'motion-offset': current,

	// Outline properties
	outline: current,
	'outline-offset': current,
	'outline-width': current,

	// Perspective properties
	perspective: current,
	'perspective-origin-x': percent,
	'perspective-origin-y': percent,

	// Transform properties
	'transform-origin': percent,
	'transform-origin-x': percent,
	'transform-origin-y': percent,
	'transform-origin-z': percent,

	// Transition properties
	'transition-delay': ms,
	'transition-duration': ms,

	// Alignment properties
	'vertical-align': current,
	'flex-basis': current,

	// Some random properties
	'shape-margin': current,
	size: current,

	// Grid properties
	grid: current,
	'grid-gap': current,
	'grid-row-gap': current,
	'grid-column-gap': current,
	'grid-template-rows': current,
	'grid-template-columns': current,
	'grid-auto-rows': current,
	'grid-auto-columns': current,

	// Not existing properties.
	// Used to avoid issues with jss-plugin-expand integration.
	'box-shadow-x': current,
	'box-shadow-y': current,
	'box-shadow-blur': current,
	'box-shadow-spread': current,
	'font-line-height': current,
	'text-shadow-x': current,
	'text-shadow-y': current,
	'text-shadow-blur': current,
};


export default options;
