import { COLORS } from 'helpers/constants';
import styled from 'styled-components';
import { CardBox, CardText, TextNumber } from '../Styled';
interface Props {
  activeUsers: string;
  inactiveUsers: string;
}
const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  background-color: ${COLORS.PRIMARY.WHITE};
  gap: 40px;
  border-radius: 8px;
  padding: 20px;
  outline: none;
  margin-bottom: 40px;
`;


export const AdminUsersCount = ({ activeUsers, inactiveUsers }: Props) => {
  return (
    <Container>
      <CardBox backgroundColor={COLORS.SECONDARY.STEEL_BLUE}>
        <TextNumber>{+activeUsers + +inactiveUsers}</TextNumber>
        <CardText>Total Count of Users</CardText>
      </CardBox>
      <CardBox backgroundColor={COLORS.SECONDARY.GREEN_LIGHT}>
        <TextNumber>{activeUsers}</TextNumber>
        <CardText>Count of Active Users</CardText>
      </CardBox>
      <CardBox backgroundColor={COLORS.SECONDARY.MAGENTA}>
        <TextNumber>{inactiveUsers}</TextNumber>
        <CardText>Count of Inactive Users</CardText>
      </CardBox>
    </Container>
  );
};
