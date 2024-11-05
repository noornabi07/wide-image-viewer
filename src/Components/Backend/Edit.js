import { useBlockProps } from '@wordpress/block-editor';
import { useState } from 'react';
import '../../editor.scss';
import ImageViewer from '../Common/ImageViewer';
import Style from '../Common/Style';
import Settings from './Settings/Settings';


const Edit = props => {
	const { attributes, setAttributes, clientId } = props;
	const [device, setDevice] = useState('desktop');

	return <>
		<Settings {...{ attributes, setAttributes, device, setDevice }} />

		<div {...useBlockProps()} >

			<Style attributes={attributes} device={device} setDevice={setDevice} id={`block-${clientId}`} />

			<div className='bBlocksTestPurpose'>

				<ImageViewer attributes={attributes} device={device} />

			</div>

		</div>
	</>;
}
export default Edit;