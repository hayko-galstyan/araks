import { Badge, Flex, Image, Typography } from 'antd';
import { ReactComponent as Araks } from '../../icons/araks-tiny.svg';
import { ProjectWrapper, StyledAvatar } from './styles';
import { Icon } from '../../icon';
import { Text } from '../../typography';
import { getAvatarPath } from '../../../helpers/utils';

const { Paragraph } = Typography;

export const renderProperty = (
  id: string,
  title: string,
  color: string,
  node_id: string,
  project_id: string,
  icon: string,
  privacy: string,
  node_name: string,
  property: string[],
  node_type: string,
  default_image: string,
  user_id: string
) => {
  const flexStyle = { gap: '10px', alignItems: 'center' };

  const imageContent = !!default_image?.length ? (
    <Image width={24} height={24} style={{ borderRadius: '100%' }} preview={false} src={getAvatarPath(default_image)} />
  ) : (
    <Araks />
  );

  return {
    key: `propertyType${id}`,
    id,
    mode: 'propertyType',
    project_id: project_id,
    value: id,
    node_id,
    user_id,
    privacy,
    label: (
      <ProjectWrapper>
        <Flex style={{ width: '70%', ...flexStyle }}>
          <Flex style={{ width: 'max-content' }}>{imageContent}</Flex>
          <Flex vertical justify="start" style={{ width: 'calc(100% - 50px)' }}>
            <Paragraph ellipsis={{ rows: 1 }} style={{ fontSize: '16px', marginBottom: 0 }}>
              {node_name}
            </Paragraph>
            <Flex align="center" justify="start" gap="8px">
              <Badge color={color} />
              <Text style={{ fontSize: '12px' }}>{node_type} /</Text>
              <Paragraph strong ellipsis={{ rows: 1 }} style={{ fontSize: '12px', marginBottom: 0 }}>
                {property.toString()}
              </Paragraph>
            </Flex>
          </Flex>
        </Flex>
        <Flex style={{ width: '30%', justifyContent: 'flex-end', ...flexStyle }}>
          <Flex style={{ width: '24px' }}>
            <StyledAvatar
              color={color}
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
      </ProjectWrapper>
    ),
  };
};
