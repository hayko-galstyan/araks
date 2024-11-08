import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Layer, Stage } from 'react-konva';
import { Flex } from 'antd';
import { Boards } from 'components/analytics/boards';
import { ToolBar } from 'components/analytics/tool-bar';
import { Text } from 'components/typography';
import { BarTypes } from 'components/analytics/bar-types';
import { RenderTool } from './components/tool';
import { AnalyticTools, ANALYTICS } from 'helpers/constants';
import { useAnalytics, AnalyticsProvider } from 'context/analytics';
import { ReactComponent as BuildVisualIcon } from 'components/icons/build-visual.svg';
import { useGetAllBoardItems } from 'api/analytics/use-get-all-board-item';
import { useUpdateBoard } from 'api/analytics/use-update-board';
import { ACTIONS } from 'context/analytics/reducer';
import { AnalyticToolsDashBoard } from './styles';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const AnalyticsContent: React.FC = () => {
  const { CANVAS } = ANALYTICS;
  const { tools, activeBoard, boards, canvasWidth, handleAction } = useAnalytics();

  const [updateBoard, setIsUpdateBoard] = useState<boolean>(false);

  const dashboardRef = useRef<HTMLDivElement | null>(null);

  const { mutate: updateBoardFn } = useUpdateBoard();

  const checkToolsById = useCallback(() => {
    return !activeBoard || tools[activeBoard] ? false : true;
  }, [activeBoard, tools]);

  const handleClickUpdateParams = () => {
    setIsUpdateBoard(true);
    updateBoardFn(
      { id: activeBoard, chart_id: undefined },
      {
        onSuccess: (data) => {
          handleAction({
            type: ACTIONS.ADD_BOARD_ITEMS,
            payload: data.data,
          });
          setIsUpdateBoard(false);
        },
      }
    );
  };

  // Get all board tools
  useGetAllBoardItems(activeBoard, {
    enabled: checkToolsById(),
    onSuccess(data) {
      handleAction({
        type: ACTIONS.ADD_BOARD_ITEMS,
        payload: data,
      });
    },
  });

  const renderTools = useMemo(() => Object.values(tools[activeBoard] || {}), [tools, activeBoard]);

  const boardTools = tools[activeBoard];

  const boardName = boards.find((board) => board.id === activeBoard);

  const handleScreenshot = () => {
    if (dashboardRef.current) {
      html2canvas(dashboardRef.current, {
        useCORS: true,
        scale: 1,
      }).then((canvas) => {
        const dataURL = canvas.toDataURL('image/png');

        // Create a PDF file
        const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'px',
          format: [canvas.width, canvas.height],
        });

        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const aspectRatio = canvasWidth / canvasHeight;
        let imgWidth = pdfWidth;
        let imgHeight = pdfWidth / aspectRatio;

        if (imgHeight > pdfHeight) {
          imgHeight = pdfHeight;
          imgWidth = pdfHeight * aspectRatio;
        }

        const xOffset = (pdfWidth - imgWidth) / 2;
        const yOffset = (pdfHeight - imgHeight) / 2;

        pdf.addImage(dataURL, 'PNG', xOffset, yOffset, imgWidth, imgHeight);

        pdf.save(`${boardName?.name}-araks-analytic.pdf`);
      });
    }
  };

  return (
    <Flex>
      <Flex vertical>
        <Boards
          onHandleScreenShot={handleScreenshot}
          isUpdateBoard={updateBoard}
          onUpdateBoard={handleClickUpdateParams}
        />
        <AnalyticToolsDashBoard ref={dashboardRef} width={canvasWidth} height={CANVAS.MAX_HEIGHT}>
          <Stage draggable>
            <Layer></Layer>
          </Stage>
          {!renderTools.length ? (
            <Flex
              vertical
              style={{ width: canvasWidth, height: CANVAS.MAX_HEIGHT }}
              align="center"
              justify="center"
              gap={16}
            >
              <Text style={{ fontSize: 30 }}>Build Visual in your data</Text>
              <BuildVisualIcon />
            </Flex>
          ) : (
            renderTools.map((tool, index) => {
              if (!tool?.name) return null;

              const key = Object.keys(boardTools || {})[index]; // [tool id]
              if (!key) return null;

              const toolEnumValue = Object.values(AnalyticTools).find((enumValue) => enumValue === tool.name);

              if (toolEnumValue === undefined) return null;

              return <RenderTool key={key} id={key} tool={toolEnumValue} />;
            })
          )}
        </AnalyticToolsDashBoard>
      </Flex>
      <>
        <ToolBar />
        <BarTypes />
      </>
    </Flex>
  );
};

export const Analytics: React.FC = () => (
  <AnalyticsProvider>
    <AnalyticsContent />
  </AnalyticsProvider>
);
