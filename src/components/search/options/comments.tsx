import { Badge, Flex, Image, Typography } from 'antd';
import { TypeItem, StyledAvatar } from './styles';
import { ReactComponent as Araks } from '../../icons/araks-tiny.svg';
import { Text } from '../../typography';
import { extractTextFromHTML, getAvatarPath } from 'helpers/utils';
import { Icon } from 'components/icon';
import { COLORS } from 'helpers/constants';

const { Paragraph } = Typography;

export const renderComments = (
  id: string,
  project_id: string,
  privacy: string,
  title?: string,
  icon?: string,
  color?: string,
  node_id?: string,
  name?: string,
  node_type?: string,
  default_image?: string,
  comments?: string
) => {
  const flexStyle = { gap: '10px', alignItems: 'center' };
  const imageContent = !!default_image?.length ? (
    <Image width={24} height={24} style={{ borderRadius: '100%' }} preview={false} src={getAvatarPath(default_image)} />
  ) : (
    <Araks />
  );

  return {
    key: `comments${project_id}${id}`,
    id: id,
    mode: 'comments',
    project_id: project_id,
    value: id,
    node_id: node_id,
    privacy,
    label: (
      <TypeItem>
        <Flex style={{ width: '70%', ...flexStyle }}>
          <Flex style={{ width: '24px' }}>{imageContent}</Flex>
          <Flex vertical justify="start" style={{ width: 'calc(100% - 50px)' }}>
            <Paragraph style={{ fontSize: '16px', marginBottom: 0 }} strong ellipsis={{ rows: 1 }}>
              {name}
            </Paragraph>
            <Flex align="center" justify="start" gap="8px">
              <Badge color={color ? color : COLORS.PRIMARY.GRAY_LIGHT} />
              <Text style={{ fontSize: 12, maxWidth: 250, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {node_type} / {extractTextFromHTML(comments || '')}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex style={{ width: '30%', justifyContent: 'flex-end', ...flexStyle }}>
          <Flex>
            <StyledAvatar
              color={color ? color : COLORS.PRIMARY.GRAY_LIGHT}
              shape="square"
              size="small"
              icon={
                icon ? (
                  <Icon
                    color="#414141"
                    icon={icon}
                    size={14}
                    style={{ display: 'flex', height: '100%', margin: '0 auto' }}
                  />
                ) : (
                  <Araks />
                )
              }
            />
          </Flex>
          <Paragraph strong ellipsis={{ rows: 1 }} style={{ fontSize: '16px', marginBottom: 0 }}>
            {title}
          </Paragraph>
        </Flex>
      </TypeItem>
    ),
  };
};
