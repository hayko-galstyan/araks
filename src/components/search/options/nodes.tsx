import { Badge, Flex, Image, Typography } from 'antd';
import { TypeItem, StyledAvatar } from './styles';
import { ReactComponent as Araks } from '../../icons/araks-tiny.svg';
import { getAvatarPath } from '../../../helpers/utils';
import { Icon } from '../../icon';
import { Text } from '../../typography';

const { Paragraph } = Typography;

export const renderNodes = (
  project_id: string,
  id: string,
  title: string,
  color: string,
  name: string,
  privacy: string,
  default_image: string,
  icon: string,
  node_type: string
) => {
  const flexStyle = { gap: '10px', alignItems: 'center' };
  const imageContent = !!default_image?.length ? (
    <Image width={24} height={24} style={{ borderRadius: '100%' }} preview={false} src={getAvatarPath(default_image)} />
  ) : (
    <Araks />
  );

  return {
    key: `node-type${project_id}${id}`,
    id,
    mode: 'node',
    project_id: project_id,
    value: id,
    node_id: id,
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
              <Badge color={color} />
              <Text style={{ fontSize: '12px' }}>{node_type}</Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex style={{ width: '30%', justifyContent: 'flex-end', ...flexStyle }}>
          <Flex>
            <StyledAvatar
              color={color}
              shape="square"
              size="small"
              icon={
                (
                  <Icon
                    color="#414141"
                    icon={icon}
                    size={14}
                    style={{ display: 'flex', height: '100%', margin: '0 auto' }}
                  />
                ) || <Araks />
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
