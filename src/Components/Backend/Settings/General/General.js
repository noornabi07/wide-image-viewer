import { PanelBody, PanelRow, SelectControl, TextControl, ToggleControl, __experimentalUnitControl as UnitControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { produce } from 'immer';
import { InlineMediaUpload, Label } from '../../../../../../Components';
import { updateData } from '../../../../utils/functions';
import { Device } from '../../../Panel/Device/Device';

const General = ({ attributes, setAttributes, setDevice, device }) => {
  const { paver } = attributes;

  return (
    <PanelBody className='bPlPanelBody' title={__('Viewport General Setting', 'b-blocks')} initialOpen={true}>

      <PanelRow>
        <Label className='mb5'>{__('Wide Viewport Height:', 'music-slider')}</Label>
        <Device onChange={val => setDevice(val)} />
      </PanelRow>

      <UnitControl className='mb5' value={paver?.height[device]} onChange={val => setAttributes({ paver: updateData(paver, val, "height", device) })} beforeIcon='grid-view' step={1} max={600} min={300} ></UnitControl>


      <InlineMediaUpload className="uploadImg" label={__("Upload Or Insert Image", "b-blocks")} value={paver?.imgUrl} onChange={val => {
        const newPaverImg = produce(paver, draft => {
          draft.imgUrl = val;
        })
        setAttributes({ paver: newPaverImg });
      }} />

      {/* Star Position */}
      <div className="startPosition">
        <h2>Image Position Starting</h2>
        <div className="position-buttons" style={{ display: 'flex' }}>
          <button
            className={`position-button ${paver.strtPosition === 0 ? 'selected' : ''}`}
            onClick={() => setAttributes({ paver: { ...paver, strtPosition: 0 } })}
          >
            Left
          </button>
          <button
            className={`position-button ${paver.strtPosition === 0.5 ? 'selected' : ''}`}
            onClick={() => setAttributes({ paver: { ...paver, strtPosition: 0.5 } })}
          >
            Center
          </button>
          <button
            className={`position-button ${paver.strtPosition === 1 ? 'selected' : ''}`}
            onClick={() => setAttributes({ paver: { ...paver, strtPosition: 1 } })}
          >
            Right
          </button>
        </div>
        <p>Determines the start position of the panorama: insert a value from 0 (left), 0.5 (center), 1 (right) image position.</p>
      </div>

      {/* IsMessage Toggle Control */}
      <ToggleControl
        className='filerMsg'
        label={__('Insert failure message', 'b-blocks')}
        checked={paver.isFailedMsg}
        onChange={(value) =>
          setAttributes({
            paver: {
              ...paver,
              isFailedMsg: value,
            },
          })
        }
      />

      {/* Conditionally Render Failure Message Settings */}
      {paver.isFailedMsg && (
        <>
          <SelectControl
            label={__('Position', 'b-blocks')}
            value={paver.position}
            options={[
              { label: 'After the panorama container', value: 'after' },
              { label: 'Before the panorama container', value: 'before' },
            ]}
            onChange={(value) =>
              setAttributes({
                paver: {
                  ...paver,
                  position: value,
                },
              })
            }
          />
          <TextControl
            label={__('Failure Message', 'b-blocks')}
            value={paver.failedMsg}
            onChange={(value) =>
              setAttributes({
                paver: {
                  ...paver,
                  failedMsg: value,
                },
              })
            }
          />
        </>
      )}

    </PanelBody>
  )
}

export default General