import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import Edit from './Components/Backend/Edit';
import './editor.scss';

registerBlockType(metadata, {
	icon: "cover-image",
	edit: Edit
});