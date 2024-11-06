import { PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, PanelRow, SelectControl, TextControl, ToggleControl, __experimentalUnitControl as UnitControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { produce } from 'immer';
import { InlineMediaUpload, Label, Typography } from '../../../../../../Components';
import { updateData } from '../../../../utils/functions';
import { Device } from '../../../Panel/Device/Device';

const General = ({ attributes, setAttributes, setDevice, device }) => {
  const { paver } = attributes;
  const { titleTypo, desTypo, titleColor, desColor } = paver;

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

      {/* Show in overly */}
      <ToggleControl
        className='overly'
        label={__('Show in overly', 'b-blocks')}
        checked={paver.isOverly}
        onChange={(value) =>
          setAttributes({
            paver: {
              ...paver,
              isOverly: value,
            },
          })
        }
      />


      {
        paver?.isOverly && (<>
          <TextControl TextControl
            className="mt10"
            label={__("Image viewer title", "b-blocks")}
            value={paver?.title}
            onChange={(newTitle) => {
              const newPaver = produce(paver, draft => {
                draft.title = newTitle;
              });
              setAttributes({ paver: newPaver });
            }}
            placeholder={__("Type here title", "b-blocks")}
          ></TextControl>

          <Typography label={__('Title typo', 'b-blocks')}
            value={titleTypo}
            onChange={(val) => {
              const newTypo = produce(paver, draft => {
                draft.titleTypo = val
              })
              setAttributes({ paver: newTypo })
            }}
            defaults={{ fontSize: 22 }}
          />

          <TextControl
            className="mt10"
            label={__("Image viewer description", "b-blocks")}
            value={paver?.description}
            onChange={(newDes) => {
              const newPaver = produce(paver, draft => {
                draft.description = newDes;
              });
              setAttributes({ paver: newPaver });
            }}
            placeholder={__("Type here description", "b-blocks")}
          ></TextControl>

          <Typography label={__('Description typo', 'b-blocks')}
            value={desTypo}
            onChange={(val) => {
              const newTypo = produce(paver, draft => {
                draft.desTypo = val
              })
              setAttributes({ paver: newTypo })
            }}
            defaults={{ fontSize: 17 }}
          />

          <PanelColorSettings
            title="Color Settings"
            colorSettings={[
              {
                value: titleColor,
                onChange: (color) => setAttributes({
                  paver: { ...paver, titleColor: color }
                }),
                label: 'Title Color',
              },
              {
                value: desColor,
                onChange: (color) => setAttributes({
                  paver: { ...paver, desColor: color }
                }),
                label: 'Description Color',
              },
            ]}
          />

        </>)
      }





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