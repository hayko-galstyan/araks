import React from 'react';
import { DraggingContainer } from '../dragging';
import 'react-quill/dist/quill.snow.css';
import { useAnalytics } from 'context/analytics';
import { TextEditorContainer } from './styles';

export const TextEditor: React.FC<{ id: string }> = ({ id }) => {
  const { tools, activeBoard } = useAnalytics();

  const selectedTool = tools[activeBoard][id];

  return (
    <DraggingContainer containerKey={id}>
      <TextEditorContainer
        key={`analytic-text-editor-${id}`}
        className="ql-editor"
        width={selectedTool.width}
        height={selectedTool.height}
        dangerouslySetInnerHTML={{ __html: selectedTool.params[0].additional }}
      />
    </DraggingContainer>
  );
};
