import React, { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import { Flex } from 'antd';
import { Header } from '../header';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import { useAnalytics } from 'context/analytics';
import { ACTIONS } from 'context/analytics/reducer';
import { useUpdateToolPosition } from 'api/analytics/use-update-tool-position';
import { ANALYTICS, AnalyticTools } from 'helpers/constants';
import { TDraggingParams } from '../types';
import { ReactComponent as ValidErrorIcon } from 'components/icons/analytic-not-data.svg';
import { DashedLine } from '../styles';

const { CANVAS } = ANALYTICS;
const { TEXT, CHART } = AnalyticTools;

export const DraggingContainer: React.FC<TDraggingParams> = ({ containerKey, children }) => {
  const { tools, activeBoard, handleAction, canvasWidth } = useAnalytics();
  const selectedTools = useMemo(() => tools[activeBoard][containerKey], [tools, activeBoard, containerKey]);

  const { mutate: updateToolPositionFn } = useUpdateToolPosition();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // default position
  const [position, setPosition] = useState({
    x: selectedTools.fx,
    y: selectedTools.fy,
    offsetX: 0,
    offsetY: 0,
  });

  const updateToolParams = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      handleAction({
        type: ACTIONS.SELECT_NODE_TYPE_ID,
        payload: { id: selectedTools.source_type_id, update: true },
      });

      handleAction({
        type: ACTIONS.SELECT_TOOL,
        payload: { id: containerKey, name: selectedTools.name, type: selectedTools.type },
      });
    },
    [handleAction, containerKey, selectedTools]
  );

  const updateContainerPosition = useCallback(
    (size?: { width: number; height: number }) => {
      let updatedPosition = {
        fx: position.x,
        fy: position.y,
        width: selectedTools.width,
        height: selectedTools.height,
      };

      if (size) {
        updatedPosition = { ...updatedPosition, ...size };
      }

      updateToolPositionFn(
        {
          id: activeBoard,
          chart_id: containerKey,
          position: updatedPosition,
        },
        {
          onSuccess: () => {
            handleAction({
              type: ACTIONS.UPDATE_TOOL_PARAMS,
              payload: {
                id: containerKey,
                updatedParams: updatedPosition,
              },
            });
          },
        }
      );
    },
    [
      activeBoard,
      containerKey,
      handleAction,
      position.x,
      position.y,
      selectedTools.height,
      selectedTools.width,
      updateToolPositionFn,
    ]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;

      let newX = e.clientX - position.offsetX;
      let newY = e.clientY - position.offsetY;

      newX = Math.max(0, Math.min(newX, canvasWidth - selectedTools.width - 10));
      newY = Math.max(0, Math.min(newY, CANVAS.MAX_HEIGHT - selectedTools.height - 65));

      setPosition((prev) => ({ ...prev, x: newX, y: newY }));
    },
    [isDragging, position.offsetX, position.offsetY, selectedTools.width, selectedTools.height, canvasWidth]
  );

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const target = e.target as HTMLElement;
    if (!target.closest('.analytic-header-menu') && !target.classList.contains('react-resizable-handle')) {
      setIsDragging(true);
      setPosition((prev) => ({
        ...prev,
        offsetX: e.clientX - prev.x,
        offsetY: e.clientY - prev.y,
      }));
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      updateContainerPosition();
    }
  }, [isDragging, updateContainerPosition]);

  const checkToolValidation = useCallback(() => {
    if (selectedTools.name === TEXT) return true;
    return !selectedTools?.valid;
  }, [selectedTools]);

  const getAxisHeaderTitle = () => {
    if (selectedTools?.name === TEXT) return undefined;
    if (selectedTools?.name === CHART) {
      return `${selectedTools?.params?.[0]?.property_type_name}/${selectedTools?.params?.[1]?.property_type_name}`;
    }
    return `${selectedTools?.params?.[0]?.property_type_name}`;
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  useEffect(() => {
    setPosition({
      x: selectedTools.fx,
      y: selectedTools.fy,
      offsetX: 0,
      offsetY: 0,
    });
  }, [selectedTools]);

  return (
    <>
      <ResizableBox
        key={`tool-${selectedTools?.id}-${selectedTools?.type}`}
        width={selectedTools.width}
        height={selectedTools.height}
        minConstraints={[200, 150]}
        maxConstraints={[canvasWidth, CANVAS.MAX_HEIGHT]}
        onResizeStop={(e, { size }) => {
          updateContainerPosition(size);
        }}
        resizeHandles={['se', 'sw', 'ne', 'nw']}
        style={{
          left: position?.x,
          top: position?.y,
          cursor: isDragging ? 'grabbing' : 'grab',
          borderRadius: 4,
        }}
      >
        <Flex ref={containerRef} vertical onDoubleClick={(e) => updateToolParams(e)} onMouseDown={handleMouseDown}>
          <Header isValid={checkToolValidation()} toolAxis={getAxisHeaderTitle()} id={containerKey} />
          <div
            style={{
              width: '100%',
              height: 'max-content',
              overflowX:
                selectedTools?.width * ANALYTICS.AXIS_SIZE - ANALYTICS.LEGEND_TOOL_WIDTH > selectedTools?.width
                  ? 'auto'
                  : 'hidden',
              overflowY: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {checkToolValidation() ? children : <ValidErrorIcon />}
          </div>
        </Flex>
      </ResizableBox>
      {isDragging && (
        <>
          <DashedLine width={canvasWidth} height={1} top={50} />
          <DashedLine width={1} height={CANVAS.MAX_HEIGHT} left={50} />
        </>
      )}
    </>
  );
};
