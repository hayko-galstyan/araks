import { extractTextFromHTML } from 'helpers/utils';
import { CommentsItem } from './styles';
import { getHighlightedText } from './utils';
import { Text } from 'components/typography';

export const renderComments = (id: string, node_id: string, title: string, search: string, index: number) => ({
  id: id,
  node_id: node_id,
  mode: 'comment',
  value: id,
  label: (
    <CommentsItem>
      {index === 0 && (
        <div style={{ borderBottom: '1px solid gray', marginBottom: 10, borderRadius:1}}>
          <Text style={{ fontSize: '18px',fontWeight:900, marginBottom: 10,marginTop:40, color:'gray'}} strong>
            Comments
          </Text>
        </div>
      )}
      {getHighlightedText(extractTextFromHTML(title), search)}
    </CommentsItem>
  ),
});
