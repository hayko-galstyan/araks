import { useGetAdminAnalysesDashboard } from 'api/admin/use-get-analyses-dashboard';
import { COLORS } from 'helpers/constants';
import styled from 'styled-components';
import { Card, Select } from 'antd';
import { Column, ColumnConfig } from '@ant-design/plots';
import { useState } from 'react';
import { getYearsArrFrom } from 'helpers/utils';
import { CustomSelect } from '../Styled';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  min-height: 800px;
  color: '#F6976D';
  background-color: ${COLORS.PRIMARY.WHITE};
  margin-bottom: 40px;
  gap: 40px;
  border-radius: 8px;
  padding: 20px;
  outline: none;
  box-shadow: 0px 10px 20px 5px rgba(0, 0, 0, 0.1);
  overflow-y: scroll;
`;

export const AdminUsersAnalyseCount = () => {
  const yearArray = getYearsArrFrom({ from: 2023, to: undefined });
  const [selectedYear, setSelectedYear] = useState<number | undefined>(undefined);
  const { data, isSuccess } = useGetAdminAnalysesDashboard({ type: 'users', year: selectedYear });

  const chartData = isSuccess
    ? data.data.map((item) => ({
        month: `${item.year},${item.month}`,
        count: +item.count,
      }))
    : [];
  const config: ColumnConfig = {
    data: chartData,
    xField: 'month',
    yField: 'count',
    colorField: '#405D8B',
    columnWidthRatio: 0.8,
    color: '#F5B452DE',
    height: 500,
    xAxis: {
      label: {
        formatter: (text: string) => text,
        autoRotate: false,
      },
      title: {
        text: 'Month of the Year',
        style: {
          fontSize: 14,
          fill: '#333',
        },
      },
    },
    yAxis: {
      title: {
        text: 'Count of Users',
        style: {
          fontSize: 14,
          fill: '#333',
        },
      },
    },
  };

  const handleYearChange = (year: number) => {
    if (year === 0) {
      setSelectedYear(undefined);
    } else setSelectedYear(year);
  };

  return (
    <Container>
      <Card
        style={{ maxWidth: '95%', minWidth: '80%' }}
        title="Count of Users"
        extra={
          <CustomSelect defaultValue={0} onChange={(e) => handleYearChange(e as number)}>
            <Select.Option value={0}>All Years</Select.Option>
            {yearArray.map((item, index) => {
              return (
                <Select.Option key={index} value={item}>
                  {item}
                </Select.Option>
              );
            })}
          </CustomSelect>
        }
      >
        <Column {...config} />
      </Card>
    </Container>
  );
};
