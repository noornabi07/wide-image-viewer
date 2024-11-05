
import { AlignmentToolbar, BlockControls, InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import General from './General/General';

const Settings = ({ attributes, setAttributes, device, setDevice }) => {
	const { alignment } = attributes;

	return <>
		<InspectorControls>
			<div className='bBlocksInspectorInfo'>
				Need more block like this? Checkout the bundle ➡ <a href='https://wordpress.org/plugins/b-blocks' target='_blank' rel='noopener noreferrer'>B Blocks</a>
			</div>

			<div className='bPlTabPanel wp-block-b-blocks-wide-image-viewer'>
				<General attributes={attributes} setAttributes={setAttributes} device={device} setDevice={setDevice} />
			</div>

		</InspectorControls>


		<BlockControls>

			<AlignmentToolbar value={alignment} onChange={val => setAttributes({ alignment: val })} describedBy={__('Block Name Alignment')} alignmentControls={[
				{ title: __('Block Name in left', 'b-blocks'), align: 'left', icon: 'align-left' },
				{ title: __('Block Name in center', 'b-blocks'), align: 'center', icon: 'align-center' },
				{ title: __('Block Name in right', 'b-blocks'), align: 'right', icon: 'align-right' }
			]} />

		</BlockControls>
	</>;
};
export default Settings;