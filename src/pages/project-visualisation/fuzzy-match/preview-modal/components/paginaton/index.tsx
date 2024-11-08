import React from 'react';
import { NodePagination } from 'components/pagination';

interface PaginationComponentProps {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export const PaginationComponent: React.FC<PaginationComponentProps> = ({
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange,
}) => (
  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
    <NodePagination current={currentPage} pageSize={itemsPerPage} total={totalItems} onChange={onPageChange} />
  </div>
);
