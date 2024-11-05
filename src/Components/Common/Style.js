import { getColorsCSS } from '../../../../Components/utils/getCSS';

const Style = ({ attributes, id }) => {
	const { colors, paver } = attributes;

	const mainSl = `#${id}`;
	const blockSl = `${mainSl} .bBlocksTestPurpose`;
	const panoramaSl = `${blockSl} .panorama`;

	return <style dangerouslySetInnerHTML={{
		__html: `
		
		${blockSl} p{
			${getColorsCSS(colors)}
		}
		${panoramaSl}{
			height: ${paver.height.desktop};
		}
	`}} />;
}
export default Style;