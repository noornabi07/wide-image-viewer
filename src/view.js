import { createRoot } from 'react-dom/client';
import Style from './Components/Common/Style';
import BlockName from './Components/Frontend/BlockName';
import './style.scss';

document.addEventListener('DOMContentLoaded', () => {
	const blockNameEls = document.querySelectorAll('.wp-block-b-blocks-wide-image-viewer');
	blockNameEls.forEach(blockNameEl => {
		const attributes = JSON.parse(blockNameEl.dataset.attributes);

		createRoot(blockNameEl).render(<>
			<Style attributes={attributes} id={blockNameEl.id} />

			<BlockName attributes={attributes} />
		</>);

		blockNameEl?.removeAttribute('data-attributes');
	});
});